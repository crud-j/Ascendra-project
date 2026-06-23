"""
BalanceService — derives economy balances from ledger history.

No mutable balance total is ever authoritative (ADR-001). Every balance read
is a SUM over the append-only ledger. For performance at scale, these queries
should be backed by a materialized view or a Redis cache, but the ledger is
always the source of truth for reconciliation.
"""

from sqlalchemy import select, func as sqlfunc
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ledgers import XPLedgerEntry, ReputationLedgerEntry, SkillCoinLedgerEntry
from app.schemas.economy import LedgerBalanceResponse, UserEconomySnapshot
from app.services.ledger_service import _reputation_level, REPUTATION_TIERS


class BalanceService:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def get_balance(self, user_id: str) -> LedgerBalanceResponse:
        total_xp = await self._sum_xp(user_id)
        total_rep = await self._sum_reputation(user_id)
        sc_balance = await self._sum_skill_coins(user_id)
        level, title = _reputation_level(total_rep)

        return LedgerBalanceResponse(
            user_id=user_id,
            total_xp=total_xp,
            total_reputation=total_rep,
            skill_coin_balance=sc_balance,
            reputation_level=level,
            reputation_title=title,
        )

    async def get_snapshot(self, user_id: str) -> UserEconomySnapshot:
        balance = await self.get_balance(user_id)

        # Calculate XP to next level (reputation-based tiers, not XP levels)
        next_threshold: int | None = None
        for lvl, threshold, _ in reversed(REPUTATION_TIERS):
            if lvl == balance.reputation_level + 1:
                next_threshold = threshold
                break

        xp_to_next = (
            (next_threshold - balance.total_reputation)
            if next_threshold is not None
            else None
        )

        return UserEconomySnapshot(
            user_id=user_id,
            total_xp=balance.total_xp,
            total_reputation=balance.total_reputation,
            skill_coin_balance=balance.skill_coin_balance,
            reputation_level=balance.reputation_level,
            reputation_title=balance.reputation_title,
            xp_to_next_level=xp_to_next,
        )

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
