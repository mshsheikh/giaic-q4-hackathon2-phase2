from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)


class User(UserBase, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class UserPublic(SQLModel):
    id: str
    email: str
    created_at: datetime


class UserCreate(SQLModel):
    email: str
    password: str


class UserLogin(SQLModel):
    email: str
    password: str