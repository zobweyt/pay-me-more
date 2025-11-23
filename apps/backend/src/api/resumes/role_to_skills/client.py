import json
from pathlib import Path
from typing import Annotated

from fastapi import Depends


class RoleToSkillsClient:
    _instance = None

    def __new__(cls) -> "RoleToSkillsClient":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False  # type: ignore
        return cls._instance

    def __init__(self) -> None:
        if not self._initialized:  # type: ignore
            base_dir = Path(__file__).parent
            data_path = base_dir / "roles_with_skills.json"

            self.role_to_skill_dict = self._json_to_dict(str(data_path))
            self._initialized = True

    def _json_to_dict(self, data_path: str) -> dict[str, list[str]]:
        with open(data_path, "r") as f:
            data = json.load(f)

        out = {}

        for role in data["roles"]:
            out[role] = data["skills"].get(str(data["roles"][role]), [])
            if not out[role]:
                out[role] = data["skills"].get(data["roles"][role], [])

        return out

    def get_skills(self, role: str) -> list[str]:
        return self.role_to_skill_dict.get(role, [])


RoleToSkillsClientDepends = Annotated[RoleToSkillsClient, Depends(RoleToSkillsClient)]
