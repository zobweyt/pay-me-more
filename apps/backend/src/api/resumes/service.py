from uuid import UUID

from src.api.resumes.models import Resume
from src.api.resumes.repository import ResumeRepositoryDeps
from src.api.resumes.schemas import ResumeAnalyzed


class ResumeService:
    def __init__(self, repo: ResumeRepositoryDeps):
        self.repo = repo

    async def create_resume(self, user_id: UUID, data: ResumeAnalyzed) -> Resume:
        return await self.repo.create_resume(user_id, data)

    async def get_resume_analyzed(self, user_id: UUID) -> list[ResumeAnalyzed]:
        return await self.repo.get_analyzed(user_id)
