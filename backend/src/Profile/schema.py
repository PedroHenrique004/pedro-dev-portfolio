from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ProfileCreate(BaseModel):
    full_name: str = Field(min_length=1)
    tagline: str | None = None
    short_bio: str | None = None
    about: str | None = None
    email: EmailStr
    linkedin_url: str | None = None
    github_url: str | None = None


class ProfilePatch(BaseModel):
    full_name: str | None = Field(default=None, min_length=1)
    tagline: str | None = None
    short_bio: str | None = None
    about: str | None = None
    email: EmailStr | None = None
    linkedin_url: str | None = None
    github_url: str | None = None


class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    full_name: str
    tagline: str | None = None
    short_bio: str | None = None
    about: str | None = None
    email: str
    linkedin_url: str | None = None
    github_url: str | None = None
    created_at: datetime
    updated_at: datetime