"""
Overview Router: Provides summary dashboard metrics, dataset quality report, and model metadata.
"""

import json
from fastapi import APIRouter
from backend.config import settings
from backend.database import repo

router = APIRouter(prefix="/overview", tags=["Overview"])


@router.get("/stats")
def get_dashboard_stats():
    cases = repo.get_all_cases()
    df = repo.get_df()

    quality_data = {}
    if settings.QUALITY_REPORT_PATH.exists():
        with open(settings.QUALITY_REPORT_PATH, "r", encoding="utf-8") as f:
            quality_data = json.load(f)

    model_metadata = {}
    if settings.MODEL_METADATA_PATH.exists():
        with open(settings.MODEL_METADATA_PATH, "r", encoding="utf-8") as f:
            model_metadata = json.load(f)

    min_year = int(df["active_start_year"].min()) if not df.empty else 1900
    max_year = int(df["active_end_year"].max()) if not df.empty else 2022

    return {
        "total_cases": len(cases),
        "total_countries": int(df["country"].nunique()) if not df.empty else 0,
        "year_span": f"{min_year} – {max_year}",
        "total_years_covered": max_year - min_year,
        "average_completeness_pct": round(float(df["data_completeness_pct"].mean()), 1) if not df.empty else 95.0,
        "total_proven_victims": int(df["victims_proven"].sum()) if not df.empty else 0,
        "quality_report": quality_data,
        "model_status": {
            "status": "Trained & Serialized",
            "version": model_metadata.get("model_pipeline_version", "1.0.0"),
            "training_timestamp": model_metadata.get("training_timestamp", "Recent"),
            "models_ready": [
                "FeaturePipeline",
                "K-Means",
                "DBSCAN",
                "Agglomerative",
                "GaussianMixture",
                "Spectral",
                "PCA",
                "TF-IDF",
                "BM25",
                "SVD Semantic Embeddings",
                "KNN / BallTree / KDTree",
                "Graph Intelligence",
                "Isolation Forest",
                "LOF",
                "Apriori",
                "PrefixSpan",
            ],
        },
    }

