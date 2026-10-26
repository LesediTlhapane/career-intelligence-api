# Career Intelligence API

A professional, modular REST API designed to evaluate candidate competencies against job posting requirements, compute skills-match percentages, pinpoint missing skill gaps, and provide targeted developmental recommendations.

This repository represents the initial architectural foundation and project scaffold, prepared for focused business logic and test development in Visual Studio Code.

---

## Architecture & Folder Responsibilities

```text
career-intelligence-api/
│
├── app/                        # Main application package
│   ├── __init__.py             # Package marker & version definition
│   ├── main.py                 # Application entry point; initializes FastAPI and includes routers
│   │
│   ├── api/                    # Transport & routing layer
│   │   ├── __init__.py
│   │   └── routes.py           # Endpoint definitions (GET /health and future route declarations)
│   │
│   ├── schemas/                # Data transfer objects & validation
│   │   ├── __init__.py
│   │   └── skills.py           # Pydantic models for candidate skills and matching payloads (TODO)
│   │
│   └── services/               # Pure domain & business logic
│       ├── __init__.py
│       └── skills_matcher.py   # Skills matching algorithm and recommendation generator (TODO)
│
├── tests/                      # Automated test suite
│   ├── __init__.py
│   ├── test_health.py          # Operational verification for GET /health endpoint
│   ├── test_skills_matcher.py  # Unit tests for the matching algorithms (TODO)
│   └── test_skills_api.py      # Integration and contract tests for API endpoints (TODO)
│
├── .env.example                # Safe environment variable template (no credentials)
├── .gitignore                  # Exclusion rules for venv, cache files, and IDE artifacts
├── requirements.txt            # Minimal scaffold dependencies
└── README.md                   # Setup and execution guide
```

### Folder Breakdown

- **`app/`**: Contains all source code for the running application. Decoupled from tests and environment management.
- **`app/api/`**: Responsible for HTTP routing, request deserialization, status codes, and HTTP responses. Contains no raw business calculation logic.
- **`app/schemas/`**: Responsible for data integrity. Uses Pydantic to enforce type safety, input validation, and clear JSON response schemas.
- **`app/services/`**: Houses standalone business logic (`skills_matcher.py`). Kept framework-agnostic so calculation rules can be unit tested in isolation without spinning up HTTP servers.
- **`tests/`**: Contains pytest test cases. Organizes unit tests (services) separately from integration tests (API endpoints).

---

## Technology Stack

- **Python 3.11+**
- **FastAPI**: Modern, high-performance web framework for building APIs.
- **Uvicorn**: Lightning-fast ASGI web server implementation.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **pytest**: Robust automated testing framework.
- **HTTPX**: Modern async/sync HTTP client used by FastAPI's `TestClient`.

---

## Setup Instructions (Windows PowerShell)

Follow these steps in Windows PowerShell to set up your local development environment:

### 1. Navigate to the Project Root
```powershell
cd career-intelligence-api
```

### 2. Create a Virtual Environment
```powershell
python -m venv .venv
```

### 3. Activate the Virtual Environment
```powershell
.\.venv\Scripts\Activate.ps1
```

> **PowerShell Execution Policy Tip**: If you encounter an execution policy error (`running scripts is disabled on this system`), run the following command for your current PowerShell session:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
> .\.venv\Scripts\Activate.ps1
> ```

When active, your PowerShell prompt will display `(.venv)`.

### 4. Upgrade Pip and Install Dependencies
```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Create Local Environment Configuration
```powershell
Copy-Item .env.example .env
```

---

## Starting the Application

With your virtual environment active, launch the Uvicorn development server:

```powershell
uvicorn app.main:app --reload --port 8000
```

- `--reload`: Enables hot-reloading so code updates take effect automatically during development.
- `--port 8000`: Binds the server to port 8000 (accessible on `127.0.0.1:8000`).

### Verify Server Operation

1. **Interactive API Documentation (Swagger UI)**:
   Open your browser and navigate to:
   [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

2. **Health Check Endpoint**:
   Open [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) or run in PowerShell:
   ```powershell
   Invoke-RestMethod -Uri http://127.0.0.1:8000/health
   ```
   **Expected Response**:
   ```json
   {
     "status": "healthy"
   }
   ```

---

## Running Automated Tests

Run the test suite using `pytest`:

```powershell
# Run all tests
pytest

# Run tests with verbose output
pytest -v

# Run only the health check test
pytest tests/test_health.py
```

All health check tests in `tests/test_health.py` will pass immediately out of the box.

---

## Next Steps with Your Mentor in VS Code

1. **Define Pydantic Schemas (`app/schemas/skills.py`)**:
   - Create request models for candidate skills and job requirements.
   - Create response models detailing match percentage, matching skills, missing skills, and recommendations.
2. **Develop the Skills Matcher Service (`app/services/skills_matcher.py`)**:
   - Implement the comparison and scoring algorithm.
   - Handle text normalization, set operations, and gap identification.
3. **Connect API Routes (`app/api/routes.py`)**:
   - Expose `POST /skills/match` receiving validated schemas and invoking the service.
4. **Implement Unit & Integration Tests (`tests/test_skills_matcher.py` & `tests/test_skills_api.py`)**:
   - Write comprehensive test cases covering edge cases (0% match, 100% match, partial overlap, casing differences).
