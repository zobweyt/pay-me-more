__all__ = [
    "MLSettings",
]


from pydantic import BaseModel


class MLSettings(BaseModel):
    url: str
