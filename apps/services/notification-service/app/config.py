from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERVICE_NAME: str = "notification-service"
    DEBUG: bool = False
    DATABASE_URL: str = "postgresql+asyncpg://ascendra:ascendra@localhost:5432/notification_db"
    REDIS_URL: str = "redis://localhost:6379"
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    SECRET_KEY: str = "change-me-in-production"
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "noreply@ascendra.io"
    FIREBASE_CREDENTIALS_JSON: str = "./firebase-service-account.json"

    class Config:
        env_file = ".env"


settings = Settings()
