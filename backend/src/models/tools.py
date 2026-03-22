import uuid
from src.models.base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column

class ToolsModel(BasicModel):
    __tablename__ = 'tools'

    name: Mapped[str] = mapped_column(nullable=False)
    image_url: Mapped[str] = mapped_column()
    category_id: Mapped[uuid.UUID] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
