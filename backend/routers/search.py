"""
Search Router: Unified Intelligent Search with TF-IDF, BM25, SVD Semantic Embeddings, KNN, and Benchmarks.
"""

import json
from fastapi import APIRouter, HTTPException, Query
import joblib
from backend.config import settings
from backend.schemas import SearchRequest

router = APIRouter(prefix="/search", tags=["Search"])

_search_engine = None


def get_engine():
    global _search_engine
    if _search_engine is None:
        model_path = settings.MODELS_DIR / "search_engine.joblib"
        if not model_path.exists():
            raise HTTPException(status_code=503, detail="Search engine not trained yet.")
        _search_engine = joblib.load(model_path)
    return _search_engine


@router.post("")
def execute_search(req: SearchRequest):
    engine = get_engine()
    results = engine.search(query=req.query, method=req.method, top_k=req.top_k)
    return results


@router.get("/benchmarks")
def get_search_benchmarks():
    cache_path = settings.MODELS_DIR / "search_benchmarks.json"
    if not cache_path.exists():
        raise HTTPException(status_code=503, detail="Search benchmarks not available.")
    with open(cache_path, "r", encoding="utf-8") as f:
        return json.load(f)

