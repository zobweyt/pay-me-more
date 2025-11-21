from typing import Annotated

from pydantic import Field, StringConstraints

from src.settings import settings

Username = Annotated[
    str,
    StringConstraints(
        strict=True,
        strip_whitespace=True,
        min_length=settings.api.username_min_length,
        max_length=settings.api.username_max_length,
        pattern=settings.api.username_pattern,
    ),
    Field(
        examples=["username"],
    ),
]

Password = Annotated[
    str,
    StringConstraints(
        strict=True,
        strip_whitespace=True,
        min_length=settings.api.password_min_length,
        max_length=settings.api.password_max_length,
        pattern=settings.api.password_pattern,
    ),
    Field(
        examples=["password"],
    ),
]
