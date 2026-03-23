from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict


class ProjectToolsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    project_id: uuid.UUID
    tool_id: uuid.UUID
    created_at: datetime
