from fastapi.testclient import TestClient
from main import app
client = TestClient(app)
response = client.get("/projects/")
print("Status Code:", response.status_code)
print("Response JSON:", response.text)
