"""
CrimePattern AI — Master Training and Model Serialization Script.
Trains and persists all ML models, encoders, search indices, and graph structures.
"""

import json
import time
from pathlib import Path
import pandas as pd
import joblib

from backend.ml.preprocessing import FeaturePipeline
from backend.ml.clustering import ClusteringEngine
from backend.ml.search_engine import UnifiedSearchEngine
from backend.ml.graph_intel import GraphIntelligence
from backend.ml.anomaly import AnomalyDetector
from backend.ml.association import AssociationMiningEngine
from backend.ml.optimization import OptimizationEngine

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "historical_cases.json"
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)


def main():
    print(f"Loading historical cases from {DATA_PATH}...")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        cases_data = json.load(f)

    df = pd.DataFrame(cases_data)
    print(f"Loaded {len(df)} cases.")

    t0 = time.perf_counter()

    # 1. Feature Preprocessing Pipeline
    print("Fitting FeaturePipeline...")
    pipeline = FeaturePipeline()
    X = pipeline.fit_transform(df)
    joblib.dump(pipeline, MODELS_DIR / "pipeline.joblib")
    print(f"Feature matrix shape: {X.shape}. Saved pipeline.joblib.")

    # 2. Clustering Engine
    print("Fitting ClusteringEngine (K-Means, DBSCAN, Agglomerative, GMM, Spectral, PCA)...")
    clustering = ClusteringEngine(n_clusters=5)
    cluster_results = clustering.fit(X, df)
    joblib.dump(clustering, MODELS_DIR / "clustering.joblib")
    with open(MODELS_DIR / "clustering_cache.json", "w", encoding="utf-8") as f:
        json.dump(cluster_results, f, indent=2)
    print("Saved clustering.joblib and clustering_cache.json.")

    # 3. Unified Search Engine (TF-IDF, BM25, SVD Semantic, KNN)
    print("Fitting UnifiedSearchEngine (TF-IDF, BM25, SVD Semantic, KNN, BallTree, KDTree)...")
    search_engine = UnifiedSearchEngine()
    search_engine.fit(df)
    search_benchmarks = search_engine.evaluate_benchmark()
    joblib.dump(search_engine, MODELS_DIR / "search_engine.joblib")
    with open(MODELS_DIR / "search_benchmarks.json", "w", encoding="utf-8") as f:
        json.dump(search_benchmarks, f, indent=2)
    print("Saved search_engine.joblib and search_benchmarks.json.")

    # 4. Graph Intelligence
    print("Building GraphIntelligence relationship network...")
    graph_engine = GraphIntelligence()
    graph_engine.build_graph(df, max_nodes=100)
    graph_data = graph_engine.get_graph_data()
    joblib.dump(graph_engine, MODELS_DIR / "graph_engine.joblib")
    with open(MODELS_DIR / "graph_cache.json", "w", encoding="utf-8") as f:
        json.dump(graph_data, f, indent=2)
    print(f"Graph constructed: {graph_data['total_nodes']} nodes, {graph_data['total_edges']} edges.")

    # 5. Anomaly Detection
    print("Running Anomaly Detection (Isolation Forest & LOF)...")
    anomaly_detector = AnomalyDetector(contamination=0.06)
    anomaly_results = anomaly_detector.fit_predict(X, df)
    joblib.dump(anomaly_detector, MODELS_DIR / "anomaly_detector.joblib")
    with open(MODELS_DIR / "anomaly_cache.json", "w", encoding="utf-8") as f:
        json.dump(anomaly_results, f, indent=2)
    print(f"Flagged {anomaly_results['flagged_anomalies_count']} statistical anomaly records.")

    # 6. Association & Sequential Mining
    print("Mining Association Rules & Sequential Patterns (Apriori, PrefixSpan)...")
    assoc_engine = AssociationMiningEngine(min_support=0.06, min_confidence=0.35, min_lift=1.1)
    transactions = assoc_engine.prepare_transactions(df)
    rules = assoc_engine.mine_apriori(transactions)
    sequential = assoc_engine.mine_sequential_patterns(df)
    assoc_results = {
        "total_rules_mined": len(rules),
        "total_transactions": len(transactions),
        "min_support": assoc_engine.min_support,
        "min_confidence": assoc_engine.min_confidence,
        "min_lift": assoc_engine.min_lift,
        "rules": rules,
        "sequential_patterns": sequential,
    }
    with open(MODELS_DIR / "association_cache.json", "w", encoding="utf-8") as f:
        json.dump(assoc_results, f, indent=2)
    print(f"Mined {len(rules)} association rules and {len(sequential)} sequential transitions.")

    # 7. Optimization Engine
    print("Running Hyperparameter Optimization benchmarks (Grid, Random, Genetic)...")
    opt_engine = OptimizationEngine()
    grid_res = opt_engine.run_grid_search(X)
    random_res = opt_engine.run_random_search(X, n_iter=10)
    genetic_res = opt_engine.run_genetic_optimization(X, generations=4, pop_size=6)
    opt_cache = {
        "grid_search": grid_res,
        "random_search": random_res,
        "genetic_algorithm": genetic_res,
    }
    with open(MODELS_DIR / "optimization_cache.json", "w", encoding="utf-8") as f:
        json.dump(opt_cache, f, indent=2)
    print("Saved optimization benchmarks.")

    total_training_time_s = round(time.perf_counter() - t0, 2)

    # Master Model Metadata
    metadata = {
        "model_pipeline_version": "1.0.0",
        "dataset_version": "1.0.0-verified",
        "training_timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        "total_cases_trained": len(df),
        "total_training_duration_seconds": total_training_time_s,
        "models_serialized": [
            "pipeline.joblib",
            "clustering.joblib",
            "search_engine.joblib",
            "graph_engine.joblib",
            "anomaly_detector.joblib",
        ],
        "caches_serialized": [
            "clustering_cache.json",
            "search_benchmarks.json",
            "graph_cache.json",
            "anomaly_cache.json",
            "association_cache.json",
            "optimization_cache.json",
        ],
        "evaluation_summary": {
            "kmeans_silhouette": cluster_results["comparison_metrics"][0]["silhouette"],
            "kmeans_davies_bouldin": cluster_results["comparison_metrics"][0]["davies_bouldin"],
            "total_variance_explained_pct": cluster_results["total_variance_explained"],
            "association_rules_count": len(rules),
            "graph_communities_count": graph_data["total_communities"],
        },
    }

    with open(MODELS_DIR / "model_metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n=======================================================")
    print(f"Master training pipeline completed in {total_training_time_s}s!")
    print(f"All model artifacts successfully persisted to {MODELS_DIR}")
    print(f"=======================================================\n")


if __name__ == "__main__":
    main()

