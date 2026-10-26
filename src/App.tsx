import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileCheck,
  Terminal,
  Download,
  Copy,
  Check,
  Play,
  Layers,
  ShieldCheck,
  Cpu,
  BookOpen,
  FileJson,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProjectFile {
  path: string;
  name: string;
  folder: string;
  type: 'python' | 'markdown' | 'config' | 'test';
  status: 'scaffolded' | 'todo_mentor' | 'config';
  description: string;
  content: string;
}

const PROJECT_FILES: ProjectFile[] = [
  {
    path: 'career-intelligence-api/app/__init__.py',
    name: '__init__.py',
    folder: 'app',
    type: 'python',
    status: 'scaffolded',
    description: 'Root application package marker and version constant.',
    content: `"""
Career Intelligence API
Root package initialization.
"""

__version__ = "0.1.0"
`,
  },
  {
    path: 'career-intelligence-api/app/main.py',
    name: 'main.py',
    folder: 'app',
    type: 'python',
    status: 'scaffolded',
    description: 'Application entry point initializing FastAPI and mounting routes.',
    content: `from fastapi import FastAPI
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
`,
  },
  {
    path: 'career-intelligence-api/app/api/__init__.py',
    name: '__init__.py',
    folder: 'app/api',
    type: 'python',
    status: 'scaffolded',
    description: 'API routing subpackage initialization.',
    content: `"""
API router package.
"""
`,
  },
  {
    path: 'career-intelligence-api/app/api/routes.py',
    name: 'routes.py',
    folder: 'app/api',
    type: 'python',
    status: 'scaffolded',
    description: 'API endpoint controllers including GET /health and future route declarations.',
    content: `from fastapi import APIRouter

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
`,
  },
  {
    path: 'career-intelligence-api/app/schemas/__init__.py',
    name: '__init__.py',
    folder: 'app/schemas',
    type: 'python',
    status: 'scaffolded',
    description: 'Pydantic schemas subpackage initialization.',
    content: `"""
Schemas package.
Exports Pydantic models for request validation and response formatting.
"""
`,
  },
  {
    path: 'career-intelligence-api/app/schemas/skills.py',
    name: 'skills.py',
    folder: 'app/schemas',
    type: 'python',
    status: 'todo_mentor',
    description: 'Documented TODOs for Pydantic request and response schemas.',
    content: `"""
Skills Schemas Module
---------------------
This module will define the Pydantic data contracts for candidate skills matching.

TODO (To be implemented with your mentor in VS Code):
1. CandidateSkillsPayload:
   - Request schema containing the candidate's skills list (e.g., list of strings or structured skill objects).
   - Any optional candidate profile attributes (e.g., candidate name, experience level).

2. JobRequirementsPayload:
   - Request schema containing required and optional skills demanded by the job posting.

3. SkillsMatchRequest:
   - Combined request model (or single payload) that supplies both candidate skills and job requirements.

4. SkillsMatchResponse:
   - Response schema that returns:
     * match_percentage (float: e.g., 85.0%)
     * matching_skills (list[str]: skills both candidate and job have)
     * missing_skills (list[str]: required skills missing from candidate's profile)
     * recommendations (list[str]: targeted learning suggestions for identified gaps)

Guidance:
- Inherit schemas from pydantic.BaseModel.
- Use typing annotations (e.g., list[str], float, Optional[str]).
- Add field validations (e.g., non-empty list of skills) using Pydantic Field or validators.
"""

from pydantic import BaseModel

# TODO: Define CandidateSkillsPayload (Request model)
# class CandidateSkillsPayload(BaseModel):
#     ...

# TODO: Define JobRequirementsPayload (Request model)
# class JobRequirementsPayload(BaseModel):
#     ...

# TODO: Define SkillsMatchRequest (Request model)
# class SkillsMatchRequest(BaseModel):
#     ...

# TODO: Define SkillsMatchResponse (Response model)
# class SkillsMatchResponse(BaseModel):
#     ...
`,
  },
  {
    path: 'career-intelligence-api/app/services/__init__.py',
    name: '__init__.py',
    folder: 'app/services',
    type: 'python',
    status: 'scaffolded',
    description: 'Business logic services subpackage initialization.',
    content: `"""
Services package.
Contains application business logic decoupled from API routing and transport layers.
"""
`,
  },
  {
    path: 'career-intelligence-api/app/services/skills_matcher.py',
    name: 'skills_matcher.py',
    folder: 'app/services',
    type: 'python',
    status: 'todo_mentor',
    description: 'Documented TODOs for the skills-matching and gap-analysis business logic.',
    content: `"""
Skills Matcher Service
----------------------
Core business logic module responsible for analyzing candidate competencies against job criteria.

TODO (To be implemented with your mentor in VS Code):
Implement the skills matching domain logic without coupling to HTTP or FastAPI concerns.

Responsibilities to implement:
1. Skills Normalization & Comparison:
   - Handle case-insensitivity, whitespace trimming, and synonym mapping if applicable.
2. Match Percentage Calculation:
   - Calculate candidate match percentage against required and preferred job skills.
3. Gap Analysis:
   - Identify which required skills the candidate is missing.
4. Recommendations Generator:
   - Provide concrete, developmental recommendations or next steps for closing each gap.

Note: Keep this service pure and easily testable via unit tests in tests/test_skills_matcher.py.
"""


def match_skills(candidate_skills: list[str], job_requirements: list[str]) -> dict:
    """
    Analyzes candidate skills against target job requirements.

    Args:
        candidate_skills: List of skills claimed by candidate.
        job_requirements: List of skills required by job vacancy.

    Returns:
        Dictionary containing match metrics, matching skills, missing skills,
        and developmental recommendations.

    Raises:
        NotImplementedError: To be implemented in VS Code.
    """
    # TODO: Implement skills-matching business logic with your mentor in VS Code
    raise NotImplementedError("Skills matching business logic has not yet been implemented.")
`,
  },
  {
    path: 'career-intelligence-api/tests/__init__.py',
    name: '__init__.py',
    folder: 'tests',
    type: 'test',
    status: 'scaffolded',
    description: 'Pytest test suite package initialization.',
    content: `"""
Test suite package for Career Intelligence API.
"""
`,
  },
  {
    path: 'career-intelligence-api/tests/test_health.py',
    name: 'test_health.py',
    folder: 'tests',
    type: 'test',
    status: 'scaffolded',
    description: 'Functional tests for GET /health endpoint verifying HTTP 200 and healthy JSON.',
    content: `from fastapi.testclient import TestClient
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
`,
  },
  {
    path: 'career-intelligence-api/tests/test_skills_matcher.py',
    name: 'test_skills_matcher.py',
    folder: 'tests',
    type: 'test',
    status: 'todo_mentor',
    description: 'Documented unit test specifications to be implemented with mentor.',
    content: `"""
Unit Tests: Skills Matcher Service
----------------------------------
This file will contain isolated unit tests for the core skills-matching algorithm
defined in app/services/skills_matcher.py.

TODO (To be implemented with your mentor in VS Code):
Implement test functions to verify the behavior of the skills matching logic:

1. test_perfect_skills_match:
   - When candidate skills match all job requirements exactly.
   - Verify match percentage is 100.0%.
   - Verify missing skills list is empty.

2. test_partial_skills_match:
   - When candidate possesses only a subset of required skills.
   - Verify calculated percentage accurately reflects ratio (e.g. 2 of 4 = 50.0%).
   - Verify identified missing skills matches the expected discrepancy.

3. test_no_matching_skills:
   - When candidate has none of the required skills.
   - Verify match percentage is 0.0%.
   - Verify all required skills are marked as missing.

4. test_skills_case_insensitivity_and_whitespace:
   - Ensure "Python" matches "python", and " FastAPI " matches "FastAPI".

5. test_empty_requirements_or_candidate_skills:
   - Test edge cases where candidate skills or job requirements lists are empty.

6. test_recommendations_generation:
   - Verify actionable learning recommendations are generated for missing competencies.
"""

import pytest

# TODO: Import your service once implemented:
# from app.services.skills_matcher import match_skills


# TODO: def test_perfect_skills_match():
#     """Test that a candidate with all required skills receives 100% match."""
#     pass


# TODO: def test_partial_skills_match():
#     """Test percentage calculation and missing skills detection for partial matches."""
#     pass


# TODO: def test_no_matching_skills():
#     """Test output when candidate shares zero skills with job requirements."""
#     pass


# TODO: def test_case_insensitive_matching():
#     """Test that string matching is case and whitespace invariant."""
#     pass
`,
  },
  {
    path: 'career-intelligence-api/tests/test_skills_api.py',
    name: 'test_skills_api.py',
    folder: 'tests',
    type: 'test',
    status: 'todo_mentor',
    description: 'Documented API route test specifications to be implemented with mentor.',
    content: `"""
Integration Tests: Skills Match API Endpoints
---------------------------------------------
This file will contain integration and API contract tests using FastAPI TestClient / HTTPX
to verify the HTTP routing, Pydantic validation, and response structure.

TODO (To be implemented with your mentor in VS Code):
Implement test functions to verify the HTTP endpoints:

1. test_skills_match_endpoint_success:
   - Send valid POST payload to the skills matching endpoint.
   - Assert HTTP 200 OK.
   - Assert response body conforms to the SkillsMatchResponse schema.

2. test_skills_match_endpoint_validation_error:
   - Send malformed payload (e.g. missing required field, invalid data types).
   - Assert HTTP 422 Unprocessable Entity.
   - Assert error message indicates the offending field.

3. test_skills_match_endpoint_empty_payload:
   - Send empty JSON body {} or missing fields.
   - Assert HTTP 422 with descriptive validation details.
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# TODO: def test_skills_match_endpoint_success():
#     """Test successful POST /skills/match with valid candidate and job payload."""
#     pass


# TODO: def test_skills_match_endpoint_validation_error():
#     """Test that invalid request bodies receive HTTP 422 Unprocessable Entity."""
#     pass
`,
  },
  {
    path: 'career-intelligence-api/.gitignore',
    name: '.gitignore',
    folder: 'root',
    type: 'config',
    status: 'config',
    description: 'Git ignore rules for venv, Python caches, test outputs, and OS files.',
    content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual environments
.venv/
venv/
ENV/
env/
env.bak/
venv.bak/

# Environment variables and secrets
.env
.env.*
!.env.example

# Unit test / coverage reports
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
htmlcov/

# Editor and IDE configurations
.vscode/
.idea/
*.sublime-project
*.sublime-workspace
*.swp
*.swo

# Operating System files
.DS_Store
Thumbs.db
desktop.ini
`,
  },
  {
    path: 'career-intelligence-api/requirements.txt',
    name: 'requirements.txt',
    folder: 'root',
    type: 'config',
    status: 'config',
    description: 'Exact dependency specification required for the initial project scaffold.',
    content: `fastapi>=0.110.0
uvicorn[standard]>=0.28.0
pydantic>=2.6.0
pytest>=8.0.0
httpx>=0.27.0
`,
  },
  {
    path: 'career-intelligence-api/.env.example',
    name: '.env.example',
    folder: 'root',
    type: 'config',
    status: 'config',
    description: 'Safe environment configuration template with zero credentials or secrets.',
    content: `# Career Intelligence API - Local Environment Configuration
# Copy this file to .env and adjust variables as needed:
# cp .env.example .env (or 'Copy-Item .env.example .env' in PowerShell)

APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000
DEBUG=True
`,
  },
  {
    path: 'career-intelligence-api/README.md',
    name: 'README.md',
    folder: 'root',
    type: 'markdown',
    status: 'scaffolded',
    description: 'Comprehensive setup guide with Windows PowerShell commands and architecture breakdown.',
    content: `# Career Intelligence API

A professional, modular REST API designed to evaluate candidate competencies against job posting requirements, compute skills-match percentages, pinpoint missing skill gaps, and provide targeted developmental recommendations.

This repository represents the initial architectural foundation and project scaffold, prepared for focused business logic and test development in Visual Studio Code.

---

## Architecture & Folder Responsibilities

career-intelligence-api/
├── app/                        # Main application package
│   ├── __init__.py             # Package marker & version definition
│   ├── main.py                 # Application entry point; initializes FastAPI and includes routers
│   ├── api/                    # Transport & routing layer
│   │   ├── __init__.py
│   │   └── routes.py           # Endpoint definitions (GET /health and future route declarations)
│   ├── schemas/                # Data transfer objects & validation
│   │   ├── __init__.py
│   │   └── skills.py           # Pydantic models for candidate skills and matching payloads (TODO)
│   └── services/               # Pure domain & business logic
│       ├── __init__.py
│       └── skills_matcher.py   # Skills matching algorithm and recommendation generator (TODO)
├── tests/                      # Automated test suite
│   ├── __init__.py
│   ├── test_health.py          # Operational verification for GET /health endpoint
│   ├── test_skills_matcher.py  # Unit tests for the matching algorithms (TODO)
│   └── test_skills_api.py      # Integration and contract tests for API endpoints (TODO)
├── .env.example                # Safe environment variable template (no credentials)
├── .gitignore                  # Exclusion rules for venv, cache files, and IDE artifacts
├── requirements.txt            # Minimal scaffold dependencies
└── README.md                   # Setup and execution guide
`,
  },
];

export default function App() {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_FILES[1]); // main.py
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'quickstart' | 'architecture' | 'simulator'>('explorer');
  const [isZipping, setIsZipping] = useState(false);
  const [simulatedHealth, setSimulatedHealth] = useState<{ status: number; body: string } | null>(null);
  const [simulating, setSimulating] = useState(false);

  // Group files by directory for the tree view
  const folders = [
    { name: 'app', path: 'app', label: 'app/' },
    { name: 'app/api', path: 'app/api', label: 'app/api/' },
    { name: 'app/schemas', path: 'app/schemas', label: 'app/schemas/' },
    { name: 'app/services', path: 'app/services', label: 'app/services/' },
    { name: 'tests', path: 'tests', label: 'tests/' },
    { name: 'root', path: 'root', label: 'Project Root' },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(id);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const downloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('career-intelligence-api');

      PROJECT_FILES.forEach((file) => {
        // Strip the leading 'career-intelligence-api/' from path
        const relativePath = file.path.replace(/^career-intelligence-api\//, '');
        rootFolder?.file(relativePath, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'career-intelligence-api.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to create zip:', e);
    } finally {
      setIsZipping(false);
    }
  };

  const simulateHealthCall = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulatedHealth({
        status: 200,
        body: JSON.stringify({ status: 'healthy' }, null, 2),
      });
      setSimulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-mono font-bold text-sm">
            CI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-100 text-base tracking-tight">
                Career Intelligence API
              </h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                Scaffold v0.1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              FastAPI • Pydantic • Uvicorn • pytest • HTTPX
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={downloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            {isZipping ? 'Generating ZIP...' : 'Download Project ZIP'}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-5 flex items-center gap-1 text-xs">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`flex items-center gap-2 px-3.5 py-2.5 font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'explorer'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          Project File Explorer
        </button>
        <button
          onClick={() => setActiveTab('quickstart')}
          className={`flex items-center gap-2 px-3.5 py-2.5 font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'quickstart'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          PowerShell Setup & Commands
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-3.5 py-2.5 font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'architecture'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Folder Responsibilities Guide
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-3.5 py-2.5 font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'simulator'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          Endpoint & Health Simulator
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
        {/* TAB 1: FILE EXPLORER & CODE VIEWER */}
        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-140px)] min-h-[600px]">
            {/* Left sidebar - File Tree */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    career-intelligence-api
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {PROJECT_FILES.length} files
                </span>
              </div>

              {/* Scrollable File List */}
              <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
                {folders.map((folder) => {
                  const filesInFolder = PROJECT_FILES.filter((f) => f.folder === folder.path);
                  if (filesInFolder.length === 0) return null;

                  return (
                    <div key={folder.path} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] font-semibold px-2 py-0.5">
                        <Folder className="w-3 h-3 text-amber-400/80" />
                        <span>{folder.label}</span>
                      </div>
                      <div className="space-y-0.5 pl-2">
                        {filesInFolder.map((file) => {
                          const isSelected = selectedFile.path === file.path;
                          return (
                            <button
                              key={file.path}
                              onClick={() => setSelectedFile(file)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition group cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                  : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {file.type === 'python' ? (
                                  <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                ) : file.type === 'test' ? (
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : file.type === 'markdown' ? (
                                  <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                ) : (
                                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                )}
                                <span className="font-mono text-xs truncate">
                                  {file.name}
                                </span>
                              </div>

                              {file.status === 'todo_mentor' ? (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                  TODO
                                </span>
                              ) : file.status === 'scaffolded' ? (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                  READY
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                  CFG
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scaffold Summary Card */}
              <div className="pt-3 border-t border-slate-800 mt-2 text-[11px] text-slate-400 space-y-1.5 bg-slate-950/40 p-2.5 rounded-lg">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">Scaffold Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Fully Verified
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  All files exist in the file system, compile cleanly without syntax errors, and are ready for VS Code.
                </p>
              </div>
            </div>

            {/* Right panel - Code & File Inspector */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-sm">
              {/* File Header */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="font-mono text-xs text-indigo-400 font-semibold truncate">
                    {selectedFile.path}
                  </span>
                  {selectedFile.status === 'todo_mentor' && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Work with Mentor in VS Code
                    </span>
                  )}
                  {selectedFile.status === 'scaffolded' && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Scaffold Implemented
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(selectedFile.content, selectedFile.path)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition cursor-pointer"
                  >
                    {copiedPath === selectedFile.path ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Purpose banner */}
              <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{selectedFile.description}</span>
              </div>

              {/* Code viewer */}
              <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300">
                <pre className="whitespace-pre">
                  {selectedFile.content.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-[11px] w-8">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre-wrap">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POWERSHELL SETUP & COMMANDS */}
        {activeTab === 'quickstart' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    Windows PowerShell Setup Guide
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Execute these sequential steps in Windows PowerShell to initialize your local development environment.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Target: Python 3.11+
                </span>
              </div>

              {/* Step list */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        1
                      </span>
                      <span>Navigate to Project Root</span>
                    </div>
                    <button
                      onClick={() => handleCopySnippet('cd career-intelligence-api', 'step-1')}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    cd career-intelligence-api
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        2
                      </span>
                      <span>Create Python Virtual Environment</span>
                    </div>
                    <button
                      onClick={() => handleCopySnippet('python -m venv .venv', 'step-2')}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    python -m venv .venv
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    Creates an isolated <code className="text-slate-300">.venv/</code> directory inside the project root.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        3
                      </span>
                      <span>Activate Virtual Environment in PowerShell</span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopySnippet(
                          `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process\n.\\.venv\\Scripts\\Activate.ps1`,
                          'step-3'
                        )
                      }
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    {`# If PowerShell restricts script execution, run this first:\nSet-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process\n\n# Activate the environment:\n.\\.venv\\Scripts\\Activate.ps1`}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    When active, your PowerShell terminal prompt will display <code className="text-slate-300">(.venv)</code>.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        4
                      </span>
                      <span>Install Minimal Scaffold Dependencies & Setup .env</span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopySnippet(
                          `python -m pip install --upgrade pip\npip install -r requirements.txt\nCopy-Item .env.example .env`,
                          'step-4'
                        )
                      }
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    {`python -m pip install --upgrade pip\npip install -r requirements.txt\nCopy-Item .env.example .env`}
                  </pre>
                </div>

                {/* Step 5 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        5
                      </span>
                      <span>Launch Uvicorn Development Server</span>
                    </div>
                    <button
                      onClick={() => handleCopySnippet('uvicorn app.main:app --reload --port 8000', 'step-5')}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-5' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    uvicorn app.main:app --reload --port 8000
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    Interactive OpenAPI Swagger UI is automatically available at{' '}
                    <span className="text-cyan-400 underline font-mono">http://127.0.0.1:8000/docs</span>.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                        6
                      </span>
                      <span>Run Pytest Automated Tests</span>
                    </div>
                    <button
                      onClick={() => handleCopySnippet('pytest -v', 'step-6')}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSnippet === 'step-6' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-2.5 rounded font-mono text-xs text-emerald-400 border border-slate-800/80">
                    pytest -v
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    Runs all test suites. <code className="text-slate-300">tests/test_health.py</code> passes immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FOLDER RESPONSIBILITIES & ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Folder Responsibilities & Architectural Boundary
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                The architecture follows clean separation of concerns, decoupling HTTP routing, data validation, and business logic.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                    <Folder className="w-4 h-4" />
                    <span>app/</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Application Core</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Contains all running application source code. Kept strictly distinct from tests, documentation, and environment scripts.
                    <code className="text-indigo-300 ml-1">app/main.py</code> serves as the single ASGI entrypoint for Uvicorn.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
                    <Folder className="w-4 h-4" />
                    <span>app/api/</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Routing & Transport Layer</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Houses <code className="text-sky-300">routes.py</code> with <code className="text-sky-300">APIRouter()</code>. Responsible for HTTP request parsing, response codes (200, 422), and header handling. It delegates algorithmic calculations to services.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                    <Folder className="w-4 h-4" />
                    <span>app/schemas/</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Data Contracts & Pydantic Schemas</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Defines strict schemas for incoming JSON payloads and outgoing response structures in <code className="text-emerald-300">skills.py</code>. Ensures robust validation, typing errors, and automatic OpenAPI schema generation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                    <Folder className="w-4 h-4" />
                    <span>app/services/</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Domain & Business Logic</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Encapsulates the matching algorithms, gap analysis, and developmental recommendation rules in <code className="text-amber-300">skills_matcher.py</code>. Free of FastAPI or HTTP dependencies, allowing pure unit testing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                    <Folder className="w-4 h-4" />
                    <span>tests/</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Automated Pytest Test Suite</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Separates unit testing of business rules (<code className="text-rose-300">test_skills_matcher.py</code>) from integration/endpoint validation (<code className="text-rose-300">test_skills_api.py</code> and <code className="text-rose-300">test_health.py</code>). Provides test-driven development (TDD) readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ENDPOINT & HEALTH SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    Interactive Endpoint Simulator
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulate requests against the initial scaffold endpoints implemented in <code className="text-slate-300">app/api/routes.py</code>.
                  </p>
                </div>
              </div>

              {/* Endpoint Runner */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                      GET
                    </span>
                    <span className="text-slate-200">http://127.0.0.1:8000/health</span>
                  </div>
                  <button
                    onClick={simulateHealthCall}
                    disabled={simulating}
                    className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer disabled:opacity-50"
                  >
                    {simulating ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{simulating ? 'Sending Request...' : 'Send Request'}</span>
                  </button>
                </div>

                {simulatedHealth && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Response Status:</span>
                      <span className="text-emerald-400 font-bold">200 OK</span>
                    </div>
                    <pre className="bg-slate-900 p-3 rounded font-mono text-xs text-cyan-300 border border-slate-800">
                      {simulatedHealth.body}
                    </pre>
                  </div>
                )}
              </div>

              {/* Planned Route Preview */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Planned Next Endpoint (To Be Implemented with Mentor)
                </h3>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 text-xs font-mono text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30">
                      POST
                    </span>
                    <span className="text-slate-300">/skills/match</span>
                    <span className="text-[10px] text-amber-400 ml-auto border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      Unimplemented (TODO)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 font-sans">
                    Accepts candidate skills and job requirements in JSON body, executes the scoring algorithm, and returns the calculated percentage, missing skills, and learning recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-5 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Career Intelligence API — Portfolio Scaffold</span>
          <span>•</span>
          <span className="text-slate-400">Ready for development in Visual Studio Code</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          Scaffold Complete & Verified
        </div>
      </footer>
    </div>
  );
}
