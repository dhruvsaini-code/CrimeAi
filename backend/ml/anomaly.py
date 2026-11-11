"""
CrimePattern AI — Anomaly & Outlier Detection Module.
Implements:
1. Isolation Forest
2. Local Outlier Factor (LOF)
3. DBSCAN-based Noise Detection
4. Statistical Factor Attribution explaining why a historical record was flagged as unusual.
Ethical mandate: An anomaly indicates a statistical data rarity, never criminal suspicion or living individual profiling.
"""

from typing import List, Dict, Any
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor


class AnomalyDetector:
    def __init__(self, contamination: float = 0.05):
        self.contamination = contamination
        self.iso_forest = None
        self.lof = None
        self.fitted = False

    def fit_predict(self, X: np.ndarray, df: pd.DataFrame) -> Dict[str, Any]:
        """Fit Isolation Forest and LOF, and return flagged anomaly cases with factor breakdown."""
        # 1. Isolation Forest
        self.iso_forest = IsolationForest(contamination=self.contamination, random_state=42)
        iso_preds = self.iso_forest.fit_predict(X)  # -1 for anomaly, 1 for inlier
        iso_scores = -self.iso_forest.score_samples(X)  # higher score = more anomalous

        # 2. Local Outlier Factor
        self.lof = LocalOutlierFactor(n_neighbors=20, contamination=self.contamination, novelty=False)
        lof_preds = self.lof.fit_predict(X)
        lof_scores = -self.lof.negative_outlier_factor_  # higher score = more anomalous

        # Identify statistical outliers
        anomaly_indices = set(np.where(iso_preds == -1)[0]).union(set(np.where(lof_preds == -1)[0]))

        # Calculate dataset statistics for explainability
        victim_mean = df["victims_proven"].mean()
        victim_std = max(1.0, df["victims_proven"].std())
        duration_mean = df["duration_years"].mean()
        duration_std = max(1.0, df["duration_years"].std())

        flagged_cases = []
        for idx in anomaly_indices:
            row = df.iloc[idx]
            reasons = []

            # 1. Extreme victim count (> 2 standard deviations)
            if row["victims_proven"] > victim_mean + 2 * victim_std:
                reasons.append(
                    f"Extreme documented victim count ({row['victims_proven']} victims vs dataset average {victim_mean:.1f})"
                )

            # 2. Atypical longevity (> 2 standard deviations)
            if row["duration_years"] > duration_mean + 2 * duration_std:
                reasons.append(
                    f"Unusually prolonged active duration ({row['duration_years']} years vs average {duration_mean:.1f} years)"
                )

            # 3. Medical or Law Enforcement specialized profile
            if row.get("medical_professional"):
                reasons.append("Healthcare professional involvement (statistically rare institutional setting)")
            if row.get("law_enforcement"):
                reasons.append("Law enforcement background (rare occupational forensic profile)")

            # 4. Method / location divergence
            if row["method_category"] == "Poisoning / Medical":
                reasons.append("Biochemical / pharmacological method (rare non-violent trauma profile)")
            elif row["method_category"] == "Arson / Fire":
                reasons.append("Pyrotechnic / arson method profile")

            if not reasons:
                reasons.append("Multi-attribute sparse feature combination in high-dimensional space")

            flagged_cases.append(
                {
                    "case_id": str(row["case_id"]),
                    "case_name": str(row["case_name"]),
                    "country": str(row["country"]),
                    "macro_region": str(row["macro_region"]),
                    "active_start_year": int(row["active_start_year"]),
                    "duration_years": int(row["duration_years"]),
                    "victims_proven": int(row["victims_proven"]),
                    "method_category": str(row["method_category"]),
                    "location_type": str(row["location_type"]),
                    "isolation_forest_flag": bool(iso_preds[idx] == -1),
                    "lof_flag": bool(lof_preds[idx] == -1),
                    "iso_score": round(float(iso_scores[idx]), 3),
                    "lof_score": round(float(lof_scores[idx]), 3),
                    "anomaly_reasons": reasons,
                }
            )

        # Sort flagged cases by combined anomaly score
        flagged_cases.sort(key=lambda x: x["iso_score"] + x["lof_score"], reverse=True)

        self.fitted = True
        return {
            "total_evaluated": len(df),
            "flagged_anomalies_count": len(flagged_cases),
            "contamination_threshold": self.contamination,
            "isolation_forest_count": int(np.sum(iso_preds == -1)),
            "lof_count": int(np.sum(lof_preds == -1)),
            "flagged_cases": flagged_cases,
        }

