from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Todo Web App Backend API"}

def test_api_v1_router():
    # Test that the API router is properly included
    response = client.get("/api/v1/tasks")
    # This should return 401 because authentication is required
    assert response.status_code == 401