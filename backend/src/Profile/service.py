import uuid
from .schema import ProfileCreate, ProfilePatch
from .repository import ProfileRepository


class ProfileService:
    def __init__(self, repository: ProfileRepository):
        self.repository = repository

    def create(self, profile: ProfileCreate):
        if self.repository.verify_duplicated_email(profile.email):
            raise ValueError("Esse email já existe")

        return self.repository.add(profile)

    def update(self, profile_id: uuid.UUID, profile: ProfilePatch):
        existing = self.repository.get(profile_id)

        if not existing:
            raise ValueError("Perfil não encontrado")

        update_profile = profile.model_dump(exclude_unset=True)

        if not update_profile:
            raise ValueError("Nada pra ser atualizado")

        if profile.email and self.repository.verify_duplicated_email(profile.email):
            if existing.email != profile.email:
                raise ValueError("Email já está em uso")

        return self.repository.update(profile_id, profile)

    def get(self, profile_id: uuid.UUID):
        profile = self.repository.get(profile_id)

        if not profile:
            raise ValueError("Perfil não encontrado")

        return profile

    def delete(self, profile_id: uuid.UUID):
        profile = self.repository.get(profile_id)

        if not profile:
            raise ValueError("Perfil não encontrado")

        return self.repository.delete(profile_id)