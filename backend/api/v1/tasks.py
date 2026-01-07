from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlmodel import Session
from db.session import get_async_session
from models.task import Task, TaskCreate, TaskUpdate, TaskPublic, TaskUpdateStatus, TaskStatus
from services.task_service import TaskService
from middleware.jwt_middleware import JWTBearer
from utils.errors import ValidationError, UnauthorizedTaskAccessException, TaskNotFoundException

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    dependencies=[Depends(JWTBearer())],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=dict)
async def get_tasks(
    request: Request,
    status_filter: Optional[TaskStatus] = Query(None, description="Filter by task status"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("created_at", description="Sort by field"),
    order: str = Query("desc", description="Sort order"),
):
    """
    Retrieve user's tasks with optional filtering and pagination.
    """
    # Get user_id from request state (set by JWT middleware)
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in request"
        )

    skip = (page - 1) * limit
    tasks = await TaskService.get_tasks(
        user_id=user_id,
        status_filter=status_filter,
        skip=skip,
        limit=limit,
        sort_by=sort_by,
        order=order
    )

    total_count = await TaskService.get_user_tasks_count(user_id, status_filter)
    total_pages = (total_count + limit - 1) // limit

    return {
        "tasks": tasks,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total_count,
            "pages": total_pages
        }
    }


@router.post("/", response_model=TaskPublic, status_code=status.HTTP_201_CREATED)
async def create_task(
    request: Request,
    task_create: TaskCreate,
):
    """
    Create a new task for the authenticated user.
    """
    try:
        # Log the request for debugging
        print(f"DEBUG: Received create_task request - Title: {task_create.title}, User ID: {getattr(request.state, 'user_id', 'None')}")

        # Get user_id from request state (set by JWT middleware)
        user_id = getattr(request.state, "user_id", None)
        if not user_id:
            print(f"DEBUG: No user_id found in request state - authentication failed")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required. Please log in and try again."
            )

        # Validate input data
        if len(task_create.title) < 1 or len(task_create.title) > 100:
            print(f"DEBUG: Invalid title length - received: {len(task_create.title) if task_create.title else 0}")
            raise ValidationError("Title must be between 1 and 100 characters")

        if task_create.description and len(task_create.description) > 1000:
            print(f"DEBUG: Invalid description length - received: {len(task_create.description) if task_create.description else 0}")
            raise ValidationError("Description must be less than 1000 characters")

        # Attempt to create the task
        result = await TaskService.create_task(task_create, user_id)
        print(f"DEBUG: Task created successfully - ID: {result.id}")
        return result

    except ValidationError as ve:
        print(f"DEBUG: Validation error in create_task: {str(ve)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        print(f"DEBUG: HTTP exception in create_task: {getattr(request.state, 'user_id', 'None')}")
        raise
    except Exception as e:
        print(f"DEBUG: Unexpected error in create_task: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create task: {str(e)}"
        )


@router.get("/{task_id}", response_model=TaskPublic)
async def get_task(
    request: Request,
    task_id: str,
):
    """
    Retrieve a specific task for the authenticated user.
    """
    # Get user_id from request state (set by JWT middleware)
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in request"
        )

    task = await TaskService.get_task_by_id(task_id, user_id)
    if not task:
        raise UnauthorizedTaskAccessException(task_id, user_id)

    return task


@router.put("/{task_id}", response_model=TaskPublic)
async def update_task(
    request: Request,
    task_id: str,
    task_update: TaskUpdate,
):
    """
    Update a specific task for the authenticated user.
    """
    # Get user_id from request state (set by JWT middleware)
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in request"
        )

    # Validate input data if provided
    if task_update.title and (len(task_update.title) < 1 or len(task_update.title) > 100):
        raise ValidationError("Title must be between 1 and 100 characters")

    if task_update.description and len(task_update.description) > 1000:
        raise ValidationError("Description must be less than 1000 characters")

    updated_task = await TaskService.update_task(task_id, task_update, user_id)
    if not updated_task:
        raise UnauthorizedTaskAccessException(task_id, user_id)

    return updated_task


@router.patch("/{task_id}/status", response_model=TaskPublic)
async def update_task_status(
    request: Request,
    task_id: str,
    task_update_status: TaskUpdateStatus,
):
    """
    Update only the status of a specific task.
    """
    # Get user_id from request state (set by JWT middleware)
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in request"
        )

    updated_task = await TaskService.update_task_status(task_id, task_update_status, user_id)
    if not updated_task:
        raise UnauthorizedTaskAccessException(task_id, user_id)

    return updated_task


@router.delete("/{task_id}")
async def delete_task(
    request: Request,
    task_id: str,
):
    """
    Delete a specific task for the authenticated user.
    """
    # Get user_id from request state (set by JWT middleware)
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in request"
        )

    deleted = await TaskService.delete_task(task_id, user_id)
    if not deleted:
        raise UnauthorizedTaskAccessException(task_id, user_id)

    return {"message": "Task deleted successfully"}