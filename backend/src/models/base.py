import uuid
from datetime import datetime, timezone
from database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import TIMESTAMP


def utcnow():
    return datetime.now(timezone.utc)


class BasicModel(Base):
    __abstract__ = True

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        default=utcnow,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        default=utcnow,
        onupdate=utcnow,
        nullable=False,
    )


class JunctionBaseModel(Base):
    __abstract__ = True

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        default=utcnow,
        nullable=False,
    )