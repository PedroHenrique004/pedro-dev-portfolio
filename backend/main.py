from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from src.Profile.routes import router as profile_router
from src.Certificate.routes import router as certificate_router
from src.Experience.routes import router as experience_router

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