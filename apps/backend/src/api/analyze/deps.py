from typing import Annotated

from fastapi import Depends

from src.api.analyze.service import AnalyzeService

AnalyzeServiceDeps = Annotated[AnalyzeService, Depends(AnalyzeService)]
