import uuid
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column
from .base import JunctionBaseModel


class ProfileToolsModel(JunctionBaseModel):
    __tablename__ = 'profile_tools'

    profile_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('profile.id', ondelete='CASCADE'),
        nullable=False
    )
    tool_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('tools.id', ondelete='CASCADE'),
        nullable=False
    )

    __table_args__ = (
        PrimaryKeyConstraint('profile_id', 'tool_id'),
    )
