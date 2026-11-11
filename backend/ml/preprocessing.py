"""
CrimePattern AI — Preprocessing Pipeline.
Implements reproducible feature transformers, numerical scaling, categorical encoding,
and missing-value imputation.
"""

import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer


class FeaturePipeline:
    def __init__(self):
        self.num_cols = ["active_start_year", "duration_years", "victims_proven"]
        self.cat_cols = ["macro_region", "method_category", "victim_demographic", "location_type"]
        self.bool_cols = ["operated_alone", "medical_professional", "law_enforcement"]
        self.preprocessor = None
        self.fitted = False
        self.feature_names = []

    def fit(self, df: pd.DataFrame):
        df_copy = df.copy()

        # Handle numeric missing values with median
        for col in self.num_cols:
            if col not in df_copy.columns:
                df_copy[col] = 0
            df_copy[col] = pd.to_numeric(df_copy[col], errors="coerce").fillna(df_copy[col].median())

        for col in self.cat_cols:
            if col not in df_copy.columns:
                df_copy[col] = "Unknown"
            df_copy[col] = df_copy[col].fillna("Unknown").astype(str)

        for col in self.bool_cols:
            if col not in df_copy.columns:
                df_copy[col] = 0
            df_copy[col] = df_copy[col].astype(int)

        self.preprocessor = ColumnTransformer(
            transformers=[
                ("num", StandardScaler(), self.num_cols),
                ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), self.cat_cols),
                ("passthrough", "passthrough", self.bool_cols),
            ]
        )

        self.preprocessor.fit(df_copy)
        self.fitted = True

        # Extract transformed feature names
        num_names = self.num_cols
        cat_encoder = self.preprocessor.named_transformers_["cat"]
        cat_names = list(cat_encoder.get_feature_names_out(self.cat_cols))
        bool_names = self.bool_cols
        self.feature_names = num_names + cat_names + bool_names
        return self

    def transform(self, df: pd.DataFrame) -> np.ndarray:
        if not self.fitted:
            raise RuntimeError("FeaturePipeline must be fitted before calling transform.")
        df_copy = df.copy()
        for col in self.num_cols:
            if col not in df_copy.columns:
                df_copy[col] = 0
            df_copy[col] = pd.to_numeric(df_copy[col], errors="coerce").fillna(0)
        for col in self.cat_cols:
            if col not in df_copy.columns:
                df_copy[col] = "Unknown"
            df_copy[col] = df_copy[col].fillna("Unknown").astype(str)
        for col in self.bool_cols:
            if col not in df_copy.columns:
                df_copy[col] = 0
            df_copy[col] = df_copy[col].astype(int)

        return self.preprocessor.transform(df_copy)

    def fit_transform(self, df: pd.DataFrame) -> np.ndarray:
        return self.fit(df).transform(df)

