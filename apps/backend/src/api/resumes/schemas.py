from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class Resumes(BaseModel):
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


class Salary(BaseModel):
    from_: int = Field(..., alias="from")
    to: int


class Vacancies(BaseModel):
    id: str
    company_name: str
    vacancy_name: str
    experience: Experience
    schedule: str  # пример: "5 на 2", "гибкий", "фиксированный"
    work_hours: int
    salary: Salary
    location: str
    description: str
    skills: List[str]


class Recommendation(BaseModel):
    title: str
    subtitle: str
    result: str


class LLMResponse(BaseModel):
    recommendations: list[Recommendation]
    quality: Literal["poor", "moderate", "good"]


class ServiceResponse(BaseModel):
    salary: Salary
    recommend_vacancies: list[Vacancies] | None
    quality: Literal["poor", "moderate", "good"]
    recommendations: list[Recommendation]
