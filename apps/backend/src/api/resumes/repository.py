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
        resume = Resume(
            user_id=user_id,
            role=data.role,
            experience=data.experience,
            location=data.location,
        )

        self.session.add(resume)
        # await self.session.flush()

        skills = []
        for skill_name in data.skills:
            skill = await self.session.scalar(select(Skill).where(Skill.name == skill_name))
            if not skill:
                skill = Skill(name=skill_name)
                self.session.add(skill)
                # await self.session.flush()

            skills.append(skill)

        resume.skills = skills

        # Salary
        salary = Salary(resume_id=resume.id, from_=data.salary.from_, to=data.salary.to)
        self.session.add(salary)

        # Recommendations
        for rec in data.recommendations:
            recommendation = Recommendation(
                resume_id=resume.id, title=rec.title, subtitle=rec.subtitle, result=rec.result
            )
            self.session.add(recommendation)

        await self.session.commit()
        await self.session.refresh(resume)

        return resume


ResumeRepositoryDeps = Annotated[ResumeRepository, Depends(ResumeRepository)]
