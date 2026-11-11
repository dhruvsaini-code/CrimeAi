"""
Optimization Router: Grid Search, Random Search, and Genetic Algorithm hyperparameter tuning reports.
"""

import json
from fastapi import APIRouter, HTTPException
from backend.config import settings

router = APIRouter(prefix="/optimization", tags=["Model Optimization"])


@router.get("/results")
def get_optimization_results():
    cache_path = settings.MODELS_DIR / "optimization_cache.json"
    if not cache_path.exists():
        raise HTTPException(status_code=503, detail="Optimization cache not found.")
    with open(cache_path, "r", encoding="utf-8") as f:
        return json.load(f)

