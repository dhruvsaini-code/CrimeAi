"""
Timeline Router: Provides temporal distributions and stacked cluster timelines.
"""

from fastapi import APIRouter
import pandas as pd
from backend.database import repo
from backend.config import settings
import json

router = APIRouter(prefix="/timeline", tags=["Timeline"])


@router.get("")
def get_timeline_data():
    df = repo.get_df()
    if df.empty:
        return {"decades": [], "distribution": []}

    # Group by decade
    decade_counts = df["active_decade"].value_counts().sort_index()

    # Load cluster assignments from clustering cache to provide stacked cluster timeline
    cluster_cache_path = settings.MODELS_DIR / "clustering_cache.json"
    cluster_by_case = {}
    if cluster_cache_path.exists():
        with open(cluster_cache_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for pt in data.get("case_points", []):
                cluster_by_case[pt["case_id"]] = pt["kmeans_cluster"]

    # Build stacked timeline points
    timeline_series = []
    decades_sorted = sorted([int(d) for d in df["active_decade"].unique() if d >= 1900])

    for dec in decades_sorted:
        sub_df = df[df["active_decade"] == dec]
        pt = {
            "decade": f"{dec}s",
            "year": dec,
            "total_cases": len(sub_df),
            "cluster_0": 0,
            "cluster_1": 0,
            "cluster_2": 0,
            "cluster_3": 0,
            "cluster_4": 0,
        }
        for _, row in sub_df.iterrows():
            cid = cluster_by_case.get(row["case_id"], 0)
            key = f"cluster_{cid}"
            if key in pt:
                pt[key] += 1
        timeline_series.append(pt)

    return {
        "decades": [f"{d}s" for d in decades_sorted],
        "timeline_series": timeline_series,
        "peak_decade": f"{decade_counts.idxmax()}s" if not decade_counts.empty else "1980s",
        "peak_case_count": int(decade_counts.max()) if not decade_counts.empty else 0,
    }

