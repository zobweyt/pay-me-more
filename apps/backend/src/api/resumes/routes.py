from fastapi import APIRouter, status

from src.api.recommendations.deps import RecommendationsServiceDepends
from src.api.resumes.deps import ResumeServiceDeps
from src.api.resumes.schemas import ResumeCreateDTO, Resumes, ServiceResponse
from src.api.salary_fork.deps import SalaryForkServiceDepends
from src.api.tags import Tag
from src.api.users.me.deps import CurrentUserDepends

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
    current_user: CurrentUserDepends,
    resumes_service: ResumeServiceDeps,
) -> ServiceResponse:
    salary = await salary_fork_service.calculate_salary(resume)
    recommendations = await recommendations_service.get_recommendations(resume)
    resume_to_create = ResumeCreateDTO(
        role=resume.role,
        experience=resume.experience,
        location=resume.location,
        skills=resume.skills,
        salary=salary,
        recommendations=recommendations,
    )
    await resumes_service.create_resume(current_user.id, resume_to_create)
    return ServiceResponse(salary=salary, recommendations=recommendations, recommend_vacancies=None)
