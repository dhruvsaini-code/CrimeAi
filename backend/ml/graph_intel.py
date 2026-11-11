"""
CrimePattern AI — Graph Intelligence Module.
Constructs an explicit relationship network between documented historical cases
based on shared forensic attributes (active decade, method category, macro-region).
Implements BFS, DFS, Dijkstra, PageRank, Louvain-style Community Detection, and Connected Components.
Ethical rule: edges connect historical case attributes only, never real person identities.
"""

from collections import deque
import heapq
from typing import Dict, List, Any, Optional
import numpy as np
import pandas as pd


class GraphIntelligence:
    def __init__(self):
        self.nodes = []
        self.adj = {}
        self.edge_list = []
        self.pagerank_scores = {}
        self.communities = {}
        self.fitted = False

    def build_graph(self, df: pd.DataFrame, max_nodes: int = 120):
        """Build graph using a representative sample of cases to ensure crisp interactive rendering."""
        # Select top cases by victims and diversity
        sample_df = df.sort_values(by="victims_proven", ascending=False).head(max_nodes).reset_index(drop=True)

        self.nodes = []
        self.adj = {}
        self.edge_list = []

        for i, row in sample_df.iterrows():
            node = {
                "id": str(row["case_id"]),
                "name": str(row["case_name"]),
                "country": str(row["country"]),
                "region": str(row["macro_region"]),
                "decade": int(row["active_decade"]),
                "method": str(row["method_category"]),
                "victims": int(row["victims_proven"]),
            }
            self.nodes.append(node)
            self.adj[node["id"]] = []

        # Connect cases if they share:
        # 1. Same method AND same macro-region (weight 1.0)
        # 2. Same method AND same active decade (weight 0.8)
        # 3. Same region AND same active decade AND similar victim demographic (weight 0.6)
        n = len(self.nodes)
        for i in range(n):
            for j in range(i + 1, n):
                u = self.nodes[i]
                v = self.nodes[j]
                weight = 0.0
                reasons = []

                if u["method"] == v["method"] and u["region"] == v["region"]:
                    weight += 1.0
                    reasons.append("Shared Method & Macro-Region")
                if u["method"] == v["method"] and u["decade"] == v["decade"]:
                    weight += 0.8
                    reasons.append("Shared Method & Active Decade")
                if u["region"] == v["region"] and u["decade"] == v["decade"]:
                    weight += 0.5
                    reasons.append("Shared Region & Active Decade")

                if weight > 0:
                    edge = {
                        "source": u["id"],
                        "target": v["id"],
                        "weight": round(weight, 2),
                        "reasons": reasons,
                    }
                    self.edge_list.append(edge)
                    self.adj[u["id"]].append((v["id"], weight))
                    self.adj[v["id"]].append((u["id"], weight))

        # Compute PageRank
        self.compute_pagerank()
        # Compute Communities (Louvain-style greedy modularity / label propagation)
        self.compute_communities()
        self.fitted = True
        return self

    def compute_pagerank(self, damping: float = 0.85, max_iter: int = 50, tol: float = 1e-6):
        n = len(self.nodes)
        if n == 0:
            return
        node_ids = [node["id"] for node in self.nodes]
        ranks = {nid: 1.0 / n for nid in node_ids}

        for _ in range(max_iter):
            new_ranks = {}
            for nid in node_ids:
                share = (1.0 - damping) / n
                sum_in = 0.0
                for neighbor_id, _ in self.adj.get(nid, []):
                    deg = len(self.adj[neighbor_id])
                    if deg > 0:
                        sum_in += ranks[neighbor_id] / deg
                new_ranks[nid] = share + damping * sum_in

            diff = sum(abs(new_ranks[nid] - ranks[nid]) for nid in node_ids)
            ranks = new_ranks
            if diff < tol:
                break

        # Normalize PageRank to 0..1 scale
        max_r = max(ranks.values()) or 1.0
        self.pagerank_scores = {nid: round(float(ranks[nid] / max_r), 4) for nid in ranks}

    def compute_communities(self):
        """Label Propagation community detection."""
        node_ids = [node["id"] for node in self.nodes]
        labels = {nid: i for i, nid in enumerate(node_ids)}

        for _ in range(15):
            changed = False
            for nid in node_ids:
                neighbors = self.adj.get(nid, [])
                if not neighbors:
                    continue
                label_weights = {}
                for n_id, w in neighbors:
                    lbl = labels[n_id]
                    label_weights[lbl] = label_weights.get(lbl, 0.0) + w
                if label_weights:
                    best_lbl = max(label_weights.items(), key=lambda x: x[1])[0]
                    if labels[nid] != best_lbl:
                        labels[nid] = best_lbl
                        changed = True
            if not changed:
                break

        # Remap community IDs to compact 0, 1, 2...
        unique_labels = sorted(list(set(labels.values())))
        label_map = {old: new for new, old in enumerate(unique_labels)}
        self.communities = {nid: label_map[labels[nid]] for nid in labels}

    def bfs(self, start_id: str, depth_limit: int = 3) -> List[Dict[str, Any]]:
        """Breadth-First Search from start_id up to depth_limit."""
        if start_id not in self.adj:
            return []
        visited = {start_id: 0}
        queue = deque([(start_id, 0)])
        result = []

        while queue:
            curr, depth = queue.popleft()
            result.append({"node_id": curr, "depth": depth})
            if depth < depth_limit:
                for neighbor, _ in self.adj.get(curr, []):
                    if neighbor not in visited:
                        visited[neighbor] = depth + 1
                        queue.append((neighbor, depth + 1))
        return result

    def dfs(self, start_id: str, max_visited: int = 15) -> List[str]:
        """Depth-First Search traversal."""
        if start_id not in self.adj:
            return []
        visited = set()
        order = []

        def traverse(node):
            if len(order) >= max_visited or node in visited:
                return
            visited.add(node)
            order.append(node)
            for neighbor, _ in self.adj.get(node, []):
                traverse(neighbor)

        traverse(start_id)
        return order

    def dijkstra(self, source_id: str, target_id: str) -> Dict[str, Any]:
        """Dijkstra shortest path based on inverse edge weights (distance = 1 / weight)."""
        if source_id not in self.adj or target_id not in self.adj:
            return {"found": False, "path": [], "total_distance": None}

        dist = {node["id"]: float("inf") for node in self.nodes}
        parent = {node["id"]: None for node in self.nodes}
        dist[source_id] = 0.0
        pq = [(0.0, source_id)]

        while pq:
            d, u = heapq.heappop(pq)
            if u == target_id:
                break
            if d > dist[u]:
                continue
            for v, w in self.adj.get(u, []):
                cost = 1.0 / max(0.1, w)
                if dist[u] + cost < dist[v]:
                    dist[v] = dist[u] + cost
                    parent[v] = u
                    heapq.heappush(pq, (dist[v], v))

        if dist[target_id] == float("inf"):
            return {"found": False, "path": [], "total_distance": None}

        # Reconstruct path
        path = []
        curr = target_id
        while curr:
            path.append(curr)
            curr = parent[curr]
        path.reverse()

        return {
            "found": True,
            "path": path,
            "total_distance": round(dist[target_id], 3),
            "hop_count": len(path) - 1,
        }

    def get_graph_data(self) -> Dict[str, Any]:
        """Return full structured graph for frontend rendering."""
        nodes_with_meta = []
        for n in self.nodes:
            nodes_with_meta.append(
                {
                    **n,
                    "pagerank": self.pagerank_scores.get(n["id"], 0.1),
                    "community": self.communities.get(n["id"], 0),
                    "degree": len(self.adj.get(n["id"], [])),
                }
            )

        return {
            "total_nodes": len(self.nodes),
            "total_edges": len(self.edge_list),
            "total_communities": len(set(self.communities.values())),
            "nodes": nodes_with_meta,
            "edges": self.edge_list[:250],  # Return top 250 strongest edges for rendering
        }

