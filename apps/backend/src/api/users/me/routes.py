from fastapi import APIRouter, HTTPException, Response, status

from src.api.users.deps import UserServiceDepends
from src.api.users.me.deps import CurrentUserDepends, CurrentUserServiceDepends
from src.api.users.me.schemas import CurrentUserResponse
from src.api.users.models import User
from src.api.users.schemas import UserUpdatePasswordRequest, UserUsernameRequest
from src.security import is_valid_password

router = APIRouter(prefix="/me")


@router.get(
    "",
    response_model=CurrentUserResponse,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_403_FORBIDDEN: dict(
            description="Failed to verify credentials",
        ),
        status.HTTP_404_NOT_FOUND: dict(
            description="User not found",
        ),
    },
)
async def get_current_user(current_user: CurrentUserDepends) -> User:
    return current_user


@router.patch(
    "/username",
    response_model=CurrentUserResponse,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_200_OK: dict(
            description="Username successfully updated",
        ),
        status.HTTP_403_FORBIDDEN: dict(
            description="Failed to verify credentials",
        ),
        status.HTTP_404_NOT_FOUND: dict(
            description="User not found",
        ),
        status.HTTP_409_CONFLICT: dict(
            description="Username already registered",
        ),
    },
)
async def update_current_user_username(
    args: UserUsernameRequest,
    user_service: UserServiceDepends,
    current_user_service: CurrentUserServiceDepends,
    current_user: CurrentUserDepends,
) -> User:
    user = await user_service.get_user_by_username(args.username)

    if user:
        raise HTTPException(status.HTTP_409_CONFLICT, "Username already registered.")

    await current_user_service.update_username(current_user, args.username)

    return current_user


@router.patch(
    "/password",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_204_NO_CONTENT: dict(
            description="Password successfully updated",
        ),
        status.HTTP_403_FORBIDDEN: dict(
            description="Failed to verify credentials or incorrect password",
        ),
        status.HTTP_404_NOT_FOUND: dict(
            description="User not found",
        ),
    },
)
async def update_current_user_password(
    args: UserUpdatePasswordRequest,
    current_user_service: CurrentUserServiceDepends,
    current_user: CurrentUserDepends,
) -> Response:
    if not is_valid_password(args.old_password, current_user.password):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Incorrect password.")

    await current_user_service.update_password(current_user, args.new_password)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
