from fastapi import APIRouter
from fastapi.responses import Response
from pydantic import BaseModel

from src.api.feedback.metrics import rating_histogram_1, rating_histogram_2, rating_histogram_3
from src.api.tags import Tag

router = APIRouter(prefix="/feedback", tags=[Tag.FEEADBACK])


class Rating(BaseModel):
    value: int
    time: int


@router.post("/rate")
async def rate(rating: Rating) -> Response:
    if rating.time == 1:
        rating_histogram_1.observe(rating.value)
    elif rating.time == 2:
        rating_histogram_2.observe(rating.value)
    else:
        rating_histogram_3.observe(rating.value)
    return Response(status_code=200)
