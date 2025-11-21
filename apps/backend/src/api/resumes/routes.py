from fastapi import APIRouter, status

from src.api.resumes.schemas import Resumes, ServiceResponse
from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.post(
    "",
    status_code=status.HTTP_200_OK,
    response_model=ServiceResponse,
)
async def load_resume(resume: Resumes) -> ServiceResponse:
    raise NotImplementedError
