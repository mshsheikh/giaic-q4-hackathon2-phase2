from typing import List, Optional
from sqlmodel import select, and_
from sqlalchemy.exc import IntegrityError
from db.session import AsyncSessionLocal
from models.task import Task, TaskCreate, TaskUpdate, TaskPublic, TaskUpdateStatus, TaskStatus
from core.config import settings
from utils.errors import UnauthorizedTaskAccessException, TaskNotFoundException


class TaskService:
    @staticmethod
    async def get_tasks(user_id: str, status_filter: Optional[TaskStatus] = None,
                       skip: int = 0, limit: int = 100, sort_by: str = "created_at",
                       order: str = "desc") -> List[TaskPublic]:
        async with AsyncSessionLocal() as session:
            # Build query with user_id filter for data isolation
            query = select(Task).where(Task.user_id == user_id)

            # Add status filter if provided
            if status_filter:
                query = query.where(Task.status == status_filter)

            # Add sorting
            if sort_by == "title":
                query = query.order_by(Task.title if order == "asc" else Task.title.desc())
            elif sort_by == "due_date":
                query = query.order_by(Task.due_date if order == "asc" else Task.due_date.desc())
            else:  # default to created_at
                query = query.order_by(Task.created_at if order == "asc" else Task.created_at.desc())

            # Add pagination
            query = query.offset(skip).limit(limit)

            result = await session.execute(query)
            tasks = result.scalars().all()

            # Convert to public model
            return [TaskPublic.model_validate(task) for task in tasks]

    @staticmethod
    async def get_task_by_id(task_id: str, user_id: str) -> Optional[TaskPublic]:
        async with AsyncSessionLocal() as session:
            query = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
            result = await session.execute(query)
            task = result.scalar_one_or_none()

            if task:
                return TaskPublic.model_validate(task)
            return None  # Will be handled by the API layer with proper error

    @staticmethod
    async def create_task(task_create: TaskCreate, user_id: str) -> TaskPublic:
        async with AsyncSessionLocal() as session:
            try:
                # Log the task creation attempt
                print(f"DEBUG: Attempting to create task for user_id: {user_id}")

                # Create task with user_id for ownership
                task = Task(
                    **task_create.dict(),
                    user_id=user_id
                )

                session.add(task)
                await session.commit()
                await session.refresh(task)

                print(f"DEBUG: Successfully created task with ID: {task.id}")
                return TaskPublic.model_validate(task)

            except IntegrityError as e:
                print(f"DEBUG: Database integrity error creating task: {str(e)}")
                await session.rollback()
                raise ValueError(f"Database constraint violation: {str(e)}")

            except Exception as e:
                print(f"DEBUG: Error in TaskService.create_task: {str(e)}")
                await session.rollback()
                raise

    @staticmethod
    async def update_task(task_id: str, task_update: TaskUpdate, user_id: str) -> Optional[TaskPublic]:
        async with AsyncSessionLocal() as session:
            # Get the existing task that belongs to the user
            query = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
            result = await session.execute(query)
            task = result.scalar_one_or_none()

            if not task:
                return None  # Will be handled by the API layer with proper error

            # Update only the fields that are provided
            update_data = task_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(task, field, value)

            # Update the updated_at timestamp
            task.updated_at = task.updated_at.__class__.now()

            session.add(task)
            await session.commit()
            await session.refresh(task)

            return TaskPublic.model_validate(task)

    @staticmethod
    async def update_task_status(task_id: str, task_update_status: TaskUpdateStatus, user_id: str) -> Optional[TaskPublic]:
        async with AsyncSessionLocal() as session:
            # Get the existing task that belongs to the user
            query = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
            result = await session.execute(query)
            task = result.scalar_one_or_none()

            if not task:
                return None  # Will be handled by the API layer with proper error

            # Update the status
            task.status = task_update_status.status
            # Update the updated_at timestamp
            task.updated_at = task.updated_at.__class__.now()

            session.add(task)
            await session.commit()
            await session.refresh(task)

            return TaskPublic.model_validate(task)

    @staticmethod
    async def delete_task(task_id: str, user_id: str) -> bool:
        async with AsyncSessionLocal() as session:
            # Get the existing task that belongs to the user
            query = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
            result = await session.execute(query)
            task = result.scalar_one_or_none()

            if not task:
                return False  # Will be handled by the API layer with proper error

            await session.delete(task)
            await session.commit()
            return True

    @staticmethod
    async def get_user_tasks_count(user_id: str, status_filter: Optional[TaskStatus] = None) -> int:
        async with AsyncSessionLocal() as session:
            query = select(Task).where(Task.user_id == user_id)

            if status_filter:
                query = query.where(Task.status == status_filter)

            result = await session.execute(query)
            tasks = result.scalars().all()
            return len(tasks)