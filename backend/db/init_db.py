from sqlmodel import SQLModel
from db.session import engine
from models.user import User  # Import User model to register it with SQLModel
from models.task import Task  # Import Task model to register it with SQLModel


async def init_db_and_tables():
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)