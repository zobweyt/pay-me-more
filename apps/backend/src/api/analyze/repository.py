from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.api.recommendations.schemas import RecommendationDTO
from src.api.resumes.models import Resume
from src.api.resumes.schemas import ResumeAnalyzedResponse
from src.api.salary_fork.schemas import SalaryDTO
from src.db.deps import SessionDepends


class AnalyzerRepository:
    def __init__(self, session: SessionDepends):
        self.session = session

    async def get_analyzed(self, user_id: UUID) -> list[ResumeAnalyzedResponse]:
        query = (
            select(Resume)
            .where(Resume.user_id == user_id)
            .options(
                joinedload(Resume.skills),
                joinedload(Resume.salary),
                joinedload(Resume.recommendation),
            )
            .order_by(Resume.created_at.desc())
        )

        resumes = (await self.session.execute(query)).unique().scalars().all()

        result = []

        for resume in resumes:
            salary_dto = None
            if resume.salary is not None:
                salary_dto = SalaryDTO(from_=resume.salary.from_, to=resume.salary.to)  # type: ignore
            recs_dto = []
            if resume.recommendation is not None:
                recs_dto = [
                    RecommendationDTO(
                        title=r.title,
                        subtitle=r.subtitle,
                        result=r.result,
                    )
                    for r in resume.recommendation
                ]
            result.append(
                ResumeAnalyzedResponse(
                    id=resume.id,
                    request_id=resume.request_id,
                    role=resume.role,
                    experience=resume.experience,
                    location=resume.location,
                    skills=[s.name for s in resume.skills],
                    salary=salary_dto,
                    recommendations=recs_dto,
                )
            )

        return result


AnalyzerRepositoryDeps = Annotated[AnalyzerRepository, Depends(AnalyzerRepository)]
