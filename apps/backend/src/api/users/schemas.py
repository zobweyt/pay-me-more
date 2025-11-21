from datetime import datetime

from pydantic import UUID4, BaseModel

from src.api.users.fields import Password, Username
from src.pagination import PaginationResponse


class UserUsernameRequest(BaseModel):
    """Represents the user username request details."""

    username: Username


class UserUpdatePasswordRequest(BaseModel):
    """Represents the user password request details."""

    old_password: Password
    new_password: Password


class UserRegistrationRequest(BaseModel):
    """Represents the user registration details."""

    username: Username
    password: Password


class UserResponse(BaseModel):
    """Represents the public response data for a user."""

    id: UUID4
    username: Username
    created_at: datetime
    updated_at: datetime


class UsersPaginationResponse(BaseModel):
    """Represents the public response data for a list of users."""

    users: list[UserResponse]
    pagination: PaginationResponse
