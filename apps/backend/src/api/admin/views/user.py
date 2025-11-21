from typing import Any

from sqladmin import ModelView
from sqladmin.filters import BooleanFilter
from starlette.requests import Request
from wtforms import EmailField, PasswordField, TextAreaField
from wtforms.validators import Length, Regexp

from src.api.users.models import User
from src.security import get_password_hash
from src.settings import settings


class UserAdminModelView(ModelView, model=User):
    icon = "fa-solid fa-user"

    column_list = (User.id, User.username, User.is_superuser)

    column_filters = (BooleanFilter(User.is_superuser),)

    column_default_sort = (User.created_at, False)

    column_sortable_list = column_list

    column_searchable_list = (User.id, User.username, User.is_superuser)

    column_details_list = (
        User.id,
        User.username,
        User.is_superuser,
        User.created_at,
        User.updated_at,
    )

    form_include_pk = True

    form_create_rules = [
        "username",
        "password",
    ]

    form_edit_rules = [
        "id",
        "username",
        "is_superuser",
        "created_at",
        "updated_at",
    ]

    form_args = dict(
        username=dict(
            validators=[
                Length(min=settings.api.username_min_length, max=settings.api.username_max_length),
                Regexp(settings.api.username_pattern),
            ]
        ),
        password=dict(
            validators=[
                Length(min=settings.api.password_min_length, max=settings.api.password_max_length),
                Regexp(settings.api.password_pattern),
            ],
        ),
    )

    form_overrides = dict(
        email=EmailField,
        password=PasswordField,
        about=TextAreaField,
    )

    form_widget_args = dict(
        id=dict(readonly=True),
        created_at=dict(readonly=True),
        updated_at=dict(readonly=True),
    )

    async def on_model_change(self, data: dict[str, Any], model: User, is_created: bool, request: Request) -> None:
        if is_created:
            data["password"] = await get_password_hash(data["password"])
