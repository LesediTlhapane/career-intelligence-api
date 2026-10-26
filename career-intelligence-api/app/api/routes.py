from fastapi import APIRouter

router = APIRouter()


@router.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    """
    Health check endpoint.
    Returns status indicating the service is operating normally.
    """
    return {"status": "healthy"}


# ==============================================================================
# TODO: Skills Intelligence Endpoints
# Once app/schemas/skills.py and app/services/skills_matcher.py are implemented,
# define your POST endpoint here (e.g., @router.post("/skills/match")) to accept
# candidate skills and job requirements, invoke the skills matcher service,
# and return the evaluated match report.
# ==============================================================================
