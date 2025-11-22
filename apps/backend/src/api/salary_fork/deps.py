from typing import Annotated

from fastapi import Depends

from src.api.salary_fork.service import SalaryForkService

SalaryForkServiceDepends = Annotated[SalaryForkService, Depends(SalaryForkService)]
