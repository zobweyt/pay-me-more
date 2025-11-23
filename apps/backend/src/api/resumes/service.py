from typing import Annotated

from fastapi import Depends

from src.api.resumes.role_to_skills.client import RoleToSkillsClientDepends


class ResumeService:
    def __init__(self, role_to_skills_client: RoleToSkillsClientDepends) -> None:
        self.role_to_skills_client = role_to_skills_client

    async def get_skills_by_role(self, role: str) -> list[str]:
        return self.role_to_skills_client.get_skills(role)


ResumeServiceDepends = Annotated[ResumeService, Depends(ResumeService)]
