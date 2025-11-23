from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from src.api.resumes.deps import ResumeServiceDeps
from src.api.resumes.queries import ResumeQuerySkillsParamsDepends
from src.api.resumes.schemas import ResumeAnalyzedResponse, ResumeSkillsResponse
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.get("/skills", response_model=ResumeSkillsResponse)
async def get_skills_by_role(
        query_params: ResumeQuerySkillsParamsDepends, service: ResumeServiceDeps
) -> ResumeSkillsResponse:
    return ResumeSkillsResponse(role=query_params.role, skills=await service.get_skills_by_role(query_params.role))


@router.get(
    "/{RequestID}",
    status_code=status.HTTP_200_OK,
    response_model=ResumeAnalyzedResponse,
    responses={status.HTTP_404_NOT_FOUND: dict(description="Resume not found")},
)
async def load_resume(RequestID: UUID, service: ResumeServiceDeps) -> ResumeAnalyzedResponse:
    result = await service.get_by_request_id(RequestID)
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found")
    return result
