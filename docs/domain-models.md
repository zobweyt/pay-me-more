### Resumes:
* role: str
* skills: list[skill: str]
* experience: int
* location: str

### Vacancies:
* id: str
* company_name: str
* vacancy_name: str
* experience: {from: int, to: int}
* schedule: str (например: 5 на 3, гибкий, фиксированный и т д)
* work_hours: int
* salary: {from: int, to: int}
* location: str
* description: str
* skills: list[skill: str]

### Recommendations:
* title: str
* subtitle: str
* result: str

### Response:
* salary: {from: int, to: int}
* recommend_vacancies: list[Vacancies]
* recommendations: list[Recommendation]

### Users:
* id: str
* username: str
* password: str
* is_superuser: bool
