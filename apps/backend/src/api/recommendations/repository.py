from typing import Annotated

from fastapi import Depends

from src.api.recommendations.models import Recommendation
from src.db.deps import SessionDepends


class RecommendationsRepository:
    def __init__(self, session: SessionDepends):
        self.session = session

    async def create(self, recommendation: Recommendation) -> Recommendation:
        self.session.add(recommendation)

        await self.session.commit()
        await self.session.refresh(recommendation)

        return recommendation

    async def create_all(self, recommendations: list[Recommendation]) -> list[Recommendation]:
        self.session.add_all(recommendations)
        await self.session.commit()
        return recommendations


RecommendationsRepositoryDeps = Annotated[RecommendationsRepository, Depends(RecommendationsRepository)]
