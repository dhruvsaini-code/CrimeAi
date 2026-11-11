"""
Anomaly Router: Isolation Forest and Local Outlier Factor statistical anomaly detection.
"""

import json
from fastapi import APIRouter, HTTPException
from backend.config import settings

router = APIRouter(prefix="/anomaly", tags=["Anomaly Detection"])


@router.get("/outliers")
def get_anomalies():
    cache_path = settings.MODELS_DIR / "anomaly_cache.json"
    if not cache_path.exists():
        raise HTTPException(status_code=503, detail="Anomaly detector cache not found.")
    with open(cache_path, "r", encoding="utf-8") as f:
        return json.load(f)

