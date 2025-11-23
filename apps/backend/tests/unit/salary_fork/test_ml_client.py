from collections.abc import Callable
from types import TracebackType
from typing import Any

import pytest

from src.api.salary_fork.ml_client import MLClient
from tests.utils.resumes import resume_schema


class StubResponse:
    def __init__(self, payload: dict[str, Any]) -> None:
        self.payload = payload
        self.status = 200

    async def __aenter__(self) -> "StubResponse":
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        return None

    async def json(self) -> dict[str, Any]:
        return self.payload

    def raise_for_status(self) -> None:
        return None


class StubSession:
    def __init__(self, payload: dict[str, Any], *, should_fail: bool = False) -> None:
        self.payload = payload
        self.should_fail = should_fail
        self.last_call: dict[str, Any] | None = None

    async def __aenter__(self) -> "StubSession":
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        return None

    def get(self, url: str, *, params: list[tuple[str, Any]], headers: dict[str, str]) -> StubResponse:
        self.last_call = dict(url=url, params=params, headers=headers)

        if self.should_fail:
            raise RuntimeError("network error")

        return StubResponse(self.payload)


def _patch_session(monkeypatch: pytest.MonkeyPatch, factory: Callable[[], StubSession]) -> StubSession:
    session = factory()

    def _session_ctor(*args: Any, **kwargs: Any) -> StubSession:
        return session

    monkeypatch.setattr("src.api.salary_fork.ml_client.aiohttp.ClientSession", _session_ctor)

    return session


@pytest.mark.anyio
async def test_calculate_salary_builds_expected_params(monkeypatch: pytest.MonkeyPatch) -> None:
    resume = resume_schema(skills=["python", "fastapi"], experience=4, location="Berlin")
    payload = {"salary_from": 160000, "salary_to": 210000}

    session = _patch_session(monkeypatch, lambda: StubSession(payload))

    client = MLClient()
    salary = await client.calculate_salary(resume)

    assert salary.from_ == 160000
    assert salary.to == 210000

    assert session.last_call is not None
    assert session.last_call["params"] == [
        ("role", "Backend Developer"),
        ("experience", "4"),
        ("skills_list", "python"),
        ("skills_list", "fastapi"),
        ("region", "Berlin"),
    ]
    assert session.last_call["headers"] == {"accept": "application/json"}


@pytest.mark.anyio
async def test_calculate_salary_returns_fallback_on_error(monkeypatch: pytest.MonkeyPatch) -> None:
    resume = resume_schema()

    _patch_session(monkeypatch, lambda: StubSession({}, should_fail=True))

    client = MLClient()
    salary = await client.calculate_salary(resume)

    assert salary.from_ == 100000
    assert salary.to == 115000
