"""
LedgerService — the single authoritative writer for all three economy ledgers.

All paths that touch a ledger go through this class. It enforces:
1. Source event type allowlist (ADR-002) — rejects mints from disallowed sources.
2. Idempotency — checks for existing entry before writing; returns existing if found.
3. Transactional outbox — writes the outbox row in the same transaction as the ledger.
4. Level-change detection — emits economy.level.changed when reputation crosses a tier.
5. Fail closed — under any uncertainty, raises rather than risks an incorrect write.
"""

import json
import uuid
from datetime import datetime, timezone
from typing import Optional

import structlog
from sqlalchemy import select, func as sqlfunc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.models.ledgers import (
    XPLedgerEntry,
    ReputationLedgerEntry,
    SkillCoinLedgerEntry,
    OutboxEvent,
)
from app.schemas.economy import (
    XPAwardRequest,
    ReputationChangeRequest,
    SkillCoinMintRequest,
    XP_SOURCE_EVENTS,
    REPUTATION_SOURCE_EVENTS,
    SKILL_COIN_SOURCE_EVENTS,
)

logger = structlog.get_logger()

# Reputation tier thresholds (Level: min_reputation)
REPUTATION_TIERS = [
    (6, 10_000, "Master"),
    (5, 5_000, "Expert"),
    (4, 1_000, "Mentor"),
    (3, 500, "Trusted Contributor"),
    (2, 100, "Contributor"),
    (1, 0, "Learner"),
]


def _reputation_level(reputation: int) -> tuple[int, str]:
    for level, threshold, title in REPUTATION_TIERS:
        if reputation >= threshold:
            return level, title
    return 1, "Learner"


class EconomyIntegrityError(Exception):
    """Raised when an economy operation would violate an invariant."""


class LedgerService:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    # ------------------------------------------------------------------
    # XP
    # ------------------------------------------------------------------

    async def award_xp(self, req: XPAwardRequest) -> XPLedgerEntry:
        """
        Append an XP entry. Idempotent: same idempotency_key returns the
        existing entry without re-writing.
        """
        if req.source_event_type not in XP_SOURCE_EVENTS:
            raise EconomyIntegrityError(
                f"source_event_type '{req.source_event_type}' is not allowed to "
                f"award XP. Allowed: {sorted(XP_SOURCE_EVENTS)}"
            )

        # Idempotency check
        existing = await self._db.scalar(
            select(XPLedgerEntry).where(
                XPLedgerEntry.idempotency_key == req.idempotency_key
            )
        )
        if existing:
            logger.info(
                "xp_award_duplicate_ignored",
                idempotency_key=req.idempotency_key,
                user_id=req.user_id,
            )
            return existing

        entry = XPLedgerEntry(
            id=str(uuid.uuid4()),
            user_id=req.user_id,
            xp_amount=req.xp_amount,
            source_event_type=req.source_event_type,
            source_event_id=req.source_event_id,
            idempotency_key=req.idempotency_key,
        )

        # Compute new total for the outbox event payload
        current_xp = await self._sum_xp(req.user_id)
        new_total = current_xp + req.xp_amount

        outbox = self._make_outbox(
            event_type="economy.xp.awarded",
            aggregate_id=req.user_id,
            payload={
                "user_id": req.user_id,
                "xp_amount": req.xp_amount,
                "source_event_type": req.source_event_type,
                "source_event_id": req.source_event_id,
                "new_total_xp": new_total,
                "idempotency_key": req.idempotency_key,
            },
        )

        try:
            self._db.add(entry)
            self._db.add(outbox)
            await self._db.flush()
        except IntegrityError:
            await self._db.rollback()
            logger.warning(
                "xp_award_integrity_error_duplicate",
                idempotency_key=req.idempotency_key,
            )
            existing = await self._db.scalar(
                select(XPLedgerEntry).where(
                    XPLedgerEntry.idempotency_key == req.idempotency_key
                )
            )
            return existing  # type: ignore[return-value]

        logger.info(
            "xp_awarded",
            user_id=req.user_id,
            amount=req.xp_amount,
            idempotency_key=req.idempotency_key,
        )
        return entry

    # ------------------------------------------------------------------
    # Reputation
    # ------------------------------------------------------------------

    async def change_reputation(
        self, req: ReputationChangeRequest
    ) -> ReputationLedgerEntry:
        """
        Append a reputation entry (positive or negative).
        Detects tier crossings and writes an additional outbox event when
        the user's level changes.
        """
        if req.source_event_type not in REPUTATION_SOURCE_EVENTS:
            raise EconomyIntegrityError(
                f"source_event_type '{req.source_event_type}' is not allowed to "
                f"change Reputation. Allowed: {sorted(REPUTATION_SOURCE_EVENTS)}"
            )

        existing = await self._db.scalar(
            select(ReputationLedgerEntry).where(
                ReputationLedgerEntry.idempotency_key == req.idempotency_key
            )
        )
        if existing:
            logger.info(
                "reputation_change_duplicate_ignored",
                idempotency_key=req.idempotency_key,
            )
            return existing

        old_rep = await self._sum_reputation(req.user_id)
        new_rep = old_rep + req.delta
        old_level, old_title = _reputation_level(old_rep)
        new_level, new_title = _reputation_level(new_rep)

        entry = ReputationLedgerEntry(
            id=str(uuid.uuid4()),
            user_id=req.user_id,
            delta=req.delta,
            reason=req.reason,
            source_event_type=req.source_event_type,
            source_event_id=req.source_event_id,
            idempotency_key=req.idempotency_key,
        )

        outbox_rep = self._make_outbox(
            event_type="economy.reputation.changed",
            aggregate_id=req.user_id,
            payload={
                "user_id": req.user_id,
                "delta": req.delta,
                "reason": req.reason,
                "source_event_id": req.source_event_id,
                "new_total_reputation": new_rep,
                "idempotency_key": req.idempotency_key,
            },
        )

        try:
            self._db.add(entry)
            self._db.add(outbox_rep)

            if old_level != new_level:
                outbox_level = self._make_outbox(
                    event_type="economy.level.changed",
                    aggregate_id=req.user_id,
                    payload={
                        "user_id": req.user_id,
                        "old_level": old_level,
                        "new_level": new_level,
                        "old_title": old_title,
                        "new_title": new_title,
                        "reputation_at_change": new_rep,
                    },
                )
                self._db.add(outbox_level)
                logger.info(
                    "reputation_level_changed",
                    user_id=req.user_id,
                    old_level=old_level,
                    new_level=new_level,
                )

            await self._db.flush()
        except IntegrityError:
            await self._db.rollback()
            existing = await self._db.scalar(
                select(ReputationLedgerEntry).where(
                    ReputationLedgerEntry.idempotency_key == req.idempotency_key
                )
            )
            return existing  # type: ignore[return-value]

        logger.info(
            "reputation_changed",
            user_id=req.user_id,
            delta=req.delta,
            new_total=new_rep,
        )
        return entry

    # ------------------------------------------------------------------
    # Skill Coins
    # ------------------------------------------------------------------

    async def mint_skill_coins(
        self, req: SkillCoinMintRequest
    ) -> SkillCoinLedgerEntry:
        """
        Append a Skill Coin ledger entry (mint or spend).

        CRITICAL: This path verifies source_event_type is in SKILL_COIN_SOURCE_EVENTS.
        This is the structural enforcement of "learning events never mint coins."
        If any caller attempts to pass a learning event type here, this method
        raises EconomyIntegrityError and the operation is rejected.
        """
        if req.source_event_type not in SKILL_COIN_SOURCE_EVENTS:
            raise EconomyIntegrityError(
                f"source_event_type '{req.source_event_type}' is not allowed to "
                f"affect Skill Coins. Allowed: {sorted(SKILL_COIN_SOURCE_EVENTS)}. "
                f"INVARIANT VIOLATION: learning events must never mint Skill Coins."
            )

        # For mints specifically, reject negative amounts
        if req.entry_type == "mint" and req.amount <= 0:
            raise EconomyIntegrityError("Mint amount must be positive.")

        # For spends/withdrawals, reject positive amounts
        if req.entry_type in ("spend", "withdrawal") and req.amount >= 0:
            raise EconomyIntegrityError(
                "Spend/withdrawal amount must be negative (recorded as a debit)."
            )

        existing = await self._db.scalar(
            select(SkillCoinLedgerEntry).where(
                SkillCoinLedgerEntry.idempotency_key == req.idempotency_key
            )
        )
        if existing:
            logger.info(
                "skill_coin_duplicate_ignored", idempotency_key=req.idempotency_key
            )
            return existing

        current_balance = await self._sum_skill_coins(req.user_id)
        new_balance = current_balance + req.amount

        # Fail closed: never let balance go negative
        if new_balance < 0:
            raise EconomyIntegrityError(
                f"Skill Coin balance would go negative: current={current_balance}, "
                f"amount={req.amount}. Operation rejected."
            )

        entry = SkillCoinLedgerEntry(
            id=str(uuid.uuid4()),
            user_id=req.user_id,
            amount=req.amount,
            entry_type=req.entry_type,
            reason=req.reason,
            source_event_type=req.source_event_type,
            source_event_id=req.source_event_id,
            idempotency_key=req.idempotency_key,
        )

        outbox = self._make_outbox(
            event_type="economy.skillcoin.minted",
            aggregate_id=req.user_id,
            payload={
                "user_id": req.user_id,
                "amount": req.amount,
                "entry_type": req.entry_type,
                "reason": req.reason,
                "source_event_type": req.source_event_type,
                "source_event_id": req.source_event_id,
                "new_balance": new_balance,
                "idempotency_key": req.idempotency_key,
            },
        )

        try:
            self._db.add(entry)
            self._db.add(outbox)
            await self._db.flush()
        except IntegrityError:
            await self._db.rollback()
            existing = await self._db.scalar(
                select(SkillCoinLedgerEntry).where(
                    SkillCoinLedgerEntry.idempotency_key == req.idempotency_key
                )
            )
            return existing  # type: ignore[return-value]

        logger.info(
            "skill_coins_minted",
            user_id=req.user_id,
            amount=req.amount,
            entry_type=req.entry_type,
            new_balance=new_balance,
        )
        return entry

    # ------------------------------------------------------------------
    # Balance reads (derived from ledger; never from a mutable total)
    # ------------------------------------------------------------------

    async def _sum_xp(self, user_id: str) -> int:
        result = await self._db.scalar(
            select(sqlfunc.coalesce(sqlfunc.sum(XPLedgerEntry.xp_amount), 0)).where(
                XPLedgerEntry.user_id == user_id
            )
        )
        return int(result or 0)

    async def _sum_reputation(self, user_id: str) -> int:
        result = await self._db.scalar(
            select(
                sqlfunc.coalesce(sqlfunc.sum(ReputationLedgerEntry.delta), 0)
            ).where(ReputationLedgerEntry.user_id == user_id)
        )
        return int(result or 0)

    async def _sum_skill_coins(self, user_id: str) -> int:
        result = await self._db.scalar(
            select(
                sqlfunc.coalesce(sqlfunc.sum(SkillCoinLedgerEntry.amount), 0)
            ).where(SkillCoinLedgerEntry.user_id == user_id)
        )
        return int(result or 0)

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _make_outbox(event_type: str, aggregate_id: str, payload: dict) -> OutboxEvent:
        return OutboxEvent(
            id=str(uuid.uuid4()),
            event_type=event_type,
            aggregate_id=aggregate_id,
            payload=json.dumps(payload, default=str),
            published=False,
        )
