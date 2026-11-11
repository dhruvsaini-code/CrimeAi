"""
CrimePattern AI — Master FastAPI Application.
Integrates all modular routers, CORS middleware, global error handling, and startup hooks.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.config import settings
from backend.database import repo
from backend.routers import (
    overview,
    cases,
    timeline,
    geography,
    clustering,
    search,
    graph,
    anomaly,
    patterns,
    optimization,
    analyze,
    methodology,
    export_analysis,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: preload database and verify model artifacts
    print("[CrimePattern AI] Initializing backend services...")
    repo.load_data()
    print("[CrimePattern AI] Historical case repository preloaded.")
    yield
    print("[CrimePattern AI] Shutting down backend services.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Historical Serial Crime Analysis and Pattern Discovery System. "
        "Strictly an academic and educational research tool. Never profiles or predicts living persons."
    ),
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development and local preview
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"[Unhandled Error] {request.method} {request.url}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "detail": str(exc)},
    )


# Register Routers
app.include_router(overview.router, prefix=settings.API_PREFIX)
app.include_router(cases.router, prefix=settings.API_PREFIX)
app.include_router(timeline.router, prefix=settings.API_PREFIX)
app.include_router(geography.router, prefix=settings.API_PREFIX)
app.include_router(clustering.router, prefix=settings.API_PREFIX)
app.include_router(search.router, prefix=settings.API_PREFIX)
app.include_router(graph.router, prefix=settings.API_PREFIX)
app.include_router(anomaly.router, prefix=settings.API_PREFIX)
app.include_router(patterns.router, prefix=settings.API_PREFIX)
app.include_router(optimization.router, prefix=settings.API_PREFIX)
app.include_router(analyze.router, prefix=settings.API_PREFIX)
app.include_router(export_analysis.export_router, prefix=settings.API_PREFIX)
app.include_router(methodology.router, prefix=settings.API_PREFIX)


@app.get("/")
def root():
    return {
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "api_docs": "/docs",
        "api_prefix": settings.API_PREFIX,
        "status": "Operational",
        "mandate": "Educational, Historical, and Unsupervised AI/ML Exploration Only",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "version": settings.VERSION}

