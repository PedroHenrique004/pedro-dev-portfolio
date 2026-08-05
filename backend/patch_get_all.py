import os
import re

base_dir = "/Users/pedrosantos/Desktop/Tudo/2026/Portifolio/Portifolio/backend/src"
modules = ["Profile", "Experience", "Project", "Category", "Testimonial", "Tools"]

for module in modules:
    repo_path = os.path.join(base_dir, module, "repository.py")
    svc_path = os.path.join(base_dir, module, "service.py")
    route_path = os.path.join(base_dir, module, "routes.py")

    model_name = f"{module}Model"
    service_name = f"{module}Service"
    resp_name = f"{module}Response"

    # 1. Update Repository
    with open(repo_path, "r") as f:
        content = f.read()
    
    if "def get_all(" not in content:
        # insert get_all after get
        get_all_code = f"""
    def get_all(self) -> list[{model_name}]:
        return list(self.db.scalars(select({model_name})).all())
"""
        content = content.replace(f"def get(self,", f"{get_all_code}\n    def get(self,")
        with open(repo_path, "w") as f:
            f.write(content)

    # 2. Update Service
    with open(svc_path, "r") as f:
        content = f.read()

    if "def get_all(" not in content:
        get_all_code = f"""
    def get_all(self) -> list[{model_name}]:
        return self.repository.get_all()
"""
        content = content.replace(f"def get(self,", f"{get_all_code}\n    def get(self,")
        with open(svc_path, "w") as f:
            f.write(content)

    # 3. Update Routes
    with open(route_path, "r") as f:
        content = f.read()

    if "def get_all" not in content:
        # Add 'from typing import List' if not present
        if "from typing import List" not in content:
            content = "from typing import List\n" + content
            content = content.replace(f"{resp_name}", f"{resp_name}", 1) # dummy replace

        get_all_code = f"""
@router.get(
    "/",
    response_model=List[{resp_name}],
    status_code=status.HTTP_200_OK,
    summary="Listar {module}s"
)
def get_all(service: {service_name} = Depends(get_{module.lower()}_service)):
    return service.get_all()
"""
        # insert before first @router.get
        if "@router.get(" in content:
            content = content.replace("@router.get(", f"{get_all_code}\n@router.get(", 1)
        else:
            content += f"\n{get_all_code}"

        with open(route_path, "w") as f:
            f.write(content)

print("Patch complete!")
