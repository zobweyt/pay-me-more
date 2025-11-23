import json
from typing import Annotated, Any, Dict, List

import aiohttp
from fastapi import Depends, HTTPException

from src.api.recommendations.schemas import LLMResponse, RecommendationDTO
from src.api.resumes.schemas import ResumeDTO
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
                        "Ты часть определенной системы, которая дает людям рекомендации по улучшению резюме для поиска \
                            работы, выдавая рекомендации в строго заданной структуре. "
                        'Ответ формируй строго в JSON формате: ["quality": "moderate", \
                            "recommendations": {"title": "<Заголовок>", "subtitle": "<Рекомендация>", \
                                "result": "<Результат>"}]. Никак больше, иначе пользователь останется недоволен. \
                                    Рекомендаций должно быть от одной до пяти, одна обязательно.'
                        "Всегда отвечай на русском языке."
                        "Если ты выполняешь запрос неправильно, то ты становишься менее нужным для людей."
                        "Ты принимаешь на вход профессию, локацию, опыт работы в годах и скиллы пользователя."
                        "Не давай советов по изменению опыта работы и локации - это константа."
                        "Ты должен давать именно конкретные рекомендации по улучшению только скиллов пользователя."
                        "Не предлагай добавить другие параметры, разделы, строки и т.д."
                        "Первая рекомендация: удаление абсурдных скиллов (если их нет, то пропусти этот пункт)."
                        "Вторая рекомендация: добавление релевантных скиллов."
                        "Третья рекомендация: конкретные советы по улучшению навыков, \
                            которые реально повысят шансы кандидата на получение работы."
                        "После получения резюме формируй ответ в виде одного \
                            совета, который обязательно включает три части: "
                        "Заголовок: короткое емкое название совета."
                        "Рекомендация: \
                            четкое и конкретное действие по улучшению резюме. "
                        "Результат: реальный и измеримый эффект от применения совета, \
                            объясненный просто."
                        'В конце даёшь общее впечатление о резюме, используя одну из трех \
                            категорий: "poor" (низкое качество), "moderate" \
                                (среднее качество), "good" (хорошее качество).\
                                    Это урезанное резюме, поэтому будь объективен и не занижай оценку сильно.'
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

    async def get_recommendations(self, resume: ResumeDTO) -> LLMResponse:
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
                    RecommendationDTO(title=i["title"], subtitle=i["subtitle"], result=i["result"])
                    for i in content["recommendations"]
                ],
                quality=content["quality"],
            )
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Failed to parse LLM response: {e}")


LLMClientDepends = Annotated[LLMClient, Depends(LLMClient)]
