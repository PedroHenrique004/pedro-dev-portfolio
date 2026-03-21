import uuid
from .schema import ExperienceCreate, ExperiencePatch
from .repository import ExperienceRepository


class ExperienceService:

    def __init__(self, repository: ExperienceRepository):
        self.repository = repository

    def create(self, experience: ExperienceCreate):
        if self.repository.verify_duplicated_role(experience.company, experience.role):
            raise ValueError("Já existe uma experiência com esse cargo nessa empresa")

        return self.repository.add(experience)

    def update(self, experience_id: uuid.UUID, experience: ExperiencePatch):
        existing = self.repository.get(experience_id)

        if not existing:
            raise ValueError("Experiência não encontrada")

        updated_experience = experience.model_dump(exclude_unset=True)

        if not updated_experience:
            raise ValueError("Nada foi atualizado")

        return self.repository.patch(experience_id, experience)

    def get(self, experience_id: uuid.UUID):
        experience = self.repository.get(experience_id)

        if not experience:
            raise ValueError("Experiência não encontrada")

        return experience

    def delete(self, experience_id: uuid.UUID):
        experience = self.repository.get(experience_id)

        if not experience:
            raise ValueError("Experiência não encontrada")

        return self.repository.delete(experience_id)
