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
  Skull,
  Wifi,
  WifiOff,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  backendOnline: boolean | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, backendOnline }) => {
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
    <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-md border-b border-[#281315]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Creepster font & Gothic Horror Emblem */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-lg bg-[#120709] border border-[#3d1418] flex items-center justify-center group-hover:border-[#C00000] group-hover:shadow-[0_0_15px_rgba(192,0,0,0.5)] transition-all">
              <Skull className="w-5 h-5 text-[#C00000] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-lg bg-[#C00000]/10 blur-sm pointer-events-none" />
            </div>
            <div>
              <div className="font-horror tracking-wider text-2xl sm:text-3xl text-[#f3f4f6] flex items-center gap-1.5 leading-none">
                CRIME<span className="text-[#C00000] drop-shadow-[0_0_8px_rgba(192,0,0,0.8)]">PATTERN</span>
                <span className="text-xs font-mono font-bold text-[#e5e7eb] tracking-widest ml-1 bg-[#1c080b] px-1.5 py-0.5 rounded border border-[#44161b]">
                  AI
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase tracking-widest">
                Dark Archival Forensic System
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#150a0d] text-[#ff4d4d] border border-[#521319] shadow-[0_0_12px_rgba(192,0,0,0.35)]'
                      : 'text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#140b0e]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff4d4d]' : 'text-[#71717a]'}`} />
                  <span className={isActive ? 'font-semibold tracking-wide' : ''}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Real Online / Offline Status Pill (Issue 1 Fix) & Mobile dropdown */}
          <div className="flex items-center gap-3">
            <div
              className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                backendOnline === true
                  ? 'bg-[#0a1a12] border-[#134e2f] text-emerald-300'
                  : backendOnline === false
                  ? 'bg-[#1c1209] border-[#5e3a0f] text-amber-300'
                  : 'bg-[#121217] border-[#272733] text-zinc-400'
              }`}
              title={
                backendOnline === true
                  ? 'Connected to FastAPI Backend (127.0.0.1:8000) — Real-time model inference active'
                  : 'Backend server not detected — Using verified historical archival cache (492 cases)'
              }
            >
              {backendOnline === true ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="text-[#a1a1aa]">BACKEND:</span>
                  <span className="text-emerald-400 font-semibold">CONNECTED</span>
                </>
              ) : backendOnline === false ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span className="text-[#a1a1aa]">MODE:</span>
                  <span className="text-amber-400 font-semibold">CACHED ARCHIVE</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-zinc-500 animate-ping" />
                  <span className="text-zinc-400">CONNECTING...</span>
                </>
              )}
            </div>

            <div className="xl:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-[#0e090b] border border-[#3b1518] text-[#f3f4f6] text-xs rounded px-2.5 py-1.5 font-mono focus:outline-none focus:border-[#C00000]"
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
