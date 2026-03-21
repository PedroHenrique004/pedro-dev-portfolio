from datetime import date, datetime
import uuid
from pydantic import BaseModel, ConfigDict, Field


class CertificateCreate(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None
    issued_by: str = Field(min_length=1)
    issued_at: date 
    image_url: str | None = None
    display_order: int = Field(default=0)

class CertificatePatch(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    description: str | None = None
    issued_by: str | None = None
    issued_at: date | None = None
    image_url: str | None = None
    display_order: int | None = Field(default=0)

class CertificateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str | None = None
    issued_by: str
    issued_at: date
    image_url: str | None = None
    display_order: int
    created_at: datetime
    updated_at: datetime