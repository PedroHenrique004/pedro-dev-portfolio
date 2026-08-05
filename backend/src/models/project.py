from .base import BasicModel
from .tools import ToolsModel
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy
import sqlalchemy.dialects.postgresql


class ProjectModel(BasicModel):
    __tablename__ = 'project'

    title: Mapped[str] = mapped_column(nullable=False)
    slug: Mapped[str | None] = mapped_column(unique=True, nullable=True)
    short_description: Mapped[str] = mapped_column(nullable=False)
    full_description: Mapped[str | None] = mapped_column(nullable=True)
    repository_url: Mapped[str | None] = mapped_column(nullable=True)
    live_demo: Mapped[str | None] = mapped_column(nullable=True)
    image_url: Mapped[str | None] = mapped_column(nullable=True)
    video_url: Mapped[str | None] = mapped_column(nullable=True)
    gallery_urls: Mapped[list[str] | None] = mapped_column(sqlalchemy.dialects.postgresql.ARRAY(sqlalchemy.String), nullable=True)
    category: Mapped[str | None] = mapped_column(nullable=True)
    role: Mapped[str | None] = mapped_column(nullable=True)
    year: Mapped[str | None] = mapped_column(nullable=True)
    is_featured: Mapped[bool] = mapped_column(default=False, server_default=sqlalchemy.sql.expression.false())
    display_order: Mapped[int] = mapped_column(default=0)
    tools: Mapped[list["ToolsModel"]] = relationship(secondary="project_tools", lazy="selectin")
