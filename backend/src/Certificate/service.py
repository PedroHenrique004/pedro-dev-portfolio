import uuid

from .repository import CertificateRepository
from .schema import CertificateCreate, CertificatePatch, CertificateResponse
from src.models.certificate import CertificateModel

class CertificateService:

    def __init__(self, repository: CertificateRepository):
        self.repository = repository

    def create(self, certificate: CertificateCreate) -> CertificateModel:

        if self.repository.verify_duplicated_name(certificate.name):
            raise ValueError ("Já existe um certificado com esse nome")
        

        return self.repository.add(certificate)
    
    def update(self, certificate_id: uuid.UUID, certificate: CertificatePatch) -> CertificateModel:
        
        existing = self.repository.get(certificate_id)

        if not existing:
            raise ValueError("Certificado não encontrado")
        
        updated_certificate = certificate.model_dump(exclude_unset=True)

        if not updated_certificate:
            raise ValueError("Nada foi atualizado")
        
        if self.repository.verify_duplicated_name(certificate.name):
            raise ValueError("Esse nome já existe")
        
        return self.repository.patch(certificate_id, certificate)
    
    def get(self, certificate_id: uuid.UUID) -> CertificateResponse:

        certificate = self.repository.get(certificate_id)

        if not certificate:
            raise ValueError("Não existe certificado com esse id")
        
        return certificate

    def delete(self, certificate_id: uuid.UUID):
        
        certificate = self.repository.get(certificate_id)

        if not certificate:
            raise ValueError("Não existe certificado com esse id")
        
        return self.repository.delete(certificate_id)
