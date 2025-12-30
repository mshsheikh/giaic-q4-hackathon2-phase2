from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import Optional
from backend.middleware.jwt_middleware import JWTBearer
from backend.utils.errors import AuthenticationException
from backend.utils.auth import create_access_token
import uuid
from datetime import timedelta

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


class UserRegister(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """
    Register a new user account.
    NOTE: In a real implementation, this would create the user in a database.
    For now, this is a placeholder that returns a dummy user and token.
    """
    # In a real implementation, you would:
    # 1. Validate the email format
    # 2. Check if user already exists
    # 3. Hash the password
    # 4. Create the user in the database
    # 5. Generate a JWT token

    # For now, return a mock response that matches the API specification
    user = {
        "id": str(uuid.uuid4()),
        "email": user_data.email,
        "name": user_data.name,
        "created_at": "2025-12-30T18:00:00Z"  # In a real implementation, use actual timestamp
    }

    # Create a token (this would use the user ID in a real implementation)
    token_data = {
        "sub": user["id"],
        "email": user_data.email
    }
    token = create_access_token(
        data=token_data,
        expires_delta=timedelta(minutes=30)
    )

    return {
        "user": user,
        "token": token
    }


@router.post("/login")
async def login(user_data: UserLogin):
    """
    Authenticate user and return JWT token.
    NOTE: In a real implementation, this would verify credentials against a database.
    For now, this is a placeholder that returns a dummy user and token.
    """
    # In a real implementation, you would:
    # 1. Look up the user in the database by email
    # 2. Verify the password hash
    # 3. Generate a JWT token

    # For now, return a mock response that matches the API specification
    user = {
        "id": str(uuid.uuid4()),
        "email": user_data.email,
        "name": f"User {user_data.email.split('@')[0]}",  # Generate a mock name
        "created_at": "2025-12-30T18:00:00Z"  # In a real implementation, use actual timestamp
    }

    # Create a token (this would use the user ID in a real implementation)
    token_data = {
        "sub": user["id"],
        "email": user_data.email
    }
    token = create_access_token(
        data=token_data,
        expires_delta=timedelta(minutes=30)
    )

    return {
        "user": user,
        "token": token
    }


@router.post("/logout")
async def logout(request: Request):
    """
    Terminate user session.
    """
    # In a real implementation, you might add the token to a blacklist/revocation list
    return {"message": "Successfully logged out"}