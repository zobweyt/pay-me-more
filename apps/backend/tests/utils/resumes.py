# from typing import Any

# from src.api.resumes.schemas import ResumeDTO


# def resume_payload(**overrides: Any) -> dict[str, Any]:
#     payload: dict[str, Any] = {
#         "role": "Backend Developer",
#         "skills": ["python", "fastapi"],
#         "experience": 5,
#         "location": "Moscow",
#     }
#     payload.update(overrides)
#     return payload


# def resume_schema(**overrides: Any) -> ResumeDTO:
#     return ResumeDTO(**resume_payload(**overrides))
# a