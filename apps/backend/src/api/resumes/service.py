from uuid import UUID

from src.api.resumes.models import Resume
from src.api.resumes.repository import ResumeRepositoryDeps
from src.api.resumes.schemas import ResumeDTO as ResumeDTO


class ResumeService:
    def __init__(self, repo: ResumeRepositoryDeps):
        self.repo = repo

    async def create_resume(self, user_id: UUID, data: ResumeDTO) -> Resume:
        resume = Resume(
            request_id=data.request_id,
            user_id=user_id,
            role=data.role,
            experience=data.experience,
            location=data.location,
        )
        return await self.repo.create_resume(resume)

    async def get_by_request_id(self, request_id: UUID) -> Resume | None:
        return await self.repo.get_by_request_id(request_id)
