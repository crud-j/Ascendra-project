import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers.courses import router as courses_router

logger = structlog.get_logger()

app = FastAPI(
    title=f"Ascendra {settings.SERVICE_NAME}",
    version="0.1.0",
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

app.include_router(courses_router)


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("service_starting", service=settings.SERVICE_NAME)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    logger.info("service_stopping", service=settings.SERVICE_NAME)


@app.get("/health", tags=["ops"])
async def health():
    return {"status": "ok", "service": settings.SERVICE_NAME}
