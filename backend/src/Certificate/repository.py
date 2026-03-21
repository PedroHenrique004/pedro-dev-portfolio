import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import CertificateCreate, CertificatePatch, CertificateResponse 
from src.models.certificate import CertificateModel


class CertificateRepository:

    # INIT
    def __init__(self, db: Session):
        self.db = db

    # CRUD
    def add(self, certificate: CertificateCreate) -> CertificateModel:
        certificate = CertificateModel(**certificate.model_dump())

        self.db.add(certificate)
        self.db.commit()
        self.db.refresh(certificate)

        return certificate
    
    def patch(self, certificate_id: uuid.UUID, certificate: CertificatePatch) -> CertificateModel | None:

        existing = self.db.scalar(select(CertificateModel).where(CertificateModel.id == certificate_id))

        if not existing:
            return None

        for field, value in certificate.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)

        self.db.commit()
        self.db.refresh(existing)
        return existing
    
    def get(self, certificate_id: uuid.UUID) -> CertificateResponse | None:
        certificate = self.db.scalar(select(CertificateModel).where(CertificateModel.id == certificate_id))

        if not certificate:
            return None
        
        return certificate
    
    def delete(self, certificate_id: uuid.UUID) -> bool:

        certificate = self.db.scalar(select(CertificateModel).where(CertificateModel.id == certificate_id))

        if not certificate:
            return False
        
        self.db.delete(certificate)
        self.db.commit()

        return True
    
    # VALIDATIONS
    def verify_duplicated_name(self, name: str) -> bool:
        certificate = self.db.scalar(select(CertificateModel).where(CertificateModel.name == name))

        if certificate:
            return True
        else: 
            return False