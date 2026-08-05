import asyncio
from logging.config import fileConfig
from sqlalchemy.ext.asyncio import create_async_engine

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from database import Base
from models.project import ProjectModel
from models.category import CategoryModel
from models.certificate import CertificateModel
from models.experience import ExperienceModel
from models.profile import ProfileModel
from models.testimonial import TestimonialModel
from models.tools import ToolsModel
from models.project_tools import ProjectToolsModel
from models.experience_tools import ExperienceToolsModel
from models.profile_tools import ProfileToolsModel

target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    database_url = os.environ.get("DATABASE_URL") or config.get_main_option("sqlalchemy.url")
    if database_url and database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url and database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        
    connectable = create_async_engine(database_url)
    async with connectable.connect() as connection:
        await connection.run_sync(run_migrations)
    await connectable.dispose()

asyncio.run(run_migrations_online())

