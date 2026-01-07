from fastapi import APIRouter, HTTPException, status
from pydantic import EmailStr
import re
from services.user_service import UserService
from models.user import UserCreate, UserLogin, UserPublic
from utils.auth import create_access_token, verify_password
from utils.errors import AuthenticationException
from datetime import timedelta

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


def validate_email_format(email: str) -> bool:
    """Validate email format using regex."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_password_strength(password: str) -> bool:
    """Validate password strength - minimum 6 characters."""
    return len(password) >= 6


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_create: UserCreate):
    """
    Register a new user account.

    Args:
        user_create: User creation data containing email and password

    Returns:
        dict: User data and JWT token

    Raises:
        HTTPException: If email format is invalid, password is weak, or user already exists
    """
    # Validate email format
    if not validate_email_format(user_create.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )

    # Validate password strength
    if not validate_password_strength(user_create.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters long"
        )

    try:
        # Create user using the service
        user = await UserService.create_user(user_create)

        # Create JWT token for the new user
        token_data = {
            "sub": user.id,
            "email": user.email
        }
        token = create_access_token(
            data=token_data,
            expires_delta=timedelta(minutes=30)
        )

        # Return user data and token
        user_public = UserPublic(id=user.id, email=user.email, created_at=user.created_at)
        return {
            "user": user_public,
            "token": token
        }
    except AuthenticationException as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed due to server error"
        )


@router.post("/login")
async def login(user_login: UserLogin):
    """
    Authenticate user and return JWT token.

    Args:
        user_login: User login data containing email and password

    Returns:
        dict: User data and JWT token

    Raises:
        HTTPException: If credentials are invalid or user doesn't exist
    """
    try:
        # Validate email format
        if not validate_email_format(user_login.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )

        # Validate password strength
        if not validate_password_strength(user_login.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid credentials"
            )

        # Retrieve user from database
        user = await UserService.get_user_by_email(user_login.email)

        # Check if user exists and password is correct
        if not user or not verify_password(user_login.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create JWT token for authenticated user
        token_data = {
            "sub": user.id,
            "email": user.email
        }
        token = create_access_token(
            data=token_data,
            expires_delta=timedelta(minutes=30)
        )

        # Return user data and token
        user_public = UserPublic(id=user.id, email=user.email, created_at=user.created_at)
        return {
            "user": user_public,
            "token": token
        }
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed due to server error"
        )


@router.post("/logout")
async def logout():
    """
    Terminate user session.
    """
    # In a real implementation, you might add the token to a blacklist/revocation list
    return {"message": "Successfully logged out"}