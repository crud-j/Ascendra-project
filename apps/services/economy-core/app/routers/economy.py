"""
Economy Core API routes.

These endpoints are internal — called only by other Ascendra services via
the service mesh, never directly by the frontend. The API Gateway does not
expose these routes to the public internet.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_session
from app.schemas.economy import (
    XPAwardRequest,
    ReputationChangeRequest,
    SkillCoinMintRequest,
    LedgerBalanceResponse,
    UserEconomySnapshot,
)
from app.services.ledger_service import LedgerService, EconomyIntegrityError
from app.services.balance_service import BalanceService

router = APIRouter(prefix="/economy", tags=["economy"])


@router.post("/xp/award", status_code=status.HTTP_201_CREATED)
async def award_xp(
    req: XPAwardRequest,
    db: AsyncSession = Depends(get_session),
):
    """
    Award XP to a user for a learning or activity event.
    Idempotent: duplicate idempotency_key returns 200 with the existing entry.
    """
    svc = LedgerService(db)
    try:
        entry = await svc.award_xp(req)
    except EconomyIntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)
        )
    return {"id": entry.id, "user_id": entry.user_id, "xp_amount": entry.xp_amount}


@router.post("/reputation/change", status_code=status.HTTP_201_CREATED)
async def change_reputation(
    req: ReputationChangeRequest,
    db: AsyncSession = Depends(get_session),
):
    """
    Apply a reputation delta (positive contribution reward or negative penalty).
    Idempotent.
    """
    svc = LedgerService(db)
    try:
        entry = await svc.change_reputation(req)
    except EconomyIntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)
        )
    return {"id": entry.id, "user_id": entry.user_id, "delta": entry.delta}


@router.post("/skill-coins/mint", status_code=status.HTTP_201_CREATED)
async def mint_skill_coins(
    req: SkillCoinMintRequest,
    db: AsyncSession = Depends(get_session),
):
    """
    Mint or spend Skill Coins.
    Rejects requests if source_event_type is not in the contribution allowlist.
    Idempotent.
    """
    svc = LedgerService(db)
    try:
        entry = await svc.mint_skill_coins(req)
    except EconomyIntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)
        )
    return {
        "id": entry.id,
        "user_id": entry.user_id,
        "amount": entry.amount,
        "entry_type": entry.entry_type,
    }


@router.get("/users/{user_id}/balance", response_model=LedgerBalanceResponse)
async def get_balance(
    user_id: str,
    db: AsyncSession = Depends(get_session),
):
    """
    Return the current economy balances for a user, derived from ledger sums.
    No mutable balance total is authoritative (ADR-001).
    """
    svc = BalanceService(db)
    return await svc.get_balance(user_id)


@router.get("/users/{user_id}/snapshot", response_model=UserEconomySnapshot)
async def get_snapshot(
    user_id: str,
    db: AsyncSession = Depends(get_session),
):
    """Full economy snapshot for the user profile / economy bar in the frontend."""
    svc = BalanceService(db)
    return await svc.get_snapshot(user_id)
