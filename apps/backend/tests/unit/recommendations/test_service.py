from unittest.mock import AsyncMock

import pytest

from src.api.recommendations.schemas import LLMResponse, Recommendation
from src.api.recommendations.service import RecommendationsService
from tests.utils.resumes import resume_schema


@pytest.mark.anyio
async def test_recommendations_service_uses_llm_client() -> None:
    resume = resume_schema()
    response = LLMResponse(recommendations=[Recommendation(title="t", subtitle="s", result="r")], quality="good")

    llm_client = AsyncMock()
    llm_client.get_recommendations.return_value = response

    service = RecommendationsService(llm_client=llm_client)
    result = await service.get_recommendations(resume)

    assert result == response
    llm_client.get_recommendations.assert_awaited_once_with(resume)
