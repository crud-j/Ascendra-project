"""
Contribution domain events.

These are the ONLY events that can trigger Skill Coin minting and Reputation
gains. Every event here must have passed the 4-stage contribution validation
pipeline before being emitted. The Economy Core enforces this at the ledger
level, but the pipeline is the first gate.

Cardinal Rule (ADR-002): Learning events NEVER appear here.
Skill Coins flow only from validated contribution.
"""

from typing import Literal
from .base import BaseEvent


class AnswerAcceptedEvent(BaseEvent):
    """
    Emitted by Community Service when an asker marks an answer as accepted.

    Self-validation is structurally impossible: the asker (validator) cannot
    be the answerer (contributor). The Community Service enforces this before
    emitting this event.

    Economy consequence: Reputation +15, Skill Coins +1 for the answerer.
    """

    event_type: Literal["answer.accepted"] = "answer.accepted"
    producer: str = "community-service"

    answer_id: str
    question_id: str
    answerer_id: str   # the contributor who earns the reward
    asker_id: str      # the validator — must differ from answerer_id
    idempotency_key: str  # prevents double-mint on replay

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.answerer_id)
        object.__setattr__(
            self,
            "data",
            {
                "answer_id": self.answer_id,
                "question_id": self.question_id,
                "answerer_id": self.answerer_id,
                "asker_id": self.asker_id,
                "idempotency_key": self.idempotency_key,
            },
        )


class ReviewApprovedEvent(BaseEvent):
    """
    Emitted by Assessment Service when a project review is approved.
    Economy consequence: Reputation +20, Skill Coins +3 for the reviewer.
    """

    event_type: Literal["review.approved"] = "review.approved"
    producer: str = "assessment-service"

    review_id: str
    project_id: str
    reviewer_id: str   # contributor who earns
    author_id: str     # cannot equal reviewer_id
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.reviewer_id)
        object.__setattr__(
            self,
            "data",
            {
                "review_id": self.review_id,
                "project_id": self.project_id,
                "reviewer_id": self.reviewer_id,
                "author_id": self.author_id,
                "idempotency_key": self.idempotency_key,
            },
        )


class MentorshipSessionCompletedEvent(BaseEvent):
    """
    Emitted by Mentor Service after both parties confirm a session.
    Economy consequence: Reputation +30, Skill Coins 5-50 for the mentor
    (variable by session attributes such as duration and rating).
    """

    event_type: Literal["mentorship.session_completed"] = "mentorship.session_completed"
    producer: str = "mentor-service"

    session_id: str
    mentor_id: str     # contributor who earns
    mentee_id: str     # validator — must differ from mentor_id
    duration_minutes: int
    rating: float      # 1.0 - 5.0, influences coin amount
    skill_coins_earned: int  # computed by Mentor Service (5-50)
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.mentor_id)
        object.__setattr__(
            self,
            "data",
            {
                "session_id": self.session_id,
                "mentor_id": self.mentor_id,
                "mentee_id": self.mentee_id,
                "duration_minutes": self.duration_minutes,
                "rating": self.rating,
                "skill_coins_earned": self.skill_coins_earned,
                "idempotency_key": self.idempotency_key,
            },
        )


class ArticlePublishedEvent(BaseEvent):
    """
    Emitted by Community Service when a Trusted Contributor or above
    publishes an article that passes moderation.
    Economy consequence: Reputation +50 for the author.
    No Skill Coins — articles build reputation, not direct coin income.
    """

    event_type: Literal["article.published"] = "article.published"
    producer: str = "community-service"

    article_id: str
    author_id: str
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.author_id)
        object.__setattr__(
            self,
            "data",
            {
                "article_id": self.article_id,
                "author_id": self.author_id,
                "idempotency_key": self.idempotency_key,
            },
        )
