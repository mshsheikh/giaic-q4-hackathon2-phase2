from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Todo Web App Backend API"}

def test_api_v1_router():
    """Test that the API router is properly included"""
    response = client.get("/api/v1/tasks")
    # This should return 401 because authentication is required
    assert response.status_code == 401

def test_auth_endpoints_exist():
    """Test that auth endpoints exist"""
    # Test that we get a proper response (405 for method not allowed is OK, means endpoint exists)
    response = client.get("/api/v1/auth/register")
    # Should return 405 (method not allowed) or 401 (unauthorized) - both mean endpoint exists
    assert response.status_code in [401, 405, 422]

    response = client.get("/api/v1/auth/login")
    assert response.status_code in [401, 405, 422]

def test_tasks_endpoints_exist():
    """Test that task endpoints exist"""
    response = client.get("/api/v1/tasks")
    # Should return 401 because auth is required
    assert response.status_code == 401