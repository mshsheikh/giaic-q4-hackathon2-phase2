from fastapi import HTTPException, status
from typing import Optional


class TaskException(HTTPException):
    """Base exception for task-related errors"""
    pass


class TaskNotFoundException(TaskException):
    """Raised when a task is not found"""
    def __init__(self, task_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )


class UnauthorizedTaskAccessException(TaskException):
    """Raised when a user tries to access a task that doesn't belong to them"""
    def __init__(self, task_id: str, user_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,  # Use 404 to prevent user enumeration
            detail=f"Task with id {task_id} not found"
        )


class ValidationError(HTTPException):
    """Raised for validation errors"""
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )


class AuthenticationException(HTTPException):
    """Raised for authentication errors"""
    def __init__(self, detail: str = "Not authenticated"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class AuthorizationException(HTTPException):
    """Raised for authorization errors"""
    def __init__(self, detail: str = "Not authorized"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail
        )