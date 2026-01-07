from typing import Optional
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from backend.db.session import AsyncSessionLocal
from backend.models.user import User, UserCreate
from backend.utils.auth import get_password_hash
from backend.utils.errors import AuthenticationException


class UserService:
    @staticmethod
    async def create_user(user_create: UserCreate) -> User:
        """
        Create a new user in the database with hashed password.

        Args:
            user_create: User creation data containing email and password

        Returns:
            User: The created user object

        Raises:
            AuthenticationException: If user with email already exists
        """
        async with AsyncSessionLocal() as session:
            # Check if user with email already exists
            existing_user_query = select(User).where(User.email == user_create.email)
            result = await session.execute(existing_user_query)
            existing_user = result.scalar_one_or_none()

            if existing_user:
                raise AuthenticationException("User with this email already exists")

            # Hash the password
            hashed_password = get_password_hash(user_create.password)

            # Create new user
            user = User(
                email=user_create.email,
                hashed_password=hashed_password
            )

            session.add(user)
            try:
                await session.commit()
                await session.refresh(user)
                return user
            except IntegrityError:
                await session.rollback()
                raise AuthenticationException("User with this email already exists")

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        """
        Retrieve a user by their email address.

        Args:
            email: The email address to search for

        Returns:
            User: The user object if found, None otherwise
        """
        async with AsyncSessionLocal() as session:
            query = select(User).where(User.email == email)
            result = await session.execute(query)
            user = result.scalar_one_or_none()
            return user

    @staticmethod
    async def get_user_by_id(user_id: str) -> Optional[User]:
        """
        Retrieve a user by their ID.

        Args:
            user_id: The user ID to search for

        Returns:
            User: The user object if found, None otherwise
        """
        async with AsyncSessionLocal() as session:
            query = select(User).where(User.id == user_id)
            result = await session.execute(query)
            user = result.scalar_one_or_none()
            return user