from .base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column


class TestimonialModel(BasicModel):
    __tablename__ = 'testimonial'

    name: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(nullable=False)
    company: Mapped[str] = mapped_column(nullable=False)
    message: Mapped[str] = mapped_column(nullable=False)
    photo_url: Mapped[str | None] = mapped_column(nullable=True)
    linkedin_url: Mapped[str | None] = mapped_column(nullable=True)
    display_order: Mapped[int] = mapped_column(default=0)
