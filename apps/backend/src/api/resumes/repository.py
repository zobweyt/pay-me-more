from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.api.recommendations.schemas import RecommendationDTO
from src.api.resumes.models import Resume, Skill
from src.api.resumes.schemas import ResumeAnalyzedResponse
from src.api.salary_fork.schemas import SalaryDTO
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

    async def get_by_request_id(self, request_id: UUID) -> ResumeAnalyzedResponse | None:
        query = (
            select(Resume)
            .where(Resume.request_id == request_id)
            .options(
                joinedload(Resume.skills),
                joinedload(Resume.salary),
                joinedload(Resume.recommendation),
            )
        )
        resume = (await self.session.execute(query)).unique().scalar_one_or_none()

        if not resume:
            return None

        salary_dto = None
        if resume.salary is not None:
            salary_dto = SalaryDTO(
                from_=resume.salary.from_,  # type: ignore
                to=resume.salary.to,
            )

        recs_dto = []
        if resume.recommendation:
            recs_dto = [
                RecommendationDTO(title=r.title, subtitle=r.subtitle, result=r.result) for r in resume.recommendation
            ]

        return ResumeAnalyzedResponse(
            request_id=resume.request_id,
            role=resume.role,
            experience=resume.experience,
            location=resume.location,
            skills=[s.name for s in resume.skills],
            salary=salary_dto,
            recommendations=recs_dto,
        )


ResumeRepositoryDeps = Annotated[ResumeRepository, Depends(ResumeRepository)]
