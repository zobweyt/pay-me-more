import json
from typing import Annotated, Any, Dict, List

import aiohttp
from fastapi import Depends, HTTPException

from src.api.resumes.schemas import LLMResponse, Recommendation, Resumes
from src.settings import settings


class LLMClient:
    async def payload(self, role: str, skills: List[str], experience: int, location: str) -> Dict[str, Any]:
        model = settings.openrouter.model
        return {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "Ты профессиональный рекрутер, даешь людям рекомендации по улучшению резюме для поиска работы,\
                            выдавая рекомендации в строго заданной структуре. "
                        "Ты должен давать конкретные рекомендации по улучшению резюме, а не абстракные."
                        "Первая рекомендация: удаление абсурдных скиллов (если их нет, то пропусти этот пункт)."
                        "Вторая рекомендация: добавление релевантных скиллов."
                        "Третья, четвертая и пятая рекомендации: конкретные советы по улучшению резюме, \
                            которые реально повысят шансы кандидата на получение работы. \
                                (например, добавление навыков.)"
                        "Не давай советов по добавлению строк резюме, ведь резюме - это просто форма, а не текст."
                        "Не давай советов по изменению опыта работы и локации - это константа."
                        "После получения резюме формируй ответ в виде одного \
                            совета, который обязательно включает три части: "
                        "Заголовок: короткое емкое название совета. Рекомендация: \
                            четкое и конкретное действие по улучшению резюме. "
                        "Результат: реальный и измеримый эффект от применения совета, \
                            объясненный просто. Пример формата: "
                        'Заголовок: Добавьте краткий профиль. Рекомендация: Добавьте \
                            краткий профиль в начало резюме с ключевыми словами "Backend-разработчик Python Django". '
                        "Результат: повышение шансов пройти ATS-фильтры на HH.ru и SuperJob \
                            в Москве на 30-50%, так как рекрутеры сразу увидят релевантность. "
                        'В конце даёшь общее впечатление о резюме, используя одну из трех \
                            категорий: "poor" (низкое качество), "moderate" \
                                (среднее качество), "good" (хорошее качество).\
                                    Это урезанное резюме, поэтому будь объективен и не занижай оценку сильно.'
                        'Ответ формируй строго в JSON формате: ["quality": "moderate", \
                            "recommendations": {"title": "<Заголовок>", "subtitle": "<Рекомендация>", \
                                "result": "<Результат>"}]. Рекомендаций должно быть несколько.'
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Моя роль - {role}, мои скиллы - {', '.join(skills)}. Мой опыт - \
                            {experience} года. Мой регион - {location}."
                    ),
                },
            ],
            "extra_body": {"reasoning": {"enabled": True}},
        }

    async def get_recommendations(self, resume: Resumes) -> LLMResponse:
        url = "https://openrouter.ai/api/v1/chat/completions"
        token = settings.openrouter.token

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        async with aiohttp.ClientSession() as session:
            payload_data: Dict[str, Any] = await self.payload(
                resume.role, resume.skills, resume.experience, resume.location
            )
            async with session.post(url, json=payload_data, headers=headers) as resp:
                data = await resp.json()
        try:
            content = data["choices"][0]["message"]["content"]
            content = json.loads(content)

            return LLMResponse(
                recommendations=[
                    Recommendation(title=i["title"], subtitle=i["subtitle"], result=i["result"])
                    for i in content["recommendations"]
                ],
                quality=content["quality"],
            )
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Failed to parse LLM response: {e}")


LLMClientDepends = Annotated[LLMClient, Depends(LLMClient)]
