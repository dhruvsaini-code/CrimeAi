"""
Cases Router: Filterable, searchable, paginated case exploration and individual case details.
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from backend.database import repo
from backend.schemas import CasesResponse

router = APIRouter(prefix="/cases", tags=["Cases"])


@router.get("", response_model=CasesResponse)
def list_cases(
    query: Optional[str] = Query(None, description="Search term across name, country, or summary"),
    country: Optional[str] = Query(None, description="Filter by country"),
    macro_region: Optional[str] = Query(None, description="Filter by macro-region"),
    method_category: Optional[str] = Query(None, description="Filter by method category"),
    victim_demographic: Optional[str] = Query(None, description="Filter by victim demographic"),
    decade: Optional[int] = Query(None, description="Filter by active decade"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=500),
):
    result = repo.filter_cases(
        query=query,
        country=country,
        macro_region=macro_region,
        method_category=method_category,
        victim_demographic=victim_demographic,
        decade=decade,
        skip=skip,
        limit=limit,
    )
    return result


@router.get("/filters")
def get_filter_options():
    return repo.get_filter_options()


@router.get("/{case_id}")
def get_case_detail(case_id: str):
    case = repo.get_case_by_id(case_id)
    if not case:
        raise HTTPException(status_code=404, detail=f"Case with ID '{case_id}' not found.")
    return case

