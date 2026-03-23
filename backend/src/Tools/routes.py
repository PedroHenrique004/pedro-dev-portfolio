import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from .repository import ToolsRepository
from .service import ToolsService
from .schema import ToolsCreate, ToolsPatch, ToolsResponse
from database import get_db


router = APIRouter(
    prefix="/tools",
    tags=["Tools"]
)

def get_tools_service(db: Session = Depends(get_db)):
    repository = ToolsRepository(db)
    service = ToolsService(repository)
    return service


@router.post(
    "/",
    response_model=ToolsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar nova ferramenta"
)
def create_tool(
    tool: ToolsCreate,
    service: ToolsService = Depends(get_tools_service)
):
    try:
        return service.create(tool)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.patch(
    "/{tool_id}",
    response_model=ToolsResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar uma ferramenta"
)
def update_tool(
    tool_id: uuid.UUID,
    tool: ToolsPatch,
    service: ToolsService = Depends(get_tools_service)
):
    try:
        return service.update(tool_id, tool)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/{tool_id}",
    response_model=ToolsResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar uma ferramenta"
)
def get_tool(
    tool_id: uuid.UUID,
    service: ToolsService = Depends(get_tools_service)
):
    try:
        return service.get(tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.delete(
    "/{tool_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir uma ferramenta"
)
def delete_tool(
    tool_id: uuid.UUID,
    service: ToolsService = Depends(get_tools_service)
):
    try:
        return service.delete(tool_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
