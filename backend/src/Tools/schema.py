from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class ToolsCreate(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None
    image_url: str | None = None
    category_id: uuid.UUID


class ToolsPatch(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    description: str | None = None
    image_url: str | None = None
    category_id: uuid.UUID | None = None


class ToolsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str | None = None
    image_url: str | None = None
    category_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
