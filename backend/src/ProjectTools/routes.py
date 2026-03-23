import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from typing import List

from .repository import ProjectToolsRepository
from .service import ProjectToolsService
from .schema import ProjectToolsResponse
from database import get_db


router = APIRouter(
    prefix="/projects/{project_id}/tools",
    tags=["Project Tools"]
)

def get_project_tools_service(db: Session = Depends(get_db)):
    repository = ProjectToolsRepository(db)
    service = ProjectToolsService(repository)
    return service


@router.post(
    "/{tool_id}",
    response_model=ProjectToolsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Vincular uma ferramenta ao projeto"
)
def add_tool_to_project(
    project_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ProjectToolsService = Depends(get_project_tools_service)
):
    try:
        return service.add_tool(project_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/",
    response_model=List[ProjectToolsResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar ferramentas do projeto"
)
def get_project_tools(
    project_id: uuid.UUID,
    service: ProjectToolsService = Depends(get_project_tools_service)
):
    return service.get_all(project_id)


@router.delete(
    "/{tool_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Desvincular uma ferramenta do projeto"
)
def remove_tool_from_project(
    project_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ProjectToolsService = Depends(get_project_tools_service)
):
    try:
        return service.remove_tool(project_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
