"""
AI Service models.

IMPORTANT: AI output NEVER directly awards XP, Reputation, or Skill Coins,
and NEVER gates progression on its own authority (ADR-008).

AI generates advisory content (review suggestions, roadmaps, explanations).
Economic consequences always flow from deterministic rules and validated
human-or-system contribution events. For example:
- AI Reviewer suggests improvements → human reviewer approves → review.approved event → economy
- AI Coach generates roadmap → user follows it → lesson.completed → economy
"""

import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, func, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class AISession(Base):
    """Stores AI interaction context for continuity across messages."""

    __tablename__ = "ai_sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    session_type: Mapped[str] = mapped_column(String(30), nullable=False)
    # mentor | coach | reviewer | interviewer

    system_prompt_version: Mapped[str] = mapped_column(String(20), nullable=False)
    context: Mapped[str] = mapped_column(Text, default="{}")  # JSON
    token_count: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    last_active_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class AIMessage(Base):
    """Individual messages within an AI session."""

    __tablename__ = "ai_messages"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    role: Mapped[str] = mapped_column(String(10), nullable=False)  # user | assistant
    content: Mapped[str] = mapped_column(Text, nullable=False)
    tokens_used: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
