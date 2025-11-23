from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select

from src.api.resumes.models import Resume, Skill
from src.db.deps import SessionDepends


class ResumeRepository:
    def __init__(self, session: SessionDepends):
        self.session = session

    async def create_resume(self, resume: Resume, skills: list[Skill]) -> Resume:
        # Resume
        resume.skills.extend(skills)
        self.session.add(resume)
        await self.session.commit()
        await self.session.refresh(resume)

        return resume

    async def get_by_request_id(self, request_id: UUID) -> Resume | None:
        query = select(Resume).where(Resume.request_id == request_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()


ResumeRepositoryDeps = Annotated[ResumeRepository, Depends(ResumeRepository)]
