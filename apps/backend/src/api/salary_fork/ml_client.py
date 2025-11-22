from typing import Annotated

from fastapi import Depends

from src.api.resumes.schemas import Resumes, Salary


class MLClient:
    async def calculate_salary(self, resume: Resumes) -> Salary:
        return Salary(**{"from": 2, "to": 4})


MLClientDepends = Annotated[MLClient, Depends(MLClient)]
