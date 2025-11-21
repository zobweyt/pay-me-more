from src.api.users.models import User
from src.api.users.repository import UserRepositoryDepends
from src.security import get_password_hash


class CurrentUserService:
    def __init__(self, repository: UserRepositoryDepends) -> None:
        self.repository = repository

    async def update_username(self, user: User, new_username: str) -> None:
        user.username = new_username

        await self.repository.update(user)

    async def update_password(self, user: User, new_password: str) -> None:
        user.password = await get_password_hash(password=new_password)

        await self.repository.update(user)
