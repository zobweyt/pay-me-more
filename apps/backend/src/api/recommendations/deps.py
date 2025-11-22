from typing import Annotated

from fastapi import Depends

from src.api.recommendations.service import RecommendationsService

RecommendationsServiceDepends = Annotated[RecommendationsService, Depends(RecommendationsService)]
