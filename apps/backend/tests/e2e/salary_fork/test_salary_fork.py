import pytest
from fastapi import status
from httpx import AsyncClient

from src.api.resumes.schemas import Resumes
from src.api.salary_fork.schemas import Salary
from src.api.salary_fork.service import SalaryForkService
from tests.utils.deps import override_dependency
from tests.utils.resumes import resume_payload


class StubSalaryForkService:
    def __init__(self, salary: Salary) -> None:
        self.salary = salary
        self.records: list[Resumes] = []

    async def calculate_salary(self, resume: Resumes) -> Salary:
        self.records.append(resume)
        return self.salary


@pytest.mark.anyio
class TestSalaryForkEndpoint:
    async def test_salary_fork_success(self, client: AsyncClient) -> None:
        stub = StubSalaryForkService(Salary.model_validate({"from": 150000, "to": 250000}))

        with override_dependency(SalaryForkService, lambda: stub):
            response = await client.post("/resumes/analyze/salary_fork", json=resume_payload())

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"from": 150000, "to": 250000}
        assert len(stub.records) == 1
        assert stub.records[0].role == "Backend Developer"

    async def test_salary_fork_invalid_payload(self, client: AsyncClient) -> None:
        payload = resume_payload()
        payload.pop("skills")

        response = await client.post("/resumes/analyze/salary_fork", json=payload)

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
