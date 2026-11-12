#!/usr/bin/env bash
# CrimePattern AI — Local Development Startup Script
set -e

echo "================================================================="
echo "  CRIMEPATTERN AI — Historical Serial Crime Analysis System      "
echo "  Applications of AI — Course Project Demonstration             "
echo "================================================================="

# Check Python environment
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 is required but not found."
    exit 1
fi

# Ensure data and models are present
if [ ! -f "data/historical_cases.json" ]; then
    echo "⚡ Initializing dataset from raw numbers archive..."
    python3 scripts/process_dataset.py
fi

if [ ! -f "models/clustering_cache.json" ]; then
    echo "⚡ Fitting and serializing machine learning models..."
    PYTHONPATH=. python3 scripts/train_models.py
fi

echo ""
echo "Starting FastAPI Backend on http://localhost:8000 (API Docs: http://localhost:8000/docs)..."
python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Starting Vite Frontend on http://localhost:5173..."
cd frontend
NODE_OPTIONS="--no-use-system-ca" npm run dev &
FRONTEND_PID=$!
cd ..

cleanup() {
    echo ""
    echo "Shutting down CrimePattern AI services..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "Done."
}

trap cleanup SIGINT SIGTERM EXIT

echo ""
echo "✓ Systems online:"
echo "  - Web Dashboard: http://localhost:5173"
echo "  - FastAPI Docs:  http://localhost:8000/docs"
echo "Press Ctrl+C to terminate both servers."

wait
