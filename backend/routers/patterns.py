"""
Patterns Router: Apriori association rules, frequent itemsets, and sequential patterns.
"""

import json
from fastapi import APIRouter, HTTPException
from backend.config import settings

router = APIRouter(prefix="/patterns", tags=["Pattern Discovery"])


@router.get("/rules")
def get_association_rules():
    cache_path = settings.MODELS_DIR / "association_cache.json"
    if not cache_path.exists():
        raise HTTPException(status_code=503, detail="Association cache not found.")
    with open(cache_path, "r", encoding="utf-8") as f:
        return json.load(f)

