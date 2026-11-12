import React, { useState, useEffect } from 'react';
import { ClusteringData } from '../types';
import { api } from '../services/api';
import { PcaGalaxy } from '../components/PcaGalaxy';
import { Layers, Activity, Info, BarChart2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ClusteringPageProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const ClusteringPage: React.FC<ClusteringPageProps> = ({ onSelectCaseDetail }) => {
  const [data, setData] = useState<ClusteringData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getClusteringResults()
      .then((res) => {
        if (isMounted && res) setData(res);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && !data) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-crime-tape border-t-transparent rounded-full animate-spin" />
        <div>Loading unsupervised clustering models and PCA coordinates...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm">
        Unable to load clustering data. Please verify models are initialized.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-red/10 border border-crime-red/30 text-[11px] font-mono text-crime-red mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>TOPOLOGICAL MODALITY CLUSTERING</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-crime-text">
            Unsupervised Cluster Galaxy & PCA Visualizer
          </h2>
          <p className="text-xs text-crime-muted font-mono mt-1 max-w-2xl">
            High-dimensional standardized forensic features projected into 2D PCA space (
            {data.total_variance_explained}% total variance explained). Select any case to inspect its
            modality profile and 5 closest historical cases.
          </p>
        </div>

        <div className="bg-dark-card border border-dark-line p-3 rounded font-mono text-xs space-y-1">
          <div className="text-crime-muted">PCA Explained Variance:</div>
          <div className="text-crime-tape font-bold">
            PC1: {(data.explained_variance[0] * 100).toFixed(1)}% · PC2: {(data.explained_variance[1] * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Interactive Galaxy Scatter Plot & Dossier */}
      <PcaGalaxy
        casePoints={data.case_points}
        clusterSummaries={data.cluster_summaries}
        onSelectCaseDetail={onSelectCaseDetail}
      />

      {/* Algorithms Benchmark Comparison Section */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-display font-bold text-crime-text flex items-center gap-2">
            <Activity className="w-5 h-5 text-crime-tape" />
            <span>Comparative Clustering Benchmark (Silhouette, Davies-Bouldin, Calinski-Harabasz)</span>
          </h3>
          <p className="text-xs text-crime-muted font-mono mt-1">
            Empirical evaluation of 5 distinct unsupervised grouping paradigms across identical feature vectors.
          </p>
        </div>

        {/* Algorithm Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-dark-card border-b border-dark-line text-crime-muted text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Clustering Algorithm</th>
                <th className="py-3 px-4">Partitions</th>
                <th className="py-3 px-4">Silhouette (↑ higher is better)</th>
                <th className="py-3 px-4">Davies-Bouldin (↓ lower is better)</th>
                <th className="py-3 px-4">Calinski-Harabasz (↑ higher is better)</th>
                <th className="py-3 px-4">Noise / Outliers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-line">
              {data.comparison_metrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-dark-card/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-crime-text">{m.algorithm}</td>
                  <td className="py-3 px-4 text-crime-tape font-bold">{m.n_clusters} clusters</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        m.silhouette && m.silhouette > 0.25 ? 'text-emerald-400' : 'text-crime-text'
                      }`}
                    >
                      {m.silhouette !== null ? m.silhouette : 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-crime-subtext">
                    {m.davies_bouldin !== null ? m.davies_bouldin : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-crime-cyan font-bold">
                    {m.calinski_harabasz !== null ? m.calinski_harabasz : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-crime-muted">
                    {m.noise_count > 0 ? (
                      <span className="text-crime-red font-bold">{m.noise_count} points</span>
                    ) : (
                      '0'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* K-Means Elbow Curve & Silhouette Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-dark-line">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-crime-muted mb-2">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-crime-tape" /> K-Means Inertia (Elbow Method)
              </span>
              <span>k = 2..10</span>
            </div>
            <div className="h-56 bg-dark-card border border-dark-line rounded p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.elbow_data}>
                  <XAxis dataKey="k" stroke="#5c6272" fontSize={11} fontFamily="IBM Plex Mono" />
                  <YAxis stroke="#5c6272" fontSize={11} fontFamily="IBM Plex Mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#07080c',
                      borderColor: '#232837',
                      fontFamily: 'IBM Plex Mono',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inertia"
                    stroke="#ffc400"
                    strokeWidth={2}
                    dot={{ fill: '#ffc400', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono text-crime-muted mb-2">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-crime-cyan" /> Silhouette Coefficient by Cluster Count
              </span>
              <span>k = 2..10</span>
            </div>
            <div className="h-56 bg-dark-card border border-dark-line rounded p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.elbow_data}>
                  <XAxis dataKey="k" stroke="#5c6272" fontSize={11} fontFamily="IBM Plex Mono" />
                  <YAxis stroke="#5c6272" fontSize={11} fontFamily="IBM Plex Mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#07080c',
                      borderColor: '#232837',
                      fontFamily: 'IBM Plex Mono',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="silhouette"
                    stroke="#2ee6d0"
                    strokeWidth={2}
                    dot={{ fill: '#2ee6d0', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="bg-dark-card border border-dark-line p-4 rounded text-xs font-mono text-crime-subtext flex items-start gap-3">
          <Info className="w-4 h-4 text-crime-cyan shrink-0 mt-0.5" />
          <div>
            <strong>Forensic Interpretation:</strong> PCA is utilized strictly for transparent visual
            interpretation. DBSCAN distinguishes core density basins from isolated historical cases (noise).
            In our forensic methodology, a "noise" designation indicates a statistical rarity in documented
            attributes, never criminal guilt or suspicion.
          </div>
        </div>
      </div>
    </div>
  );
};

