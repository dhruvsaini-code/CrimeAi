"""
Analyze Export Router addition: Generates downloadable forensic summary dossiers in Markdown and JSON formats.
"""

from fastapi import APIRouter, HTTPException, Response
from backend.schemas import AnalyzeCaseRequest
from backend.routers.analyze import analyze_case

export_router = APIRouter(prefix="/analyze", tags=["Analyze Case Export"])


@export_router.post("/export/markdown")
def export_analysis_markdown(req: AnalyzeCaseRequest):
    result = analyze_case(req)

    md = f"""# CrimePattern AI — Forensic Analysis Dossier
**Generated:** Academic & Educational Pattern Discovery Report
**Ethical Classification:** Documented Historical Comparison Only (Strictly Non-Predictive)

---

## 1. Input Forensic Parameters
- **Macro-Region:** {result['input_summary']['macro_region']}
- **Primary Method Category:** {result['input_summary']['method_category']}
- **Target Demographic Profile:** {result['input_summary']['victim_demographic']}
- **Active Era:** {result['input_summary']['active_decade']}
- **Site Type:** {result['input_summary']['location_type']}
- **Written Description:** {result['input_summary'].get('written_description') or 'None specified'}

---

## 2. Modality Cluster Assignment
- **Assigned Cluster:** {result['assigned_cluster']['name']}
- **PCA 2D Coordinates:** [{result['pca_projection']['x']}, {result['pca_projection']['y']}]
- **Forensic Rationale:** {result['assigned_cluster']['rationale']}

---

## 3. Top Documented Historical Matches
"""
    for i, m in enumerate(result['top_historical_matches'], 1):
        md += f"""
### {i}. {m['case_name']} ({m['case_id']}) — **{m['score_percentage']}% Similarity**
- **Jurisdiction:** {m['country']} ({m['macro_region']})
- **Active Era:** {m['active_decade']}s ({m['active_start_year']})
- **Documented Proven Victims:** {m['victims_proven']}
- **Method Category:** {m['method_category']}
- **Shared Traits:** {', '.join(m['shared_attributes']) if m['shared_attributes'] else 'None'}
- **Differing Traits:** {', '.join(m['differing_attributes']) if m['differing_attributes'] else 'None'}
- **Archival Reference:** [{m['source_title']}]({m['source_url']})

**Summary:** {m['summary']}
"""

    md += f"""
---

## 4. Methodology & Ethical Disclaimer
{result['methodology_explanation']}

> **NOTICE:** {result['ethical_disclaimer']}
"""

    return Response(
        content=md,
        media_type="text/markdown",
        headers={"Content-Disposition": "attachment; filename=crimepattern_forensic_dossier.md"},
    )

