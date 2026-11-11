import React, { useState, useMemo } from 'react';
import { GraphData } from '../types';
import { Share2, Route, Award, Layers } from 'lucide-react';
import { api } from '../services/api';

interface GraphViewProps {
  graphData: GraphData;
  onSelectCase: (caseId: string) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({ graphData, onSelectCase }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [targetNodeId, setTargetNodeId] = useState<string>('');
  const [pathResult, setPathResult] = useState<any | null>(null);
  const [isSearchingPath, setIsSearchingPath] = useState<boolean>(false);

  const width = 900;
  const height = 520;

  // Distribute nodes in a circular layout grouped by community
  const nodePositions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const total = graphData.nodes.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 210;

    // Sort by community
    const sorted = [...graphData.nodes].sort((a, b) => a.community - b.community);
    sorted.forEach((node, i) => {
      const angle = (i / total) * 2 * Math.PI;
      // Slight inward/outward jitter based on community
      const r = radius + (node.community % 3) * 22;
      pos[node.id] = {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
      };
    });
    return pos;
  }, [graphData.nodes]);

  const communityColors = ['#ff4d5e', '#2ee6d0', '#b57bff', '#5bb8ff', '#ffc400', '#10b981', '#f97316'];

  const selectedNode = graphData.nodes.find((n) => n.id === selectedNodeId);

  const handleDijkstra = async () => {
    if (!selectedNodeId || !targetNodeId) return;
    setIsSearchingPath(true);
    try {
      const res = await api.getDijkstraPath(selectedNodeId, targetNodeId);
      setPathResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearchingPath(false);
    }
  };

  const pathEdges = useMemo(() => {
    if (!pathResult?.path || pathResult.path.length < 2) return new Set();
    const set = new Set<string>();
    for (let i = 0; i < pathResult.path.length - 1; i++) {
      set.add(`${pathResult.path[i]}-${pathResult.path[i + 1]}`);
      set.add(`${pathResult.path[i + 1]}-${pathResult.path[i]}`);
    }
    return set;
  }, [pathResult]);

  return (
    <div className="space-y-6">
      {/* Top Controls & Pathfinding Bar */}
      <div className="bg-dark-panel border border-dark-line p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-dark-card border border-dark-line text-crime-purple">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-crime-text">
              Network Intelligence & Community Graph
            </div>
            <div className="text-xs text-crime-muted font-mono">
              {graphData.total_nodes} Forensic Case Nodes · {graphData.total_edges} Cross-Case Attribute Links
            </div>
          </div>
        </div>

        {/* Pathfinding Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedNodeId || ''}
            onChange={(e) => {
              setSelectedNodeId(e.target.value);
              setPathResult(null);
            }}
            className="bg-dark-card border border-dark-line text-xs font-mono rounded px-3 py-1.5 text-crime-text focus:border-crime-tape"
          >
            <option value="">Select Origin Node...</option>
            {graphData.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.id}: {n.name}
              </option>
            ))}
          </select>

          <span className="text-xs font-mono text-crime-muted">→</span>

          <select
            value={targetNodeId}
            onChange={(e) => {
              setTargetNodeId(e.target.value);
              setPathResult(null);
            }}
            className="bg-dark-card border border-dark-line text-xs font-mono rounded px-3 py-1.5 text-crime-text focus:border-crime-tape"
          >
            <option value="">Select Destination...</option>
            {graphData.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.id}: {n.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleDijkstra}
            disabled={!selectedNodeId || !targetNodeId || isSearchingPath}
            className="px-3 py-1.5 rounded bg-crime-purple/20 hover:bg-crime-purple/30 border border-crime-purple text-crime-text text-xs font-mono disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            <Route className="w-3.5 h-3.5 text-crime-purple" />
            <span>Find Shortest Path</span>
          </button>
        </div>
      </div>

      {/* Path result banner if active */}
      {pathResult && (
        <div className="bg-dark-panel border-l-4 border-crime-purple border-y border-r border-dark-line p-3.5 rounded text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-crime-purple font-bold">Dijkstra Shortest Forensic Path:</span>
            <span className="text-crime-text">{pathResult.path.join(' ──> ')}</span>
          </div>
          <div className="text-crime-tape">
            Total Distance: {pathResult.total_distance} ({pathResult.hop_count} hops)
          </div>
        </div>
      )}

      {/* Graph Visualizer + Node Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-dark-panel border border-dark-line rounded-lg p-4 shadow-xl relative overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto bg-[#080b11] rounded">
            {/* Edges */}
            {graphData.edges.map((e, idx) => {
              const p1 = nodePositions[e.source];
              const p2 = nodePositions[e.target];
              if (!p1 || !p2) return null;

              const isPath = pathEdges.has(`${e.source}-${e.target}`);
              const isSelected = selectedNodeId === e.source || selectedNodeId === e.target;

              return (
                <line
                  key={idx}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isPath ? '#b57bff' : isSelected ? '#ffc400' : '#1e2538'}
                  strokeWidth={isPath ? 2.5 : isSelected ? 1.5 : 0.8}
                  opacity={isPath ? 1 : isSelected ? 0.8 : 0.35}
                />
              );
            })}

            {/* Nodes */}
            {graphData.nodes.map((n) => {
              const p = nodePositions[n.id];
              if (!p) return null;

              const isSelected = selectedNodeId === n.id;
              const isTarget = targetNodeId === n.id;
              const inPath = pathResult?.path?.includes(n.id);
              const color = communityColors[n.community % communityColors.length];

              // Radius proportional to PageRank
              const radius = 4 + n.pagerank * 8;

              return (
                <g key={n.id} className="cursor-pointer" onClick={() => setSelectedNodeId(n.id)}>
                  {/* Halo ring for selected or path */}
                  {(isSelected || isTarget || inPath) && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={radius + 6}
                      fill="none"
                      stroke={isSelected ? '#ffc400' : inPath ? '#b57bff' : '#2ee6d0'}
                      strokeWidth="2"
                      className="radar-pulse"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={radius}
                    fill={color}
                    stroke="#07080c"
                    strokeWidth="1.5"
                    className="transition-transform hover:scale-125"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspector */}
        <div className="lg:col-span-4 bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl flex flex-col justify-between">
          {selectedNode ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-crime-tape bg-crime-tape/10 px-2 py-0.5 rounded border border-crime-tape/30 font-bold">
                  {selectedNode.id}
                </span>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${communityColors[selectedNode.community % communityColors.length]}20`,
                    color: communityColors[selectedNode.community % communityColors.length],
                  }}
                >
                  Community {selectedNode.community}
                </span>
              </div>

              <h4 className="text-xl font-display font-bold text-crime-text mt-2">
                {selectedNode.name}
              </h4>
              <p className="text-xs text-crime-muted font-mono mt-0.5">
                {selectedNode.country} · {selectedNode.region} · {selectedNode.decade}s
              </p>

              <div className="bg-dark-card border border-dark-line p-3.5 rounded mt-4 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-crime-muted flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-crime-tape" /> PageRank Centrality:
                  </span>
                  <span className="text-crime-tape font-bold">{selectedNode.pagerank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-crime-muted flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-crime-cyan" /> Network Degree:
                  </span>
                  <span className="text-crime-text font-bold">{selectedNode.degree} connected edges</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-crime-muted">Forensic Method:</span>
                  <span className="text-crime-text font-medium">{selectedNode.method}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-crime-muted">Documented Victims:</span>
                  <span className="text-crime-red font-bold">{selectedNode.victims}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectCase(selectedNode.id)}
                className="w-full mt-5 py-2 px-3 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-crime-text text-xs font-mono transition-colors"
              >
                Inspect Case Details in Modal
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-crime-muted">
              <Share2 className="w-10 h-10 text-crime-purple/40 mb-3" />
              <div className="font-display text-lg text-crime-text font-bold">SELECT NETWORK NODE</div>
              <p className="text-xs max-w-xs mt-2">
                Click any case in the circular community graph to examine its PageRank influence,
                degree connectivity, and community partition.
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-dark-line text-[11px] text-crime-muted font-mono flex items-center justify-between">
            <span>Partition: Louvain / Label Propagation</span>
            <span>Metrics: PageRank & Dijkstra</span>
          </div>
        </div>
      </div>
    </div>
  );
};

