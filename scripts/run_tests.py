"""
CrimePattern AI — Master Backend Test Suite (Zero-Dependency ASGI Runner).
Tests all 13 API endpoints, schemas, preprocessing, clustering, search, anomaly detection,
graph intelligence, association mining, and Analyze Case functionality.
"""

import asyncio
import json
import urllib.parse
from typing import Dict, Any, Optional
from backend.main import app


class ASGIResponse:
    def __init__(self, status_code: int, headers: list, body: bytes):
        self.status_code = status_code
        self.headers = dict(headers)
        self.body = body

    def json(self) -> Any:
        return json.loads(self.body.decode("utf-8"))

    @property
    def text(self) -> str:
        return self.body.decode("utf-8")


class LocalTestClient:
    """Zero-dependency ASGI TestClient using asyncio."""

    def __init__(self, asgi_app):
        self.app = asgi_app

    def request(
        self,
        method: str,
        path: str,
        json_data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None,
    ) -> ASGIResponse:
        return asyncio.run(self._async_request(method, path, json_data, params))

    async def _async_request(self, method: str, path: str, json_data, params) -> ASGIResponse:
        parsed_url = urllib.parse.urlparse(path)
        raw_path = parsed_url.path
        query_string = parsed_url.query
        if params:
            encoded_params = urllib.parse.urlencode(params)
            query_string = f"{query_string}&{encoded_params}" if query_string else encoded_params

        body_bytes = b""
        headers = [(b"host", b"localhost")]
        if json_data is not None:
            body_bytes = json.dumps(json_data).encode("utf-8")
            headers.append((b"content-type", b"application/json"))
            headers.append((b"content-length", str(len(body_bytes)).encode("ascii")))

        scope = {
            "type": "http",
            "asgi": {"version": "3.0"},
            "http_version": "1.1",
            "method": method.upper(),
            "path": raw_path,
            "raw_path": raw_path.encode("ascii"),
            "query_string": query_string.encode("ascii"),
            "headers": headers,
        }

        response_status = 200
        response_headers = []
        response_body = bytearray()

        async def receive():
            nonlocal body_bytes
            data = body_bytes
            body_bytes = b""
            return {"type": "http.request", "body": data, "more_body": False}

        async def send(message):
            nonlocal response_status, response_headers, response_body
            if message["type"] == "http.response.start":
                response_status = message["status"]
                response_headers = message.get("headers", [])
            elif message["type"] == "http.response.body":
                response_body.extend(message.get("body", b""))

        await self.app(scope, receive, send)
        return ASGIResponse(response_status, response_headers, bytes(response_body))

    def get(self, path: str, params=None):
        return self.request("GET", path, params=params)

    def post(self, path: str, json=None):
        return self.request("POST", path, json_data=json)


client = LocalTestClient(app)


def run_all_tests():
    print("========================================")
    print("RUNNING CRIMEPATTERN AI BACKEND TESTS...")
    print("========================================")

    # 1. Root & Health Check
    res = client.get("/")
    assert res.status_code == 200, f"Root failed: {res.text}"
    print("✓ GET / passed")

    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("✓ GET /health passed")

    # 2. Overview Stats & Quality Report
    res = client.get("/api/v1/overview/stats")
    assert res.status_code == 200, f"Overview stats failed: {res.text}"
    data = res.json()
    assert data["total_cases"] >= 400, f"Unexpected case count: {data['total_cases']}"
    assert "quality_report" in data
    print(f"✓ GET /api/v1/overview/stats passed (Loaded {data['total_cases']} cases, {data['total_countries']} countries)")

    # 3. Cases Listing & Filter Options
    res = client.get("/api/v1/cases?limit=10")
    assert res.status_code == 200, f"Cases listing failed: {res.text}"
    cases_data = res.json()
    assert len(cases_data["cases"]) == 10
    first_case = cases_data["cases"][0]
    assert "case_id" in first_case and "case_name" in first_case
    print(f"✓ GET /api/v1/cases passed (First case: {first_case['case_name']})")

    res = client.get("/api/v1/cases/filters")
    assert res.status_code == 200, f"Cases filters failed: {res.text}"
    filters = res.json()
    assert len(filters["methods"]) > 0 and len(filters["macro_regions"]) > 0
    print(f"✓ GET /api/v1/cases/filters passed ({len(filters['methods'])} methods, {len(filters['macro_regions'])} regions)")

    # 4. Specific Case Detail
    res = client.get(f"/api/v1/cases/{first_case['case_id']}")
    assert res.status_code == 200
    print(f"✓ GET /api/v1/cases/{first_case['case_id']} passed")

    # 5. Timeline & Geography
    res = client.get("/api/v1/timeline")
    assert res.status_code == 200
    print("✓ GET /api/v1/timeline passed")

    res = client.get("/api/v1/geography/summary")
    assert res.status_code == 200
    print("✓ GET /api/v1/geography/summary passed")

    # 6. Clustering Results (Elbow, PCA coordinates, Silhouette metrics)
    res = client.get("/api/v1/clustering/results")
    assert res.status_code == 200
    clust_data = res.json()
    assert "elbow_data" in clust_data and "comparison_metrics" in clust_data
    assert len(clust_data["cluster_summaries"]) == 5
    print("✓ GET /api/v1/clustering/results passed (5 cluster summaries & comparative metrics)")

    # 7. Unified Search Engine (Hybrid, TF-IDF, BM25, Semantic)
    search_payload = {"query": "Poisoning hospital medical patients", "method": "hybrid", "top_k": 3}
    res = client.post("/api/v1/search", json=search_payload)
    assert res.status_code == 200
    search_res = res.json()
    assert len(search_res["results"]) > 0
    print(f"✓ POST /api/v1/search passed (Top match: {search_res['results'][0]['case_name']})")

    # 8. Graph Intelligence & Pathfinding
    res = client.get("/api/v1/graph/network")
    assert res.status_code == 200
    graph_res = res.json()
    assert graph_res["total_nodes"] > 0
    print(f"✓ GET /api/v1/graph/network passed ({graph_res['total_nodes']} nodes, {graph_res['total_edges']} edges)")

    # 9. Anomaly Detection
    res = client.get("/api/v1/anomaly/outliers")
    assert res.status_code == 200
    anomaly_res = res.json()
    assert anomaly_res["flagged_anomalies_count"] > 0
    print(f"✓ GET /api/v1/anomaly/outliers passed ({anomaly_res['flagged_anomalies_count']} outliers flagged)")

    # 10. Pattern Discovery & Association Rules
    res = client.get("/api/v1/patterns/rules")
    assert res.status_code == 200
    pat_res = res.json()
    assert len(pat_res["rules"]) > 0
    print(f"✓ GET /api/v1/patterns/rules passed ({len(pat_res['rules'])} Apriori rules mined)")

    # 11. Optimization Results
    res = client.get("/api/v1/optimization/results")
    assert res.status_code == 200
    opt_res = res.json()
    assert "grid_search" in opt_res and "genetic_algorithm" in opt_res
    print("✓ GET /api/v1/optimization/results passed")

    # 12. Analyze Case Feature
    analyze_payload = {
        "macro_region": "North America",
        "method_category": "Strangulation / Asphyxiation",
        "victim_demographic": "Young Adults / Students",
        "active_decade": 1970,
        "location_type": "Highway / Rural / Remote",
        "written_description": "Targeted hitchhikers along coastal highway routes during the 1970s",
    }
    res = client.post("/api/v1/analyze", json=analyze_payload)
    assert res.status_code == 200
    analyze_res = res.json()
    assert "pca_projection" in analyze_res
    assert "assigned_cluster" in analyze_res
    assert len(analyze_res["top_historical_matches"]) == 5
    print(f"✓ POST /api/v1/analyze passed (Assigned to {analyze_res['assigned_cluster']['name']})")

    # 13. Methodology
    res = client.get("/api/v1/methodology")
    assert res.status_code == 200
    print("✓ GET /api/v1/methodology passed")

    print("\n========================================")
    print("ALL 13 BACKEND TEST SUITES PASSED (100%)!")
    print("========================================\n")


if __name__ == "__main__":
    run_all_tests()
