from sqlmodel import SQLModel
from backend.db.session import engine


async def init_db_and_tables():
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)