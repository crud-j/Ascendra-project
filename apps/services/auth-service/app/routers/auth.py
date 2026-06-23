"""Auth service API routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_session
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    RefreshRequest,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_session)):
    """Register a new user. Emits user.registered event via outbox."""
    svc = AuthService(db)
    return await svc.register(req)


@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_session)):
    """Authenticate and return access + refresh tokens."""
    svc = AuthService(db)
    return await svc.login(req)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(req: RefreshRequest, db: AsyncSession = Depends(get_session)):
    """Rotate refresh token and return new token pair."""
    svc = AuthService(db)
    return await svc.refresh(req)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(req: RefreshRequest, db: AsyncSession = Depends(get_session)):
    """Revoke a refresh token."""
    svc = AuthService(db)
    await svc.logout(req)


@router.get("/me", response_model=UserResponse)
async def me(db: AsyncSession = Depends(get_session)):
    """Return the current user's profile. JWT validation done at gateway."""
    # In production this reads the user_id from the JWT claim injected by the gateway
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Implement JWT extraction")
