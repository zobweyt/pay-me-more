# 1. Слои бизнес-логики (оптимальная архитектура)

## Контроллеры (API endpoints)
- принимают запросы
- валидируют входные данные
- вызывают сервисы

## Сервисы (бизнес-логика) - реализация основных процессов
- расчет зарплаты
- генерация рекомендаций
- импорт резюме
- метрики
- сохранение истории запросов

## Репозитории (доступ к данным)
- работа с БД
- работа с внешними API
- работа с файлами

## Модели (домен) - описывают структуры
- Resume
- Vacancy
- Recommendation
- User
- Metrics

# 2. Доменные процессы (основные бизнес-сценарии)

## Расчёт вилки ЗП
Принимает резюме, навыки, регион — возвращает диапазон ЗП.

## LLM-рекомендации по резюме
Передаёт резюме -> LLM-сервис -> возвращает советы.

## Импорт резюме (PDF)
Парсер PDF -> доменная модель Resume -> сохранение.

## Релевантные скиллы для роли
Вводится роль -> отправка запроса в датасет через API -> возврат списка релевантных навыков.

## История поиска и рекомендаций
Логирование действий пользователя.

## Метрики удовлетворённости (feedback)
Собирает оценки пользователей после расчетов и рекомендаций.

## Администрирование пользователей
CRUD операции над пользователями, роли, доступы.

# 3. Доменные модели (Pydantic-схемы):
## Resume:
```python
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
    id: UUID
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
```
## Recommendations
```python
class RecommendationDTO(BaseModel):
    title: str
    subtitle: str
    result: str

class LLMResponse(BaseModel):
    recommendations: list[RecommendationDTO]
    quality: Literal["poor", "moderate", "good"]
```
## Users
```python
class UserUsernameRequest(BaseModel):
    """Represents the user username request details."""

    username: Username

class UserUpdatePasswordRequest(BaseModel):
    """Represents the user password request details."""

    old_password: Password
    new_password: Password

class UserRegistrationRequest(BaseModel):
    """Represents the user registration details."""

    username: Username
    password: Password

class UserResponse(BaseModel):
    """Represents the public response data for a user."""

    id: UUID4
    username: Username
    created_at: datetime
    updated_at: datetime

class UsersPaginationResponse(BaseModel):
    """Represents the public response data for a list of users."""

    users: list[UserResponse]
    pagination: PaginationResponse
```
## Salary
```python
class SalaryDTO(BaseModel):
    from_: int = Field(..., alias="from")
    to: int

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
```
## Authorization
```python
class AccessTokenResponse(BaseModel):
    """Represents a response containing access token and its expiration datetime."""

    access_token: str
    token_type: str = "bearer"
    expires_at: datetime


class JWT(BaseModel):
    """Represents the contents of a [JWT](https://wikipedia.org/wiki/JSON_Web_Token)."""

    exp: datetime | None = None
    sub: Any | None = None
```
# 4. Схема основных эндпоинтов (FastAPI):

## Метод - URL - Назначение
### POST - /parse/pdf - Импорт резюме из PDF
### GET - /resumes/analyze/salary_fork - Расчёт вилки по резюме
### POST - /resumes/analyze/recommendations - Получить советы по резюме
### GET - /resumes/skills - Актуальные навыки для роли
### GET - /resumes - История поиска и расчетов пользователя
### POST - /auth/register - Регистрация
### POST - /auth/login - Логин