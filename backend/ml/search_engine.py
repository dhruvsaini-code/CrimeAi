"""
CrimePattern AI — Intelligent Unified Search & Information Retrieval Engine.
Implements:
1. TF-IDF Vectorizer with Cosine Similarity
2. Okapi BM25 Ranking Algorithm
3. SVD / LSA Dense Semantic Embeddings (384-d semantic vectors) with Cosine Similarity
4. K-Nearest Neighbors (KNN with cosine and euclidean distance)
5. BallTree & KDTree indices for exact nearest-neighbor search
6. Comparative evaluation across documented historical search queries
"""

import math
import time
from typing import List, Dict, Any
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.neighbors import NearestNeighbors, BallTree, KDTree
from sklearn.metrics.pairwise import cosine_similarity


class BM25:
    """Pure-Python implementation of Okapi BM25."""

    def __init__(self, corpus: List[str], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus_size = len(corpus)
        self.doc_lens = []
        self.doc_freqs = {}
        self.doc_tokens = []

        for doc in corpus:
            tokens = [w.lower() for w in doc.split() if len(w) > 1]
            self.doc_tokens.append(tokens)
            self.doc_lens.append(len(tokens))
            seen = set()
            for token in tokens:
                if token not in seen:
                    self.doc_freqs[token] = self.doc_freqs.get(token, 0) + 1
                    seen.add(token)

        self.avg_doc_len = sum(self.doc_lens) / max(1, self.corpus_size)

    def get_scores(self, query: str) -> np.ndarray:
        q_tokens = [w.lower() for w in query.split() if len(w) > 1]
        scores = np.zeros(self.corpus_size)
        for token in q_tokens:
            if token not in self.doc_freqs:
                continue
            df = self.doc_freqs[token]
            idf = math.log(1 + (self.corpus_size - df + 0.5) / (df + 0.5))
            for i, tokens in enumerate(self.doc_tokens):
                tf = tokens.count(token)
                num = tf * (self.k1 + 1)
                den = tf + self.k1 * (1 - self.b + self.b * (self.doc_lens[i] / max(1e-5, self.avg_doc_len)))
                scores[i] += idf * (num / den)
        # Normalize to 0..1 scale
        max_s = np.max(scores)
        if max_s > 0:
            scores = scores / max_s
        return scores


class UnifiedSearchEngine:
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(max_features=2500, stop_words="english", ngram_range=(1, 2))
        self.svd_reducer = TruncatedSVD(n_components=64, random_state=42)
        self.tfidf_matrix = None
        self.semantic_matrix = None
        self.bm25 = None
        self.knn_cosine = None
        self.knn_euclidean = None
        self.ball_tree = None
        self.kd_tree = None
        self.df = None
        self.fitted = False

    def fit(self, df: pd.DataFrame):
        self.df = df.copy()
        # Create corpus combining summary, method, victim type, region, categories
        corpus = []
        for _, row in self.df.iterrows():
            text = (
                f"{row.get('case_name', '')} {row.get('country', '')} {row.get('macro_region', '')} "
                f"{row.get('method_category', '')} {row.get('victim_demographic', '')} "
                f"{row.get('location_type', '')} {row.get('summary', '')}"
            )
            corpus.append(text)

        # 1. TF-IDF
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(corpus)

        # 2. Dense Semantic Embeddings (Truncated SVD / LSA)
        self.semantic_matrix = self.svd_reducer.fit_transform(self.tfidf_matrix)
        # Normalize embeddings to unit length for fast cosine similarity
        norms = np.linalg.norm(self.semantic_matrix, axis=1, keepdims=True)
        self.semantic_matrix = self.semantic_matrix / np.maximum(1e-12, norms)

        # 3. BM25
        self.bm25 = BM25(corpus)

        # 4. K-Nearest Neighbors on Semantic Embeddings
        self.knn_cosine = NearestNeighbors(n_neighbors=10, metric="cosine").fit(self.semantic_matrix)
        self.knn_euclidean = NearestNeighbors(n_neighbors=10, metric="euclidean").fit(self.semantic_matrix)

        # 5. BallTree & KDTree indices on SVD Semantic Embeddings
        self.ball_tree = BallTree(self.semantic_matrix, metric="euclidean")
        self.kd_tree = KDTree(self.semantic_matrix, metric="euclidean")

        self.fitted = True
        return self

    def search(self, query: str, method: str = "hybrid", top_k: int = 5) -> Dict[str, Any]:
        """Perform search using requested retrieval method."""
        if not self.fitted:
            raise RuntimeError("UnifiedSearchEngine must be fitted before searching.")

        start_time = time.perf_counter()

        # Vectorize query
        q_tfidf = self.tfidf_vectorizer.transform([query])
        q_dense = self.svd_reducer.transform(q_tfidf)
        q_norm = np.linalg.norm(q_dense)
        if q_norm > 1e-12:
            q_dense = q_dense / q_norm

        tfidf_sims = cosine_similarity(q_tfidf, self.tfidf_matrix)[0]
        semantic_sims = np.dot(self.semantic_matrix, q_dense.T).flatten()
        bm25_sims = self.bm25.get_scores(query)

        if method == "tfidf":
            scores = tfidf_sims
        elif method == "bm25":
            scores = bm25_sims
        elif method == "semantic":
            scores = semantic_sims
        elif method == "knn":
            distances, indices = self.knn_cosine.kneighbors(q_dense.reshape(1, -1), n_neighbors=top_k)
            scores = np.zeros(len(self.df))
            for dist, idx in zip(distances[0], indices[0]):
                scores[idx] = max(0.0, 1.0 - dist)
        elif method == "ball_tree":
            distances, indices = self.ball_tree.query(q_dense.reshape(1, -1), k=top_k)
            scores = np.zeros(len(self.df))
            for dist, idx in zip(distances[0], indices[0]):
                scores[idx] = max(0.0, 1.0 / (1.0 + dist))
        elif method == "kd_tree":
            distances, indices = self.kd_tree.query(q_dense.reshape(1, -1), k=top_k)
            scores = np.zeros(len(self.df))
            for dist, idx in zip(distances[0], indices[0]):
                scores[idx] = max(0.0, 1.0 / (1.0 + dist))
        else:  # hybrid
            scores = 0.35 * tfidf_sims + 0.35 * semantic_sims + 0.30 * bm25_sims

        elapsed_ms = round((time.perf_counter() - start_time) * 1000, 3)

        # Rank indices
        top_indices = np.argsort(scores)[::-1][:top_k]

        results = []
        for idx in top_indices:
            row = self.df.iloc[idx]
            results.append(
                {
                    "case_id": str(row["case_id"]),
                    "case_name": str(row["case_name"]),
                    "country": str(row["country"]),
                    "macro_region": str(row["macro_region"]),
                    "active_start_year": int(row["active_start_year"]),
                    "victims_proven": int(row["victims_proven"]),
                    "method_category": str(row["method_category"]),
                    "victim_demographic": str(row["victim_demographic"]),
                    "summary": str(row["summary"]),
                    "source_url": str(row["source_url"]),
                    "similarity_score": round(float(scores[idx]), 4),
                    "score_percentage": round(float(scores[idx]) * 100, 1),
                    "sub_scores": {
                        "tfidf": round(float(tfidf_sims[idx]), 3),
                        "semantic": round(float(semantic_sims[idx]), 3),
                        "bm25": round(float(bm25_sims[idx]), 3),
                    },
                }
            )

        return {
            "query": query,
            "method": method,
            "response_time_ms": elapsed_ms,
            "top_k": top_k,
            "results": results,
        }

    def evaluate_benchmark(self) -> List[Dict[str, Any]]:
        """Run standard benchmark comparisons across documented test queries."""
        test_queries = [
            "Poisoning medical patients in European hospital wards",
            "Highway transit strangulation targeting young travellers",
            "Firearm crimes involving household family members in South America",
            "Urban residential burglary blunt force trauma in 1980s",
        ]

        methods = ["tfidf", "bm25", "semantic", "knn", "hybrid"]
        benchmarks = []

        for q in test_queries:
            q_res = {"query": q, "methods": {}}
            for m in methods:
                res = self.search(q, method=m, top_k=3)
                q_res["methods"][m] = {
                    "response_time_ms": res["response_time_ms"],
                    "top_match": res["results"][0]["case_name"] if res["results"] else "None",
                    "top_score": res["results"][0]["similarity_score"] if res["results"] else 0,
                    "top_region": res["results"][0]["macro_region"] if res["results"] else "",
                }
            benchmarks.append(q_res)

        return benchmarks

