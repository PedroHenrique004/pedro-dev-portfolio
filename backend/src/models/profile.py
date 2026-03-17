from .base import BasicModel
from sqlalchemy.orm import Mapped,mapped_column

class ProfileModel(BasicModel):
    __tablename__ = "profile"

    full_name: Mapped[str] = mapped_column(nullable=False)
    tagline: Mapped[str | None] = mapped_column()
    short_bio: Mapped[str | None] = mapped_column()
    about: Mapped[str | None] = mapped_column()
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    linkedin_url: Mapped[str | None] = mapped_column()
    github_url: Mapped[str | None] = mapped_column()

