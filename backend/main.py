from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.v1.api import api_router
from backend.core.config import settings
from backend.db.init_db import init_db_and_tables

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Initialize database tables on startup
@app.on_event("startup")
async def on_startup():
    await init_db_and_tables()

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Todo Web App Backend API"}