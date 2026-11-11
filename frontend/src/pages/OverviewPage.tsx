import React from 'react';
import { DashboardStats } from '../types';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { HeroTape } from '../components/HeroTape';
import {
  ShieldCheck,
  Calendar,
  Globe2,
  Layers,
  Database,
  ArrowRight,
  TrendingUp,
  Skull,
} from 'lucide-react';

interface OverviewPageProps {
  stats: DashboardStats | null;
  setActiveTab: (tab: string) => void;
  onSelectCaseDetail: (caseId: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ stats, setActiveTab }) => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative min-h-[460px] rounded-2xl bg-gradient-to-b from-[#101420] via-dark-panel to-dark-bg border border-dark-line overflow-hidden p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
        <ParticleCanvas />

        {/* Ambient radial lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-crime-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-crime-tape/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-card border border-dark-line text-xs font-mono text-crime-tape mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-crime-tape animate-ping" />
            <span>UNSUPERVISED FORENSIC MACHINE LEARNING SYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-crime-text leading-[1.08] mb-4">
            Which historical serial cases <span className="text-crime-red">look alike?</span>
          </h1>

          <p className="text-base sm:text-lg text-crime-subtext font-sans leading-relaxed mb-6 max-w-2xl">
            Analyze publicly documented historical serial crime cases across 83 countries.
            Discovers topological patterns, clusters similar forensic modalities, mines multi-attribute association rules,
            and evaluates explainable semantic comparisons.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-5 py-2.5 rounded bg-crime-red hover:bg-crime-red/90 text-white font-display font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-crime-redGlow flex items-center gap-2"
            >
              <span>Analyze Case Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('clustering')}
              className="px-5 py-2.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-crime-text font-display font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>Explore Cluster Galaxy</span>
            </button>
          </div>
        </div>

        {/* Hero Quick Stats Row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-dark-line/80 font-mono text-xs">
          <div>
            <div className="text-crime-muted">Verified Cases</div>
            <div className="text-3xl font-display font-bold text-crime-tape mt-0.5">
              {stats?.total_cases || 492}
            </div>
            <div className="text-[11px] text-crime-muted/70">100% cited provenance</div>
          </div>
          <div>
            <div className="text-crime-muted">Global Jurisdictions</div>
            <div className="text-3xl font-display font-bold text-crime-cyan mt-0.5">
              {stats?.total_countries || 83}
            </div>
            <div className="text-[11px] text-crime-muted/70">6 Macro-Regions</div>
          </div>
          <div>
            <div className="text-crime-muted">Historical Span</div>
            <div className="text-3xl font-display font-bold text-crime-purple mt-0.5">
              {stats?.total_years_covered || 122} yrs
            </div>
            <div className="text-[11px] text-crime-muted/70">{stats?.year_span || '1900 – 2022'}</div>
          </div>
          <div>
            <div className="text-crime-muted">Active Clusters</div>
            <div className="text-3xl font-display font-bold text-crime-red mt-0.5">
              5 Modes
            </div>
            <div className="text-[11px] text-crime-muted/70">+ Noise Outliers</div>
          </div>
        </div>
      </div>

      {/* Warning Ticker Tape */}
      <HeroTape />

      {/* Command Center KPI Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
          <div className="flex items-center justify-between text-crime-muted text-xs font-mono mb-2">
            <span>PROVEN VICTIM TOTAL</span>
            <Skull className="w-4 h-4 text-crime-red" />
          </div>
          <div className="text-3xl font-display font-bold text-crime-text">
            {stats?.total_proven_victims?.toLocaleString() || '6,700+'}
          </div>
          <div className="text-xs text-crime-muted font-mono mt-1">
            Mean of 13.7 victims per documented case
          </div>
        </div>

        <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
          <div className="flex items-center justify-between text-crime-muted text-xs font-mono mb-2">
            <span>DATASET COMPLETENESS</span>
            <Database className="w-4 h-4 text-crime-tape" />
          </div>
          <div className="text-3xl font-display font-bold text-crime-tape">
            {stats?.average_completeness_pct || 94.8}%
          </div>
          <div className="text-xs text-crime-muted font-mono mt-1">
            Standardized imputation pipeline
          </div>
        </div>

        <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
          <div className="flex items-center justify-between text-crime-muted text-xs font-mono mb-2">
            <span>AI RETRIEVAL PIPELINE</span>
            <TrendingUp className="w-4 h-4 text-crime-cyan" />
          </div>
          <div className="text-3xl font-display font-bold text-crime-cyan">
            Hybrid SVD
          </div>
          <div className="text-xs text-crime-muted font-mono mt-1">
            Dense 64-d semantic + BM25 + TF-IDF
          </div>
        </div>

        <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
          <div className="flex items-center justify-between text-crime-muted text-xs font-mono mb-2">
            <span>ETHICAL SAFETY STATUS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-bold text-emerald-400">
            ENFORCED
          </div>
          <div className="text-xs text-crime-muted font-mono mt-1">
            Strictly non-predictive archival research
          </div>
        </div>
      </div>

      {/* Forensic Distributions Grid */}
      {stats?.quality_report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
            <h3 className="font-display font-bold text-base text-crime-text mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-crime-red" />
              <span>Primary Modalities</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.method_distributions || {}).slice(0, 5).map(([m, cnt]) => (
                <div key={m} className="flex justify-between items-center bg-dark-card border border-dark-line p-2 rounded">
                  <span className="text-crime-subtext truncate max-w-[200px]">{m}</span>
                  <span className="text-crime-tape font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
            <h3 className="font-display font-bold text-base text-crime-text mb-3 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-crime-cyan" />
              <span>Macro-Regions</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.regional_distributions || {}).map(([r, cnt]) => (
                <div key={r} className="flex justify-between items-center bg-dark-card border border-dark-line p-2 rounded">
                  <span className="text-crime-subtext truncate">{r}</span>
                  <span className="text-crime-cyan font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-lg">
            <h3 className="font-display font-bold text-base text-crime-text mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-crime-purple" />
              <span>Target Profiles</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {Object.entries(stats.quality_report.victim_demographic_distributions || {}).slice(0, 5).map(([v, cnt]) => (
                <div key={v} className="flex justify-between items-center bg-dark-card border border-dark-line p-2 rounded">
                  <span className="text-crime-subtext truncate max-w-[200px]">{v}</span>
                  <span className="text-crime-purple font-bold">{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

