from uuid import UUID

from src.api.resumes.models import Resume
from src.api.resumes.repository import ResumeRepositoryDeps
from src.api.resumes.schemas import ResumeDTO as ResumeDTO


from typing import Annotated

from fastapi import Depends

from src.api.resumes.role_to_skills.client import RoleToSkillsClientDepends


class ResumeService:
    def __init__(self, repo: ResumeRepositoryDeps, role_to_skills_client: RoleToSkillsClientDepends) -> None:
        self.repo = repo
        self.role_to_skills_client = role_to_skills_client

    async def create_resume(self, user_id: UUID, data: ResumeDTO) -> Resume:
        resume = Resume(
            request_id=data.request_id,
            user_id=user_id,
            role=data.role,
            experience=data.experience,
            location=data.location,
        )
        return await self.repo.create_resume(resume)

    async def get_skills_by_role(self, role: str) -> list[str]:
        return self.role_to_skills_client.get_skills(role)

    async def get_by_request_id(self, request_id: UUID) -> Resume | None:
        return await self.repo.get_by_request_id(request_id)
