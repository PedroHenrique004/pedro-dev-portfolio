import uuid
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column
from .base import JunctionBaseModel


class ExperienceToolsModel(JunctionBaseModel):
    __tablename__ = 'experience_tools'

    experience_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('experience.id', ondelete='CASCADE'),
        nullable=False
    )
    tool_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('tools.id', ondelete='CASCADE'),
        nullable=False
    )

    __table_args__ = (
        PrimaryKeyConstraint('experience_id', 'tool_id'),
    )
