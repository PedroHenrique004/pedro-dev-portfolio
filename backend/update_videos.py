import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
import os

DATABASE_URL = "postgresql+asyncpg://neondb_owner:npg_a75KSkgxEubi@ep-solitary-mud-acy9kq7c.sa-east-1.aws.neon.tech/neondb?ssl=require"
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def main():
    async with async_session() as session:
        # Update Croak
        await session.execute(
            text("UPDATE project SET video_url = :url WHERE title ILIKE :title"),
            {"url": "https://youtube.com/shorts/V9vWV8apKrE", "title": "%Croak%"}
        )
        # Update Mindask
        await session.execute(
            text("UPDATE project SET video_url = :url WHERE title ILIKE :title"),
            {"url": "https://youtube.com/shorts/VwOhdrJzX0M", "title": "%Mindask%"}
        )
        await session.commit()
        print("Updated video URLs successfully!")

if __name__ == "__main__":
    asyncio.run(main())
