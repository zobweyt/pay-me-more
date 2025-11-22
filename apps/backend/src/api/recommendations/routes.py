from fastapi import APIRouter, status

from src.api.recommendations.deps import RecommendationsServiceDepends
from src.api.recommendations.schemas import LLMResponse
from src.api.resumes.schemas import Resumes
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.post(
    "/analyze/recommendations",
    status_code=status.HTTP_200_OK,
    response_model=LLMResponse,
)
async def get_recommendations(
    resume: Resumes,
    recommendations_service: RecommendationsServiceDepends,
) -> LLMResponse:
    return await recommendations_service.get_recommendations(resume)
