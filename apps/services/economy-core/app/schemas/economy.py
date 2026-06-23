"""
Economy Core Pydantic schemas — request validation and response shapes.

All inbound requests carry an idempotency_key. Economy operations fail closed:
if the key is malformed or missing, the request is rejected (400), not silently
processed.
"""

from typing import Literal
from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Allowed source event types for each operation.
# These lists are the structural enforcement of ADR-002:
# "Skill Coins are minted only by validated contribution events."
# If a source_event_type is not in the allowed list, the Economy Core
# rejects the request with a 422.
# ---------------------------------------------------------------------------

XP_SOURCE_EVENTS = frozenset(
    ["lesson.completed", "course.completed", "quest.completed", "path.progressed"]
)

REPUTATION_SOURCE_EVENTS = frozenset(
    [
        "answer.accepted",
        "review.approved",
        "mentorship.session_completed",
        "article.published",
        "spam_report.validated",
        # Penalty sources
        "spam_penalty",
        "abuse_penalty",
        "plagiarism_penalty",
    ]
)

SKILL_COIN_SOURCE_EVENTS = frozenset(
    [
        "answer.accepted",
        "review.approved",
        "mentorship.session_completed",
        "guild.event_won",
        "bounty.completed",
        # Spend / withdrawal sources (negative amounts)
        "marketplace.purchase",
        "withdrawal.requested",
        "escrow.hold",
        "escrow.release",
    ]
)


class XPAwardRequest(BaseModel):
    user_id: str
    xp_amount: int = Field(gt=0)
    source_event_type: str
    source_event_id: str
    idempotency_key: str = Field(min_length=8)


class ReputationChangeRequest(BaseModel):
    user_id: str
    delta: int = Field(ne=0)  # non-zero; positive or negative
    reason: str
    source_event_type: str
    source_event_id: str
    idempotency_key: str = Field(min_length=8)


class SkillCoinMintRequest(BaseModel):
    """
    Request to mint (or spend) Skill Coins.

    entry_type discriminates mints from spends so the ledger is always clear
    about the direction and intent of each entry.
    """

    user_id: str
    amount: int = Field(ne=0)
    entry_type: Literal["mint", "spend", "withdrawal", "escrow_hold", "escrow_release"]
    reason: str
    source_event_type: str
    source_event_id: str
    idempotency_key: str = Field(min_length=8)


class LedgerBalanceResponse(BaseModel):
    user_id: str
    total_xp: int
    total_reputation: int
    skill_coin_balance: int
    reputation_level: int
    reputation_title: str


class UserEconomySnapshot(BaseModel):
    """Full economy snapshot for the profile / economy bar in the frontend."""

    user_id: str
    total_xp: int
    total_reputation: int
    skill_coin_balance: int
    reputation_level: int
    reputation_title: str
    xp_to_next_level: int | None   # None when at max level
