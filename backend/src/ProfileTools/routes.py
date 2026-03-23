import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from typing import List

from .repository import ProfileToolsRepository
from .service import ProfileToolsService
from .schema import ProfileToolsResponse
from database import get_db


router = APIRouter(
    prefix="/profiles/{profile_id}/tools",
    tags=["Profile Tools"]
)

def get_profile_tools_service(db: Session = Depends(get_db)):
    repository = ProfileToolsRepository(db)
    service = ProfileToolsService(repository)
    return service


@router.post(
    "/{tool_id}",
    response_model=ProfileToolsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Vincular uma ferramenta ao perfil"
)
def add_tool_to_profile(
    profile_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ProfileToolsService = Depends(get_profile_tools_service)
):
    try:
        return service.add_tool(profile_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/",
    response_model=List[ProfileToolsResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar ferramentas do perfil"
)
def get_profile_tools(
    profile_id: uuid.UUID,
    service: ProfileToolsService = Depends(get_profile_tools_service)
):
    return service.get_all(profile_id)


@router.delete(
    "/{tool_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Desvincular uma ferramenta do perfil"
)
def remove_tool_from_profile(
    profile_id: uuid.UUID,
    tool_id: uuid.UUID,
    service: ProfileToolsService = Depends(get_profile_tools_service)
):
    try:
        return service.remove_tool(profile_id, tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
