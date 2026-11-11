"""
Clustering Router: K-Means, DBSCAN, Agglomerative, GMM, Spectral, PCA coordinates, and comparison metrics.
"""

import json
from fastapi import APIRouter, HTTPException
from backend.config import settings

router = APIRouter(prefix="/clustering", tags=["Clustering"])


@router.get("/results")
def get_clustering_results():
    cache_path = settings.MODELS_DIR / "clustering_cache.json"
    if not cache_path.exists():
        raise HTTPException(status_code=503, detail="Clustering models not fitted yet. Run scripts/train_models.py.")

    with open(cache_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data

