import uuid
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from src.models.project_tools import ProjectToolsModel


class ProjectToolsRepository:

    def __init__(self, db: Session):
        self.db = db

    def add(self, project_id: uuid.UUID, tool_id: uuid.UUID) -> ProjectToolsModel:
        data = ProjectToolsModel(project_id=project_id, tool_id=tool_id)

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def get(self, project_id: uuid.UUID, tool_id: uuid.UUID) -> ProjectToolsModel | None:
        data = self.db.scalar(
            select(ProjectToolsModel).where(
                and_(
                    ProjectToolsModel.project_id == project_id,
                    ProjectToolsModel.tool_id == tool_id
                )
            )
        )
        return data

    def get_all_by_project(self, project_id: uuid.UUID) -> list[ProjectToolsModel]:
        return list(
            self.db.scalars(
                select(ProjectToolsModel).where(ProjectToolsModel.project_id == project_id)
            )
        )

    def delete(self, project_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        data = self.get(project_id, tool_id)

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_already_linked(self, project_id: uuid.UUID, tool_id: uuid.UUID) -> bool:
        return self.get(project_id, tool_id) is not None
