__all__ = [
    "router",
]

from fastapi import APIRouter

from src.api import analyze, auth, recommendations, resumes, salary_fork, users

router = APIRouter()

router.include_router(auth.router)
router.include_router(users.router)
router.include_router(analyze.router)
