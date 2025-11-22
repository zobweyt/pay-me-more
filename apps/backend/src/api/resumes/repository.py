import uuid
from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select

from src.api.recommendations.models import Recommendation
from src.api.resumes.models import Resume, Skill
from src.api.resumes.schemas import ResumeCreateDTO
from src.api.salary_fork.models import Salary
from src.db.deps import SessionDepends


class ResumeRepository:
    def __init__(self, session: SessionDepends):
        self.session = session

    async def create_resume(self, user_id: UUID, data: ResumeCreateDTO):
        # Resume
        resume_id = uuid.uuid4()
        resume = Resume(
            id=resume_id,
            user_id=user_id,
            role=data.role,
            experience=data.experience,
            location=data.location,
        )
        self.session.add(resume)

        resume.skills = [Skill(name=skill_name) for skill_name in data.skills]
        self.session.add_all(resume.skills)

        # Salary
        salary = Salary(
            resume_id=resume_id,
            from_=data.salary.from_,
            to=data.salary.to
        )
        self.session.add(salary)

        # Recommendations
        recommendations = [
            Recommendation(
                resume_id=resume_id,
                title=rec.title,
                subtitle=rec.subtitle,
                result=rec.result
            ) for rec in data.recommendations
        ]
        self.session.add_all(recommendations)

        await self.session.commit()
        await self.session.refresh(resume)

        return resume


ResumeRepositoryDeps = Annotated[ResumeRepository, Depends(ResumeRepository)]
