from fastapi import APIRouter, HTTPException, UploadFile, status

from src.api.resumes.parse.service import ResumeParseServiceDepends
from src.api.resumes.parse.validators import is_pdf, is_size_in_range
from src.api.resumes.schemas import OptionalResumes
from src.settings import settings

router = APIRouter(prefix="/parse")


@router.post(
    "/pdf",
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_400_BAD_REQUEST: dict(
            description="Failed to parse resume",
        ),
        status.HTTP_413_REQUEST_ENTITY_TOO_LARGE: dict(
            description="File size exceeded maximum resume size",
        ),
        status.HTTP_415_UNSUPPORTED_MEDIA_TYPE: dict(
            description="File type must be application/pdf",
        ),
    },
)
async def parse_resume_from_pdf(
    file: UploadFile,
    service: ResumeParseServiceDepends,
) -> OptionalResumes:
    if not is_size_in_range(file.file, max_size=settings.api.resume_max_pdf_size):
        mb = settings.api.resume_max_pdf_size / (1024**2)
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            f"File size exceeded maximum resume size: {mb} MB.",
        )

    if not is_pdf(file.content_type):
        raise HTTPException(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            "File type must be application/pdf",
        )

    resume = await service.get_parsed_resume_from_pdf_or_none(file)

    if resume is None:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Failed to parse resume from PDF.")

    return resume
