import uuid
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from src.models.profile_tools import ProfileToolsModel


class ProfileToolsRepository:

    def __init__(self, db: Session):
        self.db = db

    def add(self, profile_id: uuid.UUID, tool_id: uuid.UUID) -> ProfileToolsModel:
        data = ProfileToolsModel(profile_id=profile_id, tool_id=tool_id)

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def get(self, profile_id: uuid.UUID, tool_id: uuid.UUID) -> ProfileToolsModel | None:
        data = self.db.scalar(
            select(ProfileToolsModel).where(
                and_(
                    ProfileToolsModel.profile_id == profile_id,
                    ProfileToolsModel.tool_id == tool_id
                )
            )
        )
        return data

    def get_all_by_profile(self, profile_id: uuid.UUID) -> list[ProfileToolsModel]:
        return list(
            self.db.scalars(
                select(ProfileToolsModel).where(ProfileToolsModel.profile_id == profile_id)
            )
        )

    def delete(self, profile_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        data = self.get(profile_id, tool_id)

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_already_linked(self, profile_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        return self.get(profile_id, tool_id) is not None
