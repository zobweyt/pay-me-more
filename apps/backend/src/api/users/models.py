import typing
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.mixins import AuditMixin
from src.db.models import Base

if typing.TYPE_CHECKING:
    from src.api.resumes.models import Resume


class User(Base, AuditMixin):
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # type: ignore
    username: Mapped[str] = mapped_column(index=True, unique=True)
    password: Mapped[str] = mapped_column()
    is_superuser: Mapped[bool] = mapped_column(default=False)

    resume: Mapped[list["Resume"]] = relationship(back_populates="user")

    __repr_attrs__ = ("id", "username")
