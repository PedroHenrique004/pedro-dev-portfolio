from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict, EmailStr, Field


# Schema de criação -> Campos inseridos manualmente na tabela
class ProfileCreate(BaseModel):
    full_name: str = Field(min_length=1)
    tagline: str | None = None
    short_bio: str | None = None
    about: str | None = None
    email: EmailStr
    linkedin_url: str | None = None
    github_url: str | None = None

# Schema de atualização -> Campos de atualização, todos são opcionais 
# Field faz a validação Pydantic
class ProfilePatch(BaseModel):
    full_name: str | None = Field(default=None, min_length=1)
    tagline: str | None = None
    short_bio: str | None = None
    about: str | None = None
    email: EmailStr | None = None # Ja tem validação aut
    linkedin_url: str | None = None
    github_url: str | None = None

# Schema de receber da API -> Mesmos campos da API 
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