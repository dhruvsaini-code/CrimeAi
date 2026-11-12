import React, { useState, useEffect } from 'react';
import { GraphData } from '../types';
import { api } from '../services/api';
import { GraphView } from '../components/GraphView';
import { Share2, Info } from 'lucide-react';

interface GraphPageProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const GraphPage: React.FC<GraphPageProps> = ({ onSelectCaseDetail }) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getGraphNetwork()
      .then((res) => {
        if (isMounted && res) setGraphData(res);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && !graphData) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-crime-purple border-t-transparent rounded-full animate-spin" />
        <div>Computing forensic relationship topology, PageRank, and Louvain modularity communities...</div>
      </div>
    );
  }

  if (!graphData) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm">
        Unable to load graph intelligence network.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-purple/10 border border-crime-purple/30 text-[11px] font-mono text-crime-purple mb-2">
          <Share2 className="w-3.5 h-3.5" />
          <span>GRAPH INTELLIGENCE & COMMUNITY DISCOVERY</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-crime-text">
          Forensic Network Topology & Community Graph
        </h2>
        <p className="text-xs text-crime-muted font-mono mt-1 max-w-2xl">
          Visualizes explicit cross-case relationships based on shared forensic modalities, active eras,
          and macro-regions. Edge weights indicate multi-attribute overlap. Nodes are partitioned into
          Louvain-style communities and sized by PageRank centrality.
        </p>
      </div>

      {/* Interactive Network Graph */}
      <GraphView graphData={graphData} onSelectCase={onSelectCaseDetail} />

      {/* Graph Algorithms Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-dark-panel border border-dark-line p-5 rounded-lg shadow-lg">
          <h4 className="font-display font-bold text-base text-crime-purple mb-2">
            PageRank Centrality
          </h4>
          <p className="text-xs text-crime-subtext font-mono leading-relaxed">
            Measures the topological authority of each case in the network. Nodes with elevated PageRank
            serve as central archetypes sharing characteristics with numerous historical cases.
          </p>
        </div>

        <div className="bg-dark-panel border border-dark-line p-5 rounded-lg shadow-lg">
          <h4 className="font-display font-bold text-base text-crime-cyan mb-2">
            Louvain / Label Propagation
          </h4>
          <p className="text-xs text-crime-subtext font-mono leading-relaxed">
            Unsupervised community detection grouping densely connected case nodes into distinct
            historical sub-networks without requiring predefined manual category labels.
          </p>
        </div>

        <div className="bg-dark-panel border border-dark-line p-5 rounded-lg shadow-lg">
          <h4 className="font-display font-bold text-base text-crime-tape mb-2">
            Dijkstra Shortest Path
          </h4>
          <p className="text-xs text-crime-subtext font-mono leading-relaxed">
            Calculates minimal forensic transition distance between any two historical cases. Distance
            is inversely proportional to shared attribute weights ($d = 1 / w$).
          </p>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-line p-4 rounded text-xs font-mono text-crime-muted flex items-start gap-2.5">
        <Info className="w-4 h-4 text-crime-tape shrink-0 mt-0.5" />
        <div>
          <strong>Ethical Boundary:</strong> Edges link documented historical case attributes only. The network
          never models or infers criminal accomplices, living suspects, or personal culpability.
        </div>
      </div>
    </div>
  );
};

