from datetime import date
from .base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column


class ExperienceModel(BasicModel):
    __tablename__ = 'experience'

    company: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str | None] = mapped_column(nullable=True)
    start_date: Mapped[date] = mapped_column(nullable=False)
    end_date: Mapped[date | None] = mapped_column(nullable=True)
    display_order: Mapped[int] = mapped_column(default=0)

