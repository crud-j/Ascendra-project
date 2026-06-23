"""
Mentor Service session models.

The mentorship session completion flow is economically significant:
- Both mentor AND mentee must confirm for the session to complete
- Self-confirmation is structurally prevented: mentor_id must != mentee_id
- Session completion emits mentorship.session_completed → Economy Core
  awards Reputation +30 and Skill Coins 5-50 to the mentor

Session coin reward calculation (5-50 range):
  base = 5
  duration_bonus = (duration_minutes // 30) * 2   (2 coins per 30 min block)
  rating_bonus = round((rating - 1.0) / 4.0 * 20) (0-20 coins based on 1-5 rating)
  total = min(base + duration_bonus + rating_bonus, 50)
"""

import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Boolean, Text, DateTime, Float, func, ForeignKey, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class MentorProfile(Base):
    """Mentor-specific profile data. Created when user reaches Level 4 (1,000 rep)."""

    __tablename__ = "mentor_profiles"

    user_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    specializations: Mapped[str] = mapped_column(Text, default="[]")  # JSON list
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    session_count: Mapped[int] = mapped_column(Integer, default=0)
    average_rating: Mapped[float] = mapped_column(Float, default=0.0)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class MentorSession(Base):
    __tablename__ = "mentor_sessions"
    __table_args__ = (
        CheckConstraint("mentor_id != mentee_id", name="ck_session_no_self_mentorship"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    mentor_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    mentee_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    topic: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="scheduled")
    # Status: scheduled | in_progress | completed | cancelled

    # Confirmation tracking (both parties must confirm for completion)
    mentor_confirmed: Mapped[bool] = mapped_column(Boolean, default=False)
    mentee_confirmed: Mapped[bool] = mapped_column(Boolean, default=False)

    # Set after completion
    rating: Mapped[float | None] = mapped_column(Float, nullable=True)
    skill_coins_earned: Mapped[int | None] = mapped_column(Integer, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Idempotency key for the economy event (set when session completes)
    economy_idempotency_key: Mapped[str | None] = mapped_column(String(64), unique=True, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class OutboxEvent(Base):
    __tablename__ = "outbox_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    aggregate_id: Mapped[str] = mapped_column(String(36), nullable=False)
    payload: Mapped[str] = mapped_column(Text, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
