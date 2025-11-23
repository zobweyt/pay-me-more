import pytest
from fastapi import UploadFile, status
from httpx import AsyncClient

from src.api.resumes.parse.service import ResumeParseService
from src.api.resumes.schemas import OptionalResumes
from src.settings import settings
from tests.utils.deps import override_dependency


class StubResumeParseService:
    def __init__(self, response: OptionalResumes | None) -> None:
        self.response = response
        self.calls = 0

    async def get_parsed_resume_from_pdf_or_none(self, file: UploadFile) -> OptionalResumes | None:
        self.calls += 1
        return self.response


@pytest.mark.anyio
class TestResumeParseEndpoint:
    async def test_parse_resume_success(self, client: AsyncClient) -> None:
        stub = StubResumeParseService(
            OptionalResumes(role="Backend", skills=["python"], experience=3, location="Moscow")
        )
        files = {"file": ("resume.pdf", b"%PDF-1.4\n", "application/pdf")}

        with override_dependency(ResumeParseService, lambda: stub):
            response = await client.post("/resumes/parse/pdf", files=files)

        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {
            "role": "Backend",
            "skills": ["python"],
            "experience": 3,
            "location": "Moscow",
        }
        assert stub.calls == 1

    async def test_parse_resume_too_large(self, client: AsyncClient, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setattr(settings.api, "resume_max_pdf_size", 10)
        files = {"file": ("resume.pdf", b"a" * 11, "application/pdf")}

        response = await client.post("/resumes/parse/pdf", files=files)

        assert response.status_code == status.HTTP_413_REQUEST_ENTITY_TOO_LARGE

    async def test_parse_resume_wrong_media_type(self, client: AsyncClient) -> None:
        files = {"file": ("resume.txt", b"plain content", "text/plain")}

        response = await client.post("/resumes/parse/pdf", files=files)

        assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE

    async def test_parse_resume_service_returns_none(self, client: AsyncClient) -> None:
        stub = StubResumeParseService(None)
        files = {"file": ("resume.pdf", b"%PDF-1.4\n", "application/pdf")}

        with override_dependency(ResumeParseService, lambda: stub):
            response = await client.post("/resumes/parse/pdf", files=files)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
