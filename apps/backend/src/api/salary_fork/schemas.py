from pydantic import BaseModel, ConfigDict, Field


class SalaryDTO(BaseModel):
    from_: int = Field(..., alias="from")
    to: int

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
