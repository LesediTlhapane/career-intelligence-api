"""
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
