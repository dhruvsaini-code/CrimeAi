import React from 'react';
import { DashboardStats } from '../types';
import { HeroTape } from '../components/HeroTape';
import { ArchivalPhotoWall } from '../components/ArchivalPhotoWall';
import { RealisticSkeleton } from '../components/FloatingSkeletons';
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
      {/* 1. ASYMMETRICAL TRUE-CRIME DOCUMENTARY HERO SECTION */}
      <div className="relative min-h-[540px] rounded-sm bg-[#060608] border border-[#242326] overflow-hidden p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.95)]">
        {/* Photographic Evidence Desk Backdrop + Film Grain */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/evidence_room_2.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right filter grayscale contrast-125 brightness-[0.35] opacity-60"
          />
          {/* Natural Left-to-Right Dark Scrim for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/92 to-[#050505]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
          <div className="absolute inset-0 film-grain opacity-60" />
        </div>

        {/* Subtle Photographic Practical Blood Accent on Right Edge */}
        <img
          src="/assets/blood_blade_macro.jpg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -top-6 -right-10 h-[340px] w-auto mix-blend-screen opacity-35 pointer-events-none select-none rotate-12 filter contrast-125"
        />

        {/* Large Shadowed Anatomical Skeleton Emerging on Right */}
        <div
          className="hidden sm:block absolute -top-4 right-2 lg:right-8 h-[480px] lg:h-[580px] w-auto pointer-events-none select-none skeleton-bob z-[2]"
          style={{ animationDuration: '14s' }}
        >
          <RealisticSkeleton variant={1} opacity={0.28} className="h-full w-auto" />
        </div>

        {/* Organic Pinned Historical Photographs Drifting Behind Right Column */}
        <div className="hidden md:block absolute top-8 right-[24%] w-40 archival-photo p-2 -rotate-6 opacity-45 pointer-events-none select-none archival-drift z-[3]">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
          <img
            src="/assets/mugshots/ted_bundy.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-44 object-cover object-top filter grayscale contrast-125"
          />
          <div className="mt-1.5 text-[8px] font-typewriter text-[#a1a1aa] uppercase">
            ARCHIVE REF · FL-363
          </div>
        </div>

        <div
          className="hidden lg:block absolute bottom-28 right-[16%] w-36 archival-photo p-2 rotate-3 opacity-40 pointer-events-none select-none archival-drift z-[3]"
          style={{ animationDelay: '-6s' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
          <img
            src="/assets/mugshots/richard_ramirez.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-40 object-cover object-top filter grayscale contrast-125"
          />
          <div className="mt-1.5 text-[8px] font-typewriter text-[#a1a1aa] uppercase">
            LAPD FILE · 1984
          </div>
        </div>

        <div
          className="hidden xl:block absolute top-14 right-[6%] w-32 archival-photo p-1.5 rotate-6 opacity-35 pointer-events-none select-none archival-drift z-[3]"
          style={{ animationDelay: '-11s' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
          <img
            src="/assets/mugshots/john_wayne_gacy.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-36 object-cover object-top filter grayscale contrast-125"
          />
          <div className="mt-1 text-[8px] font-typewriter text-[#a1a1aa] uppercase">
            COOK CO · 1978
          </div>
        </div>

        {/* Left Documentary Content Column */}
        <div className="relative z-10 max-w-2xl">
          {/* Typewriter Archival Classification Stamp */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#121113] border border-[#2d292b] text-[11px] font-typewriter text-[#d1d5db] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]" />
            <span>CONFIDENTIAL ARCHIVE // UNSUPERVISED FORENSIC ANALYSIS</span>
          </div>

          {/* Strong Condensed Bebas Neue Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bebas tracking-tight text-[#f3f4f6] leading-[0.95] mb-5">
            WHICH HISTORICAL SERIAL CASES{' '}
            <span className="text-[#C00000]">LOOK ALIKE?</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1d5db] font-sans leading-relaxed mb-7 max-w-xl">
            Examine 492 publicly documented historical serial crime cases across 83 countries.
            Discover topological patterns, cluster similar forensic modalities, mine multi-attribute
            association rules, and evaluate explainable semantic comparisons.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-5 py-2.5 rounded-sm bg-[#8B0000] hover:bg-[#a30000] text-white font-oswald font-semibold text-sm tracking-wide uppercase transition-colors flex items-center gap-2 border border-[#a81c1c] shadow-lg"
            >
              <span>Analyze Case Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('clustering')}
              className="px-5 py-2.5 rounded-sm bg-[#121216] hover:bg-[#1a1a20] border border-[#2f2f37] text-[#ededed] font-oswald font-semibold text-sm tracking-wide uppercase transition-colors flex items-center gap-2 hover:border-[#7f1d1d]"
            >
              <Layers className="w-4 h-4 text-[#b91c1c]" />
              <span>Explore Cluster Galaxy</span>
            </button>
          </div>
        </div>

        {/* Bottom Data Provenance Strip (Issue 2 Fix Preserved) */}
        <div className="relative z-10 mt-10 pt-4 border-t border-[#222226] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2.5">
            {backendOnline === true ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#091911] border border-[#14472d] text-emerald-300 font-typewriter text-[11px]">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE FASTAPI BACKEND CONNECTED (v1.0.0)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#1b140c] border border-[#4d3515] text-amber-300 font-typewriter text-[11px]">
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>HISTORICAL CORPUS (492 CASES) — ARCHIVAL CACHE</span>
              </span>
            )}
            <span className="text-[#9ca3af] hidden sm:inline">
              {backendOnline === true
                ? 'Dynamic ML model execution active'
                : '100% cited Wikipedia provenance active'}
            </span>
          </div>

          <div className="text-[11px] font-typewriter text-[#9ca3af]">
            COVERAGE: <span className="text-[#ededed]">1900 – 2022</span>
          </div>
        </div>

        {/* Hero Key Statistics Row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#222226]">
          <div>
            <div className="text-[#9ca3af] font-typewriter uppercase text-[10px]">Historical Cases</div>
            <div className="text-3xl sm:text-4xl font-bebas text-[#ffc400] mt-0.5 leading-none">
              {stats?.total_cases ?? (stats ? 0 : '492')}
            </div>
            <div className="text-[11px] text-[#71717a] font-sans mt-1">
              {backendOnline === true ? 'Live API query' : 'Archival baseline'}
            </div>
          </div>
          <div>
            <div className="text-[#9ca3af] font-typewriter uppercase text-[10px]">Countries</div>
            <div className="text-3xl sm:text-4xl font-bebas text-[#2ee6d0] mt-0.5 leading-none">
              {stats?.total_countries ?? (stats ? 0 : '83')}
            </div>
            <div className="text-[11px] text-[#71717a] font-sans mt-1">Global Jurisdictions</div>
          </div>
          <div>
            <div className="text-[#9ca3af] font-typewriter uppercase text-[10px]">Historical Span</div>
            <div className="text-3xl sm:text-4xl font-bebas text-[#d4d4d8] mt-0.5 leading-none">
              {stats?.total_years_covered ? `${stats.total_years_covered} YRS` : '1900–2022'}
            </div>
            <div className="text-[11px] text-[#71717a] font-sans mt-1">122 Years Archival</div>
          </div>
          <div>
            <div className="text-[#9ca3af] font-typewriter uppercase text-[10px]">Clustering Methods</div>
            <div className="text-3xl sm:text-4xl font-bebas text-[#C00000] mt-0.5 leading-none">
              5 AVAILABLE
            </div>
            <div className="text-[11px] text-[#71717a] font-sans mt-1">K-Means, DBSCAN, GMM, etc.</div>
          </div>
        </div>
      </div>

      {/* Warning Ticker Tape */}
      <HeroTape />

      {/* 2. USER GUIDANCE: START EXPLORING (Issue 5 Implementation) */}
      <div className="bg-[#0a0a0d] border border-[#222226] rounded-sm p-6 shadow-xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#202024]">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#b91c1c]" />
            <div>
              <h2 className="font-oswald font-semibold text-xl text-[#f3f4f6] uppercase tracking-wide">
                Start Exploring
              </h2>
              <p className="text-xs font-sans text-[#9ca3af]">
                Three primary investigation workflows for historical serial crime analysis
              </p>
            </div>
          </div>
          <span className="text-[10px] font-typewriter text-[#d1d5db] bg-[#141418] border border-[#2a2a30] px-2.5 py-1 rounded-sm uppercase">
            Research Workflows
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Action 1: Explore Documented Cases */}
          <div
            onClick={() => setActiveTab('cases')}
            className="group cursor-pointer bg-[#0f0f13] border border-[#242429] hover:border-[#7f1d1d] p-5 rounded-sm transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#161315] border border-[#2e2325] flex items-center justify-center text-[#b91c1c] mb-3">
                <FolderSearch className="w-4 h-4" />
              </div>
              <h3 className="font-oswald font-semibold text-lg text-[#f3f4f6] uppercase group-hover:text-[#ef4444] transition-colors mb-1">
                Browse Case Explorer
              </h3>
              <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                Inspect 492 documented historical serial case files across 83 sovereign nations, complete with verified victim counts and cited Wikipedia sources.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d1d22] flex items-center justify-between text-xs font-typewriter text-[#dc2626]">
              <span>View Dossiers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 2: Discover Patterns & Topological Clusters */}
          <div
            onClick={() => setActiveTab('clustering')}
            className="group cursor-pointer bg-[#0f0f13] border border-[#242429] hover:border-[#2ee6d0]/60 p-5 rounded-sm transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#121618] border border-[#232f32] flex items-center justify-center text-[#2ee6d0] mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-oswald font-semibold text-lg text-[#f3f4f6] uppercase group-hover:text-[#2ee6d0] transition-colors mb-1">
                Cluster Galaxy (PCA)
              </h3>
              <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                Visualize multi-dimensional case similarities projected onto 2D PCA space. Compare K-Means, DBSCAN, Agglomerative, GMM, and Spectral clustering models.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d1d22] flex items-center justify-between text-xs font-typewriter text-[#2ee6d0]">
              <span>Explore Clusters</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 3: Mine Association Rules & Transitions */}
          <div
            onClick={() => setActiveTab('patterns')}
            className="group cursor-pointer bg-[#0f0f13] border border-[#242429] hover:border-[#ffc400]/60 p-5 rounded-sm transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#161511] border border-[#2f2b1f] flex items-center justify-center text-[#ffc400] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-oswald font-semibold text-lg text-[#f3f4f6] uppercase group-hover:text-[#ffc400] transition-colors mb-1">
                Pattern & Sequence Mining
              </h3>
              <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                Discover recurring combinations of murder methods, victim demographics, and locations with Apriori support/lift metrics and PrefixSpan sequential transitions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d1d22] flex items-center justify-between text-xs font-typewriter text-[#ffc400]">
              <span>Mine Rules</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ARCHIVAL PHOTO WALL & FORENSIC EVIDENCE BOARD */}
      <ArchivalPhotoWall />

      {/* 4. COMMAND CENTER KPI PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-sm p-5 horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-typewriter uppercase mb-2">
            <span>Proven Victim Total</span>
            <Skull className="w-4 h-4 text-[#b91c1c]" />
          </div>
          <div className="text-4xl font-bebas text-[#f3f4f6] leading-none">
            {stats?.total_proven_victims?.toLocaleString() || '6,755'}
          </div>
          <div className="text-xs text-[#9ca3af] font-sans mt-2">
            Mean of 13.7 victims per documented case
          </div>
        </div>

        <div className="rounded-sm p-5 horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-typewriter uppercase mb-2">
            <span>Dataset Completeness</span>
            <Database className="w-4 h-4 text-[#ffc400]" />
          </div>
          <div className="text-4xl font-bebas text-[#ffc400] leading-none">
            {stats?.average_completeness_pct || 94.8}%
          </div>
          <div className="text-xs text-[#9ca3af] font-sans mt-2">
            Standardized imputation pipeline
          </div>
        </div>

        <div className="rounded-sm p-5 horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-typewriter uppercase mb-2">
            <span>AI Retrieval Pipeline</span>
            <TrendingUp className="w-4 h-4 text-[#2ee6d0]" />
          </div>
          <div className="text-4xl font-bebas text-[#2ee6d0] leading-none">
            HYBRID SVD
          </div>
          <div className="text-xs text-[#9ca3af] font-sans mt-2">
            Dense 64-d semantic + BM25 + TF-IDF
          </div>
        </div>

        {/* Issue 3 Fix: Research Scope */}
        <div className="rounded-sm p-5 horror-card">
          <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-typewriter uppercase mb-2">
            <span>Research Scope</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-4xl font-bebas text-emerald-400 leading-none">
            HISTORICAL ONLY
          </div>
          <div className="text-xs text-[#9ca3af] font-sans mt-2">
            Strictly non-predictive archival research
          </div>
        </div>
      </div>

      {/* 5. FORENSIC DISTRIBUTIONS GRID */}
      {stats?.quality_report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-sm p-5 horror-card">
            <h3 className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-wide mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#b91c1c]" />
              <span>Primary Modalities</span>
            </h3>
            <div className="space-y-2 text-xs font-sans">
              {Object.entries(stats.quality_report.method_distributions || {}).slice(0, 5).map(([m, cnt]) => (
                <div key={m} className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm">
                  <span className="text-[#d1d5db] truncate max-w-[200px]">{m}</span>
                  <span className="font-mono text-[#ffc400] font-semibold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm p-5 horror-card">
            <h3 className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-wide mb-3 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#2ee6d0]" />
              <span>Macro-Regions</span>
            </h3>
            <div className="space-y-2 text-xs font-sans">
              {Object.entries(stats.quality_report.regional_distributions || {}).map(([r, cnt]) => (
                <div key={r} className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm">
                  <span className="text-[#d1d5db] truncate">{r}</span>
                  <span className="font-mono text-[#2ee6d0] font-semibold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm p-5 horror-card">
            <h3 className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b57bff]" />
              <span>Target Profiles</span>
            </h3>
            <div className="space-y-2 text-xs font-sans">
              {Object.entries(stats.quality_report.victim_demographic_distributions || {}).slice(0, 5).map(([v, cnt]) => (
                <div key={v} className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm">
                  <span className="text-[#d1d5db] truncate max-w-[200px]">{v}</span>
                  <span className="font-mono text-[#b57bff] font-semibold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
