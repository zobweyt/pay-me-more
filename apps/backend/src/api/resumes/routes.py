from fastapi import APIRouter, status

from src.api.tags import Tag

router = APIRouter(prefix="/resumes", tags=[Tag.RESUMES])


@router.get("", status_code=status.HTTP_200_OK)
async def load_resume() -> None:
    raise NotImplementedError
