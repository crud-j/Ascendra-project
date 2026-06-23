"""Auth service business logic."""

import hashlib
import uuid
from datetime import datetime, timezone, timedelta

import structlog
from fastapi import HTTPException, status
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.user import User, RefreshToken
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    RefreshRequest,
    UserResponse,
)

logger = structlog.get_logger()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def register(self, req: RegisterRequest) -> UserResponse:
        # Check uniqueness
        existing = await self._db.scalar(
            select(User).where(
                (User.email == req.email) | (User.username == req.username)
            )
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email or username already registered.",
            )

        user = User(
            id=str(uuid.uuid4()),
            email=req.email,
            username=req.username,
            hashed_password=pwd_context.hash(req.password),
            display_name=req.display_name,
            role="learner",
        )
        self._db.add(user)
        await self._db.flush()

        logger.info("user_registered", user_id=user.id, email=user.email)
        return UserResponse.model_validate(user)

    async def login(self, req: LoginRequest) -> TokenResponse:
        user = await self._db.scalar(
            select(User).where(User.email == req.email)
        )
        if not user or not pwd_context.verify(req.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials.",
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated.",
            )

        access_token, refresh_token = await self._issue_tokens(user)
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    async def refresh(self, req: RefreshRequest) -> TokenResponse:
        token_hash = hashlib.sha256(req.refresh_token.encode()).hexdigest()
        stored = await self._db.scalar(
            select(RefreshToken).where(
                RefreshToken.token_hash == token_hash,
                RefreshToken.revoked == False,  # noqa: E712
            )
        )
        if not stored or stored.expires_at < datetime.now(timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token.",
            )

        # Rotate: revoke old, issue new
        stored.revoked = True
        user = await self._db.get(User, stored.user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

        access_token, new_refresh = await self._issue_tokens(user)
        return TokenResponse(
            access_token=access_token,
            refresh_token=new_refresh,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    async def logout(self, req: RefreshRequest) -> None:
        token_hash = hashlib.sha256(req.refresh_token.encode()).hexdigest()
        stored = await self._db.scalar(
            select(RefreshToken).where(RefreshToken.token_hash == token_hash)
        )
        if stored:
            stored.revoked = True

    async def _issue_tokens(self, user: User) -> tuple[str, str]:
        now = datetime.now(timezone.utc)

        access_payload = {
            "sub": user.id,
            "email": user.email,
            "role": user.role,
            "iat": now,
            "exp": now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        }
        access_token = jwt.encode(
            access_payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM
        )

        raw_refresh = str(uuid.uuid4())
        token_hash = hashlib.sha256(raw_refresh.encode()).hexdigest()
        expires_at = now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        refresh_record = RefreshToken(
            id=str(uuid.uuid4()),
            user_id=user.id,
            token_hash=token_hash,
            expires_at=expires_at,
        )
        self._db.add(refresh_record)
        await self._db.flush()

        return access_token, raw_refresh
