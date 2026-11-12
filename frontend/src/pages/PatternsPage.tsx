import React, { useState, useEffect } from 'react';
import { AssociationData } from '../types';
import { api } from '../services/api';
import { Sparkles, ArrowRight, TrendingUp, Filter, Info } from 'lucide-react';

export const PatternsPage: React.FC = () => {
  const [data, setData] = useState<AssociationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [minLift, setMinLift] = useState<number>(1.2);

  useEffect(() => {
    let isMounted = true;
    api
      .getAssociationRules()
      .then((res) => {
        if (isMounted && res) setData(res);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && !data) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-crime-tape border-t-transparent rounded-full animate-spin" />
        <div>Mining multi-attribute association rules and sequential transitions (Apriori & PrefixSpan)...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center font-mono text-crime-muted text-sm">
        Unable to load association pattern rules.
      </div>
    );
  }

  const filteredRules = data.rules.filter((r) => r.lift >= minLift);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-tape/10 border border-crime-tape/30 text-[11px] font-mono text-crime-tape mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASSOCIATION & SEQUENTIAL DISCOVERY</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-crime-text">
          Apriori Association Mining & Historical Sequential Transitions
        </h2>
        <p className="text-xs text-crime-muted font-mono mt-1 max-w-2xl">
          Discovers recurring attribute co-occurrences and sequential transitions across decades.
          Evaluated via Support (frequency in dataset), Confidence (conditional probability), and Lift (correlation strength).
        </p>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-dark-line font-mono text-xs">
          <div>
            <div className="text-crime-muted">Mined Rules</div>
            <div className="text-2xl font-display font-bold text-crime-tape mt-0.5">
              {data.total_rules_mined}
            </div>
            <div className="text-[10px] text-crime-muted">Evaluated itemsets</div>
          </div>
          <div>
            <div className="text-crime-muted">Base Transactions</div>
            <div className="text-2xl font-display font-bold text-crime-text mt-0.5">
              {data.total_transactions}
            </div>
            <div className="text-[10px] text-crime-muted">Encoded historical cases</div>
          </div>
          <div>
            <div className="text-crime-muted">Min Support Threshold</div>
            <div className="text-2xl font-display font-bold text-crime-cyan mt-0.5">
              {(data.min_support * 100).toFixed(0)}%
            </div>
            <div className="text-[10px] text-crime-muted">Dataset frequency</div>
          </div>
          <div>
            <div className="text-crime-muted">Sequential Transitions</div>
            <div className="text-2xl font-display font-bold text-crime-purple mt-0.5">
              {data.sequential_patterns.length}
            </div>
            <div className="text-[10px] text-crime-muted">PrefixSpan decade shifts</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-dark-panel border border-dark-line p-4 rounded-lg">
        <div className="flex items-center gap-2 font-mono text-xs text-crime-muted">
          <Filter className="w-4 h-4 text-crime-tape" />
          <span>Filter Rules by Minimum Lift:</span>
        </div>
        <div className="flex items-center gap-3">
          {[1.1, 1.3, 1.5, 1.8, 2.0].map((val) => (
            <button
              key={val}
              onClick={() => setMinLift(val)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors border ${
                minLift === val
                  ? 'bg-crime-tape text-black font-bold border-crime-tape'
                  : 'bg-dark-card text-crime-muted hover:text-white border-dark-line'
              }`}
            >
              ≥ {val.toFixed(1)} Lift
            </button>
          ))}
        </div>
      </div>

      {/* Association Rules Table */}
      <div className="bg-dark-panel border border-dark-line rounded-lg shadow-xl overflow-hidden space-y-4 p-6">
        <div className="font-mono text-xs text-crime-muted uppercase tracking-wider">
          Mined Association Rules (Sorted by Lift Descending — Showing {filteredRules.length} rules)
        </div>

        <div className="space-y-3">
          {filteredRules.map((r, idx) => (
            <div
              key={idx}
              className="bg-dark-card border border-dark-line p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono hover:border-dark-lineLight transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-crime-text font-semibold flex-wrap">
                  <span className="text-crime-tape">IF</span>
                  {r.antecedent.map((a, aIdx) => (
                    <span
                      key={aIdx}
                      className="bg-dark-bg border border-dark-line px-2 py-0.5 rounded text-crime-subtext"
                    >
                      {a}
                    </span>
                  ))}
                  <ArrowRight className="w-3.5 h-3.5 text-crime-red shrink-0" />
                  <span className="text-crime-cyan">THEN</span>
                  {r.consequent.map((c, cIdx) => (
                    <span
                      key={cIdx}
                      className="bg-dark-bg border border-dark-line px-2 py-0.5 rounded text-crime-cyan font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-right">
                <div>
                  <div className="text-crime-muted text-[10px]">LIFT</div>
                  <div className="text-base font-display font-bold text-crime-tape">{r.lift}</div>
                </div>
                <div>
                  <div className="text-crime-muted text-[10px]">CONFIDENCE</div>
                  <div className="text-base font-display font-bold text-crime-text">
                    {(r.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-crime-muted text-[10px]">SUPPORT</div>
                  <div className="text-base font-display font-bold text-crime-subtext">
                    {(r.support * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequential Decade Transition Patterns */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-4">
        <div>
          <h3 className="font-display font-bold text-xl text-crime-text flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-crime-purple" />
            <span>Sequential Historical Transition Patterns (PrefixSpan Concept)</span>
          </h3>
          <p className="text-xs text-crime-muted font-mono mt-1">
            Tracks longitudinal shifts in prominent forensic modalities across successive decades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          {data.sequential_patterns.map((sp, idx) => (
            <div
              key={idx}
              className="bg-dark-card border border-dark-line p-3.5 rounded flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-crime-text font-bold">
                  <span className="text-crime-tape">{sp.from_decade}</span>
                  <span>→</span>
                  <span className="text-crime-cyan">{sp.to_decade}</span>
                </div>
                <div className="text-crime-muted text-[11px] mt-1">
                  {sp.from_pattern} {'──>'} {sp.to_pattern}
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[10px] bg-dark-bg border border-dark-line text-crime-purple">
                  {sp.significance}
                </span>
                <div className="text-[10px] text-crime-muted mt-1">
                  Transition: {(sp.transition_support * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytical Callout */}
      <div className="bg-dark-card border border-dark-line p-4 rounded text-xs font-mono text-crime-muted flex items-start gap-3">
        <Info className="w-4 h-4 text-crime-tape shrink-0 mt-0.5" />
        <div>
          <strong>Forensic Caution on Association Mining:</strong> Association rules demonstrate
          co-occurrence patterns in historical records. In accordance with forensic science principles,
          association does <strong>not</strong> imply causation or systemic criminal link.
        </div>
      </div>
    </div>
  );
};
