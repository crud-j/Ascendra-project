from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERVICE_NAME: str = "learning-service"
    DEBUG: bool = False
    DATABASE_URL: str = "postgresql+asyncpg://ascendra:ascendra@localhost:5432/learning_db"
    REDIS_URL: str = "redis://localhost:6379"
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    SECRET_KEY: str = "change-me-in-production"

    class Config:
        env_file = ".env"


settings = Settings()
