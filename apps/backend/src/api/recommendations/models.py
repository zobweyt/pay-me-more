from sqlalchemy.orm import Mapped

from src.db.models import Base


class Recommendation(Base):
    title: Mapped[str]
    subtitle: Mapped[str]
    result: Mapped[str]
