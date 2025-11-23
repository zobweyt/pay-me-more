from collections.abc import Callable, Iterator
from contextlib import contextmanager
from typing import Any

from src.app import app


@contextmanager
def override_dependency(dependency: Any, provider: Callable[[], Any]) -> Iterator[None]:
    """Temporarily override a FastAPI dependency for the test duration."""

    app.dependency_overrides[dependency] = provider
    try:
        yield
    finally:
        app.dependency_overrides.pop(dependency, None)
