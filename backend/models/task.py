from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional
import uuid
from datetime import datetime
from enum import Enum


class TaskStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: TaskStatus = Field(default=TaskStatus.PENDING)
    due_date: Optional[datetime] = Field(default=None)
    user_id: str = Field(index=True)  # Reference to Better Auth user ID


class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(SQLModel):
    title: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: TaskStatus = Field(default=TaskStatus.PENDING)
    due_date: Optional[datetime] = Field(default=None)


class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: Optional[TaskStatus] = None
    due_date: Optional[datetime] = None


class TaskPublic(TaskBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class TaskUpdateStatus(SQLModel):
    status: TaskStatus