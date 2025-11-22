from typing import Any

from typer import colors, secho

from src.api.users.models import User
from src.api.users.repository import UserRepository
from src.db.deps import get_session
from src.security import get_password_hash

users: list[dict[Any, Any]] = [
    dict(
        username="vasya",
    ),
    dict(
        username="petya",
    ),
    dict(
        username="megazord",
    ),
]


async def populate_users() -> None:
    async for session in get_session():
        user_repository = UserRepository(session=session)

        for user_data in users:
            if await user_repository.get_by_username(user_data["username"]):
                secho(f"Пользователь с именем '{user_data['username']}' уже существует.", fg=colors.RED)
                continue

            user = User(
                username=user_data["username"],
                password=await get_password_hash("password"),
            )

            try:
                await user_repository.create(user)

                secho(f"Пользователь с именем '{user_data['username']}' успешно создан.", fg=colors.GREEN)
            except Exception as exception:
                secho(
                    f"Не удалось создать пользователя с именем '{user_data['username']}':\n\n{exception}", fg=colors.RED
                )
