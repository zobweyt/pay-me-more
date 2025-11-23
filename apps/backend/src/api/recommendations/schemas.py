from typing import Literal

from pydantic import BaseModel


class RecommendationDTO(BaseModel):
    title: str
    subtitle: str
    result: str


class LLMResponse(BaseModel):
    recommendations: list[RecommendationDTO]
    quality: Literal["poor", "moderate", "good"]
