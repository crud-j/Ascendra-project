from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db


async def get_session(db: AsyncSession = Depends(get_db)) -> AsyncSession:
    """Re-exported dependency for use in routers."""
    return db

