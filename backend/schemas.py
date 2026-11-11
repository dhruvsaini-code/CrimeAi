"""
CrimePattern AI — Pydantic Schemas for Requests and Responses.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class CaseItem(BaseModel):
    case_id: str
    case_name: str
    country: str
    macro_region: str
    latitude: float
    longitude: float
    active_start_year: int
    active_end_year: int
    active_decade: int
    duration_years: int
    victims_proven: int
    victims_possible: Optional[int] = None
    victims_confessed: Optional[int] = None
    victims_max: int
    victim_count_category: str
    victim_demographic: str
    method_category: str
    location_type: str
    operated_alone: bool
    medical_professional: bool
    law_enforcement: bool
    summary: str
    source_title: str
    source_url: str
    verification_status: str
    data_completeness_pct: float


class CasesResponse(BaseModel):
    total: int
    skip: int
    limit: int
    cases: List[CaseItem]


class AnalyzeCaseRequest(BaseModel):
    macro_region: str = Field(..., description="Macro geographic region, e.g. North America, Europe, Asia")
    method_category: str = Field(..., description="Method category, e.g. Strangulation / Asphyxiation, Firearm")
    victim_demographic: str = Field(..., description="Victim profile, e.g. Young Adults / Students, Children / Minors")
    active_decade: int = Field(1980, description="Decade active, e.g. 1970, 1980, 1990")
    location_type: str = Field("Highway / Rural / Remote", description="Site type")
    written_description: Optional[str] = Field(None, description="Optional written narrative description of case attributes")


class SearchRequest(BaseModel):
    query: str
    method: str = "hybrid"  # "tfidf", "bm25", "semantic", "knn", "hybrid"
    top_k: int = 5

