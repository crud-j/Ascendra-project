"""
Idempotency key generation for economy-affecting operations.

Every operation that writes to an economy ledger must carry an idempotency key
(ADR-005). The key is deterministic for the same logical operation so that
replays and retries produce the same result without double-writing.

Strategy: namespace:source_event_id  — stable across retries, unique per event.
"""

import hashlib


class IdempotencyKey:
    """Factory for deterministic idempotency keys."""

    @staticmethod
    def for_xp_award(source_event_id: str, user_id: str) -> str:
        """
        Key for an XP award.  Stable per (event, user) pair.
        A single event can only award XP to one user, so this is sufficient.
        """
        raw = f"xp:{source_event_id}:{user_id}"
        return hashlib.sha256(raw.encode()).hexdigest()

    @staticmethod
    def for_reputation_change(source_event_id: str, user_id: str, reason: str) -> str:
        """
        Key for a reputation change.
        Includes reason because one event might generate multiple changes
        (e.g. spam_report.validated rewards reporter AND penalizes author).
        """
        raw = f"rep:{source_event_id}:{user_id}:{reason}"
        return hashlib.sha256(raw.encode()).hexdigest()

    @staticmethod
    def for_skill_coin_mint(source_event_id: str, user_id: str) -> str:
        """
        Key for a Skill Coin mint.
        One contribution event mints coins for exactly one contributor.
        """
        raw = f"sc:{source_event_id}:{user_id}"
        return hashlib.sha256(raw.encode()).hexdigest()

    @staticmethod
    def for_escrow_release(bounty_id: str) -> str:
        """Key for releasing escrow on a completed bounty."""
        raw = f"escrow:{bounty_id}"
        return hashlib.sha256(raw.encode()).hexdigest()

    @staticmethod
    def custom(namespace: str, *parts: str) -> str:
        """
        Generate a key for any operation not covered by the typed methods above.
        Callers should use a consistent namespace string.
        """
        raw = f"{namespace}:" + ":".join(parts)
        return hashlib.sha256(raw.encode()).hexdigest()
