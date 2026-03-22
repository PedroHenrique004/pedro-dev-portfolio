from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class ProjectCreate(BaseModel):
    title: str = Field(min_length=1)
    short_description: str = Field(min_length=1)
    full_description: str | None = None
    repository_url: str | None = None
    live_demo: str | None = None
    image_url: str | None = None
    display_order: int = Field(default=0)


class ProjectPatch(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    short_description: str | None = Field(default=None, min_length=1)
    full_description: str | None = None
    repository_url: str | None = None
    live_demo: str | None = None
    image_url: str | None = None
    display_order: int | None = None


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    short_description: str
    full_description: str | None = None
    repository_url: str | None = None
    live_demo: str | None = None
    image_url: str | None = None
    display_order: int
    created_at: datetime
    updated_at: datetime
