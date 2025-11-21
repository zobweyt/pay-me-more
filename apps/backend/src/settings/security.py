__all__ = [
    "SecuritySettings",
]

from pydantic import BaseModel


class SecuritySettings(BaseModel):
    jwt_algorithm: str
    jwt_expire_minutes: int
    jwt_secret: str
