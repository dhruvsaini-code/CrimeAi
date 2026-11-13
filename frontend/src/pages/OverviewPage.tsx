import React from 'react';
import { DashboardStats } from '../types';
import { HeroTape } from '../components/HeroTape';
import { ArchivalPhotoWall } from '../components/ArchivalPhotoWall';
import { RealisticSkeleton } from '../components/FloatingSkeletons';
import { ParticleCanvas } from '../components/ParticleCanvas';
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
  Search,
  Share2,
  AlertTriangle,
  Network,
  Compass,
  FileText,
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
  const workflowCards = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Explore historical case records and distributions.',
      detail:
        'Filter 492 documented historical serial crime dossiers across 83 countries by decade, modality, victim demographic, and provenance status.',
      image: '/assets/evidence_room_1.jpg',
      targetTab: 'cases',
      cta: 'Open Case Explorer',
      icon: FolderSearch,
    },
    {
      step: '02',
      title: 'COMPARE',
      subtitle: 'Explore similarity, clusters and graph relationships.',
      detail:
        'Project multi-dimensional case vectors into 2D PCA space across 5 clustering algorithms and traverse NetworkX attribute communities.',
      image: '/assets/archival_evidence_wall.jpg',
      targetTab: 'clustering',
      cta: 'Open Cluster Galaxy',
      icon: Layers,
    },
    {
      step: '03',
      title: 'ANALYSE',
      subtitle: 'Explore anomalies and recurring patterns.',
      detail:
        'Flag statistical outliers via Isolation Forest & LOF, and extract frequent attribute combinations with Apriori and PrefixSpan.',
      image: '/assets/evidence_room_2.jpg',
      targetTab: 'anomaly',
      cta: 'Open Anomaly Radar',
      icon: AlertTriangle,
    },
  ];

  const modules = [
    {
      id: 'clustering',
      title: 'Cluster Galaxy',
      desc: 'Compare K-Means, DBSCAN, Agglomerative, GMM, and Spectral clustering with 2D PCA coordinate projections.',
      tag: 'UNSUPERVISED ML',
      image: '/assets/evidence_board_dark.png',
      icon: Layers,
    },
    {
      id: 'search',
      title: 'Intelligent Search',
      desc: 'Unified hybrid retrieval benchmarking Okapi BM25, TF-IDF, 64-d SVD Semantic Embeddings, and KNN.',
      tag: 'HYBRID RETRIEVAL',
      image: '/assets/evidence_room_2.jpg',
      icon: Search,
    },
    {
      id: 'cases',
      title: 'Case Explorer',
      desc: 'Inspect full forensic dossiers, proven victim counts, active spans, and cited Wikipedia archival links.',
      tag: '492 ARCHIVED CASES',
      image: '/assets/evidence_room_1.jpg',
      icon: FolderSearch,
    },
    {
      id: 'timeline',
      title: 'Historical Timeline',
      desc: 'Longitudinal century trends (1900–2022) paired with an interactive murder-method & demographic vulnerability map.',
      tag: 'GEOSPATIAL & TEMPORAL',
      image: '/assets/archival_evidence_wall.jpg',
      icon: Compass,
    },
    {
      id: 'graph',
      title: 'Graph Intelligence',
      desc: 'Explore NetworkX case-attribute topologies using PageRank centrality, Louvain communities, BFS, and Dijkstra paths.',
      tag: 'NETWORK TOPOLOGY',
      image: '/assets/evidence_board_dark.png',
      icon: Share2,
    },
    {
      id: 'anomaly',
      title: 'Anomaly Radar',
      desc: 'Detect rare historical attribute combinations and statistical outliers using Isolation Forest and Local Outlier Factor.',
      tag: 'OUTLIER DETECTION',
      image: '/assets/blood_blade_macro.jpg',
      icon: AlertTriangle,
    },
    {
      id: 'patterns',
      title: 'Pattern Mining',
      desc: 'Mine high-lift Apriori association rules and PrefixSpan sequential transitions across documented modalities.',
      tag: 'ASSOCIATION RULES',
      image: '/assets/evidence_room_1.jpg',
      icon: Sparkles,
    },
    {
      id: 'analyze',
      title: 'Analyse Case',
      desc: 'Evaluate custom forensic parameters against the 492-case corpus to compute cluster assignment and closest matches.',
      tag: 'CASE COMPARISON',
      image: '/assets/evidence_room_2.jpg',
      icon: Network,
    },
  ];

  return (
    <div className="w-full">
      {/* =================================================================== */}
      {/* 1. FULL-WIDTH CINEMATIC HERO + RIGHT EVIDENCE WALL COMPOSITION       */}
      {/* =================================================================== */}
      <section className="relative w-full min-h-[82vh] flex items-center border-b border-[#222226] overflow-hidden">
        {/* Subtle Interactive Dust / Network Canvas */}
        <ParticleCanvas />

        {/* Subtle Photographic Practical Blood Accent along upper-right shadow */}
        <img
          src="/assets/blood_blade_macro.jpg"
          alt=""
          aria-hidden="true"
          className="hidden xl:block absolute -top-10 right-0 h-[360px] w-auto mix-blend-screen opacity-25 pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Dominant Condensed Typography & Action Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm bg-[#121215]/95 border border-[#2c2a2e] text-[11px] font-typewriter text-[#d1d5db]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]" />
                <span>ARCHIVE FILE // 1900–2022 LONGITUDINAL CORPUS</span>
              </div>

              <h1 className="text-6xl sm:text-7xl xl:text-[86px] font-bebas tracking-tight leading-[0.92] text-[#f4f4f5]">
                THE PATTERNS
                <br />
                <span className="text-[#C00000]">BEHIND 492 CASES.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#d1d5db] font-sans leading-relaxed max-w-xl">
                An analytical exploration of historical serial-crime records through machine learning,
                network intelligence and pattern discovery.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-1">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="px-6 py-3 rounded-sm bg-[#8B0000] hover:bg-[#a60000] text-white font-oswald font-semibold text-sm tracking-wide uppercase transition-colors flex items-center gap-2 border border-[#a81c1c] shadow-lg"
                >
                  <span>Analyze Case Parameters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="px-6 py-3 rounded-sm bg-[#111115]/90 hover:bg-[#1a1a20] border border-[#2f2f37] text-[#ededed] font-oswald font-semibold text-sm tracking-wide uppercase transition-colors flex items-center gap-2 hover:border-[#7f1d1d]"
                >
                  <FolderSearch className="w-4 h-4 text-[#b91c1c]" />
                  <span>Explore Case Corpus</span>
                </button>
              </div>

              {/* Honest Live Backend vs Cached Archive Attribution */}
              <div className="pt-4 border-t border-[#222226]/90 flex flex-wrap items-center gap-3 text-xs">
                {backendOnline === true ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#091911] border border-[#14472d] text-emerald-300 font-typewriter text-[11px]">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>LIVE FASTAPI CONNECTED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#1b140c] border border-[#4d3515] text-amber-300 font-typewriter text-[11px]">
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>HISTORICAL ARCHIVAL CACHE (492 CASES)</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#111115] border border-[#28282f] text-[#d1d5db] font-typewriter text-[11px]">
                  <Shield className="w-3.5 h-3.5 text-[#9ca3af]" />
                  <span>RESEARCH SCOPE: HISTORICAL ONLY</span>
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Immersive Evidence Wall Composition */}
            <div className="lg:col-span-6 relative min-h-[440px] sm:min-h-[520px] rounded-sm border border-[#292424] bg-[#09080a] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-5">
              {/* Evidence Corkboard Photographic Base */}
              <img
                src="/assets/evidence_board_dark.png"
                alt="Historical forensic evidence corkboard"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-[0.42]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-[#050506]/65" />
              <div className="absolute inset-0 film-grain opacity-50" />

              {/* Large Anatomical Skeleton Silhouette Emerging Behind Evidence Board */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-[470px] w-auto pointer-events-none select-none skeleton-bob z-[1]">
                <RealisticSkeleton variant={1} opacity={0.34} className="h-full w-auto" />
              </div>

              {/* Red Connecting Strings SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
                viewBox="0 0 600 500"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 110 120 Q 250 185 330 110 T 485 160"
                  stroke="#991b1b"
                  strokeWidth="1.5"
                  className="opacity-85"
                />
                <path
                  d="M 110 120 Q 210 310 165 385"
                  stroke="#7f1d1d"
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
                  className="opacity-70"
                />
                <path
                  d="M 330 110 Q 380 280 445 375"
                  stroke="#8B0000"
                  strokeWidth="1.3"
                  className="opacity-75"
                />
              </svg>

              {/* Pinned Historical Mugshot 1: Ted Bundy */}
              <div className="relative sm:absolute sm:top-6 sm:left-6 w-36 sm:w-40 archival-photo p-2 -rotate-3 z-[5] archival-drift">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
                <img
                  src="/assets/mugshots/ted_bundy.jpg"
                  alt="Theodore Bundy historical booking record"
                  className="w-full h-36 sm:h-40 object-cover object-top filter grayscale contrast-125"
                />
                <div className="mt-1.5 flex justify-between items-center text-[8px] font-typewriter text-[#d4d4d8]">
                  <span className="text-[#ef4444]">HISTORICAL ARCHIVE</span>
                  <span>FL-363</span>
                </div>
              </div>

              {/* Pinned Historical Mugshot 2: Richard Ramirez */}
              <div
                className="relative sm:absolute sm:top-8 sm:right-6 w-36 sm:w-40 archival-photo p-2 rotate-3 z-[5] mt-4 sm:mt-0 archival-drift"
                style={{ animationDelay: '-5s' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
                <img
                  src="/assets/mugshots/richard_ramirez.jpg"
                  alt="Richard Ramirez historical booking record"
                  className="w-full h-36 sm:h-40 object-cover object-top filter grayscale contrast-125"
                />
                <div className="mt-1.5 flex justify-between items-center text-[8px] font-typewriter text-[#d4d4d8]">
                  <span className="text-[#ef4444]">CASE FILE</span>
                  <span>LAPD-1984</span>
                </div>
              </div>

              {/* Pinned Historical Mugshot 3: John Wayne Gacy */}
              <div
                className="hidden sm:block absolute bottom-12 left-10 w-36 archival-photo p-2 rotate-2 z-[5] archival-drift"
                style={{ animationDelay: '-9s' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
                <img
                  src="/assets/mugshots/john_wayne_gacy.jpg"
                  alt="John Wayne Gacy historical booking record"
                  className="w-full h-36 object-cover object-top filter grayscale contrast-125"
                />
                <div className="mt-1.5 flex justify-between items-center text-[8px] font-typewriter text-[#d4d4d8]">
                  <span className="text-[#ef4444]">DOCUMENTED RECORD</span>
                  <span>1978</span>
                </div>
              </div>

              {/* Pinned Historical Mugshot 4: H. H. Holmes */}
              <div
                className="hidden sm:block absolute bottom-10 right-10 w-36 archival-photo p-2 -rotate-2 z-[5] archival-drift"
                style={{ animationDelay: '-13s' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 evidence-pin" />
                <img
                  src="/assets/mugshots/hh_holmes.jpg"
                  alt="H. H. Holmes 1895 historical record"
                  className="w-full h-36 object-cover object-top filter grayscale contrast-125"
                />
                <div className="mt-1.5 flex justify-between items-center text-[8px] font-typewriter text-[#d4d4d8]">
                  <span className="text-[#ef4444]">FORENSIC REF</span>
                  <span>1895</span>
                </div>
              </div>

              {/* Bottom Archival Separation Caption */}
              <div className="relative sm:absolute bottom-3 left-4 right-4 z-[6] flex justify-between items-center bg-black/85 border border-[#2c2727] px-3 py-1.5 text-[10px] font-typewriter text-[#a1a1aa] mt-4 sm:mt-0">
                <span>PUBLIC-DOMAIN ARCHIVAL PHOTOGRAPHS</span>
                <span className="text-[#d4d4d8]">DECORATIVE ONLY · SEPARATE FROM DATASET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. FULL-WIDTH HORIZONTAL INTELLIGENCE PANEL (STATISTICS)            */}
      {/* =================================================================== */}
      <section className="w-full bg-[#08080b]/95 border-b border-[#222226]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#222226]">
            <div className="pt-2 sm:pt-0 sm:pr-6">
              <div className="font-typewriter text-[11px] text-[#b91c1c] uppercase tracking-wider">
                Historical Cases
              </div>
              <div className="text-5xl font-bebas text-[#f4f4f5] mt-1 leading-none">
                {stats?.total_cases ?? (stats ? 0 : '492')}
              </div>
              <p className="text-xs text-[#9ca3af] font-sans mt-2 leading-relaxed">
                Publicly documented serial crime series with cited archival provenance.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <div className="font-typewriter text-[11px] text-[#2ee6d0] uppercase tracking-wider">
                Countries
              </div>
              <div className="text-5xl font-bebas text-[#f4f4f5] mt-1 leading-none">
                {stats?.total_countries ?? (stats ? 0 : '83')}
              </div>
              <p className="text-xs text-[#9ca3af] font-sans mt-2 leading-relaxed">
                Sovereign jurisdictions spanning six global macro-regions.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <div className="font-typewriter text-[11px] text-[#ffc400] uppercase tracking-wider">
                Archival Coverage
              </div>
              <div className="text-5xl font-bebas text-[#f4f4f5] mt-1 leading-none">
                {stats?.year_span || '1900–2022'}
              </div>
              <p className="text-xs text-[#9ca3af] font-sans mt-2 leading-relaxed">
                122-year longitudinal window of documented historical records.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div className="font-typewriter text-[11px] text-[#dc2626] uppercase tracking-wider">
                Clustering Methods
              </div>
              <div className="text-5xl font-bebas text-[#C00000] mt-1 leading-none">
                5 ALGORITHMS
              </div>
              <p className="text-xs text-[#9ca3af] font-sans mt-2 leading-relaxed">
                K-Means, DBSCAN, Agglomerative, Gaussian Mixture, and Spectral models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Tape Band */}
      <HeroTape />

      {/* =================================================================== */}
      {/* 3. INVESTIGATION WORKFLOW SECTION (DISCOVER / COMPARE / ANALYSE)    */}
      {/* =================================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 space-y-12">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-3 border-b border-[#222226]">
            <div>
              <div className="font-typewriter text-[11px] text-[#b91c1c] uppercase mb-1">
                INVESTIGATION WORKFLOW
              </div>
              <h2 className="font-oswald font-semibold text-2xl sm:text-3xl text-[#f4f4f5] uppercase tracking-wide">
                Structured Archival Methodology
              </h2>
            </div>
            <span className="text-xs font-sans text-[#9ca3af]">
              Select a stage below to enter the corresponding analytical workspace
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {workflowCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveTab(item.targetTab)}
                  className="group relative cursor-pointer rounded-sm overflow-hidden border border-[#242429] hover:border-[#8B0000] bg-[#0b0b0e] shadow-2xl transition-all duration-300 min-h-[260px] flex flex-col justify-between p-6"
                >
                  {/* Photographic Background Layer */}
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-[0.28] group-hover:scale-105 group-hover:brightness-[0.35] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#070709]/80 to-[#070709]/65" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-typewriter text-xs text-[#dc2626] bg-black/75 border border-[#3a1a1c] px-2.5 py-1 rounded-sm">
                      STAGE {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-black/70 border border-[#2e2e36] flex items-center justify-center text-[#d4d4d8] group-hover:text-[#ef4444] group-hover:border-[#7f1d1d] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="font-bebas text-4xl text-[#f4f4f5] tracking-wide group-hover:text-[#ef4444] transition-colors leading-none">
                      {item.title}
                    </h3>
                    <p className="font-oswald text-sm text-[#e5e7eb] uppercase tracking-wide mt-1">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-[#9ca3af] font-sans mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-typewriter text-[#dc2626]">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. MODULE EXPLORATION SECTION (ALL 8 WORKING ROUTES)                */}
        {/* =================================================================== */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-3 border-b border-[#222226]">
            <div>
              <div className="font-typewriter text-[11px] text-[#b91c1c] uppercase mb-1">
                SYSTEM ARCHITECTURE
              </div>
              <h2 className="font-oswald font-semibold text-2xl sm:text-3xl text-[#f4f4f5] uppercase tracking-wide">
                Analytical Modules
              </h2>
            </div>
            <span className="text-xs font-sans text-[#9ca3af]">
              8 interactive machine learning, NLP, graph, and geospatial workspaces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className="group cursor-pointer rounded-sm overflow-hidden horror-card flex flex-col justify-between"
                >
                  {/* Visual Photographic Header */}
                  <div className="relative h-28 w-full overflow-hidden border-b border-[#222226] bg-[#060608]">
                    <img
                      src={mod.image}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-[0.38] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-black/50" />
                    <div className="absolute top-2.5 left-3 font-typewriter text-[9px] text-[#d1d5db] bg-black/80 px-2 py-0.5 border border-white/10">
                      {mod.tag}
                    </div>
                    <div className="absolute bottom-2.5 right-3 w-8 h-8 rounded-sm bg-black/80 border border-[#2f2f37] flex items-center justify-center text-[#b91c1c] group-hover:border-[#8B0000]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-oswald font-semibold text-lg text-[#f3f4f6] uppercase tracking-wide group-hover:text-[#ef4444] transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-[#9ca3af] font-sans mt-1.5 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-[#1e1e24] flex items-center justify-between text-[11px] font-typewriter text-[#dc2626]">
                      <span>Launch Module</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. FULL ARCHIVAL EVIDENCE WALL                                      */}
        {/* =================================================================== */}
        <ArchivalPhotoWall />

        {/* =================================================================== */}
        {/* 6. CORPUS METRICS & REAL DATA DISTRIBUTIONS                         */}
        {/* =================================================================== */}
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

          <div className="rounded-sm p-5 horror-card">
            <div className="flex items-center justify-between text-[#9ca3af] text-[10px] font-typewriter uppercase mb-2">
              <span>Research Scope</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-4xl font-bebas text-emerald-400 leading-none">
              HISTORICAL ONLY
            </div>
            <div className="text-xs text-[#9ca3af] font-sans mt-2">
              Strictly non-predictive archival research
            </div>
          </div>
        </div>

        {stats?.quality_report && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-sm p-5 horror-card">
              <h3 className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-wide mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#b91c1c]" />
                <span>Primary Modalities</span>
              </h3>
              <div className="space-y-2 text-xs font-sans">
                {Object.entries(stats.quality_report.method_distributions || {})
                  .slice(0, 5)
                  .map(([m, cnt]) => (
                    <div
                      key={m}
                      className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm"
                    >
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
                {Object.entries(stats.quality_report.regional_distributions || {}).map(
                  ([r, cnt]) => (
                    <div
                      key={r}
                      className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm"
                    >
                      <span className="text-[#d1d5db] truncate">{r}</span>
                      <span className="font-mono text-[#2ee6d0] font-semibold">{cnt}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-sm p-5 horror-card">
              <h3 className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-wide mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#b57bff]" />
                <span>Target Profiles</span>
              </h3>
              <div className="space-y-2 text-xs font-sans">
                {Object.entries(stats.quality_report.victim_demographic_distributions || {})
                  .slice(0, 5)
                  .map(([v, cnt]) => (
                    <div
                      key={v}
                      className="flex justify-between items-center bg-[#121216] border border-[#232328] p-2 rounded-sm"
                    >
                      <span className="text-[#d1d5db] truncate max-w-[200px]">{v}</span>
                      <span className="font-mono text-[#b57bff] font-semibold">{cnt}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
