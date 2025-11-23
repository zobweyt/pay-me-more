from fastapi import APIRouter, status

from src.api.resumes.queries import ResumeQuerySkillsParamsDepends
from src.api.resumes.schemas import ResumeSkillsResponse
from src.api.resumes.service import ResumeServiceDepends
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.get("", status_code=status.HTTP_200_OK)
async def load_resume() -> None:
    raise NotImplementedError


@router.get("/skills", response_model=ResumeSkillsResponse)
async def get_skills_by_role(
    query_params: ResumeQuerySkillsParamsDepends, service: ResumeServiceDepends
) -> ResumeSkillsResponse:
    return ResumeSkillsResponse(role=query_params.role, skills=await service.get_skills_by_role(query_params.role))
