from fastapi import FastAPI
from app.api.routes import router as api_router

app = FastAPI(
    title="Career Intelligence API",
    description="A REST API for comparing candidate skills against job requirements.",
    version="0.1.0",
)

# Include application routing from the API module
app.include_router(api_router)


@app.get("/", tags=["Root"])
def root() -> dict[str, str]:
    """Root endpoint providing quick navigation links."""
    return {
        "message": "Welcome to the Career Intelligence API",
        "docs": "/docs",
        "health": "/health",
    }
