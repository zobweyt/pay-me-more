'''class Resumes(Base):
    """В данный момент эта модель нигде не используется, так как резюме не хранятся в базе данных"""
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role: Mapped[str]
    experience: Mapped[int]
    location: Mapped[str]

class skills(Base):
    resume_id: Mapped[str]
    skill: Mapped[str]'''
