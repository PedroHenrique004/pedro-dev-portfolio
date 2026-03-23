import uuid
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from src.models.experience_tools import ExperienceToolsModel


class ExperienceToolsRepository:

    def __init__(self, db: Session):
        self.db = db

    def add(self, experience_id: uuid.UUID, tool_id: uuid.UUID) -> ExperienceToolsModel:
        data = ExperienceToolsModel(experience_id=experience_id, tool_id=tool_id)

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def get(self, experience_id: uuid.UUID, tool_id: uuid.UUID) -> ExperienceToolsModel | None:
        data = self.db.scalar(
            select(ExperienceToolsModel).where(
                and_(
                    ExperienceToolsModel.experience_id == experience_id,
                    ExperienceToolsModel.tool_id == tool_id
                )
            )
        )
        return data

    def get_all_by_experience(self, experience_id: uuid.UUID) -> list[ExperienceToolsModel]:
        return list(
            self.db.scalars(
                select(ExperienceToolsModel).where(ExperienceToolsModel.experience_id == experience_id)
            )
        )

    def delete(self, experience_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        data = self.get(experience_id, tool_id)

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_already_linked(self, experience_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        return self.get(experience_id, tool_id) is not None
