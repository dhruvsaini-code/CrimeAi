"""
Configuration management for CrimePattern AI.
"""
import os
from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings:
    PROJECT_NAME: str = "CrimePattern AI — Historical Serial Crime Analysis and Pattern Discovery System"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"

    BACKEND_HOST: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", "8000"))

    CORS_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173",
        ).split(",")
        if origin.strip()
    ]

    USE_MONGODB: bool = os.getenv("USE_MONGODB", "false").lower() == "true"
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "crimepattern_ai")

    DATA_DIR: Path = BASE_DIR / os.getenv("DATA_DIR", "data")
    MODELS_DIR: Path = BASE_DIR / os.getenv("MODELS_DIR", "models")

    CASES_JSON_PATH: Path = DATA_DIR / "historical_cases.json"
    CASES_CSV_PATH: Path = DATA_DIR / "historical_cases.csv"
    QUALITY_REPORT_PATH: Path = DATA_DIR / "quality_report.json"
    MODEL_METADATA_PATH: Path = MODELS_DIR / "model_metadata.json"

    EMBEDDING_MODEL_NAME: str = os.getenv("EMBEDDING_MODEL_NAME", "all-MiniLM-L6-v2")
    ALLOW_EMBEDDING_FALLBACK: bool = os.getenv("ALLOW_EMBEDDING_FALLBACK", "true").lower() == "true"


settings = Settings()

