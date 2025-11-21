from fastapi import Request
from sqladmin.authentication import AuthenticationBackend

from src.api.users.repository import UserRepository
from src.db.deps import get_session
from src.security import is_valid_password
from src.settings import settings


class AdminAuthenticationBackend(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()

        username = form.get("username")

        if not username:
            return False

        password = form.get("password")

        if not password:
            return False

        async for session in get_session():
            user_repository = UserRepository(session=session)
            user = await user_repository.get_by_username(str(username))

            if not user or not is_valid_password(str(password), user.password) or not user.is_superuser:
                return False

            request.session.update({"username": user.username})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()

        return True

    async def authenticate(self, request: Request) -> bool:
        username = request.session.get("username")

        if not username:
            return False

        async for session in get_session():
            user_repository = UserRepository(session=session)
            user = await user_repository.get_by_username(username)

            if not user or not user.is_superuser:
                return False

        return True


admin_authentication_backend = AdminAuthenticationBackend(secret_key=settings.security.jwt_secret)
