from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db

app = FastAPI()

@app.get('/')
async def root():
    return {"message " : " Hello world"}

@app.get('/health')
async def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status " : " Banco conectado"}