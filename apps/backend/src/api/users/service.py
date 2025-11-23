from typing import Sequence
from uuid import UUID

from src.api.users.models import User
from src.api.users.repository import UserRepositoryDepends
from src.api.users.schemas import UserRegistrationRequest
from src.pagination import PaginationSearchParams


class UserService:
    def __init__(self, repository: UserRepositoryDepends) -> None:
        self.repository = repository

    async def get_user_by_id(self, id: str | UUID) -> User | None:
        return await self.repository.get_by_id(id)

    async def get_user_by_username(self, username: str) -> User | None:
        return await self.repository.get_by_username(username)

    async def get_users(self, search_params: PaginationSearchParams | None = None) -> Sequence[User]:
        return await self.repository.get_all(search_params)

    async def create_user(self, args: UserRegistrationRequest) -> User:
        from src.security import get_password_hash

        hashed_password = await get_password_hash(args.password)

        user = User(
            username=args.username,
            password=hashed_password,
        )

        return await self.repository.create(user)

    async def get_users_count(self, search_params: PaginationSearchParams | None = None) -> int:
        return await self.repository.get_count(search_params)
