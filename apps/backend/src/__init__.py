__all__ = [
    "User",
]

import logging.config

from src.api.users.models import User
from src.settings import settings

logging.config.dictConfig(settings.logging.model_dump())
