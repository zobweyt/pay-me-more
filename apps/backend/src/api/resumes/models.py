import uuid

from sqlalchemy import Column, ForeignKey, String, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.api.recommendations.models import Recommendation
from src.db.mixins import AuditMixin
from src.db.models import Base

resume_skill_table = Table(
    "resume_skill",
    Base.metadata,
    Column("resume_id", UUID(as_uuid=True), ForeignKey("resume.id"), primary_key=True),
    Column("skill_id", UUID(as_uuid=True), ForeignKey("skill.id"), primary_key=True),
)


class Resume(Base, AuditMixin):
    __tablename__ = "resume"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), unique=True, nullable=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    role: Mapped[str] = mapped_column(String(100))
    skills: Mapped[list["Skill"]] = relationship(secondary=resume_skill_table, backref="resumes")
    experience: Mapped[int]
    location: Mapped[str]

    user: Mapped["User"] = relationship(back_populates="resume")

    salary: Mapped["Salary"] = relationship(back_populates="resume", uselist=False)
    recommendation: Mapped[list["Recommendation"]] = relationship(back_populates="resume")


class Skill(Base, AuditMixin):
    __tablename__ = "skill"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column()

    __repr_attrs__ = ("id", "name")
