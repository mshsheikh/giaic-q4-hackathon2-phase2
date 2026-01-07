from fastapi import APIRouter
from api.v1 import tasks, auth

api_router = APIRouter()
api_router.include_router(tasks.router)
api_router.include_router(auth.router)