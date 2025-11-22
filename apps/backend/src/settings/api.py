__all__ = [
    "ApiSettings",
]

from re import Pattern

from pydantic import BaseModel, NonNegativeInt, PositiveInt


class ApiSettings(BaseModel):
    token_url: str

    search_params_max_limit: PositiveInt

    username_min_length: NonNegativeInt
    username_max_length: PositiveInt
    username_pattern: Pattern[str]
    password_min_length: NonNegativeInt
    password_max_length: PositiveInt
    password_pattern: Pattern[str]

    resume_max_pdf_size: PositiveInt
    resume_skills_max_count: PositiveInt
