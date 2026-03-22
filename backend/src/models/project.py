from .base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column


class ProjectModel(BasicModel):
    __tablename__ = 'project'

    title: Mapped[str] = mapped_column(nullable=False)
    short_description: Mapped[str] = mapped_column(nullable=False)
    full_description: Mapped[str | None] = mapped_column(nullable=True)
    repository_url: Mapped[str | None] = mapped_column(nullable=True)
    live_demo: Mapped[str | None] = mapped_column(nullable=True)
    image_url: Mapped[str | None] = mapped_column(nullable=True)
    display_order: Mapped[int] = mapped_column(default=0)
