import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, Cpu, CheckCircle2, Sliders, Zap, Award } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const [methodology, setMethodology] = useState<any | null>(null);
  const [optimization, setOptimization] = useState<any | null>(null);

  useEffect(() => {
    api.getMethodology().then((res) => setMethodology(res)).catch((e) => console.error(e));
    api.getOptimizationResults().then((res) => setOptimization(res)).catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-cyan/10 border border-crime-cyan/30 text-[11px] font-mono text-crime-cyan mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>SCIENTIFIC FOUNDATIONS & BENCHMARKING</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-crime-text">
          Forensic Data Science Methodology & Algorithm Optimization
        </h2>
        <p className="text-xs text-crime-muted font-mono mt-1 max-w-3xl">
          Comprehensive documentation of mathematical formulations, preprocessing pipelines, distance metrics,
          and hyperparameter optimization benchmarks (Grid Search, Random Search, and Genetic Algorithm).
        </p>
      </div>

      {/* Mathematical Formulations Section */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-6">
        <h3 className="text-xl font-display font-bold text-crime-text flex items-center gap-2">
          <Cpu className="w-5 h-5 text-crime-tape" />
          <span>Core Algorithmic Formulations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          <div className="bg-dark-card border border-dark-line p-4 rounded-lg space-y-2">
            <div className="text-crime-tape font-bold flex items-center justify-between">
              <span>1. K-Means Inertia Objective</span>
              <span className="text-[10px] text-crime-muted">Unsupervised</span>
            </div>
            <p className="text-crime-subtext text-[11px] font-sans">
              Minimizes within-cluster sum of squares (WCSS) across all partitions:
            </p>
            <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-crime-cyan">
              arg min_S ∑(i=1..k) ∑(x ∈ S_i) || x - μ_i ||²
            </div>
          </div>

          <div className="bg-dark-card border border-dark-line p-4 rounded-lg space-y-2">
            <div className="text-crime-cyan font-bold flex items-center justify-between">
              <span>2. Okapi BM25 Relevance Scoring</span>
              <span className="text-[10px] text-crime-muted">Information Retrieval</span>
            </div>
            <p className="text-crime-subtext text-[11px] font-sans">
              Non-linear term saturation with document length normalization:
            </p>
            <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-crime-tape text-[11px]">
              IDF(q) · [ f(q,D)·(k1+1) / (f(q,D) + k1·(1 - b + b·(|D|/avgDL))) ]
            </div>
          </div>

          <div className="bg-dark-card border border-dark-line p-4 rounded-lg space-y-2">
            <div className="text-crime-purple font-bold flex items-center justify-between">
              <span>3. Cosine Semantic Proximity</span>
              <span className="text-[10px] text-crime-muted">Vector NLP</span>
            </div>
            <p className="text-crime-subtext text-[11px] font-sans">
              Normalized angular distance between dense vector embeddings:
            </p>
            <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-crime-purple">
              cos(θ) = ( u · v ) / ( ||u||₂ · ||v||₂ )
            </div>
          </div>

          <div className="bg-dark-card border border-dark-line p-4 rounded-lg space-y-2">
            <div className="text-crime-red font-bold flex items-center justify-between">
              <span>4. Association Rule Lift Ratio</span>
              <span className="text-[10px] text-crime-muted">Pattern Mining</span>
            </div>
            <p className="text-crime-subtext text-[11px] font-sans">
              Ratio of observed co-occurrence frequency to statistical independence:
            </p>
            <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-crime-red">
              Lift(A → B) = P(A ∩ B) / [ P(A) · P(B) ]
            </div>
          </div>
        </div>
      </div>

      {/* Hyperparameter Optimization Benchmarks */}
      {optimization && (
        <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>OPTIMIZATION ENGINE OUTPUTS</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-crime-text">
              Hyperparameter Search & Tuning Benchmarks
            </h3>
            <p className="text-xs text-crime-muted font-mono mt-1">
              Comparing Grid Search, Random Search, and Genetic Algorithm optimization strategies for maximizing clustering quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
            {/* Grid Search Card */}
            {optimization.grid_search && (
              <div className="bg-dark-card border border-dark-line p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-dark-line">
                  <span className="font-bold text-crime-tape">Grid Search</span>
                  <span className="text-crime-muted text-[10px]">
                    {optimization.grid_search.execution_time_ms} ms
                  </span>
                </div>
                <div>
                  <div className="text-crime-muted text-[11px]">Best Silhouette Score:</div>
                  <div className="text-2xl font-display font-bold text-crime-text">
                    {optimization.grid_search.best_silhouette}
                  </div>
                </div>
                <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-[11px] text-crime-subtext">
                  Optimal Params:{' '}
                  <strong>k={optimization.grid_search.best_params?.k}</strong>,{' '}
                  init={optimization.grid_search.best_params?.init}
                </div>
                <div className="text-[10px] text-crime-muted">
                  Exhaustive search over {optimization.grid_search.search_space_size} hyperparameter combinations.
                </div>
              </div>
            )}

            {/* Random Search Card */}
            {optimization.random_search && (
              <div className="bg-dark-card border border-dark-line p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-dark-line">
                  <span className="font-bold text-crime-cyan">Random Search</span>
                  <span className="text-crime-muted text-[10px]">
                    {optimization.random_search.execution_time_ms} ms
                  </span>
                </div>
                <div>
                  <div className="text-crime-muted text-[11px]">Best DBSCAN Silhouette:</div>
                  <div className="text-2xl font-display font-bold text-crime-text">
                    {optimization.random_search.best_silhouette}
                  </div>
                </div>
                <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-[11px] text-crime-subtext">
                  Optimal DBSCAN:{' '}
                  <strong>eps={optimization.random_search.best_params?.eps}</strong>,{' '}
                  min_samples={optimization.random_search.best_params?.min_samples}
                </div>
                <div className="text-[10px] text-crime-muted">
                  Stochastic sampling across continuous parameter space.
                </div>
              </div>
            )}

            {/* Genetic Algorithm Card */}
            {optimization.genetic_algorithm && (
              <div className="bg-dark-card border border-dark-line p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-dark-line">
                  <span className="font-bold text-crime-purple">Genetic Algorithm</span>
                  <span className="text-crime-muted text-[10px]">
                    {optimization.genetic_algorithm.execution_time_ms} ms
                  </span>
                </div>
                <div>
                  <div className="text-crime-muted text-[11px]">Evolved Silhouette:</div>
                  <div className="text-2xl font-display font-bold text-crime-text">
                    {optimization.genetic_algorithm.optimal_hyperparameters?.achieved_silhouette}
                  </div>
                </div>
                <div className="bg-dark-bg p-2.5 rounded border border-dark-line text-[11px] text-crime-subtext">
                  Evolved Chromosome:{' '}
                  <strong>k={optimization.genetic_algorithm.optimal_hyperparameters?.k}</strong>,{' '}
                  n_init={optimization.genetic_algorithm.optimal_hyperparameters?.n_init}
                </div>
                <div className="text-[10px] text-crime-muted">
                  Evolutionary selection across {optimization.genetic_algorithm.generations} generations.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

