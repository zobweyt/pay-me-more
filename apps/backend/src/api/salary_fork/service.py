from uuid import UUID

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
            await self.repo.create(salary)
        return await self.ml_client.calculate_salary(resume)
