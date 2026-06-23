"""
Blockchain Service anchor models.

Off-chain ledger (Economy Core) is ALWAYS authoritative.
This service maintains an index of what has been anchored on-chain (Aptos).
Anchoring is async, idempotent, and never blocks core product flows.

Three classes of on-chain records:
1. Achievement NFTs — soulbound, represent milestone accomplishments
2. Reputation Proofs — non-transferable tier attestations
3. Skill Coin mirrors — on-chain representation for portability
"""

import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, Text, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class AnchorRecord(Base):
    """
    Tracks anchoring of off-chain economy facts to the Aptos blockchain.

    status: pending | submitted | confirmed | failed
    The idempotency_key prevents duplicate anchoring of the same economy event.
    """

    __tablename__ = "anchor_records"
    __table_args__ = (
        UniqueConstraint("idempotency_key", name="uq_anchor_idempotency"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    anchor_type: Mapped[str] = mapped_column(String(50), nullable=False)
    # achievement_nft | reputation_proof | skill_coin_mirror

    source_event_id: Mapped[str] = mapped_column(String(36), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(String(64), nullable=False)
    payload: Mapped[str] = mapped_column(Text, nullable=False)  # JSON

    status: Mapped[str] = mapped_column(String(20), default="pending", index=True)
    tx_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    aptos_sequence_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    retry_count: Mapped[int] = mapped_column(default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    submitted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    confirmed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
