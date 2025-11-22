from typing import Literal

from pydantic import BaseModel


class Recommendation(BaseModel):
    title: str
    subtitle: str
    result: str


class LLMResponse(BaseModel):
    recommendations: list[Recommendation]
    quality: Literal["poor", "moderate", "good"]
