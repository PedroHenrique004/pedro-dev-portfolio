from datetime import date
from sqlalchemy import func
from .base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column


class CertificateModel(BasicModel):
    __tablename__ = 'certificate'

    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column(nullable=False)
    issued_by: Mapped[str] = mapped_column()
    issued_at: Mapped[date] = mapped_column()
    image_url: Mapped[str] = mapped_column()
    display_order: Mapped[int] = mapped_column(default=0)



