import typing
import uuid

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.mixins import AuditMixin
from src.db.models import Base

if typing.TYPE_CHECKING:
    from src.api.resumes.models import Resume

class Recommendation(Base, AuditMixin):
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    resume_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("resume.id"))

    title: Mapped[str]
    subtitle: Mapped[str]
    result: Mapped[str]

    resume: Mapped["Resume"] = relationship(back_populates="recommendation")
