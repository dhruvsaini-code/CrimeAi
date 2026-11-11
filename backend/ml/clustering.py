"""
CrimePattern AI — Advanced Clustering and Dimensionality Reduction Module.
Implements K-Means, DBSCAN, Agglomerative, GMM, Spectral clustering, and 2D PCA projection.
Evaluates clusters using Silhouette, Davies-Bouldin, and Calinski-Harabasz indices.
"""

from typing import Dict, Any, List
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering, SpectralClustering
from sklearn.mixture import GaussianMixture
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score


class ClusteringEngine:
    def __init__(self, n_clusters: int = 5):
        self.n_clusters = n_clusters
        self.kmeans = None
        self.dbscan = None
        self.agglomerative = None
        self.gmm = None
        self.spectral = None
        self.pca = None
        self.pca_coords = None
        self.explained_variance = []

    def fit(self, X: np.ndarray, df: pd.DataFrame) -> Dict[str, Any]:
        """Fit all clustering models and compute 2D PCA representation."""
        # 1. K-Means
        self.kmeans = KMeans(n_clusters=self.n_clusters, random_state=42, n_init=10)
        kmeans_labels = self.kmeans.fit_predict(X)

        # 2. DBSCAN
        self.dbscan = DBSCAN(eps=2.2, min_samples=4)
        dbscan_labels = self.dbscan.fit_predict(X)

        # 3. Agglomerative Hierarchical
        self.agglomerative = AgglomerativeClustering(n_clusters=self.n_clusters)
        agg_labels = self.agglomerative.fit_predict(X)

        # 4. Gaussian Mixture Models
        self.gmm = GaussianMixture(n_components=self.n_clusters, random_state=42)
        gmm_labels = self.gmm.fit_predict(X)

        # 5. Spectral Clustering
        try:
            self.spectral = SpectralClustering(
                n_clusters=self.n_clusters, random_state=42, assign_labels="kmeans", affinity="nearest_neighbors"
            )
            spectral_labels = self.spectral.fit_predict(X)
        except Exception:
            spectral_labels = kmeans_labels.copy()

        # 6. PCA (2 Components for visualization)
        self.pca = PCA(n_components=2, random_state=42)
        self.pca_coords = self.pca.fit_transform(X)
        self.explained_variance = [round(float(v), 4) for v in self.pca.explained_variance_ratio_]

        # Compute Elbow Inertia and Silhouette across k=2..10 for K-Means
        elbow_data = []
        for k in range(2, 11):
            km_k = KMeans(n_clusters=k, random_state=42, n_init=10)
            lbls = km_k.fit_predict(X)
            inertia = float(km_k.inertia_)
            sil = float(silhouette_score(X, lbls))
            elbow_data.append({"k": k, "inertia": round(inertia, 2), "silhouette": round(sil, 4)})

        # Evaluate comparison metrics across algorithms
        def evaluate_labels(labels: np.ndarray, name: str) -> Dict[str, Any]:
            unique = set(labels)
            # Exclude noise (-1) if any
            valid_mask = labels != -1
            n_clusters_found = len(unique - {-1})
            if n_clusters_found < 2 or np.sum(valid_mask) < 4:
                return {
                    "algorithm": name,
                    "n_clusters": n_clusters_found,
                    "silhouette": None,
                    "davies_bouldin": None,
                    "calinski_harabasz": None,
                    "noise_count": int(np.sum(labels == -1)),
                }
            X_eval = X[valid_mask]
            lbl_eval = labels[valid_mask]
            return {
                "algorithm": name,
                "n_clusters": n_clusters_found,
                "silhouette": round(float(silhouette_score(X_eval, lbl_eval)), 4),
                "davies_bouldin": round(float(davies_bouldin_score(X_eval, lbl_eval)), 4),
                "calinski_harabasz": round(float(calinski_harabasz_score(X_eval, lbl_eval)), 2),
                "noise_count": int(np.sum(labels == -1)),
            }

        comparison_metrics = [
            evaluate_labels(kmeans_labels, "K-Means"),
            evaluate_labels(dbscan_labels, "DBSCAN"),
            evaluate_labels(agg_labels, "Agglomerative Hierarchical"),
            evaluate_labels(gmm_labels, "Gaussian Mixture Model"),
            evaluate_labels(spectral_labels, "Spectral Clustering"),
        ]

        # Compute cluster centroids and summary cards for primary K-Means
        cluster_summaries = []
        cluster_names = ["Cluster Alpha", "Cluster Beta", "Cluster Gamma", "Cluster Delta", "Cluster Epsilon"]
        cluster_colors = ["#ff4d5e", "#2ee6d0", "#b57bff", "#5bb8ff", "#ffc400"]

        df_copy = df.copy()
        df_copy["cluster"] = kmeans_labels
        df_copy["pca_x"] = self.pca_coords[:, 0]
        df_copy["pca_y"] = self.pca_coords[:, 1]

        for cid in range(self.n_clusters):
            c_df = df_copy[df_copy["cluster"] == cid]
            if len(c_df) == 0:
                continue

            top_method = c_df["method_category"].mode().iloc[0] if not c_df["method_category"].empty else "Mixed"
            top_region = c_df["macro_region"].mode().iloc[0] if not c_df["macro_region"].empty else "Global"
            top_victim = c_df["victim_demographic"].mode().iloc[0] if not c_df["victim_demographic"].empty else "Mixed"

            cluster_summaries.append(
                {
                    "cluster_id": cid,
                    "name": cluster_names[cid % len(cluster_names)],
                    "color": cluster_colors[cid % len(cluster_colors)],
                    "case_count": int(len(c_df)),
                    "pct_of_dataset": round(100.0 * len(c_df) / len(df), 1),
                    "mean_victims": round(float(c_df["victims_proven"].mean()), 1),
                    "year_range": [int(c_df["active_start_year"].min()), int(c_df["active_start_year"].max())],
                    "dominant_method": str(top_method),
                    "dominant_region": str(top_region),
                    "dominant_victim_type": str(top_victim),
                    "centroid_pca": [
                        round(float(c_df["pca_x"].mean()), 3),
                        round(float(c_df["pca_y"].mean()), 3),
                    ],
                }
            )

        # Build individual case points with PCA coords and cluster assignments
        case_points = []
        for i, row in df.iterrows():
            case_points.append(
                {
                    "case_id": str(row["case_id"]),
                    "case_name": str(row["case_name"]),
                    "country": str(row["country"]),
                    "macro_region": str(row["macro_region"]),
                    "active_start_year": int(row["active_start_year"]),
                    "victims_proven": int(row["victims_proven"]),
                    "method_category": str(row["method_category"]),
                    "victim_demographic": str(row["victim_demographic"]),
                    "kmeans_cluster": int(kmeans_labels[i]),
                    "dbscan_cluster": int(dbscan_labels[i]),
                    "agg_cluster": int(agg_labels[i]),
                    "gmm_cluster": int(gmm_labels[i]),
                    "spectral_cluster": int(spectral_labels[i]),
                    "pca_x": round(float(self.pca_coords[i, 0]), 4),
                    "pca_y": round(float(self.pca_coords[i, 1]), 4),
                }
            )

        return {
            "elbow_data": elbow_data,
            "comparison_metrics": comparison_metrics,
            "cluster_summaries": cluster_summaries,
            "case_points": case_points,
            "explained_variance": self.explained_variance,
            "total_variance_explained": round(sum(self.explained_variance) * 100, 1),
        }

    def project_query(self, query_vec: np.ndarray) -> List[float]:
        """Project a newly provided case feature vector into the 2D PCA space."""
        if self.pca is None:
            raise RuntimeError("PCA model is not fitted.")
        coords = self.pca.transform(query_vec.reshape(1, -1))[0]
        return [round(float(coords[0]), 4), round(float(coords[1]), 4)]

    def predict_cluster(self, query_vec: np.ndarray) -> int:
        if self.kmeans is None:
            raise RuntimeError("KMeans model is not fitted.")
        return int(self.kmeans.predict(query_vec.reshape(1, -1))[0])

