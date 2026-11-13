import React from 'react';
import { DashboardStats } from '../types';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { HeroTape } from '../components/HeroTape';
import { ArchivalPhotoWall } from '../components/ArchivalPhotoWall';
import { SkeletonSvg } from '../components/FloatingSkeletons';
import {
  Calendar,
  Globe2,
  Layers,
  Database,
  ArrowRight,
  TrendingUp,
  Skull,
  FolderSearch,
  Sparkles,
  Network,
  Shield,
  Wifi,
  WifiOff,
  Compass,
} from 'lucide-react';

interface OverviewPageProps {
  stats: DashboardStats | null;
  setActiveTab: (tab: string) => void;
  onSelectCaseDetail: (caseId: string) => void;
  backendOnline: boolean | null;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  stats,
  setActiveTab,
  backendOnline,
}) => {
  return (
    <div className="space-y-10">
      {/* 1. CINEMATIC HORROR HERO SECTION */}
      <div className="relative min-h-[500px] rounded-2xl bg-gradient-to-b from-[#130709] via-[#090a0d] to-[#050505] border border-[#331417] overflow-hidden p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
        <ParticleCanvas />

        {/* Ambient blood-red atmospheric lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8B0000]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#C00000]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant Floating Skeleton Silhouette Behind Hero Heading */}
        <div className="absolute -top-12 -right-8 sm:right-12 w-[340px] sm:w-[460px] h-[720px] opacity-[0.16] pointer-events-none select-none skeleton-bob">
          <SkeletonSvg glowEyes opacity={1} className="w-full h-full filter drop-shadow-[0_0_20px_rgba(139,0,0,0.6)]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          {/* Gothic Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18090b] border border-[#44161b] text-xs font-mono text-[#ff4d4d] mb-4 shadow-lg shadow-[#8B0000]/20">
            <Skull className="w-3.5 h-3.5 text-[#C00000] animate-pulse" />
            <span className="font-gothic uppercase tracking-widest text-[11px]">
              UNSUPERVISED ARCHIVAL FORENSIC PATTERN SYSTEM
            </span>
          </div>

          {/* Creepster / Cinzel Display Heading */}
          <h1 className="text-4xl sm:text-6xl font-gothic font-bold tracking-tight text-[#f3f4f6] leading-[1.08] mb-4">
            Which historical serial cases{' '}
            <span className="font-horror text-5xl sm:text-7xl text-[#C00000] drop-shadow-[0_0_12px_rgba(192,0,0,0.9)] tracking-wider inline-block">
              look alike?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#d1d5db] font-sans leading-relaxed mb-6 max-w-2xl">
            Analyze 492 publicly documented historical serial crime cases across 83 countries.
            Discovers topological patterns, clusters similar forensic modalities, mines multi-attribute association rules,
            and evaluates explainable semantic comparisons.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-5 py-2.5 rounded-lg bg-[#8B0000] hover:bg-[#a60000] text-white font-gothic font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#8B0000]/40 flex items-center gap-2 border border-[#b30000]"
            >
              <span>Analyze Case Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('clustering')}
              className="px-5 py-2.5 rounded-lg bg-[#140b0e] hover:bg-[#1f1014] border border-[#3b171a] text-[#f3f4f6] font-gothic font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-2 hover:border-[#8B0000] hover:shadow-[0_0_15px_rgba(139,0,0,0.3)]"
            >
              <Layers className="w-4 h-4 text-[#C00000]" />
              <span>Explore Cluster Galaxy</span>
            </button>
          </div>
        </div>

        {/* Live vs Cached Dataset Indicator (Issue 2 Fix) */}
        <div className="relative z-10 mt-8 pt-4 border-t border-[#261416]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            {backendOnline === true ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#091b12] border border-[#14532d] text-emerald-300">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE FASTAPI BACKEND CONNECTED (v1.0.0)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1f1309] border border-[#613b10] text-amber-300">
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>HISTORICAL CORPUS (492 VERIFIED CASES) — ARCHIVAL CACHE</span>
              </span>
            )}
            <span className="text-[#9ca3af] hidden sm:inline">
              {backendOnline === true
                ? 'Dynamic ML model execution active'
                : '100% cited Wikipedia provenance active'}
            </span>
          </div>

          <div className="text-[11px] text-[#9ca3af]">
            Dataset Range: <span className="text-[#f3f4f6] font-semibold">1900 – 2022</span>
          </div>
        </div>

        {/* Hero Quick Stats Row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#261416]/80 font-mono text-xs">
          <div>
            <div className="text-[#9ca3af] uppercase tracking-wider text-[11px]">Historical Cases</div>
            <div className="text-3xl font-gothic font-bold text-[#ffc400] mt-0.5">
              {stats?.total_cases ?? (stats ? 0 : '492')}
            </div>
            <div className="text-[11px] text-[#6b7280]">
              {backendOnline === true ? 'Live API query' : 'Archival baseline'}
            </div>
          </div>
          <div>
            <div className="text-[#9ca3af] uppercase tracking-wider text-[11px]">Countries</div>
            <div className="text-3xl font-gothic font-bold text-[#2ee6d0] mt-0.5">
              {stats?.total_countries ?? (stats ? 0 : '83')}
            </div>
            <div className="text-[11px] text-[#6b7280]">Global Coverage</div>
          </div>
          <div>
            <div className="text-[#9ca3af] uppercase tracking-wider text-[11px]">Historical Span</div>
            <div className="text-3xl font-gothic font-bold text-[#b57bff] mt-0.5">
              {stats?.total_years_covered ? `${stats.total_years_covered} yrs` : '1900–2022'}
            </div>
            <div className="text-[11px] text-[#6b7280]">122 Years Archival</div>
          </div>
          {/* Issue 4 Fix: Clustering Algorithms (5 Available) */}
          <div>
            <div className="text-[#9ca3af] uppercase tracking-wider text-[11px]">Clustering Methods</div>
            <div className="text-3xl font-gothic font-bold text-[#C00000] mt-0.5">
              5 Available
            </div>
            <div className="text-[11px] text-[#6b7280]">K-Means, DBSCAN, GMM, etc.</div>
          </div>
        </div>
      </div>

      {/* Warning Ticker Tape */}
      <HeroTape />

      {/* 2. USER GUIDANCE: HOW TO EXPLORE (Issue 5 Implementation) */}
      <div className="bg-[#0b0c10] border border-[#2a1417] rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#241315]">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#C00000]" />
            <div>
              <h2 className="font-gothic font-bold text-lg sm:text-xl text-[#f3f4f6]">
                START EXPLORING
              </h2>
              <p className="text-xs font-mono text-[#9ca3af]">
                Three primary investigation workflows for historical serial crime analysis
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#ff8080] bg-[#1a080a] border border-[#441215] px-2.5 py-1 rounded">
            Interactive Navigation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {/* Action 1: Explore Documented Cases */}
          <div
            onClick={() => setActiveTab('cases')}
            className="group cursor-pointer bg-[#0e0f15] border border-[#241416] hover:border-[#8B0000] p-5 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,0,0,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#170a0c] border border-[#3b1215] flex items-center justify-center text-[#C00000] group-hover:scale-110 transition-transform mb-3">
                <FolderSearch className="w-5 h-5" />
              </div>
              <h3 className="font-gothic font-bold text-base text-[#f3f4f6] group-hover:text-[#ff4d4d] transition-colors mb-1">
                Browse Case Explorer
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Inspect 492 documented historical serial case files across 83 sovereign nations, complete with verified victim counts and cited Wikipedia sources.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1e1315] flex items-center justify-between text-xs font-mono text-[#ff6666]">
              <span>View Dossiers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 2: Discover Patterns & Topological Clusters */}
          <div
            onClick={() => setActiveTab('clustering')}
            className="group cursor-pointer bg-[#0e0f15] border border-[#241416] hover:border-[#8B0000] p-5 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,0,0,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#170a0c] border border-[#3b1215] flex items-center justify-center text-[#2ee6d0] group-hover:scale-110 transition-transform mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-gothic font-bold text-base text-[#f3f4f6] group-hover:text-[#2ee6d0] transition-colors mb-1">
                Cluster Galaxy (PCA)
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Visualize multi-dimensional case similarities projected onto 2D PCA space. Compare K-Means, DBSCAN, Agglomerative, GMM, and Spectral clustering models.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1e1315] flex items-center justify-between text-xs font-mono text-[#2ee6d0]">
              <span>Explore Clusters</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 3: Mine Association Rules & Transitions */}
          <div
            onClick={() => setActiveTab('patterns')}
            className="group cursor-pointer bg-[#0e0f15] border border-[#241416] hover:border-[#8B0000] p-5 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,0,0,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#170a0c] border border-[#3b1215] flex items-center justify-center text-[#ffc400] group-hover:scale-110 transition-transform mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-gothic font-bold text-base text-[#f3f4f6] group-hover:text-[#ffc400] transition-colors mb-1">
                Pattern & Sequence Mining
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Discover recurring combinations of murder methods, victim demographics, and locations with Apriori support/lift metrics and PrefixSpan sequential transitions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1e1315] flex items-center justify-between text-xs font-mono text-[#ffc400]">
              <span>Mine Rules</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SERIAL KILLER PHOTO WALL & FORENSIC EVIDENCE BOARD */}
      <ArchivalPhotoWall />

      {/* 4. COMMAND CENTER KPI PANELS (With Issue 3 Fix: Research Scope) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-xs font-mono mb-2">
            <span>PROVEN VICTIM TOTAL</span>
            <Skull className="w-4 h-4 text-[#C00000]" />
          </div>
          <div className="text-3xl font-gothic font-bold text-[#f3f4f6]">
            {stats?.total_proven_victims?.toLocaleString() || '6,755'}
          </div>
          <div className="text-xs text-[#9ca3af] font-mono mt-1">
            Mean of 13.7 victims per documented case
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-xs font-mono mb-2">
            <span>DATASET COMPLETENESS</span>
            <Database className="w-4 h-4 text-[#ffc400]" />
          </div>
          <div className="text-3xl font-gothic font-bold text-[#ffc400]">
            {stats?.average_completeness_pct || 94.8}%
          </div>
          <div className="text-xs text-[#9ca3af] font-mono mt-1">
            Standardized imputation pipeline
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-xs font-mono mb-2">
            <span>AI RETRIEVAL PIPELINE</span>
            <TrendingUp className="w-4 h-4 text-[#2ee6d0]" />
          </div>
          <div className="text-3xl font-gothic font-bold text-[#2ee6d0]">
            Hybrid SVD
          </div>
          <div className="text-xs text-[#9ca3af] font-mono mt-1">
            Dense 64-d semantic + BM25 + TF-IDF
          </div>
        </div>

        {/* Issue 3 Fix: Research Scope (Historical Only) */}
        <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-xs font-mono mb-2">
            <span>RESEARCH SCOPE</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-gothic font-bold text-emerald-400">
            HISTORICAL ONLY
          </div>
          <div className="text-xs text-[#9ca3af] font-mono mt-1">
            Strictly non-predictive archival research
          </div>
        </div>
      </div>

      {/* 5. FORENSIC DISTRIBUTIONS GRID */}
      {stats?.quality_report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
            <h3 className="font-gothic font-bold text-base text-[#f3f4f6] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C00000]" />
              <span>Primary Modalities</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.method_distributions || {}).slice(0, 5).map(([m, cnt]) => (
                <div key={m} className="flex justify-between items-center bg-[#101116] border border-[#241416] p-2 rounded">
                  <span className="text-[#d1d5db] truncate max-w-[200px]">{m}</span>
                  <span className="text-[#ffc400] font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
            <h3 className="font-gothic font-bold text-base text-[#f3f4f6] mb-3 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#2ee6d0]" />
              <span>Macro-Regions</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.regional_distributions || {}).map(([r, cnt]) => (
                <div key={r} className="flex justify-between items-center bg-[#101116] border border-[#241416] p-2 rounded">
                  <span className="text-[#d1d5db] truncate">{r}</span>
                  <span className="text-[#2ee6d0] font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0c10] border border-[#261416] rounded-xl p-5 shadow-lg horror-card">
            <h3 className="font-gothic font-bold text-base text-[#f3f4f6] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b57bff]" />
              <span>Target Profiles</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.victim_demographic_distributions || {}).slice(0, 5).map(([v, cnt]) => (
                <div key={v} className="flex justify-between items-center bg-[#101116] border border-[#241416] p-2 rounded">
                  <span className="text-[#d1d5db] truncate max-w-[200px]">{v}</span>
                  <span className="text-[#b57bff] font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
