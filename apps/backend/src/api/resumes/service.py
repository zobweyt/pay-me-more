from uuid import UUID

from src.api.resumes.repository import ResumeRepositoryDeps
from src.api.resumes.schemas import ResumeCreateDTO

from src.api.resumes.models import Resume


class ResumeService:
    def __init__(self, repo: ResumeRepositoryDeps):
        self.repo = repo

    async def create_resume(self, user_id: UUID, data: ResumeCreateDTO) -> Resume:
        return await self.repo.create_resume(user_id, data)
