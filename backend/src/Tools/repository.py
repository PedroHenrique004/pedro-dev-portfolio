import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import ToolsCreate, ToolsPatch
from src.models.tools import ToolsModel


class ToolsRepository:

    def __init__(self, db: Session):
        self.db = db

    # CRUD
    def add(self, tool: ToolsCreate) -> ToolsModel:
        data = ToolsModel(**tool.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def patch(self, tool_id: uuid.UUID, tool: ToolsPatch) -> ToolsModel | None:
        existing = self.db.scalar(select(ToolsModel).where(ToolsModel.id == tool_id))

        if not existing:
            return None

        for field, value in tool.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)

        self.db.commit()
        self.db.refresh(existing)
        return existing

    def get(self, tool_id: uuid.UUID) -> ToolsModel | None:
        data = self.db.scalar(select(ToolsModel).where(ToolsModel.id == tool_id))

        if not data:
            return None

        return data

    def delete(self, tool_id: uuid.UUID) -> bool:
        data = self.db.scalar(select(ToolsModel).where(ToolsModel.id == tool_id))

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_duplicated_name(self, name: str) -> bool:
        data = self.db.scalar(select(ToolsModel).where(ToolsModel.name == name))
        return data is not None
