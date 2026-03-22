import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import ProjectCreate, ProjectPatch
from src.models.project import ProjectModel


class ProjectRepository:

    def __init__(self, db: Session):
        self.db = db

    # CRUD
    def add(self, project: ProjectCreate) -> ProjectModel:
        data = ProjectModel(**project.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def patch(self, project_id: uuid.UUID, project: ProjectPatch) -> ProjectModel | None:
        existing = self.db.scalar(select(ProjectModel).where(ProjectModel.id == project_id))

        if not existing:
            return None

        for field, value in project.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)

        self.db.commit()
        self.db.refresh(existing)
        return existing

    def get(self, project_id: uuid.UUID) -> ProjectModel | None:
        data = self.db.scalar(select(ProjectModel).where(ProjectModel.id == project_id))

        if not data:
            return None

        return data

    def delete(self, project_id: uuid.UUID) -> bool:
        data = self.db.scalar(select(ProjectModel).where(ProjectModel.id == project_id))

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_duplicated_title(self, title: str) -> bool:
        data = self.db.scalar(select(ProjectModel).where(ProjectModel.title == title))
        return data is not None
