from typing import Annotated

from fastapi import Depends

from src.api.salary_fork.models import Salary
from src.db.deps import SessionDepends


class SalaryRepository:
    def __init__(self, session: SessionDepends):
        self.session = session

    async def create(self, salary: Salary) -> Salary:
        self.session.add(salary)

        await self.session.commit()
        await self.session.refresh(salary)

        return salary


SalaryRepositoryDeps = Annotated[SalaryRepository, Depends(SalaryRepository)]
