from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from .repository import CertificateRepository
from .schema import CertificateCreate, CertificatePatch, CertificateResponse
from .service import CertificateService
from starlette import status
import uuid

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)

def get_certificate_service(db: Session = Depends(get_db)):
    repository = CertificateRepository(db)
    service = CertificateService(repository)

    return service

@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo certificado"
)
def create_certificate(
    certificate: CertificateCreate,
    service: CertificateService = Depends(get_certificate_service)
) -> CertificateResponse:
    try:
        return service.create(certificate)
    except ValueError as e:
        raise HTTPException(status_code=400 , detail=str(e))
    
@router.patch(
    "/{certificate_id}",
    status_code=status.HTTP_200_OK,
    summary="Atualizar certificado"
)
def updated_certificate(
    certificate_id: uuid.UUID,
    certificate: CertificatePatch,
    service: CertificateService = Depends(get_certificate_service)
):
    try:
        return service.update(certificate_id, certificate)

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.get(
    "/{certificate_id}",
    status_code=status.HTTP_200_OK,
    summary="Encontrar um certificado"
)
def get_certificate(
    certificate_id: uuid.UUID,
    service: CertificateService = Depends(get_certificate_service)
) -> CertificateResponse:
    try:
        return service.get(certificate_id)
    
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.delete(
    "/{certificate_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Excluir certificado"
)
def delete_certificate(
    certificate_id: uuid.UUID,
    service: CertificateService = Depends(get_certificate_service)
):
    try:
        return service.delete(certificate_id)
    
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))