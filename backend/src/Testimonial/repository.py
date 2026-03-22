import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import TestimonialCreate, TestimonialPatch
from src.models.testimonial import TestimonialModel


class TestimonialRepository:

    def __init__(self, db: Session):
        self.db = db

    # CRUD
    def add(self, testimonial: TestimonialCreate) -> TestimonialModel:
        data = TestimonialModel(**testimonial.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data

    def patch(self, testimonial_id: uuid.UUID, testimonial: TestimonialPatch) -> TestimonialModel | None:
        existing = self.db.scalar(select(TestimonialModel).where(TestimonialModel.id == testimonial_id))

        if not existing:
            return None

        for field, value in testimonial.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)

        self.db.commit()
        self.db.refresh(existing)
        return existing

    def get(self, testimonial_id: uuid.UUID) -> TestimonialModel | None:
        data = self.db.scalar(select(TestimonialModel).where(TestimonialModel.id == testimonial_id))

        if not data:
            return None

        return data

    def delete(self, testimonial_id: uuid.UUID) -> bool:
        data = self.db.scalar(select(TestimonialModel).where(TestimonialModel.id == testimonial_id))

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # VALIDATIONS
    def verify_duplicated_testimonial(self, name: str, company: str) -> bool:
        data = self.db.scalar(
            select(TestimonialModel).where(
                TestimonialModel.name == name,
                TestimonialModel.company == company
            )
        )
        return data is not None
