from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None

class CategoryPatch(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    description: str | None = None

class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: uuid.UUID
    name: str
    description: str | None = None
    created_at: datetime
    updated_at: datetime