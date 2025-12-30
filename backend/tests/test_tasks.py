import pytest
from httpx import AsyncClient
from backend.main import app
from backend.models.task import TaskStatus
from backend.services.task_service import TaskService
from backend.db.session import AsyncSessionLocal
from sqlmodel import select
from backend.models.task import Task
import uuid


@pytest.mark.asyncio
async def test_task_crud_operations():
    """Test all task CRUD operations"""
    # Test creating a task
    task_data = {
        "title": "Test Task",
        "description": "Test Description",
        "status": "pending",
        "user_id": str(uuid.uuid4())
    }

    created_task = await TaskService.create_task(task_data, task_data["user_id"])

    assert created_task.title == task_data["title"]
    assert created_task.description == task_data["description"]
    assert created_task.status == TaskStatus.PENDING
    assert created_task.user_id == task_data["user_id"]

    # Test getting the task
    retrieved_task = await TaskService.get_task_by_id(str(created_task.id), task_data["user_id"])
    assert retrieved_task is not None
    assert retrieved_task.id == created_task.id

    # Test updating the task
    update_data = {
        "title": "Updated Task",
        "description": "Updated Description"
    }

    updated_task = await TaskService.update_task(str(created_task.id), update_data, task_data["user_id"])
    assert updated_task is not None
    assert updated_task.title == update_data["title"]
    assert updated_task.description == update_data["description"]

    # Test updating task status
    status_update = {"status": "completed"}
    status_updated_task = await TaskService.update_task_status(str(created_task.id), status_update, task_data["user_id"])
    assert status_updated_task is not None
    assert status_updated_task.status == TaskStatus.COMPLETED

    # Test deleting the task
    deleted = await TaskService.delete_task(str(created_task.id), task_data["user_id"])
    assert deleted is True

    # Verify task is deleted
    deleted_task = await TaskService.get_task_by_id(str(created_task.id), task_data["user_id"])
    assert deleted_task is None


@pytest.mark.asyncio
async def test_user_isolation():
    """Test that users can only access their own tasks"""
    user1_id = str(uuid.uuid4())
    user2_id = str(uuid.uuid4())

    # Create task for user 1
    task_data = {
        "title": "User 1 Task",
        "description": "Task for user 1",
        "status": "pending",
        "user_id": user1_id
    }

    created_task = await TaskService.create_task(task_data, user1_id)
    assert created_task.user_id == user1_id

    # Try to access the task as user 2 (should return None)
    user2_task = await TaskService.get_task_by_id(str(created_task.id), user2_id)
    assert user2_task is None

    # Clean up
    await TaskService.delete_task(str(created_task.id), user1_id)


@pytest.mark.asyncio
async def test_get_tasks_with_filters():
    """Test getting tasks with various filters"""
    user_id = str(uuid.uuid4())

    # Create multiple tasks
    task1_data = {
        "title": "Task 1",
        "description": "Pending task",
        "status": "pending",
        "user_id": user_id
    }

    task2_data = {
        "title": "Task 2",
        "description": "Completed task",
        "status": "completed",
        "user_id": user_id
    }

    task1 = await TaskService.create_task(task1_data, user_id)
    task2 = await TaskService.create_task(task2_data, user_id)

    # Test getting all tasks
    all_tasks = await TaskService.get_tasks(user_id)
    assert len(all_tasks) >= 2

    # Test getting only pending tasks
    pending_tasks = await TaskService.get_tasks(user_id, status_filter=TaskStatus.PENDING)
    pending_count = await TaskService.get_user_tasks_count(user_id, TaskStatus.PENDING)
    assert len(pending_tasks) == pending_count

    # Test getting only completed tasks
    completed_tasks = await TaskService.get_tasks(user_id, status_filter=TaskStatus.COMPLETED)
    completed_count = await TaskService.get_user_tasks_count(user_id, TaskStatus.COMPLETED)
    assert len(completed_tasks) == completed_count

    # Clean up
    await TaskService.delete_task(str(task1.id), user_id)
    await TaskService.delete_task(str(task2.id), user_id)