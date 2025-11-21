from typing import Annotated

from pydantic import Field, NonNegativeInt, PositiveInt

from src.settings import settings

PaginationSearchParamsQ = Annotated[
    str | None,
    Field(
        default=None,
    ),
]

PaginationSearchParamsLimit = Annotated[
    PositiveInt,
    Field(
        le=settings.api.search_params_max_limit,
        default=settings.api.search_params_max_limit,
    ),
]

PaginationSearchParamsOffset = Annotated[
    NonNegativeInt,
    Field(
        default=0,
    ),
]
