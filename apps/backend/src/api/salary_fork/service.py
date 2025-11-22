from src.api.resumes.schemas import Resumes, Salary
from src.api.salary_fork.ml_client import MLClientDepends


class SalaryForkService:
    def __init__(self, client: MLClientDepends) -> None:
        self.ml_client = client

    async def calculate_salary(self, resume: Resumes) -> Salary:
        return await self.ml_client.calculate_salary(resume)
