import uuid
from .schema import ProjectCreate, ProjectPatch
from .repository import ProjectRepository


class ProjectService:

    def __init__(self, repository: ProjectRepository):
        self.repository = repository

    def create(self, project: ProjectCreate):
        if self.repository.verify_duplicated_title(project.title):
            raise ValueError("Já existe um projeto com esse título")

        return self.repository.add(project)

    def update(self, project_id: uuid.UUID, project: ProjectPatch):
        existing = self.repository.get(project_id)

        if not existing:
            raise ValueError("Projeto não encontrado")

        updated_project = project.model_dump(exclude_unset=True)

        if not updated_project:
            raise ValueError("Nada foi atualizado")

        if project.title and self.repository.verify_duplicated_title(project.title):
            if existing.title != project.title:
                raise ValueError("Já existe um projeto com esse título")

        return self.repository.patch(project_id, project)

    def get(self, project_id: uuid.UUID):
        project = self.repository.get(project_id)

        if not project:
            raise ValueError("Projeto não encontrado")

        return project

    def delete(self, project_id: uuid.UUID):
        project = self.repository.get(project_id)

        if not project:
            raise ValueError("Projeto não encontrado")

        return self.repository.delete(project_id)
