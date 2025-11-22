from fastapi import APIRouter, status

from src.api.recommendations.deps import RecommendationsServiceDepends
from src.api.resumes.schemas import Resumes, ServiceResponse
from src.api.salary_fork.deps import SalaryForkServiceDepends
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.post(
    "/analyze",
    status_code=status.HTTP_200_OK,
    response_model=ServiceResponse,
)
async def load_resume(
    resume: Resumes,
    salary_fork_service: SalaryForkServiceDepends,
    recommendations_service: RecommendationsServiceDepends,
) -> ServiceResponse:
    salary = await salary_fork_service.calculate_salary(resume)
    res = await recommendations_service.get_recommendations(resume)
    recommendations = res.recommendations
    quality = res.quality
    return ServiceResponse(salary=salary, recommendations=recommendations, recommend_vacancies=None, quality=quality)
