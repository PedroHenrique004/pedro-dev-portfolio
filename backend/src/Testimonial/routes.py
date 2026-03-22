import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from .repository import TestimonialRepository
from .service import TestimonialService
from .schema import TestimonialCreate, TestimonialPatch, TestimonialResponse
from database import get_db


router = APIRouter(
    prefix="/testimonials",
    tags=["Testimonial"]
)

def get_testimonial_service(db: Session = Depends(get_db)):
    repository = TestimonialRepository(db)
    service = TestimonialService(repository)
    return service


@router.post(
    "/",
    response_model=TestimonialResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo depoimento"
)
def create_testimonial(
    testimonial: TestimonialCreate,
    service: TestimonialService = Depends(get_testimonial_service)
):
    try:
        return service.create(testimonial)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.patch(
    "/{testimonial_id}",
    response_model=TestimonialResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar um depoimento"
)
def update_testimonial(
    testimonial_id: uuid.UUID,
    testimonial: TestimonialPatch,
    service: TestimonialService = Depends(get_testimonial_service)
):
    try:
        return service.update(testimonial_id, testimonial)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/{testimonial_id}",
    response_model=TestimonialResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar um depoimento"
)
def get_testimonial(
    testimonial_id: uuid.UUID,
    service: TestimonialService = Depends(get_testimonial_service)
):
    try:
        return service.get(testimonial_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.delete(
    "/{testimonial_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir um depoimento"
)
def delete_testimonial(
    testimonial_id: uuid.UUID,
    service: TestimonialService = Depends(get_testimonial_service)
):
    try:
        return service.delete(testimonial_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
