from typing import Annotated

from fastapi import Depends, Query
from pydantic_settings import BaseSettings

ResumeQueryRole = Annotated[
    str,
    Query(
        title="Role",
    ),
]


class ResumeQuerySkillsParams(BaseSettings):
    role: ResumeQueryRole


def get_resume_skills_query_params(
    role: ResumeQueryRole,
) -> ResumeQuerySkillsParams:
    return ResumeQuerySkillsParams(
        role=role,
    )


ResumeQuerySkillsParamsDepends = Annotated[ResumeQuerySkillsParams, Depends(get_resume_skills_query_params)]
