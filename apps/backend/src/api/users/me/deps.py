from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status

from src.api.auth.deps import OptionalPasswordBearerDepends, PasswordBearerDepends
from src.api.auth.schemas import JWT
from src.api.users.me.service import CurrentUserService
from src.api.users.models import User
from src.db.deps import SessionDepends
from src.settings import settings


async def get_current_user(session: SessionDepends, raw: PasswordBearerDepends) -> User:
    try:
        data = JWT(**jwt.decode(raw, settings.security.jwt_secret, algorithms=[settings.security.jwt_algorithm]))
    except Exception:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Failed to verify credentials") from None

    user = await session.get(User, data.sub)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    return user


async def get_current_user_or_none(session: SessionDepends, raw: OptionalPasswordBearerDepends) -> User | None:
    return await get_current_user(session, raw) if raw else None


CurrentUserDepends = Annotated[User, Depends(get_current_user)]
CurrentUserOrNoneDepends = Annotated[User | None, Depends(get_current_user_or_none)]
CurrentUserServiceDepends = Annotated[CurrentUserService, Depends(CurrentUserService)]
