from typing import Annotated

from fastapi import Depends

from src.api.resumes.service import ResumeService

ResumeServiceDeps = Annotated[ResumeService, Depends(ResumeService)]
