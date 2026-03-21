import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import ExperienceCreate, ExperiencePatch
from src.models.experience import ExperienceModel


class ExperienceRepository:

    # INIT
    def __init__(self, db: Session):
        self.db = db

    # CRUD
    def add(self, experience: ExperienceCreate) -> ExperienceModel:
        data = ExperienceModel(**experience.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def patch(self, experience_id: uuid.UUID, experience: ExperiencePatch) -> ExperienceModel | None:
        existing = self.db.scalar(select(ExperienceModel).where(ExperienceModel.id == experience_id))

        if not existing:
            return None

        for field, value in experience.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)

        self.db.commit()
        self.db.refresh(existing)
        return existing

    def get(self, experience_id: uuid.UUID) -> ExperienceModel | None:
        data = self.db.scalar(select(ExperienceModel).where(ExperienceModel.id == experience_id))

        if not data:
            return None

        return data

    def delete(self, experience_id: uuid.UUID) -> bool:
        data = self.db.scalar(select(ExperienceModel).where(ExperienceModel.id == experience_id))

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_duplicated_role(self, company: str, role: str) -> bool:
        data = self.db.scalar(
            select(ExperienceModel).where(
                ExperienceModel.company == company,
                ExperienceModel.role == role
            )
        )
        return data is not None
