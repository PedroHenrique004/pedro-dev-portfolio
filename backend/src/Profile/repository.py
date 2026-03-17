import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from src.models.profile import ProfileModel
from .schema import ProfileCreate, ProfilePatch, ProfileResponse

class ProfileRepository:

    def __init__ (self , db: Session):
        self.db = db

    # CRUD
    def add(self, profile: ProfileCreate) -> ProfileModel:
        data = ProfileModel(**profile.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data
    
    def update(self, profile_id: uuid.UUID, profile: ProfilePatch) -> ProfileModel | None:
        data = self.db.scalar(select(ProfileModel).where(ProfileModel.id == profile_id))

        if not data:
            return None
        
        for field, value in profile.model_dump(exclude_unset=True).items():
            setattr(data, field, value)
        
        self.db.commit()
        self.db.refresh(data)
        return data
    
    def get(self, profile_id: uuid.UUID) -> ProfileModel | None:
        data = self.db.scalar(select(ProfileModel).where(ProfileModel.id == profile_id))

        if not data: 
            return None
        
        return data
    
    def delete(self, profile_id: uuid.UUID) -> bool:
        data = self.db.scalar(select(ProfileModel).where(ProfileModel.id == profile_id))

        if not data:
            return False

        self.db.delete(data)
        self.db.commit()

        return True

    # Validations:
    def verify_duplicated_email(self, email: str) -> bool:

        data = self.db.scalar(select(ProfileModel).where(ProfileModel.email == email))

        if data:
            return True
        else:
            return False