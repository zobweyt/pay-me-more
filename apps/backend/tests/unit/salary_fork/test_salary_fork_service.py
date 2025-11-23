from unittest.mock import AsyncMock

import pytest

from src.api.salary_fork.schemas import Salary
from src.api.salary_fork.service import SalaryForkService
from tests.utils.resumes import resume_schema


@pytest.mark.anyio
async def test_calculate_salary_uses_ml_client() -> None:
    resume = resume_schema()
    salary = Salary.model_validate({"from": 120000, "to": 180000})
    ml_client = AsyncMock()
    ml_client.calculate_salary.return_value = salary

    service = SalaryForkService(client=ml_client)
    result = await service.calculate_salary(resume)

    assert result == salary
    ml_client.calculate_salary.assert_awaited_once_with(resume)
