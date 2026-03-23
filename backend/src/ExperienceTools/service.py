import uuid
from .repository import ExperienceToolsRepository


class ExperienceToolsService:

    def __init__(self, repository: ExperienceToolsRepository):
        self.repository = repository

    def add_tool(self, experience_id: uuid.UUID, tool_id: uuid.UUID):
        if self.repository.verify_already_linked(experience_id, tool_id):
            raise ValueError("Essa ferramenta já está vinculada a essa experiência")

        return self.repository.add(experience_id, tool_id)

    def get_all(self, experience_id: uuid.UUID):
        return self.repository.get_all_by_experience(experience_id)

    def remove_tool(self, experience_id: uuid.UUID, tool_id: uuid.UUID):
        if not self.repository.verify_already_linked(experience_id, tool_id):
            raise ValueError("Essa ferramenta não está vinculada a essa experiência")

        return self.repository.delete(experience_id, tool_id)
