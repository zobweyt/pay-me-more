from pydantic import BaseModel, Field


class Salary(BaseModel):
    from_: int = Field(..., alias="from")
    to: int
