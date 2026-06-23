"""
Economy Core — the crown jewel service.

Owns the three append-only ledgers: XP, Reputation, and Skill Coins.
This service is internal-only. The API Gateway never exposes these endpoints
to the public internet. Only trusted services call in.

Key invariants enforced here:
- Skill Coins are minted only from validated contribution events.
- XP, Reputation, and Skill Coins never convert into one another.
- All balance reads are derived from ledger history; no mutable totals.
- Every ledger write is accompanied by a transactional outbox event.
- Under failure, operations fail closed — reject over risk incorrect write.
"""

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers.economy import router as economy_router

logger = structlog.get_logger()

app = FastAPI(
    title="Ascendra Economy Core",
    version="0.1.0",
    description=(
        "Internal ledger service. Manages XP, Reputation, and Skill Coin "
        "append-only ledgers. Not exposed to the public internet."
    ),
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(economy_router)


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("economy_core_starting", service=settings.SERVICE_NAME)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    logger.info("economy_core_stopping", service=settings.SERVICE_NAME)


@app.get("/health", tags=["ops"])
async def health():
    """Liveness probe."""
    return {"status": "ok", "service": settings.SERVICE_NAME}
