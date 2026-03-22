from .base import BasicModel
from sqlalchemy.orm import Mapped, mapped_column

class CategoryModel(BasicModel):
    __tablename__ = 'category'

    name: Mapped[str] =  mapped_column(nullable=False)
    description: Mapped[str | None] = mapped_column()
