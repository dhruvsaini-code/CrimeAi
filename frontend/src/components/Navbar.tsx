import React from 'react';
import {
  Network,
  Share2,
  AlertTriangle,
  FolderSearch,
  Activity,
  Layers,
  Sparkles,
  Compass,
  FileText,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Command Center', icon: Activity },
    { id: 'clustering', label: 'Cluster Galaxy', icon: Layers },
    { id: 'search', label: 'Intelligent Search', icon: Search },
    { id: 'cases', label: 'Case Explorer', icon: FolderSearch },
    { id: 'timeline', label: 'Historical Timeline', icon: Compass },
    { id: 'graph', label: 'Graph Intel', icon: Share2 },
    { id: 'anomaly', label: 'Anomaly Radar', icon: AlertTriangle },
    { id: 'patterns', label: 'Pattern Mining', icon: Sparkles },
    { id: 'analyze', label: 'Analyze Case', icon: Network },
    { id: 'methodology', label: 'Methodology & Benchmarks', icon: FileText },
    { id: 'ethics', label: 'Ethics & Mandate', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded bg-dark-panel border border-dark-line flex items-center justify-center group-hover:border-crime-red transition-colors shadow-sm">
              <span className="font-display text-crime-red font-bold text-xl">C</span>
            </div>
            <div>
              <div className="font-display font-bold text-lg tracking-wider flex items-center gap-1.5 text-crime-text">
                CRIME<span className="text-crime-red">PATTERN</span> AI
              </div>
              <div className="text-[10px] font-mono text-crime-muted uppercase tracking-widest">
                Historical Pattern Discovery System
              </div>
            </div>
          </div>

          {/* Navigation Items (Scrollable horizontally on smaller screens) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-dark-card text-crime-tape border border-dark-lineLight shadow-sm'
                      : 'text-crime-muted hover:text-crime-text hover:bg-dark-panel/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-crime-tape' : 'text-crime-muted'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status pill & Mobile tab dropdown */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-dark-panel border border-dark-line text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-crime-muted">MODELS:</span>
              <span className="text-emerald-400 font-semibold">100% ONLINE</span>
            </div>

            <div className="xl:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-dark-panel border border-dark-line text-crime-text text-xs rounded px-2.5 py-1.5 font-mono focus:outline-none focus:border-crime-tape"
              >
                {navItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

