import uuid
from .schema import ToolsCreate, ToolsPatch
from .repository import ToolsRepository


class ToolsService:

    def __init__(self, repository: ToolsRepository):
        self.repository = repository

    def create(self, tool: ToolsCreate):
        if self.repository.verify_duplicated_name(tool.name):
            raise ValueError("Já existe uma ferramenta com esse nome")

        return self.repository.add(tool)

    def update(self, tool_id: uuid.UUID, tool: ToolsPatch):
        existing = self.repository.get(tool_id)

        if not existing:
            raise ValueError("Ferramenta não encontrada")

        updated_tool = tool.model_dump(exclude_unset=True)

        if not updated_tool:
            raise ValueError("Nada foi atualizado")

        if tool.name and self.repository.verify_duplicated_name(tool.name):
            if existing.name != tool.name:
                raise ValueError("Já existe uma ferramenta com esse nome")

        return self.repository.patch(tool_id, tool)

    def get(self, tool_id: uuid.UUID):
        tool = self.repository.get(tool_id)

        if not tool:
            raise ValueError("Ferramenta não encontrada")

        return tool

    def delete(self, tool_id: uuid.UUID):
        tool = self.repository.get(tool_id)

        if not tool:
            raise ValueError("Ferramenta não encontrada")

        return self.repository.delete(tool_id)
