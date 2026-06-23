"""Assessment Service models — code execution and project review."""

import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, Text, DateTime, func, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class ProjectSubmission(Base):
    __tablename__ = "project_submissions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    author_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    repository_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    artifact_url: Mapped[str | None] = mapped_column(Text, nullable=True)  # R2 object
    status: Mapped[str] = mapped_column(String(20), default="pending")
    # pending | in_review | approved | rejected

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class ProjectReview(Base):
    """
    Human review of a project submission.

    The reviewer_id must not equal the author_id of the submission.
    This is enforced at the application level before this record is created.
    On approval, review.approved is emitted → Economy Core awards the reviewer
    Reputation +20 and Skill Coins +3.
    """

    __tablename__ = "project_reviews"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    submission_id: Mapped[str] = mapped_column(String(36), ForeignKey("project_submissions.id"), nullable=False)
    reviewer_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    verdict: Mapped[str] = mapped_column(String(20), nullable=False)  # approved | rejected
    feedback: Mapped[str] = mapped_column(Text, nullable=False)
    score: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Idempotency key for the economy event (set when verdict is submitted)
    economy_idempotency_key: Mapped[str | None] = mapped_column(String(64), unique=True, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class CodeExecution(Base):
    """Judge0 code execution log."""

    __tablename__ = "code_executions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    language_id: Mapped[int] = mapped_column(nullable=False)
    source_code: Mapped[str] = mapped_column(Text, nullable=False)
    stdin: Mapped[str | None] = mapped_column(Text, nullable=True)
    stdout: Mapped[str | None] = mapped_column(Text, nullable=True)
    stderr: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_description: Mapped[str] = mapped_column(String(100), nullable=False)
    time_ms: Mapped[float | None] = mapped_column(Float, nullable=True)
    memory_kb: Mapped[int | None] = mapped_column(nullable=True)
    judge0_token: Mapped[str | None] = mapped_column(String(100), nullable=True)
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
