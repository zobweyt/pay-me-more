__all__ = [
    "router",
    "reumes_router"
]

from src.api.resumes.parse import router
from src.api.resumes.routes import router as reumes_router