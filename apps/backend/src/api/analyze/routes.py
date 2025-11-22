from fastapi import APIRouter, status

from src.api.analyze.deps import AnalyzeServiceDeps
from src.api.recommendations.deps import RecommendationsServiceDepends
from src.api.recommendations.schemas import LLMResponse
from src.api.resumes.deps import ResumeServiceDeps
from src.api.resumes.schemas import ResumeAnalyzedResponse, ResumeDTO
from src.api.salary_fork.deps import SalaryForkServiceDepends
from src.api.salary_fork.schemas import SalaryDTO
from src.api.tags import Tag
from src.api.users.me.deps import CurrentUserDepends, CurrentUserOrNoneDepends

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    response_model=list[ResumeAnalyzedResponse],
)
async def load_resume(
    current_user: CurrentUserDepends,
    analyze_service: AnalyzeServiceDeps,
) -> list[ResumeAnalyzedResponse]:
    return await analyze_service.get_resume_analyzed(current_user.id)


@router.post(
    "/analyze/salary_fork",
    status_code=status.HTTP_200_OK,
    response_model=SalaryDTO,
)
async def get_salary_fork(
    resume: ResumeDTO,
    salary_fork_service: SalaryForkServiceDepends,
    current_user: CurrentUserOrNoneDepends,
    resume_service: ResumeServiceDeps,
) -> SalaryDTO:
    if current_user is not None:
        resume_db = await resume_service.get_by_request_id(resume.request_id)
        if resume_db is None:
            resume_db = await resume_service.create_resume(current_user.id, resume)
        return await salary_fork_service.calculate_salary(resume, resume_id=resume_db.id, save=True)
    return await salary_fork_service.calculate_salary(resume, resume_id=None)


@router.post(
    "/analyze/recommendations",
    status_code=status.HTTP_200_OK,
    response_model=LLMResponse,
)
async def get_recommendations(
    resume: ResumeDTO,
    recommendations_service: RecommendationsServiceDepends,
    current_user: CurrentUserOrNoneDepends,
    resume_service: ResumeServiceDeps,
) -> LLMResponse:
    if current_user is not None:
        resume_db = await resume_service.get_by_request_id(resume.request_id)
        if resume_db is None:
            resume_db = await resume_service.create_resume(current_user.id, resume)
        return await recommendations_service.get_recommendations(resume, resume_id=resume_db.id, save=True)
    return await recommendations_service.get_recommendations(resume, resume_id=None)
