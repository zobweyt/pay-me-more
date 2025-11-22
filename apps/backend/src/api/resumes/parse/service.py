import asyncio
import json
import re
from typing import Annotated, Any

from fastapi import Depends, UploadFile
from pypdf import PdfReader

from src.api.resumes.parse.llm import client, system_prompt, text_pattern, user_prompt
from src.api.resumes.schemas import OptionalResumes
from src.settings import settings


class ResumeParseService:
    async def get_parsed_resume_from_pdf_or_none(self, file: UploadFile) -> OptionalResumes | None:
        text = await asyncio.to_thread(self._parse_text_from_pdf, file)

        if text is None:
            return None

        raw_resume = await self._parse_resume_from_pdf(text)

        if raw_resume is None:
            return None

        role: str | None = None
        if "role" in raw_resume and raw_resume["role"] is not None:
            role = str(raw_resume["role"])

        skills = list(set(raw_resume.get("skills") or []))[: settings.api.resume_skills_max_count]

        experience: int | None = None
        if "experience" in raw_resume and raw_resume["experience"] is not None:
            experience = int(raw_resume["experience"])

        location: str | None = None
        if "location" in raw_resume and raw_resume["location"] is not None:
            location = str(raw_resume["location"])

        has_value = role is not None or skills or experience is not None or location is not None

        if not has_value:
            return None

        resume = OptionalResumes(
            role=role,
            skills=skills or ["Носитель чая и кофе"],
            experience=experience,
            location=location,
        )

        return resume

    async def _parse_resume_from_pdf(self, text: str) -> Any | None:
        try:
            completion = await client.chat.completions.create(
                model=settings.openrouter.model,
                messages=[
                    dict(role="system", content=system_prompt),
                    dict(role="user", content=user_prompt % text),
                ],
            )
        except Exception:
            return None
        content = completion.choices[0].message.content
        if content is None:
            return None
        json_text_match = re.search(text_pattern, content)
        if json_text_match:
            json_text = json_text_match.group(0)
            try:
                return json.loads(json_text)
            except json.JSONDecodeError:
                return None
        else:
            return None

    def _parse_text_from_pdf(self, file: UploadFile) -> str | None:
        reader = PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text


def _safe(cls: Any, value: Any) -> Any:
    try:
        return cls(value)
    except Exception:
        return None


def _safe_from_dict(cls: Any, value: dict[Any, Any]) -> Any:
    try:
        return cls(**value)
    except Exception:
        return None


ResumeParseServiceDepends = Annotated[ResumeParseService, Depends(ResumeParseService)]
