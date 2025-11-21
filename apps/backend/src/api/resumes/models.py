from sqlalchemy.orm import Mapped

from src.db.models import Base


class Resumes(Base):
    role: Mapped[str]
    skills: Mapped[list[str]]
    experience: Mapped[int]
    location: Mapped[str]
