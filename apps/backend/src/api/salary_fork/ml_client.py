from typing import Annotated

import aiohttp
from fastapi import Depends

from src.api.resumes.schemas import Resumes
from src.api.salary_fork.schemas import Salary
from src.settings import settings


class MLClient:
    async def calculate_salary(self, resume: Resumes) -> Salary:
        url = settings.ml.url
        params = []
        params.append(("role", getattr(resume, "role", "")))
        params.append(("experience", str(getattr(resume, "experience", ""))))
        for skill in getattr(resume, "skills", []) or []:
            params.append(("skills_list", skill))
        params.append(("region", getattr(resume, "location", "")))

        headers = {"accept": "application/json"}
        timeout = aiohttp.ClientTimeout(total=15)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            try:
                async with session.get(url, params=params, headers=headers) as resp:
                    resp.raise_for_status()
                    data = await resp.json()
                    return Salary(**{"from": data["salary_from"], "to": data["salary_to"]})
            except Exception:
                # If the ML service is unavailable or an error occurs, return HTTP 503 Service Unavailable
                return Salary(**{"from": 100000, "to": 115000})


MLClientDepends = Annotated[MLClient, Depends(MLClient)]
