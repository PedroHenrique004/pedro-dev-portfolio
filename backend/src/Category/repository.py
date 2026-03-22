import uuid
from sqlalchemy import select
from sqlalchemy.orm import Session
from .schema import CategoryCreate, CategoryPatch, CategoryResponse
from src.models.category import CategoryModel

class CategoryRepository:

    def __init__(self, db: Session):
        self.db = db

    #CRUD

    def add(self, category: CategoryCreate) -> CategoryModel:

        data = CategoryModel(**category.model_dump())

        self.db.add(data)
        self.db.commit()
        self.db.refresh(data)

        return data
    
    def patch(self, category_id: uuid.UUID, category: CategoryPatch) -> CategoryModel | None:

        data = self.db.scalar(select(CategoryModel).where(CategoryModel.id == category_id))

        if not data:
            return None
        
        for field, value in category.model_dump(exclude_unset=True).items():
            setattr(data, field, value)      

        self.db.commit()
        self.db.refresh(data)

        return data  
    
    def get(self, category_id: uuid.UUID) -> CategoryModel | None:

        data = self.db.scalar(select(CategoryModel).where(CategoryModel.id == category_id))

        if not data:
            return None
        
        return data
    
    def delete(self, category_id: uuid.UUID) -> bool:

        data = self.db.scalar(select(CategoryModel).where(CategoryModel.id == category_id))

        if not data:
            return False
        
        self.db.delete(data)
        self.db.commit()

        return True

    #VALIDATIONS
    def verify_duplicated_name(self, name: str) -> bool:
        data = self.db.scalar(select(CategoryModel).where(CategoryModel.name == name))

        if data:
            return True
        
        return False

