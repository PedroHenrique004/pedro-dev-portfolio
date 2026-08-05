import uuid
from sqlalchemy import ForeignKey
import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column
from .base import BasicModel


class ToolsModel(BasicModel):
    __tablename__ = 'tools'

    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str | None] = mapped_column(nullable=True)
    image_url: Mapped[str | None] = mapped_column(nullable=True)
    category_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('category.id', ondelete='RESTRICT'),
        nullable=False
    )
    is_primary: Mapped[bool] = mapped_column(default=False, server_default=sqlalchemy.sql.expression.false())
