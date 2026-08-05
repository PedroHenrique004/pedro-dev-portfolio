import os

base_dir = "/Users/pedrosantos/Desktop/Tudo/2026/Portifolio/Portifolio/backend/src"
modules = ["Profile", "Experience", "Project", "Category", "Testimonial", "Tools"]

for module in modules:
    svc_path = os.path.join(base_dir, module, "service.py")
    model_name = f"{module}Model"
    
    with open(svc_path, "r") as f:
        content = f.read()

    # Replace '-> list[ModelName]:' with ':'
    content = content.replace(f"def get_all(self) -> list[{model_name}]:", "def get_all(self):")

    with open(svc_path, "w") as f:
        f.write(content)

print("Services fixed!")
