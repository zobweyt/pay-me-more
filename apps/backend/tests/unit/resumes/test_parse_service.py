from io import BytesIO
from typing import Any

import pytest
from fastapi import UploadFile

from src.api.resumes.parse.service import ResumeParseService
from src.settings import settings


async def _immediate_to_thread(func: Any, *args: Any, **kwargs: Any) -> Any:
    return func(*args, **kwargs)


def _upload_file() -> UploadFile:
    return UploadFile(filename="resume.pdf", file=BytesIO(b"%PDF-1.4\n"))


@pytest.mark.anyio
async def test_get_parsed_resume_normalizes_values(monkeypatch: pytest.MonkeyPatch) -> None:
    service = ResumeParseService()

    monkeypatch.setattr("src.api.resumes.parse.service.asyncio.to_thread", _immediate_to_thread)
    monkeypatch.setattr(ResumeParseService, "_parse_text_from_pdf", lambda self, file: "pdf")

    async def _fake_parse(self: ResumeParseService, text: str) -> dict[str, Any]:
        return {
            "role": "Engineer",
            "skills": ["python", "python", "fastapi"],
            "experience": 3,
            "location": "Berlin",
        }

    monkeypatch.setattr(ResumeParseService, "_parse_resume_from_pdf", _fake_parse)
    monkeypatch.setattr(settings.api, "resume_skills_max_count", 2)

    resume = await service.get_parsed_resume_from_pdf_or_none(_upload_file())

    assert resume is not None
    assert len(resume.skills) == 2
    assert set(resume.skills).issubset({"python", "fastapi"})
    assert resume.experience == 3
    assert resume.role == "Engineer"


@pytest.mark.anyio
async def test_get_parsed_resume_returns_none_without_text(monkeypatch: pytest.MonkeyPatch) -> None:
    service = ResumeParseService()

    async def _to_thread(func: Any, *args: Any, **kwargs: Any) -> Any:
        return None

    monkeypatch.setattr("src.api.resumes.parse.service.asyncio.to_thread", _to_thread)

    result = await service.get_parsed_resume_from_pdf_or_none(_upload_file())

    assert result is None


@pytest.mark.anyio
async def test_get_parsed_resume_returns_none_without_payload(monkeypatch: pytest.MonkeyPatch) -> None:
    service = ResumeParseService()

    monkeypatch.setattr("src.api.resumes.parse.service.asyncio.to_thread", _immediate_to_thread)
    monkeypatch.setattr(ResumeParseService, "_parse_text_from_pdf", lambda self, file: "pdf")

    async def _fake_parse(self: ResumeParseService, text: str) -> Any:
        return None

    monkeypatch.setattr(ResumeParseService, "_parse_resume_from_pdf", _fake_parse)

    result = await service.get_parsed_resume_from_pdf_or_none(_upload_file())

    assert result is None


@pytest.mark.anyio
async def test_get_parsed_resume_injects_default_skills(monkeypatch: pytest.MonkeyPatch) -> None:
    service = ResumeParseService()

    monkeypatch.setattr("src.api.resumes.parse.service.asyncio.to_thread", _immediate_to_thread)
    monkeypatch.setattr(ResumeParseService, "_parse_text_from_pdf", lambda self, file: "pdf")

    async def _fake_parse(self: ResumeParseService, text: str) -> dict[str, Any]:
        return {
            "role": "Designer",
            "skills": [],
            "experience": None,
            "location": None,
        }

    monkeypatch.setattr(ResumeParseService, "_parse_resume_from_pdf", _fake_parse)

    resume = await service.get_parsed_resume_from_pdf_or_none(_upload_file())

    assert resume is not None
    assert resume.skills == ["Носитель чая и кофе"]


@pytest.mark.anyio
async def test_get_parsed_resume_returns_none_when_empty(monkeypatch: pytest.MonkeyPatch) -> None:
    service = ResumeParseService()

    monkeypatch.setattr("src.api.resumes.parse.service.asyncio.to_thread", _immediate_to_thread)
    monkeypatch.setattr(ResumeParseService, "_parse_text_from_pdf", lambda self, file: "pdf")

    async def _fake_parse(self: ResumeParseService, text: str) -> dict[str, Any]:
        return {
            "role": None,
            "skills": [],
            "experience": None,
            "location": None,
        }

    monkeypatch.setattr(ResumeParseService, "_parse_resume_from_pdf", _fake_parse)

    resume = await service.get_parsed_resume_from_pdf_or_none(_upload_file())

    assert resume is None
