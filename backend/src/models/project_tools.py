import uuid
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column
from .base import JunctionBaseModel


class ProjectToolsModel(JunctionBaseModel):
    __tablename__ = 'project_tools'

    project_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('project.id', ondelete='CASCADE'),
        nullable=False
    )
    tool_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('tools.id', ondelete='CASCADE'),
        nullable=False
    )

    __table_args__ = (
        PrimaryKeyConstraint('project_id', 'tool_id'),
    )
