from uuid import UUID

from src.api.recommendations.llm_client import LLMClientDepends
from src.api.recommendations.repository import RecommendationsRepositoryDeps
from src.api.recommendations.schemas import LLMResponse
from src.api.resumes.models import Recommendation # type: ignore
from src.api.resumes.schemas import ResumeDTO


class RecommendationsService:
    def __init__(self, llm_client: LLMClientDepends, repo: RecommendationsRepositoryDeps) -> None:
        self.llm_client = llm_client
        self.repo = repo

    async def get_recommendations(self, resume: ResumeDTO, resume_id: UUID | None, save: bool = False) -> LLMResponse:
        llmresponse = await self.llm_client.get_recommendations(resume)
        if save:
            recommendations = [
                Recommendation(resume_id=resume_id, title=rec.title, subtitle=rec.subtitle, result=rec.result)
                for rec in llmresponse.recommendations
            ]
            await self.repo.create_all(recommendations)
        return llmresponse
