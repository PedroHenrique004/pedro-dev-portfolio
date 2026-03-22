import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from .repository import CategoryRepository
from .service import CategoryService
from .schema import CategoryCreate, CategoryPatch, CategoryResponse
from starlette import status

router = APIRouter(
    prefix="/categories",
    tags=["Category"]
)

def get_category_service(db: Session = Depends(get_db)):
    repository = CategoryRepository(db)
    service = CategoryService(repository)

    return service

@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar categoria"
)
def create_category(
    category: CategoryCreate,
    service: CategoryService = Depends(get_category_service)
):
    try:
        return service.create(category)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.patch(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
    summary="Atualizar categoria"
)
def update_category(
    category_id: uuid.UUID,
    category: CategoryPatch,
    service: CategoryService = Depends(get_category_service)
):
    try:
        return service.update(category_id, category)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
    summary="Encontrar categoria"
)
def get_category(
    category_id: uuid.UUID,
    service: CategoryService = Depends(get_category_service)
):
    try:
        return service.get(category_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.delete(
    "/{category_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir categoria"
)
def delete_category(
    category_id: uuid.UUID,
    service: CategoryService = Depends(get_category_service)
):
    try:
        return service.delete(category_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))