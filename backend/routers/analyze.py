"""
Analyze Case Router: Analyzes structured inputs and written narrative queries against the historical dataset.
Projects the query point into the 2D PCA cluster space, identifies the most similar past cases,
calculates attribute overlap, and provides an explainable forensic comparison breakdown.
Ethical mandate: Evaluates historical case similarities strictly as an educational and pattern-discovery tool.
"""

from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
import numpy as np
import pandas as pd
import joblib

from backend.config import settings
from backend.database import repo
from backend.schemas import AnalyzeCaseRequest

router = APIRouter(prefix="/analyze", tags=["Analyze Case"])

_pipeline = None
_clustering = None
_search_engine = None


def get_models():
    global _pipeline, _clustering, _search_engine
    if _pipeline is None:
        p_path = settings.MODELS_DIR / "pipeline.joblib"
        c_path = settings.MODELS_DIR / "clustering.joblib"
        s_path = settings.MODELS_DIR / "search_engine.joblib"
        if not (p_path.exists() and c_path.exists() and s_path.exists()):
            raise HTTPException(status_code=503, detail="ML models not initialized.")
        _pipeline = joblib.load(p_path)
        _clustering = joblib.load(c_path)
        _search_engine = joblib.load(s_path)
    return _pipeline, _clustering, _search_engine


@router.post("")
def analyze_case(req: AnalyzeCaseRequest):
    pipeline, clustering, search_engine = get_models()
    df = repo.get_df()
    if df.empty:
        raise HTTPException(status_code=500, detail="Historical case repository is empty.")

    # 1. Build a synthetic DataFrame row for structured preprocessing
    query_row = pd.DataFrame(
        [
            {
                "active_start_year": int(req.active_decade + 4),
                "duration_years": 5,
                "victims_proven": 8,
                "macro_region": req.macro_region,
                "method_category": req.method_category,
                "victim_demographic": req.victim_demographic,
                "location_type": req.location_type,
                "operated_alone": True,
                "medical_professional": False,
                "law_enforcement": False,
            }
        ]
    )

    query_vec = pipeline.transform(query_row)[0]

    # 2. Project into 2D PCA coordinate space
    pca_coords = clustering.project_query(query_vec)
    predicted_cluster = clustering.predict_cluster(query_vec)

    # 3. Calculate structured attribute similarities across all historical cases
    # Distance weights: region (0.30), method (0.35), victim (0.25), decade proximity (0.10)
    top_matches = []
    for _, row in df.iterrows():
        r_sim = 1.0 if row["macro_region"].lower() == req.macro_region.lower() else 0.0
        m_sim = 1.0 if row["method_category"].lower() == req.method_category.lower() else 0.0
        v_sim = 1.0 if row["victim_demographic"].lower() == req.victim_demographic.lower() else 0.0
        y_diff = abs(row["active_decade"] - req.active_decade)
        y_sim = max(0.0, 1.0 - (y_diff / 50.0))

        structured_score = 0.30 * r_sim + 0.35 * m_sim + 0.25 * v_sim + 0.10 * y_sim

        # If written description provided, incorporate semantic search score
        semantic_score = 0.0
        if req.written_description:
            search_res = search_engine.search(req.written_description, method="hybrid", top_k=20)
            for hit in search_res["results"]:
                if hit["case_id"] == row["case_id"]:
                    semantic_score = hit["similarity_score"]
                    break
            total_score = 0.60 * structured_score + 0.40 * semantic_score
        else:
            total_score = structured_score

        # Identify shared and differing attributes
        shared_attributes = []
        differing_attributes = []

        if r_sim == 1.0:
            shared_attributes.append(f"Region: {row['macro_region']}")
        else:
            differing_attributes.append(f"Region: {row['macro_region']} vs {req.macro_region}")

        if m_sim == 1.0:
            shared_attributes.append(f"Method: {row['method_category']}")
        else:
            differing_attributes.append(f"Method: {row['method_category']} vs {req.method_category}")

        if v_sim == 1.0:
            shared_attributes.append(f"Victim Demographic: {row['victim_demographic']}")
        else:
            differing_attributes.append(
                f"Victim Demographic: {row['victim_demographic']} vs {req.victim_demographic}"
            )

        if y_diff == 0:
            shared_attributes.append(f"Active Era: {row['active_decade']}s")
        else:
            differing_attributes.append(f"Era: {row['active_decade']}s (Differs by {y_diff} yrs)")

        top_matches.append(
            {
                "case_id": str(row["case_id"]),
                "case_name": str(row["case_name"]),
                "country": str(row["country"]),
                "macro_region": str(row["macro_region"]),
                "active_decade": int(row["active_decade"]),
                "active_start_year": int(row["active_start_year"]),
                "victims_proven": int(row["victims_proven"]),
                "method_category": str(row["method_category"]),
                "victim_demographic": str(row["victim_demographic"]),
                "location_type": str(row["location_type"]),
                "summary": str(row["summary"]),
                "source_title": str(row["source_title"]),
                "source_url": str(row["source_url"]),
                "similarity_score": round(float(total_score), 4),
                "score_percentage": round(float(total_score) * 100, 1),
                "shared_attributes": shared_attributes,
                "differing_attributes": differing_attributes,
            }
        )

    # Sort descending by similarity score
    top_matches.sort(key=lambda x: x["similarity_score"], reverse=True)
    top_5 = top_matches[:5]

    # Cluster name mapping
    cluster_names = ["Cluster Alpha", "Cluster Beta", "Cluster Gamma", "Cluster Delta", "Cluster Epsilon"]
    cluster_colors = ["#ff4d5e", "#2ee6d0", "#b57bff", "#5bb8ff", "#ffc400"]

    return {
        "status": "Success",
        "input_summary": {
            "macro_region": req.macro_region,
            "method_category": req.method_category,
            "victim_demographic": req.victim_demographic,
            "active_decade": f"{req.active_decade}s",
            "location_type": req.location_type,
            "written_description": req.written_description,
        },
        "pca_projection": {
            "x": pca_coords[0],
            "y": pca_coords[1],
        },
        "assigned_cluster": {
            "cluster_id": predicted_cluster,
            "name": cluster_names[predicted_cluster % len(cluster_names)],
            "color": cluster_colors[predicted_cluster % len(cluster_colors)],
            "rationale": (
                f"Input falls nearest to {cluster_names[predicted_cluster % len(cluster_names)]} centroid "
                f"based on Euclidean distance across standardized feature dimensions."
            ),
        },
        "top_historical_matches": top_5,
        "methodology_explanation": (
            "Similarity was computed by evaluating weighted Hamming and numerical proximity across "
            "standardized forensic dimensions: Method Category (35%), Macro-Region (30%), "
            "Victim Demographic (25%), and Temporal Proximity (10%)."
        ),
        "ethical_disclaimer": (
            "CRITICAL ETHICAL NOTICE: This algorithmic comparison is calculated strictly for historical, "
            "academic pattern discovery. A computational similarity score is NOT evidence of connection, "
            "complicity, or behavioral prediction. This system never assesses or profiles living individuals."
        ),
    }

