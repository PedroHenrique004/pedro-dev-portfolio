import uuid
from .repository import ProjectToolsRepository


class ProjectToolsService:

    def __init__(self, repository: ProjectToolsRepository):
        self.repository = repository

    def add_tool(self, project_id: uuid.UUID, tool_id: uuid.UUID):
        if self.repository.verify_already_linked(project_id, tool_id):
            raise ValueError("Essa ferramenta já está vinculada a esse projeto")

        return self.repository.add(project_id, tool_id)

    def get_all(self, project_id: uuid.UUID):
        return self.repository.get_all_by_project(project_id)

    def remove_tool(self, project_id: uuid.UUID, tool_id: uuid.UUID):
        if not self.repository.verify_already_linked(project_id, tool_id):
            raise ValueError("Essa ferramenta não está vinculada a esse projeto")

        return self.repository.delete(project_id, tool_id)
