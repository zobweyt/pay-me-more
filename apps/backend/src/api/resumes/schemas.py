from typing import List

from pydantic import BaseModel, ConfigDict, Field
from pydantic import BaseModel


class Resumes(BaseModel):
    role: str
    skills: list[str]
    experience: int
    location: str


class Experience(BaseModel):
    from_: int = Field(..., alias="from")
    to: int
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)


class Salary(BaseModel):
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
    salary: Salary
    location: str
    description: str
    skills: List[str]


class Recommendation(BaseModel):
    title: str
    subtitle: str
    result: str


class ServiceResponse(BaseModel):
    salary: Salary
    recommend_vacancies: list[Vacancies] | None
    recommendations: list[Recommendation]


class ResumeAnalyzed(BaseModel):
    role: str
    experience: int
    location: str
    skills: list[str]

    salary: Salary
    recommendations: list[Recommendation]
