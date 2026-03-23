from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from src.Profile.routes import router as profile_router
from src.Certificate.routes import router as certificate_router
from src.Experience.routes import router as experience_router
from src.Category.routes import router as category_router
from src.Project.routes import router as project_router
from src.Testimonial.routes import router as testimonial_router
from src.ProfileTools.routes import router as profile_tools_router
from src.Tools.routes import router as tools_router
from src.ExperienceTools.routes import router as experience_tools_router
from src.ProjectTools.routes import router as project_tools_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello world"}

@app.get("/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "Banco conectado"}

app.include_router(profile_router)
app.include_router(certificate_router)
app.include_router(experience_router)
app.include_router(category_router)
app.include_router(project_router)
app.include_router(testimonial_router)
app.include_router(profile_tools_router)
app.include_router(tools_router)
app.include_router(experience_tools_router)
app.include_router(project_tools_router)