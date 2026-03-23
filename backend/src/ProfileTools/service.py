import uuid
from .repository import ProfileToolsRepository


class ProfileToolsService:

    def __init__(self, repository: ProfileToolsRepository):
        self.repository = repository

    def add_tool(self, profile_id: uuid.UUID, tool_id: uuid.UUID):
        if self.repository.verify_already_linked(profile_id, tool_id):
            raise ValueError("Essa ferramenta já está vinculada a esse perfil")

        return self.repository.add(profile_id, tool_id)

    def get_all(self, profile_id: uuid.UUID):
        return self.repository.get_all_by_profile(profile_id)

    def remove_tool(self, profile_id: uuid.UUID, tool_id: uuid.UUID):
        if not self.repository.verify_already_linked(profile_id, tool_id):
            raise ValueError("Essa ferramenta não está vinculada a esse perfil")

        return self.repository.delete(profile_id, tool_id)
