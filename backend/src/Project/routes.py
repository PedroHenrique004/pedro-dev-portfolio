import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from .repository import ProjectRepository
from .service import ProjectService
from .schema import ProjectCreate, ProjectPatch, ProjectResponse
from database import get_db


router = APIRouter(
    prefix="/projects",
    tags=["Project"]
)

def get_project_service(db: Session = Depends(get_db)):
    repository = ProjectRepository(db)
    service = ProjectService(repository)
    return service


@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo projeto"
)
def create_project(
    project: ProjectCreate,
    service: ProjectService = Depends(get_project_service)
):
    try:
        return service.create(project)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.patch(
    "/{project_id}",
    response_model=ProjectResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar um projeto"
)
def update_project(
    project_id: uuid.UUID,
    project: ProjectPatch,
    service: ProjectService = Depends(get_project_service)
):
    try:
        return service.update(project_id, project)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar um projeto"
)
def get_project(
    project_id: uuid.UUID,
    service: ProjectService = Depends(get_project_service)
):
    try:
        return service.get(project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.delete(
    "/{project_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir um projeto"
)
def delete_project(
    project_id: uuid.UUID,
    service: ProjectService = Depends(get_project_service)
):
    try:
        return service.delete(project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
