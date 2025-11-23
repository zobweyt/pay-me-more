import json
from collections.abc import Callable
from types import TracebackType
from typing import Any

import pytest
from fastapi import HTTPException

from src.api.recommendations.llm_client import LLMClient
from tests.utils.resumes import resume_schema


class StubResponse:
    def __init__(self, payload: dict[str, Any]) -> None:
        self.payload = payload

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


class StubSession:
    def __init__(self, payload: dict[str, Any]) -> None:
        self.payload = payload
        self.last_request: dict[str, Any] | None = None

    async def __aenter__(self) -> "StubSession":
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        return None

    def post(self, url: str, *, json: dict[str, Any], headers: dict[str, str]) -> StubResponse:
        self.last_request = dict(url=url, json=json, headers=headers)
        return StubResponse(self.payload)


def _patch_session(monkeypatch: pytest.MonkeyPatch, factory: Callable[[], StubSession]) -> StubSession:
    session = factory()

    def _session_ctor(*args: Any, **kwargs: Any) -> StubSession:
        return session

    monkeypatch.setattr("src.api.recommendations.llm_client.aiohttp.ClientSession", _session_ctor)

    return session


@pytest.mark.anyio
async def test_payload_contains_resume_data() -> None:
    resume = resume_schema(skills=["python", "docker"], experience=7, location="Remote")

    client = LLMClient()
    payload = await client.payload(resume.role, resume.skills, resume.experience, resume.location)

    assert "model" in payload
    assert payload["messages"][0]["role"] == "system"
    assert payload["messages"][1]["content"].count("python") == 1
    assert "docker" in payload["messages"][1]["content"]


@pytest.mark.anyio
async def test_get_recommendations_parses_llm_response(monkeypatch: pytest.MonkeyPatch) -> None:
    resume = resume_schema()
    llm_payload = {
        "quality": "good",
        "recommendations": [{"title": "Add metrics", "subtitle": "Mention SLIs", "result": "Clarity for hiring"}],
    }
    response_payload = {
        "choices": [
            {
                "message": {
                    "content": json.dumps(llm_payload),
                }
            }
        ]
    }

    session = _patch_session(monkeypatch, lambda: StubSession(response_payload))

    client = LLMClient()
    result = await client.get_recommendations(resume)

    assert result.quality == "good"
    assert result.recommendations[0].title == "Add metrics"
    assert session.last_request is not None
    assert session.last_request["headers"]["Authorization"].startswith("Bearer ")


@pytest.mark.anyio
async def test_get_recommendations_invalid_response(monkeypatch: pytest.MonkeyPatch) -> None:
    resume = resume_schema()
    response_payload = {
        "choices": [
            {
                "message": {
                    "content": "not a json",
                }
            }
        ]
    }

    _patch_session(monkeypatch, lambda: StubSession(response_payload))

    client = LLMClient()

    with pytest.raises(HTTPException) as exc:
        await client.get_recommendations(resume)

    assert exc.value.status_code == 422
