"""
Methodology Router: Exposes full mathematical foundations, algorithmic parameters, and ethical guidelines.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/methodology", tags=["Methodology"])


@router.get("")
def get_methodology():
    return {
        "title": "CrimePattern AI — Algorithmic Architecture & Forensic Data Science Methodology",
        "ethical_framework": {
            "purpose": "Historical and educational pattern discovery and machine learning exploration only.",
            "strict_prohibitions": [
                "Never predict whether a living person will commit a crime or is a criminal.",
                "Never identify suspects or profile real individuals.",
                "Never use supervised criminality classification or automated recidivism assessment.",
                "Never equate computational statistical correlation with real-world causal connection.",
            ],
            "data_provenance": "100% verified historical cases from public encyclopedic archives and investigative records.",
        },
        "algorithms": [
            {
                "name": "K-Means Clustering",
                "purpose": "Partition historical cases into K spherical clusters by minimizing within-cluster sum of squares (inertia).",
                "formula": "argmin_S sum_{i=1}^k sum_{x in S_i} ||x - mu_i||^2",
                "evaluation": "Elbow method (inertia curve) and Silhouette analysis across k=2..10.",
            },
            {
                "name": "DBSCAN (Density-Based Spatial Clustering of Applications with Noise)",
                "purpose": "Identify dense topological clusters and isolate statistical noise points without imposing rigid spherical boundaries.",
                "parameters": "eps=2.2 (neighborhood radius), min_samples=4 (core point density).",
            },
            {
                "name": "Principal Component Analysis (PCA)",
                "purpose": "Orthogonal linear transformation projecting high-dimensional forensic features onto 2 maximal-variance dimensions for visual cluster galaxy rendering.",
                "components": 2,
            },
            {
                "name": "Okapi BM25 & TF-IDF Information Retrieval",
                "purpose": "Exact lexical and term frequency-inverse document frequency ranking against historical case summaries.",
            },
            {
                "name": "Dense Semantic Embeddings (LSA / TruncatedSVD)",
                "purpose": "Dimensionality reduction over lexical co-occurrences to produce dense semantic representations capturing conceptual similarity.",
            },
            {
                "name": "Graph Intelligence (NetworkX / Custom Network)",
                "purpose": "Construct relationship topology between historical cases sharing methods, macro-regions, and decades. Implements PageRank centrality, Louvain community detection, BFS, DFS, and Dijkstra shortest paths.",
            },
            {
                "name": "Apriori & PrefixSpan Sequence Mining",
                "purpose": "Extract frequent itemsets and temporal transition rules evaluated via Support, Confidence, and Lift.",
            },
            {
                "name": "Isolation Forest & Local Outlier Factor (LOF)",
                "purpose": "Detect statistical anomalies and rare attribute configurations in historical crime records with factor explainability.",
            },
            {
                "name": "Hyperparameter Optimization",
                "purpose": "Compare Grid Search, Random Search, and Genetic Algorithm search strategies for maximizing clustering silhouette coefficients.",
            },
        ],
    }

