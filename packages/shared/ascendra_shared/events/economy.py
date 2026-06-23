"""
Economy domain events emitted exclusively by Economy Core.

These events are downstream outputs — they announce that a ledger write
has already durably committed. Consumers (Notification, Analytics, Blockchain)
react to these. Nothing writes back into Economy Core based on these events;
the flow is strictly one-way outward.

Invariant: Economy Core is the sole emitter of all events in this file.
"""

from typing import Literal
from .base import BaseEvent


class XPAwardedEvent(BaseEvent):
    """
    Emitted after Economy Core appends an XP ledger entry.
    Consumed by: Notification Service, Analytics, Elasticsearch (leaderboard).
    """

    event_type: Literal["economy.xp.awarded"] = "economy.xp.awarded"
    producer: str = "economy-core"

    user_id: str
    xp_amount: int
    source_event_type: str   # e.g. "lesson.completed", "quest.completed"
    source_event_id: str     # the upstream event that triggered this award
    new_total_xp: int        # derived from ledger sum — for display only, not authoritative
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "xp_amount": self.xp_amount,
                "source_event_type": self.source_event_type,
                "source_event_id": self.source_event_id,
                "new_total_xp": self.new_total_xp,
                "idempotency_key": self.idempotency_key,
            },
        )


class ReputationChangedEvent(BaseEvent):
    """
    Emitted after Economy Core appends a Reputation ledger entry.
    Delta can be positive (contribution reward) or negative (misconduct penalty).
    """

    event_type: Literal["economy.reputation.changed"] = "economy.reputation.changed"
    producer: str = "economy-core"

    user_id: str
    delta: int           # positive for gains, negative for penalties
    reason: str          # e.g. "answer_accepted", "spam_penalty"
    source_event_id: str
    new_total_reputation: int
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "delta": self.delta,
                "reason": self.reason,
                "source_event_id": self.source_event_id,
                "new_total_reputation": self.new_total_reputation,
                "idempotency_key": self.idempotency_key,
            },
        )


class SkillCoinMintedEvent(BaseEvent):
    """
    Emitted after Economy Core appends a Skill Coin ledger entry.

    This is the most security-sensitive event in the system. It ONLY fires
    when the contribution validation pipeline has successfully verified the
    triggering contribution event. Economy Core verifies the source event
    type before writing the ledger entry.

    Consumed by: Notification Service, Analytics, Blockchain Service
    (which mirrors this on Aptos asynchronously).
    """

    event_type: Literal["economy.skillcoin.minted"] = "economy.skillcoin.minted"
    producer: str = "economy-core"

    user_id: str
    amount: int
    reason: str          # e.g. "accepted_answer", "project_review", "mentorship_session"
    source_event_type: str
    source_event_id: str
    new_balance: int     # derived from ledger sum — snapshot for display
    idempotency_key: str

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "amount": self.amount,
                "reason": self.reason,
                "source_event_type": self.source_event_type,
                "source_event_id": self.source_event_id,
                "new_balance": self.new_balance,
                "idempotency_key": self.idempotency_key,
            },
        )


class LevelChangedEvent(BaseEvent):
    """
    Emitted by Economy Core when a user's reputation crosses a tier threshold.

    Consumed by Mentor Service (to grant mentoring capability at Level 4),
    Learning Service (to unlock advanced content), and Notification Service.

    Tier thresholds:
        Level 1 Learner       0
        Level 2 Contributor   100
        Level 3 Trusted       500
        Level 4 Mentor        1,000
        Level 5 Expert        5,000
        Level 6 Master        10,000
    """

    event_type: Literal["economy.level.changed"] = "economy.level.changed"
    producer: str = "economy-core"

    user_id: str
    old_level: int
    new_level: int
    old_title: str
    new_title: str
    reputation_at_change: int

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "old_level": self.old_level,
                "new_level": self.new_level,
                "old_title": self.old_title,
                "new_title": self.new_title,
                "reputation_at_change": self.reputation_at_change,
            },
        )
