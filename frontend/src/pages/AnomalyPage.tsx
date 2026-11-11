import React, { useState, useEffect } from 'react';
import { AnomalyData } from '../types';
import { api } from '../services/api';
import { AlertTriangle, ShieldCheck, Eye, Info, Sparkles } from 'lucide-react';

interface AnomalyPageProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const AnomalyPage: React.FC<AnomalyPageProps> = ({ onSelectCaseDetail }) => {
  const [data, setData] = useState<AnomalyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAnomalies()
      .then((res) => setData(res))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm">
        Computing Isolation Forest and Local Outlier Factor decision boundaries...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-red/10 border border-crime-red/30 text-[11px] font-mono text-crime-red mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>STATISTICAL OUTLIER DETECTION</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-crime-text">
          Anomaly Radar (Isolation Forest & LOF)
        </h2>
        <p className="text-xs text-crime-muted font-mono mt-1 max-w-2xl">
          Identifies rare multivariate feature combinations, extreme duration profiles, and atypical
          victim counts using ensemble isolation trees and local density estimation.
        </p>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-dark-line font-mono text-xs">
          <div>
            <div className="text-crime-muted">Evaluated Records</div>
            <div className="text-2xl font-display font-bold text-crime-text mt-0.5">
              {data.total_evaluated}
            </div>
          </div>
          <div>
            <div className="text-crime-muted">Flagged Outliers</div>
            <div className="text-2xl font-display font-bold text-crime-tape mt-0.5">
              {data.flagged_anomalies_count}
            </div>
            <div className="text-[10px] text-crime-muted">Combined ensemble</div>
          </div>
          <div>
            <div className="text-crime-muted">Isolation Forest</div>
            <div className="text-2xl font-display font-bold text-crime-red mt-0.5">
              {data.isolation_forest_count}
            </div>
            <div className="text-[10px] text-crime-muted">Tree splits & depth</div>
          </div>
          <div>
            <div className="text-crime-muted">Local Outlier Factor</div>
            <div className="text-2xl font-display font-bold text-crime-cyan mt-0.5">
              {data.lof_count}
            </div>
            <div className="text-[10px] text-crime-muted">k-distance density</div>
          </div>
        </div>
      </div>

      {/* Critical Ethics Banner */}
      <div className="bg-dark-panel border-l-4 border-crime-tape border-y border-r border-dark-line p-4 rounded-lg flex items-start gap-3 shadow-md">
        <ShieldCheck className="w-5 h-5 text-crime-tape shrink-0 mt-0.5" />
        <div className="text-xs font-mono text-crime-subtext leading-relaxed">
          <strong className="text-crime-tape">CRITICAL DISTINCTION:</strong> An anomaly in this system
          designates a <em>statistical data rarity</em> (such as an unprecedented duration of 30+ years,
          or a unique medical poison modality). It does <strong>not</strong> signify increased criminality,
          culpability, or individual behavioral suspicion.
        </div>
      </div>

      {/* Flagged Outlier Records List */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-crime-muted uppercase tracking-wider px-1">
          Ranked Historical Outliers with Explainability Breakdown ({data.flagged_cases.length} cases)
        </div>

        <div className="space-y-3">
          {data.flagged_cases.map((c, idx) => (
            <div
              key={idx}
              className="bg-dark-panel border border-dark-line hover:border-dark-lineLight p-5 rounded-lg shadow-lg space-y-3 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-crime-tape font-bold bg-crime-tape/10 px-2 py-0.5 rounded border border-crime-tape/30">
                    {c.case_id}
                  </span>
                  <h3 className="text-lg font-display font-bold text-crime-text">{c.case_name}</h3>
                  <span className="text-xs text-crime-muted font-mono">
                    ({c.country} · {c.macro_region} · {c.active_start_year}s)
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {c.isolation_forest_flag && (
                    <span className="px-2 py-0.5 rounded bg-crime-red/20 border border-crime-red/40 text-crime-red text-[11px]">
                      iForest ({c.iso_score})
                    </span>
                  )}
                  {c.lof_flag && (
                    <span className="px-2 py-0.5 rounded bg-crime-cyan/20 border border-crime-cyan/40 text-crime-cyan text-[11px]">
                      LOF ({c.lof_score})
                    </span>
                  )}
                </div>
              </div>

              {/* Forensic Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-dark-card/60 p-2.5 rounded border border-dark-line text-crime-muted">
                <div>Method: <strong className="text-crime-text">{c.method_category}</strong></div>
                <div>Site: <strong className="text-crime-text">{c.location_type}</strong></div>
                <div>Duration: <strong className="text-crime-tape">{c.duration_years} yrs</strong></div>
                <div>Proven Victims: <strong className="text-crime-red">{c.victims_proven}</strong></div>
              </div>

              {/* Explainability Breakdown Factors */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono text-crime-tape flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Statistical Anomaly Factors:
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.anomaly_reasons.map((r, rIdx) => (
                    <span
                      key={rIdx}
                      className="bg-crime-tape/10 border border-crime-tape/30 text-crime-tape text-xs font-mono px-2.5 py-1 rounded"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSelectCaseDetail(c.case_id)}
                  className="text-xs font-mono text-crime-tape hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Full Historical Record
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

