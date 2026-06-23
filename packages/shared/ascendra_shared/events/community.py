"""Community moderation events."""

from typing import Literal
from .base import BaseEvent


class SpamReportValidatedEvent(BaseEvent):
    """
    Emitted by Community Service when a spam report is confirmed valid
    by a Moderator or by automated systems.

    Economy consequence: +10 Reputation for the original reporter.
    Penalty against the content author is handled separately via a
    ReputationChangedEvent with a negative delta.
    """

    event_type: Literal["spam_report.validated"] = "spam_report.validated"
    producer: str = "community-service"

    report_id: str
    reporter_id: str    # earns +10 reputation
    content_id: str
    content_type: str   # "question", "answer", "article", "comment"
    author_id: str      # receives the spam penalty
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.reporter_id)
        object.__setattr__(
            self,
            "data",
            {
                "report_id": self.report_id,
                "reporter_id": self.reporter_id,
                "content_id": self.content_id,
                "content_type": self.content_type,
                "author_id": self.author_id,
                "idempotency_key": self.idempotency_key,
            },
        )


class ContentFlaggedEvent(BaseEvent):
    """
    Emitted when content is flagged for moderation review.
    Does not trigger economy consequences until validated.
    """

    event_type: Literal["content.flagged"] = "content.flagged"
    producer: str = "community-service"

    content_id: str
    content_type: str
    reporter_id: str
    flag_reason: str   # "spam", "abuse", "plagiarism", "off_topic"

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.content_id)
        object.__setattr__(
            self,
            "data",
            {
                "content_id": self.content_id,
                "content_type": self.content_type,
                "reporter_id": self.reporter_id,
                "flag_reason": self.flag_reason,
            },
        )
