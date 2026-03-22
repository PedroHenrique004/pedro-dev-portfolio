import uuid
from .schema import TestimonialCreate, TestimonialPatch
from .repository import TestimonialRepository


class TestimonialService:

    def __init__(self, repository: TestimonialRepository):
        self.repository = repository

    def create(self, testimonial: TestimonialCreate):
        if self.repository.verify_duplicated_testimonial(testimonial.name, testimonial.company):
            raise ValueError("Já existe um depoimento dessa pessoa nessa empresa")

        return self.repository.add(testimonial)

    def update(self, testimonial_id: uuid.UUID, testimonial: TestimonialPatch):
        existing = self.repository.get(testimonial_id)

        if not existing:
            raise ValueError("Depoimento não encontrado")

        updated_testimonial = testimonial.model_dump(exclude_unset=True)

        if not updated_testimonial:
            raise ValueError("Nada foi atualizado")

        name = testimonial.name or existing.name
        company = testimonial.company or existing.company

        if (testimonial.name or testimonial.company):
            if name != existing.name or company != existing.company:
                if self.repository.verify_duplicated_testimonial(name, company):
                    raise ValueError("Já existe um depoimento dessa pessoa nessa empresa")

        return self.repository.patch(testimonial_id, testimonial)

    def get(self, testimonial_id: uuid.UUID):
        testimonial = self.repository.get(testimonial_id)

        if not testimonial:
            raise ValueError("Depoimento não encontrado")

        return testimonial

    def delete(self, testimonial_id: uuid.UUID):
        testimonial = self.repository.get(testimonial_id)

        if not testimonial:
            raise ValueError("Depoimento não encontrado")

        return self.repository.delete(testimonial_id)
