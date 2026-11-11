"""
Geography Router: Geographic distribution, regional aggregations, and geolocated case points.
"""

from fastapi import APIRouter
from backend.database import repo

router = APIRouter(prefix="/geography", tags=["Geography"])


@router.get("/summary")
def get_geographic_summary():
    df = repo.get_df()
    if df.empty:
        return {"regions": {}, "countries": []}

    region_counts = df["macro_region"].value_counts().to_dict()
    country_counts = (
        df.groupby(["country", "macro_region"])
        .agg(case_count=("case_id", "count"), total_victims=("victims_proven", "sum"))
        .reset_index()
        .sort_values(by="case_count", ascending=False)
    )

    top_countries = country_counts.head(20).to_dict(orient="records")

    # Map markers (geolocated case points with jitter)
    markers = []
    for _, row in df.iterrows():
        markers.append(
            {
                "case_id": str(row["case_id"]),
                "case_name": str(row["case_name"]),
                "country": str(row["country"]),
                "macro_region": str(row["macro_region"]),
                "latitude": float(row["latitude"]),
                "longitude": float(row["longitude"]),
                "victims_proven": int(row["victims_proven"]),
                "method_category": str(row["method_category"]),
                "active_decade": int(row["active_decade"]),
            }
        )

    return {
        "region_counts": region_counts,
        "top_countries": top_countries,
        "total_mapped_cases": len(markers),
        "markers": markers,
    }

