"""Payment Service models — fiat on/off-ramps for Skill Coins and subscriptions."""

import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Boolean, Text, DateTime, func, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    transaction_type: Mapped[str] = mapped_column(String(30), nullable=False)
    # subscription | skill_coin_purchase | skill_coin_withdrawal

    amount_cents: Mapped[int] = mapped_column(Integer, nullable=False)  # in smallest currency unit
    currency: Mapped[str] = mapped_column(String(3), nullable=False)  # USD | PHP
    provider: Mapped[str] = mapped_column(String(20), nullable=False)  # stripe | gcash | maya
    provider_tx_id: Mapped[str | None] = mapped_column(String(255), nullable=True, unique=True)
    status: Mapped[str] = mapped_column(String(20), default="pending")
    # pending | processing | settled | failed | refunded

    skill_coins_involved: Mapped[int | None] = mapped_column(Integer, nullable=True)
    metadata: Mapped[str] = mapped_column(Text, default="{}")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    settled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, unique=True)
    plan: Mapped[str] = mapped_column(String(20), nullable=False)  # free | pro
    stripe_subscription_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="active")
    current_period_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
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
