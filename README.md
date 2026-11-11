# CrimePattern AI — Historical Serial Crime Analysis and Pattern Discovery System

> **Applications of AI — Course Project Demonstration & Viva**  
> **Ethical Notice:** CrimePattern AI is an academic and educational research system analyzing publicly documented historical serial crime cases. It discovers unsupervised patterns, clusters forensic modalities, mines association rules, and evaluates explainable NLP retrieval. It **never** predicts criminality, identifies suspects, or profiles living individuals.

---

## Key Highlights

- **492 Verified Historical Cases**: Cleaned and standardized from the provided `00_serial_killers_dataset.numbers` archive across **83 countries** (1900–2022) with 100% traceable encyclopedic citations.
- **Topological Cluster Galaxy**: Interactive 2D PCA scatter plot with animated linking arcs connecting selected points to their 5 closest historical cases.
- **Advanced Unsupervised Clustering**: Real-time evaluation of **K-Means**, **DBSCAN**, **Agglomerative Hierarchical**, **Gaussian Mixture Models**, and **Spectral Clustering** with Silhouette, Davies-Bouldin, and Calinski-Harabasz metrics.
- **Unified NLP & Search Engine**: Multi-mode retrieval comparing **Okapi BM25**, **TF-IDF**, **Dense SVD Semantic Embeddings**, and **KNN Exact Search**.
- **Graph Intelligence**: Cross-case network topology with **PageRank Centrality**, **Louvain Community Detection**, and **Dijkstra Shortest Path** calculations.
- **Anomaly Radar**: Multivariate statistical outlier detection via **Isolation Forest** and **Local Outlier Factor (LOF)** with factor explainability breakdown.
- **Association Mining**: **Apriori** frequent itemsets (Support, Confidence, Lift) and **PrefixSpan** historical sequential decade transitions.
- **Analyze Case**: Interactive input form with dynamic 2D PCA projection, pulsing radar marker, and explainable forensic similarity breakdown.
- **Hyperparameter Optimization**: Automated benchmarks comparing **Grid Search**, **Random Search**, and a **Genetic Algorithm** optimizer.
- **Premium Command Center UI**: Modern dark charcoal/navy palette (`#07080c`, `#0e1118`, `#141824`), yellow investigative ticker tape banner, Space Grotesk / Inter / IBM Plex Mono typography, and particle network canvas.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide React |
| **Backend** | Python 3, FastAPI, Pydantic, Uvicorn, ASGI |
| **Machine Learning** | scikit-learn, NumPy, pandas, SciPy, joblib |
| **Storage & Data** | Standardized JSON & CSV fallback (MongoDB-ready) |

---

## Project Structure

```
CrimeAi/
├── 00_serial_killers_dataset.numbers   # Raw dataset archive provided
├── backend/
│   ├── config.py                       # Configuration & settings
│   ├── database.py                     # Case repository with JSON/CSV fallback
│   ├── schemas.py                      # Pydantic request/response models
│   ├── main.py                         # Master FastAPI application
│   ├── ml/
│   │   ├── preprocessing.py            # Feature transformation & scaling
│   │   ├── clustering.py               # K-Means, DBSCAN, Agglomerative, GMM, PCA
│   │   ├── search_engine.py            # TF-IDF, BM25, SVD Semantic Embeddings, KNN
│   │   ├── graph_intel.py              # PageRank, Louvain communities, Dijkstra
│   │   ├── anomaly.py                  # Isolation Forest & Local Outlier Factor
│   │   ├── association.py              # Apriori & PrefixSpan sequential mining
│   │   └── optimization.py             # Grid, Random, & Genetic Algorithm search
│   └── routers/                        # Modular FastAPI endpoints
│       ├── overview.py
│       ├── cases.py
│       ├── timeline.py
│       ├── geography.py
│       ├── clustering.py
│       ├── search.py
│       ├── graph.py
│       ├── anomaly.py
│       ├── patterns.py
│       ├── optimization.py
│       ├── analyze.py
│       └── methodology.py
├── data/
│   ├── historical_cases.json           # Standardized 492 cases (JSON)
│   ├── historical_cases.csv            # Standardized 492 cases (CSV)
│   └── quality_report.json             # Dataset completeness & distributions
├── models/                             # Serialized joblib models & benchmark caches
├── frontend/
│   ├── src/
│   │   ├── components/                 # PcaGalaxy, TimelineChart, GraphView, CaseAnalyzer, etc.
│   │   ├── pages/                      # 10 dedicated interactive views
│   │   ├── services/api.ts             # API client connecting to backend
│   │   └── types/index.ts              # TypeScript definitions
│   ├── index.html                      # Space Grotesk, Inter, IBM Plex Mono fonts
│   └── tailwind.config.js              # Theme tokens
├── scripts/
│   ├── process_dataset.py              # Raw dataset cleaning & feature engineering
│   ├── train_models.py                 # Master training & serialization pipeline
│   └── run_tests.py                    # 13-suite automated backend verification
├── docs/
│   └── METHODOLOGY.md                  # Comprehensive scientific methodology
├── requirements.txt                    # Python dependencies
├── package.json                        # Root NPM scripts
└── README.md
```

---

## Quick Start & Local Execution

### 1. Ingestion & Model Training
The dataset ingestion and model serialization can be executed at any time:
```bash
# Clean raw dataset and generate data/historical_cases.json
python3 scripts/process_dataset.py

# Fit all ML models, embeddings, graph network, and benchmarks
PYTHONPATH=. python3 scripts/train_models.py
```

### 2. Run Backend (FastAPI)
```bash
# Start FastAPI backend on http://localhost:8000
python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
- Interactive API Swagger Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### 3. Run Frontend (React + Vite)
```bash
# Start frontend development server on http://localhost:5173
cd frontend
NODE_OPTIONS="--no-use-system-ca" npm run dev
```

### 4. Run Automated Test Suites
```bash
# Run backend test suite (all 13 API endpoints, ML models, and schemas)
PYTHONPATH=. python3 scripts/run_tests.py

# Run frontend build verification test suite
NODE_OPTIONS="--no-use-system-ca" node frontend/tests/frontend.test.mjs
```

---

## API Endpoints Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/overview/stats` | `GET` | Summary metrics, year coverage, and quality report |
| `/api/v1/cases` | `GET` | Paginated and filterable historical case list |
| `/api/v1/cases/filters` | `GET` | Available dropdown filter choices |
| `/api/v1/cases/{case_id}` | `GET` | Complete metadata and Wikipedia citation for a case |
| `/api/v1/clustering/results` | `GET` | PCA coordinates, cluster summaries, elbow curve & metrics |
| `/api/v1/timeline` | `GET` | Cases per decade stacked by cluster modality |
| `/api/v1/geography/summary` | `GET` | Sovereign country counts and incident coordinates |
| `/api/v1/search` | `POST` | Intelligent search (Hybrid, Semantic, BM25, TF-IDF, KNN) |
| `/api/v1/search/benchmarks` | `GET` | Documented test query retrieval benchmark |
| `/api/v1/graph/network` | `GET` | Cross-case graph nodes, edges, PageRank & communities |
| `/api/v1/graph/dijkstra` | `GET` | Shortest forensic path between two cases |
| `/api/v1/anomaly/outliers` | `GET` | Isolation Forest & LOF flagged cases with explainability |
| `/api/v1/patterns/rules` | `GET` | Apriori association rules and PrefixSpan sequential transitions |
| `/api/v1/optimization/results` | `GET` | Grid, Random, and Genetic hyperparameter search results |
| `/api/v1/analyze` | `POST` | Compare input characteristics with historical records |
| `/api/v1/methodology` | `GET` | Algorithmic formulas, ethical rules, and data provenance |

---

## Ethical Boundaries & Academic Declaration

1. **No Predictive Criminality**: The system exclusively performs unsupervised grouping of past, publicly documented historical cases. It does not predict future offenses or rate individuals.
2. **No Living Individual Profiling**: The system explicitly forbids assessing living persons.
3. **No Inference of Causality**: Association rules ($A \to B$) indicate co-occurrence within archival data, not organizational connection or causation.
4. **Transparent Data Provenance**: Every record is linked to its cited public historical archive.

