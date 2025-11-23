from uuid import UUID

from src.api.analyze.repository import AnalyzerRepositoryDeps
from src.api.resumes.schemas import ResumeAnalyzedResponse


class AnalyzeService:
    def __init__(self, repo: AnalyzerRepositoryDeps) -> None:
        self.repo = repo

    async def get_resume_analyzed(self, user_id: UUID) -> list[ResumeAnalyzedResponse]:
        return await self.repo.get_analyzed(user_id)
