from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check_returns_200():
    """Verify that GET /health returns HTTP 200 OK."""
    response = client.get("/health")
    assert response.status_code == 200


def test_health_check_returns_healthy_payload():
    """Verify that GET /health returns the exact expected healthy status payload."""
    response = client.get("/health")
    assert response.json() == {"status": "healthy"}
