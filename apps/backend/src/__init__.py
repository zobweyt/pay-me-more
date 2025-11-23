__all__ = ["User", "Resume", "Recommendation", "Skill", "Salary", "resume_skill_table"]

import logging.config

from src.api.recommendations.models import Recommendation
from src.api.resumes.models import Resume, Skill, resume_skill_table
from src.api.salary_fork.models import Salary
from src.api.users.models import User
from src.settings import settings

logging.config.dictConfig(settings.logging.model_dump())
