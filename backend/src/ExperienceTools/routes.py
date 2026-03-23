import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from typing import List

from .repository import ExperienceToolsRepository
from .service import ExperienceToolsService
from .schema import ExperienceToolsResponse
from database import get_db


router = APIRouter(
    prefix="/experiences/{experience_id}/tools",
    tags=["Experience Tools"]
)

def get_experience_tools_service(db: Session = Depends(get_db)):
    repository = ExperienceToolsRepository(db)
    service = ExperienceToolsService(repository)
    return service


@router.post(
    "/{tool_id}",
    response_model=ExperienceToolsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Vincular uma ferramenta à experiência"
)
def add_tool_to_experience(
    experience_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ExperienceToolsService = Depends(get_experience_tools_service)
):
    try:
        return service.add_tool(experience_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/",
    response_model=List[ExperienceToolsResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar ferramentas da experiência"
)
def get_experience_tools(
    experience_id: uuid.UUID,
    service: ExperienceToolsService = Depends(get_experience_tools_service)
):
    return service.get_all(experience_id)


@router.delete(
    "/{tool_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Desvincular uma ferramenta da experiência"
)
def remove_tool_from_experience(
    experience_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ExperienceToolsService = Depends(get_experience_tools_service)
):
    try:
        return service.remove_tool(experience_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
