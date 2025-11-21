from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.settings import settings

ENGINE = create_async_engine(
    str(settings.postgres.uri),
    pool_size=settings.postgres.pool_size,
    max_overflow=settings.postgres.max_overflow,
)

SessionLocal = async_sessionmaker(bind=ENGINE, expire_on_commit=False, class_=AsyncSession)
