"""
Geography Router: Geographic distribution, regional aggregations, forensic method hotspots,
and victim demographic vulnerability mappings.
"""

from fastapi import APIRouter
from backend.database import repo

router = APIRouter(prefix="/geography", tags=["Geography"])


@router.get("/summary")
def get_geographic_summary():
    df = repo.get_df()
    if df.empty:
        return {
            "region_counts": {},
            "top_countries": [],
            "method_hotspots": {},
            "demographic_hotspots": {},
            "regional_vulnerability": {},
            "total_mapped_cases": 0,
            "markers": [],
        }

    region_counts = df["macro_region"].value_counts().to_dict()

    # Country aggregated statistics
    country_counts = (
        df.groupby(["country", "macro_region"])
        .agg(case_count=("case_id", "count"), total_victims=("victims_proven", "sum"))
        .reset_index()
        .sort_values(by="case_count", ascending=False)
    )
    top_countries = country_counts.head(25).to_dict(orient="records")

    # Global Method Hotspots: frequency & total casualty count
    method_agg = (
        df.groupby("method_category")
        .agg(case_count=("case_id", "count"), total_victims=("victims_proven", "sum"))
        .reset_index()
        .sort_values(by="total_victims", ascending=False)
    )
    method_hotspots = method_agg.to_dict(orient="records")

    # Global Demographic Vulnerability: frequency & total casualty count
    demographic_agg = (
        df.groupby("victim_demographic")
        .agg(case_count=("case_id", "count"), total_victims=("victims_proven", "sum"))
        .reset_index()
        .sort_values(by="total_victims", ascending=False)
    )
    demographic_hotspots = demographic_agg.to_dict(orient="records")

    # Regional Vulnerability Profiles
    regional_vulnerability = {}
    for reg, grp in df.groupby("macro_region"):
        tot_vic = int(grp["victims_proven"].sum())
        tot_cases = int(len(grp))

        # Dominant method (excluding generic if specific exists)
        spec_m = grp[~grp["method_category"].str.contains("Mixed")]
        dom_method = (
            spec_m.groupby("method_category")["victims_proven"].sum().idxmax()
            if not spec_m.empty
            else grp.groupby("method_category")["victims_proven"].sum().idxmax()
        )

        # Most harmed victim demographic
        spec_v = grp[~grp["victim_demographic"].str.contains("General")]
        dom_victim = (
            spec_v.groupby("victim_demographic")["victims_proven"].sum().idxmax()
            if not spec_v.empty
            else grp.groupby("victim_demographic")["victims_proven"].sum().idxmax()
        )

        regional_vulnerability[reg] = {
            "total_cases": tot_cases,
            "total_victims": tot_vic,
            "dominant_method": str(dom_method),
            "most_targeted_demographic": str(dom_victim),
        }

    # Map markers (geolocated case points with jitter and complete forensic fields)
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
                "victim_demographic": str(row["victim_demographic"]),
                "location_type": str(row["location_type"]),
                "active_decade": int(row["active_decade"]),
            }
        )

    return {
        "region_counts": region_counts,
        "top_countries": top_countries,
        "method_hotspots": method_hotspots,
        "demographic_hotspots": demographic_hotspots,
        "regional_vulnerability": regional_vulnerability,
        "total_mapped_cases": len(markers),
        "markers": markers,
    }
