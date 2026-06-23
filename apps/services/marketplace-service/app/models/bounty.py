"""
Marketplace Service bounty models.

Bounty completion involves a cross-service saga:
1. marketplace-service emits marketplace.bounty.completed
2. payment-service releases escrow (independent consumer)
3. economy-core mints Skill Coins (independent consumer)
Both are idempotent and independently retryable.
Reconciliation cross-checks every completed bounty has both settlement and mint.
"""

import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Boolean, Text, DateTime, func, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Bounty(Base):
    __tablename__ = "bounties"
    __table_args__ = (
        CheckConstraint("skill_coin_reward > 0", name="ck_bounty_positive_reward"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    skill_coin_reward: Mapped[int] = mapped_column(Integer, nullable=False)
    posted_by_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    claimed_by_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="open")
    # open | in_progress | completed | cancelled

    deadline: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    tags: Mapped[str] = mapped_column(Text, default="[]")  # JSON list

    # Escrow tracking
    escrow_held: Mapped[bool] = mapped_column(Boolean, default=False)
    escrow_released: Mapped[bool] = mapped_column(Boolean, default=False)

    # Idempotency key for completion event
    completion_idempotency_key: Mapped[str | None] = mapped_column(String(64), nullable=True)

    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class OutboxEvent(Base):
    __tablename__ = "outbox_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    aggregate_id: Mapped[str] = mapped_column(String(36), nullable=False)
    payload: Mapped[str] = mapped_column(Text, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
