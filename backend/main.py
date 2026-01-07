from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Fail-fast startup assertion for import validation
try:
    # Test if modules can be imported without backend. prefix
    import api.v1.api
    import core.config
    import db.init_db
except ImportError as e:
    raise RuntimeError(
        f"""
        Import Error: {e}

        Railway Deployment Configuration:
        - Ensure rootDir is set to '/backend' in Railway settings
        - For local development: uvicorn backend.main:app
        - For Railway deployment: uvicorn main:app (with rootDir=/backend)

        The backend. prefix imports are misconfigured.
        All imports should be relative to the backend directory.
        """
    )

# Validate that imports work before accessing settings
try:
    from api.v1.api import api_router
    from core.config import settings
    from db.init_db import init_db_and_tables
except Exception as e:
    raise RuntimeError(
        f"""
        Runtime Import Error: {e}

        Railway Deployment Configuration:
        - Ensure rootDir is set to '/backend' in Railway settings
        - For local development: uvicorn backend.main:app
        - For Railway deployment: uvicorn main:app (with rootDir=/backend)

        Missing environment variables or import misconfiguration detected.
        Make sure all required environment variables are set.
        """
    )

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