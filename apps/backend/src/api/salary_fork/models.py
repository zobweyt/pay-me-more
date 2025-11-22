from sqlalchemy.orm import Mapped

from src.db.models import Base


class Salary(Base):
    from_: Mapped[int]
    to: Mapped[int]
