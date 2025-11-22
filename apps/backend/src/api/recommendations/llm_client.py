from typing import Annotated

from fastapi import Depends

from src.api.resumes.schemas import Recommendation, Resumes


class LLMClient:
    async def get_recommendations(self, resume: Resumes) -> list[Recommendation]:
        return [
            Recommendation(title="Добавьте Python", subtitle="Навык", result="Повысит зарплату"),
            Recommendation(title="Опыт 5+ лет", subtitle="Опыт", result="Повысит вилку"),
        ]


LLMClientDepends = Annotated[LLMClient, Depends(LLMClient)]
