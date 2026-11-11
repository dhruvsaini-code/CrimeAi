import React, { useState, useMemo } from 'react';
import { CasePoint, ClusterSummary } from '../types';
import { Eye, Layers, Compass, Sparkles } from 'lucide-react';

interface PcaGalaxyProps {
  casePoints: CasePoint[];
  clusterSummaries: ClusterSummary[];
  onSelectCaseDetail: (caseId: string) => void;
}

export const PcaGalaxy: React.FC<PcaGalaxyProps> = ({
  casePoints,
  clusterSummaries,
  onSelectCaseDetail,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<CasePoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<CasePoint | null>(null);
  const [activeClusters, setActiveClusters] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    '-1': true, // Outliers
  });

  const width = 900;
  const height = 540;
  const padding = 55;

  // Compute coordinate domain
  const { minX, maxX, minY, maxY } = useMemo(() => {
    if (!casePoints.length) return { minX: -5, maxX: 5, minY: -5, maxY: 5 };
    const xs = casePoints.map((p) => p.pca_x);
    const ys = casePoints.map((p) => p.pca_y);
    return {
      minX: Math.min(...xs) - 0.5,
      maxX: Math.max(...xs) + 0.5,
      minY: Math.min(...ys) - 0.5,
      maxY: Math.max(...ys) + 0.5,
    };
  }, [casePoints]);

  const mapX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const mapY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  const clusterColors: Record<number, string> = {
    0: '#ff4d5e',
    1: '#2ee6d0',
    2: '#b57bff',
    3: '#5bb8ff',
    4: '#ffc400',
    '-1': '#7b8190',
  };

  const toggleCluster = (cid: number) => {
    setActiveClusters((prev) => ({ ...prev, [cid]: !prev[cid] }));
  };

  // Find 5 closest historical cases to selectedPoint
  const closestMatches = useMemo(() => {
    if (!selectedPoint) return [];
    return casePoints
      .filter((p) => p.case_id !== selectedPoint.case_id)
      .map((p) => {
        const dx = p.pca_x - selectedPoint.pca_x;
        const dy = p.pca_y - selectedPoint.pca_y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Normalized similarity score: 1 / (1 + dist)
        const sim = 1 / (1 + dist * 0.4);
        return { point: p, dist, similarity: sim };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  }, [selectedPoint, casePoints]);

  return (
    <div className="space-y-6">
      {/* Cluster Legend / Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-crime-muted flex items-center gap-1.5 mr-2">
          <Layers className="w-3.5 h-3.5 text-crime-tape" /> Filter Galaxy:
        </span>
        {clusterSummaries.map((c) => {
          const isEnabled = activeClusters[c.cluster_id] !== false;
          return (
            <button
              key={c.cluster_id}
              onClick={() => toggleCluster(c.cluster_id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                isEnabled
                  ? 'bg-dark-panel text-crime-text border-dark-line shadow-sm hover:border-crime-tape'
                  : 'bg-dark-bg text-crime-muted/40 border-dark-line/40 opacity-40'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }}
              />
              <span>{c.name}</span>
              <span className="text-[10px] text-crime-muted">({c.case_count})</span>
            </button>
          );
        })}
        <button
          onClick={() => toggleCluster(-1)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
            activeClusters['-1'] !== false
              ? 'bg-dark-panel text-crime-text border-dark-line shadow-sm'
              : 'bg-dark-bg text-crime-muted/40 border-dark-line/40 opacity-40'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#7b8190]" />
          <span>Outliers / Noise</span>
        </button>
      </div>

      {/* Main Split: Galaxy Board + Selected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Galaxy Plot */}
        <div className="lg:col-span-8 bg-dark-panel border border-dark-line rounded-lg p-3 sm:p-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[11px] text-crime-muted">
            <Compass className="w-3.5 h-3.5 text-crime-red" />
            <span>2D PCA Projection (Orthogonal Forensic Dimensionality Reduction)</span>
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto select-none overflow-visible"
          >
            <defs>
              <filter id="galaxyGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
              {clusterSummaries.map((c) => (
                <radialGradient key={c.cluster_id} id={`radial-glow-${c.cluster_id}`}>
                  <stop offset="0%" stopColor={c.color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>

            {/* Grid Lines */}
            {[-3, -1.5, 0, 1.5, 3].map((v, i) => (
              <g key={i}>
                <line
                  x1={mapX(v)}
                  x2={mapX(v)}
                  y1={padding}
                  y2={height - padding}
                  stroke="#1a1f2c"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1={padding}
                  x2={width - padding}
                  y1={mapY(v)}
                  y2={mapY(v)}
                  stroke="#1a1f2c"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              </g>
            ))}

            {/* Axis labels */}
            <text x={width - padding} y={height - 14} textAnchor="end" fill="#5c6272" fontSize="11" fontFamily="IBM Plex Mono">
              PCA Component 1 →
            </text>
            <text x={18} y={padding} textAnchor="start" fill="#5c6272" fontSize="11" fontFamily="IBM Plex Mono">
              PCA Component 2 ↑
            </text>

            {/* Cluster Center Halos */}
            {clusterSummaries.map((c) => {
              if (activeClusters[c.cluster_id] === false) return null;
              return (
                <circle
                  key={c.cluster_id}
                  cx={mapX(c.centroid_pca[0])}
                  cy={mapY(c.centroid_pca[1])}
                  r="95"
                  fill={`url(#radial-glow-${c.cluster_id})`}
                  className="pointer-events-none"
                />
              );
            })}

            {/* Connecting Arc Lines from Selected Point to Closest Matches */}
            {selectedPoint &&
              closestMatches.map((m, idx) => {
                const sx = mapX(selectedPoint.pca_x);
                const sy = mapY(selectedPoint.pca_y);
                const tx = mapX(m.point.pca_x);
                const ty = mapY(m.point.pca_y);
                const midX = (sx + tx) / 2;
                const midY = Math.min(sy, ty) - 40;
                return (
                  <path
                    key={idx}
                    d={`M ${sx} ${sy} Q ${midX} ${midY} ${tx} ${ty}`}
                    fill="none"
                    stroke="#ffc400"
                    strokeWidth="1.8"
                    opacity="0.9"
                    className="arc-draw"
                    style={{ filter: 'drop-shadow(0 0 6px #ffc400)' }}
                  />
                );
              })}

            {/* Case Data Dots */}
            {casePoints.map((p) => {
              const clusterKey = p.kmeans_cluster;
              if (activeClusters[clusterKey] === false) return null;

              const isSelected = selectedPoint?.case_id === p.case_id;
              const isMatch = closestMatches.some((m) => m.point.case_id === p.case_id);
              const color = isSelected
                ? '#ffc400'
                : isMatch
                ? '#ffc400'
                : clusterColors[p.kmeans_cluster] || '#7b8190';

              const cx = mapX(p.pca_x);
              const cy = mapY(p.pca_y);

              return (
                <g key={p.case_id}>
                  {/* Subtle Glow */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 14 : isMatch ? 9 : 6}
                    fill={color}
                    opacity={isSelected ? 0.8 : isMatch ? 0.6 : 0.3}
                    filter="url(#galaxyGlow)"
                  />
                  {/* Core Point */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 6.5 : isMatch ? 5 : 3.8}
                    fill={color}
                    stroke="#07080c"
                    strokeWidth={isSelected ? '2' : '1'}
                    className="cursor-pointer transition-transform hover:scale-150 duration-150"
                    onClick={() => setSelectedPoint(p)}
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover Floating Mini Card */}
          {hoveredPoint && (
            <div className="absolute bottom-4 left-4 bg-black/90 border border-crime-tape/60 p-3 rounded shadow-2xl text-xs font-mono pointer-events-none z-20">
              <div className="text-crime-tape font-bold">{hoveredPoint.case_id} — {hoveredPoint.case_name}</div>
              <div className="text-crime-subtext mt-0.5">
                {hoveredPoint.country} ({hoveredPoint.macro_region}) · {hoveredPoint.active_start_year}s
              </div>
              <div className="text-crime-muted text-[11px] mt-0.5">
                {hoveredPoint.method_category} · {hoveredPoint.victims_proven} victims
              </div>
            </div>
          )}
        </div>

        {/* Selected Case Dossier Panel */}
        <div className="lg:col-span-4 bg-dark-panel border-t-4 border-crime-red border-x border-b border-dark-line rounded-lg p-5 flex flex-col justify-between shadow-xl">
          {selectedPoint ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-crime-tape font-bold tracking-wider">
                  {selectedPoint.case_id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-dark-card border border-dark-line font-mono text-crime-muted">
                  Cluster {clusterSummaries[selectedPoint.kmeans_cluster]?.name || 'Outlier'}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-crime-text mt-1">
                {selectedPoint.case_name}
              </h3>
              <p className="text-xs text-crime-muted font-mono mt-0.5">
                {selectedPoint.country} · {selectedPoint.macro_region} · {selectedPoint.active_start_year}s
              </p>

              {/* Traits summary */}
              <div className="bg-dark-card border border-dark-line p-3 rounded mt-4 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-crime-muted">Method:</span>
                  <span className="text-crime-text font-medium">{selectedPoint.method_category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crime-muted">Victim Profile:</span>
                  <span className="text-crime-text font-medium">{selectedPoint.victim_demographic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crime-muted">Documented Victims:</span>
                  <span className="text-crime-red font-bold">{selectedPoint.victims_proven}</span>
                </div>
              </div>

              {/* Closest Historical Matches */}
              <div className="mt-5">
                <div className="text-xs font-mono text-crime-tape uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 5 Closest Historical Matches:
                </div>
                <div className="space-y-2">
                  {closestMatches.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectCaseDetail(m.point.case_id)}
                      className="bg-dark-card hover:bg-dark-cardHover border border-dark-line hover:border-crime-tape/60 p-2.5 rounded cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-crime-text font-medium">
                          {m.point.case_name}
                        </span>
                        <span className="font-mono font-bold text-crime-tape">
                          {Math.round(m.similarity * 100)}%
                        </span>
                      </div>
                      <div className="text-[11px] text-crime-muted flex justify-between mt-1">
                        <span>{m.point.macro_region} · {m.point.active_start_year}s</span>
                        <span className="truncate max-w-[130px]">{m.point.method_category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-crime-muted">
              <Compass className="w-10 h-10 text-crime-tape/40 mb-3 animate-pulse" />
              <div className="font-display text-lg text-crime-text font-bold">NO CASE SELECTED</div>
              <p className="text-xs max-w-xs mt-2 leading-relaxed">
                Click any case node on the Cluster Galaxy to reveal its topological cluster assignment,
                geometric coordinates, and its 5 closest historical cases with animated linking arcs.
              </p>
            </div>
          )}

          {selectedPoint && (
            <button
              onClick={() => onSelectCaseDetail(selectedPoint.case_id)}
              className="w-full mt-5 py-2 px-3 rounded bg-crime-red/20 hover:bg-crime-red/30 border border-crime-red text-crime-text text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-crime-red" />
              <span>Open Full Case Archive Dossier</span>
            </button>
          )}
        </div>
      </div>

      {/* Cluster Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {clusterSummaries.map((c) => (
          <div
            key={c.cluster_id}
            className="bg-dark-panel border border-dark-line p-4 rounded-lg shadow-sm"
            style={{ borderLeftColor: c.color, borderLeftWidth: '4px' }}
          >
            <div className="text-lg font-display font-bold" style={{ color: c.color }}>
              {c.name}
            </div>
            <div className="text-xs text-crime-subtext mt-1 space-y-0.5">
              <div className="truncate font-medium">{c.dominant_method}</div>
              <div className="truncate text-crime-muted">{c.dominant_region}</div>
              <div className="truncate text-crime-muted">{c.dominant_victim_type}</div>
            </div>
            <div className="text-[11px] font-mono text-crime-muted mt-3 pt-2 border-t border-dark-line flex justify-between">
              <span>{c.case_count} cases</span>
              <span>{c.pct_of_dataset}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

