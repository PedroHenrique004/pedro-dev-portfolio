import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from .repository import ProfileRepository
from .service import ProfileService
from database import get_db

from .schema import ProfileCreate, ProfileResponse, ProfilePatch


router = APIRouter(
    prefix="/profiles",
    tags=["Profile"]
)

def get_profile_service(db: Session = Depends(get_db)):
    repository = ProfileRepository(db)
    service = ProfileService(repository)
    return service

@router.post(
    "/",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar um Profile"
)
def create_profile(
    profile: ProfileCreate,
    service: ProfileService = Depends(get_profile_service)
):
    try:
        return service.create(profile)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.patch(
    "/{profile_id}",
    response_model=ProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar um profile"
)
def update_profile(
    profile_id: uuid.UUID,
    profile: ProfilePatch,
    service: ProfileService = Depends(get_profile_service)
):
  try: 
      return service.update(profile_id, profile)
  except ValueError as e:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
  

@router.get(
    "/{profile_id}",
    response_model=ProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar um profile"
)
def get_profile(
    profile_id: uuid.UUID,
    service: ProfileService = Depends(get_profile_service)
):
    try: 
        return service.get(profile_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.delete(
    "/{profile_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir um profile"
)
def delete_profile(
    profile_id: uuid.UUID,
    service: ProfileService = Depends(get_profile_service)
):
    try:
        return service.delete(profile_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
