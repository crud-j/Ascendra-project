"""Base event envelope. Every event in Ascendra extends this."""

import uuid
from datetime import datetime, timezone
from pydantic import BaseModel, Field


class BaseEvent(BaseModel):
    """
    The canonical event envelope used across all Ascendra services.

    Every event written to the transactional outbox (ADR-006) must include
    these fields so consumers can route, deduplicate, trace, and replay events
    without knowing the event's domain-specific shape.

    Fields:
        event_id        — UUID v4, unique per event instance. Used for deduplication.
        event_type      — Dot-namespaced string, e.g. "lesson.completed".
        event_version   — Schema version. Increment when the data shape changes
                          in a breaking way; consumers check this before deserializing.
        occurred_at     — UTC timestamp when the domain fact happened (not when
                          the message was published — those can differ under replay).
        producer        — Service that emitted the event, e.g. "learning-service".
        subject         — Primary entity the event is about. Usually a user_id or
                          resource_id. Used for partitioned consumption and filtering.
        correlation_id  — Trace ID threaded through a saga or request chain so that
                          all events belonging to one user action can be correlated.
        data            — Domain-specific payload. Kept as a plain dict here so the
                          base class is not coupled to any domain schema. Concrete
                          event subclasses replace this with a typed Pydantic model.
    """

    event_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str
    event_version: int = 1
    occurred_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    producer: str
    subject: str  # usually user_id or resource_id
    correlation_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    data: dict = Field(default_factory=dict)

    model_config = {"frozen": True}  # events are immutable once created
