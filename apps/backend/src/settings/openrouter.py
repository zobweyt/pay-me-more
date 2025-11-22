__all__ = [
    "OpenRouterSettings",
]


from pydantic import BaseModel


class OpenRouterSettings(BaseModel):
    token: str
    model: str
