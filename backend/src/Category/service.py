import uuid
from .repository import CategoryRepository
from .schema import CategoryCreate, CategoryPatch


class CategoryService:

    def __init__(self, repository: CategoryRepository):
        self.repository = repository

    def create(self, category: CategoryCreate):
        if self.repository.verify_duplicated_name(category.name):
            raise ValueError("Já existe uma categoria com esse nome")

        return self.repository.add(category)

    def update(self, category_id: uuid.UUID, category: CategoryPatch):
        existing = self.repository.get(category_id)

        if not existing:
            raise ValueError("Categoria não encontrada")

        updated_category = category.model_dump(exclude_unset=True)

        if not updated_category:
            raise ValueError("Nada para atualizar")

        if category.name and self.repository.verify_duplicated_name(category.name):
            if existing.name != category.name:
                raise ValueError("Já existe uma categoria com esse nome")

        return self.repository.patch(category_id, category)

    def get(self, category_id: uuid.UUID):
        category = self.repository.get(category_id)

        if not category:
            raise ValueError("Categoria não encontrada")

        return category

    def delete(self, category_id: uuid.UUID):
        category = self.repository.get(category_id)

        if not category:
            raise ValueError("Categoria não encontrada")

        return self.repository.delete(category_id)
