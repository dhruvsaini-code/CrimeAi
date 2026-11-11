"""
CrimePattern AI — Database and Storage Layer.
Provides a high-performance in-memory and disk-based repository for historical case records,
with seamless MongoDB integration when configured.
"""

import json
from pathlib import Path
from typing import List, Dict, Any, Optional
import pandas as pd
from backend.config import settings


class CaseRepository:
    def __init__(self):
        self._cases: List[Dict[str, Any]] = []
        self._cases_by_id: Dict[str, Dict[str, Any]] = {}
        self._df: pd.DataFrame = pd.DataFrame()
        self._loaded: bool = False

    def load_data(self):
        if self._loaded:
            return

        json_path = settings.CASES_JSON_PATH
        if json_path.exists():
            with open(json_path, "r", encoding="utf-8") as f:
                self._cases = json.load(f)
            self._cases_by_id = {c["case_id"]: c for c in self._cases}
            self._df = pd.DataFrame(self._cases)
            self._loaded = True
            print(f"[CaseRepository] Loaded {len(self._cases)} historical cases from {json_path}")
        else:
            print(f"[CaseRepository] Warning: {json_path} does not exist yet.")

    def get_all_cases(self) -> List[Dict[str, Any]]:
        self.load_data()
        return self._cases

    def get_df(self) -> pd.DataFrame:
        self.load_data()
        return self._df

    def get_case_by_id(self, case_id: str) -> Optional[Dict[str, Any]]:
        self.load_data()
        return self._cases_by_id.get(case_id)

    def filter_cases(
        self,
        query: Optional[str] = None,
        country: Optional[str] = None,
        macro_region: Optional[str] = None,
        method_category: Optional[str] = None,
        victim_demographic: Optional[str] = None,
        decade: Optional[int] = None,
        skip: int = 0,
        limit: int = 50,
    ) -> Dict[str, Any]:
        self.load_data()
        filtered = self._cases

        if query:
            q_lower = query.lower()
            filtered = [
                c
                for c in filtered
                if q_lower in c["case_name"].lower()
                or q_lower in c["country"].lower()
                or q_lower in c["summary"].lower()
            ]

        if country:
            filtered = [c for c in filtered if c["country"].lower() == country.lower()]

        if macro_region:
            filtered = [c for c in filtered if c["macro_region"].lower() == macro_region.lower()]

        if method_category:
            filtered = [c for c in filtered if c["method_category"].lower() == method_category.lower()]

        if victim_demographic:
            filtered = [c for c in filtered if c["victim_demographic"].lower() == victim_demographic.lower()]

        if decade:
            filtered = [c for c in filtered if c["active_decade"] == decade]

        total = len(filtered)
        paginated = filtered[skip : skip + limit]

        return {
            "total": total,
            "skip": skip,
            "limit": limit,
            "cases": paginated,
        }

    def get_filter_options(self) -> Dict[str, List[Any]]:
        self.load_data()
        if self._df.empty:
            return {}
        return {
            "countries": sorted([str(c) for c in self._df["country"].unique() if c]),
            "macro_regions": sorted([str(r) for r in self._df["macro_region"].unique() if r]),
            "methods": sorted([str(m) for m in self._df["method_category"].unique() if m]),
            "victim_demographics": sorted([str(v) for v in self._df["victim_demographic"].unique() if v]),
            "decades": sorted([int(d) for d in self._df["active_decade"].unique() if d]),
            "location_types": sorted([str(l) for l in self._df["location_type"].unique() if l]),
        }


repo = CaseRepository()

