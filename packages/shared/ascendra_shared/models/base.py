"""
Shared SQLAlchemy declarative base with automatic timestamp columns.

Every table in every Ascendra service should inherit from TimestampedModel.
The id column is intentionally left to each service to define (UUID vs bigint
may differ per context), but created_at and updated_at are universal.
"""

from datetime import datetime, timezone
from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class TimestampedModel(DeclarativeBase):
    """
    Abstract SQLAlchemy base that adds created_at / updated_at to every table.

    Uses server_default=func.now() so the database sets the value even when
    the ORM is bypassed (e.g. during migrations or bulk inserts).
    """

    __abstract__ = True

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
