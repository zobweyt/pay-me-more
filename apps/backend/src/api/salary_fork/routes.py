from fastapi import APIRouter, status

from src.api.resumes.schemas import Resumes
from src.api.salary_fork.deps import SalaryForkServiceDepends
from src.api.salary_fork.schemas import Salary
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.post(
    "/analyze/salary_fork",
    status_code=status.HTTP_200_OK,
    response_model=Salary,
)
async def get_salary_fork(
    resume: Resumes,
    salary_fork_service: SalaryForkServiceDepends,
) -> Salary:
    return await salary_fork_service.calculate_salary(resume)
