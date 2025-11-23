import pytest
from fastapi import status
from httpx import AsyncClient

from src.api.recommendations.schemas import LLMResponse, RecommendationDTO
from src.api.recommendations.service import RecommendationsService
from src.api.resumes.schemas import ResumeDTO
from tests.utils.deps import override_dependency
from tests.utils.resumes import resume_payload


class StubRecommendationsService:
    def __init__(self, response: LLMResponse) -> None:
        self.response = response
        self.records: list[ResumeDTO] = []

    async def get_recommendations(self, resume: ResumeDTO) -> LLMResponse:
        self.records.append(resume)
        return self.response


@pytest.mark.anyio
class TestRecommendationsEndpoint:
    async def test_get_recommendations_success(self, client: AsyncClient) -> None:
        recommendations = [RecommendationDTO(title="Skills", subtitle="Add FastAPI", result="Improves ATS score")]
        stub = StubRecommendationsService(LLMResponse(recommendations=recommendations, quality="good"))

        with override_dependency(RecommendationsService, lambda: stub):
            response = await client.post("/resumes/analyze/recommendations", json=resume_payload())

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {
            "quality": "good",
            "recommendations": [
                {"title": "Skills", "subtitle": "Add FastAPI", "result": "Improves ATS score"},
            ],
        }
        assert len(stub.records) == 1
        assert stub.records[0].skills == ["python", "fastapi"]

    async def test_get_recommendations_invalid_payload(self, client: AsyncClient) -> None:
        payload = resume_payload()
        payload.pop("experience")

        response = await client.post("/resumes/analyze/recommendations", json=payload)

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
