from uuid import UUID

from fastapi import HTTPException, status

from src.api.resumes.schemas import ResumeDTO
from src.api.salary_fork.ml_client import MLClientDepends
from src.api.salary_fork.models import Salary
from src.api.salary_fork.repository import SalaryRepositoryDeps
from src.api.salary_fork.schemas import SalaryDTO as SalaryDTO


class SalaryForkService:
    def __init__(self, client: MLClientDepends, repo: SalaryRepositoryDeps) -> None:
        self.ml_client = client
        self.repo = repo

    async def calculate_salary(self, resume: ResumeDTO, resume_id: UUID | None, save: bool = False) -> SalaryDTO:
        salary_dto = await self.ml_client.calculate_salary(resume)
        if save:
            salary = Salary(resume_id=resume_id, from_=salary_dto.from_, to=salary_dto.to)
            res = await self.repo.create(salary)
            if not res:
                raise HTTPException(status.HTTP_409_CONFLICT, "Salary already calculated for this request_id")
        return await self.ml_client.calculate_salary(resume)
