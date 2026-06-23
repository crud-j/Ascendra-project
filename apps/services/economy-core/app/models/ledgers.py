"""
The three append-only ledger tables that are the heart of Economy Core.

Design principles (ADR-001, ADR-002):
- Rows are NEVER updated or deleted. The ledger is the audit trail.
- Balances are derived by summing rows, never stored as a mutable total.
- Each table enforces a unique constraint on idempotency_key so that a
  duplicate insert fails at the database level — a second line of defense
  behind the application-level idempotency check.
- XP, Reputation, and Skill Coins live in completely separate tables so
  that no single bug can leak value between currencies (ADR-001).
- The OutboxEvent table is written in the same transaction as the ledger
  entry (ADR-006) so the event is emitted if and only if the ledger write
  commits.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class XPLedgerEntry(Base):
    """
    Append-only XP ledger.

    Source of truth for a user's total XP. Balance = SUM(xp_amount) WHERE user_id = x.
    XP only increases; xp_amount is always positive.
    Only consumption/activity events generate XP — never contribution events.
    """

    __tablename__ = "xp_ledger"
    __table_args__ = (
        UniqueConstraint("idempotency_key", name="uq_xp_ledger_idempotency_key"),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    xp_amount: Mapped[int] = mapped_column(Integer, nullable=False)
    source_event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    source_event_id: Mapped[str] = mapped_column(String(36), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class ReputationLedgerEntry(Base):
    """
    Append-only Reputation ledger.

    Balance = SUM(delta) WHERE user_id = x.
    Delta is positive for contribution rewards and negative for misconduct penalties.
    Reputation is never purchased; it is never converted; it only changes via
    validated contribution events and moderator-issued penalties.
    """

    __tablename__ = "reputation_ledger"
    __table_args__ = (
        UniqueConstraint(
            "idempotency_key", name="uq_reputation_ledger_idempotency_key"
        ),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    delta: Mapped[int] = mapped_column(Integer, nullable=False)  # positive or negative
    reason: Mapped[str] = mapped_column(String(100), nullable=False)
    source_event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    source_event_id: Mapped[str] = mapped_column(String(36), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class SkillCoinLedgerEntry(Base):
    """
    Append-only Skill Coin ledger.

    Balance = SUM(amount) WHERE user_id = x.
    Amount is positive for mints, negative for spends and withdrawals.
    CRITICAL: The application layer must verify that mints originate only from
    validated contribution events. This is enforced by the contribution
    validation pipeline. The unique constraint on idempotency_key is the final
    structural guard against double-minting.
    """

    __tablename__ = "skill_coin_ledger"
    __table_args__ = (
        UniqueConstraint(
            "idempotency_key", name="uq_skill_coin_ledger_idempotency_key"
        ),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    amount: Mapped[int] = mapped_column(Integer, nullable=False)  # positive=mint, negative=spend
    entry_type: Mapped[str] = mapped_column(
        String(20), nullable=False
    )  # "mint" | "spend" | "withdrawal" | "escrow_hold" | "escrow_release"
    reason: Mapped[str] = mapped_column(String(100), nullable=False)
    source_event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    source_event_id: Mapped[str] = mapped_column(String(36), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class OutboxEvent(Base):
    """
    Transactional outbox table (ADR-006).

    Every economy ledger write that should emit an external event inserts a row
    here in the SAME database transaction. A relay process (or Debezium CDC)
    polls this table and publishes pending events to the message bus, then marks
    them as published.

    This guarantees: event is emitted IF AND ONLY IF the ledger write committed.
    No state change is ever silently unaccompanied by its event.
    """

    __tablename__ = "outbox_events"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    event_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    aggregate_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    payload: Mapped[str] = mapped_column(Text, nullable=False)  # JSON serialized event
    published: Mapped[bool] = mapped_column(default=False, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    published_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
