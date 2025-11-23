from typing import Any

from src.api.resumes.schemas import Resumes


def resume_payload(**overrides: Any) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "role": "Backend Developer",
        "skills": ["python", "fastapi"],
        "experience": 5,
        "location": "Moscow",
    }
    payload.update(overrides)
    return payload


def resume_schema(**overrides: Any) -> Resumes:
    return Resumes(**resume_payload(**overrides))
