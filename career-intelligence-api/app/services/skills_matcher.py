"""
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
