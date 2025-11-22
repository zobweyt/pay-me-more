from src.api.recommendations.llm_client import LLMClientDepends
from src.api.recommendations.schemas import LLMResponse
from src.api.resumes.schemas import Resumes


class RecommendationsService:
    def __init__(self, llm_client: LLMClientDepends) -> None:
        self.llm_client = llm_client

    async def get_recommendations(self, resume: Resumes) -> LLMResponse:
        return await self.llm_client.get_recommendations(resume)
