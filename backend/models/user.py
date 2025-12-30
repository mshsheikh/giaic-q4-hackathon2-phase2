from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime


class UserPublic(SQLModel):
    id: str
    email: str
    name: Optional[str] = None
    created_at: datetime