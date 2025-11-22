import uuid

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.api.resumes.models import Resume
from src.db.mixins import AuditMixin
from src.db.models import Base


class Salary(Base, AuditMixin):
    __tablename__ = "salary"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    resume_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("resume.id"), unique=True)

    from_: Mapped[int] = mapped_column(Integer, name="from")
    to: Mapped[int] = mapped_column(Integer)

    resume: Mapped["Resume"] = relationship(back_populates="salary")
