"""
Graph Intelligence Router: Network of historical case relationships, PageRank, Communities, and Pathfinding.
"""

import json
from fastapi import APIRouter, HTTPException, Query
import joblib
from backend.config import settings

router = APIRouter(prefix="/graph", tags=["Graph Intelligence"])

_graph_engine = None


def get_graph():
    global _graph_engine
    if _graph_engine is None:
        model_path = settings.MODELS_DIR / "graph_engine.joblib"
        if not model_path.exists():
            raise HTTPException(status_code=503, detail="Graph engine not initialized yet.")
        _graph_engine = joblib.load(model_path)
    return _graph_engine


@router.get("/network")
def get_graph_network():
    cache_path = settings.MODELS_DIR / "graph_cache.json"
    if cache_path.exists():
        with open(cache_path, "r", encoding="utf-8") as f:
            return json.load(f)
    engine = get_graph()
    return engine.get_graph_data()


@router.get("/dijkstra")
def dijkstra_shortest_path(
    source_id: str = Query(..., description="Source case ID, e.g. CASE-001"),
    target_id: str = Query(..., description="Target case ID, e.g. CASE-010"),
):
    engine = get_graph()
    return engine.dijkstra(source_id=source_id, target_id=target_id)


@router.get("/bfs")
def bfs_traversal(
    start_id: str = Query(..., description="Start case ID"),
    depth_limit: int = Query(3, ge=1, le=5),
):
    engine = get_graph()
    return engine.bfs(start_id=start_id, depth_limit=depth_limit)


@router.get("/dfs")
def dfs_traversal(
    start_id: str = Query(..., description="Start case ID"),
    max_visited: int = Query(15, ge=1, le=30),
):
    engine = get_graph()
    return engine.dfs(start_id=start_id, max_visited=max_visited)

