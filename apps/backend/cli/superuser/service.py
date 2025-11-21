from typer import colors, secho

from src.api.users.models import User
from src.api.users.repository import UserRepository
from src.db.deps import get_session
from src.security import get_password_hash


async def create_superuser(
    username: str,
    password: str,
) -> None:
    async for session in get_session():
        user_repository = UserRepository(session=session)

        if await user_repository.get_by_username(username):
            return secho(f"Пользователь с именем '{username}' уже существует.", fg=colors.RED)

        user = User(
            username=username,
            password=await get_password_hash(password),
            is_superuser=True,
        )

        try:
            await user_repository.create(user)

            secho(f"Супер-пользователь с именем '{username}' успешно создан.", fg=colors.GREEN)
        except Exception as exception:
            secho(f"Не удалось создать супер-пользователя с именем '{username}':\n\n{exception}", fg=colors.RED)
