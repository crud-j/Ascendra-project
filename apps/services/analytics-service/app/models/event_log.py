"""
Analytics Service models — behavioral and economic event log.

Analytics is a read-heavy, append-only service. Events from all other services
flow here via the message bus. No other service reads from analytics directly.
"""

import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, func, Index
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class AnalyticsEvent(Base):
    """
    Denormalized event log for analytics queries.
    Every significant event in the system is copied here for analysis.
    This table is append-only and partitioned by month in production.
    """

    __tablename__ = "analytics_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    user_id: Mapped[str | None] = mapped_column(String(36), nullable=True, index=True)
    session_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    properties: Mapped[str] = mapped_column(Text, default="{}")  # JSON
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    ingested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
