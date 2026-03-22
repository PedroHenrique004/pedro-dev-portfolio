from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class TestimonialCreate(BaseModel):
    name: str = Field(min_length=1)
    role: str = Field(min_length=1)
    company: str = Field(min_length=1)
    message: str = Field(min_length=1)
    photo_url: str | None = None
    linkedin_url: str | None = None
    display_order: int = Field(default=0)


class TestimonialPatch(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    role: str | None = Field(default=None, min_length=1)
    company: str | None = Field(default=None, min_length=1)
    message: str | None = Field(default=None, min_length=1)
    photo_url: str | None = None
    linkedin_url: str | None = None
    display_order: int | None = None


class TestimonialResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    role: str
    company: str
    message: str
    photo_url: str | None = None
    linkedin_url: str | None = None
    display_order: int
    created_at: datetime
    updated_at: datetime
