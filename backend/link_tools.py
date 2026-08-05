from database import SessionLocal
from src.models.project import ProjectModel
from src.models.project_tools import ProjectToolsModel

db = SessionLocal()

# KeyPanel
keypanel = db.query(ProjectModel).filter(ProjectModel.slug == 'keypanel').first()
kp_tools = ["75a2e4b6-dcec-4e81-a6bb-d6954c161e84", "3c3c50e1-178f-4917-af52-11831386da88", "e0ea2d14-53db-43a5-be8a-ffe43dc0c596"]

# Croak
croak = db.query(ProjectModel).filter(ProjectModel.slug == 'croak').first()
cr_tools = ["75a2e4b6-dcec-4e81-a6bb-d6954c161e84", "d4bfae73-15ff-4a69-b45b-aaab8abd6a7e", "2822d0d2-85a9-4b5a-8dec-c6f05d22a38e"]

# MindAsk
mindask = db.query(ProjectModel).filter(ProjectModel.slug == 'mindask').first()
ma_tools = ["75a2e4b6-dcec-4e81-a6bb-d6954c161e84", "3c3c50e1-178f-4917-af52-11831386da88", "6dc14304-9f0c-4553-b608-d68fe2e427d9"]

for p, tools in [(keypanel, kp_tools), (croak, cr_tools), (mindask, ma_tools)]:
    if p:
        for t in tools:
            exists = db.query(ProjectToolsModel).filter_by(project_id=p.id, tool_id=t).first()
            if not exists:
                pt = ProjectToolsModel(project_id=p.id, tool_id=t)
                db.add(pt)

db.commit()
print("Linked tools!")
