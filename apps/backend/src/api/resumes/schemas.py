from typing import List, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from src.api.recommendations.schemas import RecommendationDTO
from src.api.salary_fork.schemas import SalaryDTO


class ResumeDTO(BaseModel):
    request_id: UUID | None
    role: str
    skills: list[str]
    experience: int
    location: str


class OptionalResumes(BaseModel):
    role: Optional[str]
    skills: list[str]
    experience: Optional[int]
    location: Optional[str]


class Experience(BaseModel):
    from_: int = Field(..., alias="from")
    to: int
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)


class Vacancies(BaseModel):
    id: str
    company_name: str
    vacancy_name: str
    experience: Experience
    schedule: str  # пример: "5 на 2", "гибкий", "фиксированный"
    work_hours: int
    salary: SalaryDTO
    location: str
    description: str
    skills: List[str]


class ServiceResponse(BaseModel):
    salary: SalaryDTO
    recommend_vacancies: list[Vacancies] | None
    recommendations: list[RecommendationDTO]


class ResumeAnalyzedResponse(BaseModel):
    request_id: UUID | None = None
    role: str
    experience: int
    location: str
    skills: list[str]

    salary: SalaryDTO | None = None
    quality: Literal["poor", "moderate", "good"] | None = None
    recommendations: list[RecommendationDTO] | None = None


class ResumeSkillsResponse(BaseModel):
    role: str
    skills: list[str]
