import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from .repository import ExperienceRepository
from .service import ExperienceService
from .schema import ExperienceCreate, ExperiencePatch, ExperienceResponse
from database import get_db


router = APIRouter(
    prefix="/experiences",
    tags=["Experience"]
)

def get_experience_service(db: Session = Depends(get_db)):
    repository = ExperienceRepository(db)
    service = ExperienceService(repository)
    return service


@router.post(
    "/",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar nova experiência"
)
def create_experience(
    experience: ExperienceCreate,
    service: ExperienceService = Depends(get_experience_service)
):
    try:
        return service.create(experience)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.patch(
    "/{experience_id}",
    response_model=ExperienceResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar uma experiência"
)
def update_experience(
    experience_id: uuid.UUID,
    experience: ExperiencePatch,
    service: ExperienceService = Depends(get_experience_service)
):
    try:
        return service.update(experience_id, experience)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/{experience_id}",
    response_model=ExperienceResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar uma experiência"
)
def get_experience(
    experience_id: uuid.UUID,
    service: ExperienceService = Depends(get_experience_service)
):
    try:
        return service.get(experience_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.delete(
    "/{experience_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir uma experiência"
)
def delete_experience(
    experience_id: uuid.UUID,
    service: ExperienceService = Depends(get_experience_service)
):
    try:
        return service.delete(experience_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
