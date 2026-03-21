from datetime import date, datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class ExperienceCreate(BaseModel):
    company: str = Field(min_length=1)
    role: str = Field(min_length=1)
    description: str | None = None
    start_date: date
    end_date: date | None = None
    display_order: int = Field(default=0)


class ExperiencePatch(BaseModel):
    company: str | None = Field(default=None, min_length=1)
    role: str | None = Field(default=None, min_length=1)
    description: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    display_order: int | None = None


class ExperienceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    company: str
    role: str
    description: str | None = None
    start_date: date
    end_date: date | None = None
    display_order: int
    created_at: datetime
    updated_at: datetime
