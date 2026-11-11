import React, { useState, useEffect } from 'react';
import { SearchResult } from '../types';
import { api } from '../services/api';
import { Search, Zap, Clock, ExternalLink, Eye, CheckCircle, Database } from 'lucide-react';

interface SearchPageProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectCaseDetail }) => {
  const [query, setQuery] = useState('Poisoning hospital patients in European medical facilities');
  const [method, setMethod] = useState('hybrid');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [benchmarks, setBenchmarks] = useState<any[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.executeSearch({
        query: query.trim(),
        method,
        top_k: 5,
      });
      setSearchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
    api.getSearchBenchmarks().then((res) => setBenchmarks(res)).catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-8">
      {/* Search Header & Query Form */}
      <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl space-y-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-cyan/10 border border-crime-cyan/30 text-[11px] font-mono text-crime-cyan mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>UNIFIED INTELLIGENT INFORMATION RETRIEVAL</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-crime-text">
            Forensic NLP & Semantic Search Engine
          </h2>
          <p className="text-xs text-crime-muted font-mono mt-1">
            Compare term frequency (TF-IDF), probabilistic relevance (Okapi BM25), dense SVD semantic embeddings,
            and exact K-Nearest Neighbor retrieval over verified case summaries.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-crime-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter investigative narrative query (e.g., Highway transit strangulation targeting young travellers)..."
              className="w-full bg-dark-card border border-dark-line rounded-lg pl-11 pr-4 py-3 text-sm font-mono text-crime-text placeholder:text-crime-muted/40 focus:outline-none focus:border-crime-tape"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-crime-muted">Retrieval Algorithm:</span>
              {[
                { id: 'hybrid', label: 'Hybrid Ensemble' },
                { id: 'semantic', label: 'Dense SVD Semantic' },
                { id: 'bm25', label: 'Okapi BM25' },
                { id: 'tfidf', label: 'TF-IDF Vectorizer' },
                { id: 'knn', label: 'KNN Exact Search' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`px-3 py-1.5 rounded transition-all border ${
                    method === m.id
                      ? 'bg-crime-tape text-black font-bold border-crime-tape shadow-sm'
                      : 'bg-dark-card text-crime-muted hover:text-white border-dark-line'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded bg-crime-red hover:bg-crime-red/90 text-white font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-md shadow-crime-redGlow disabled:opacity-50"
            >
              {loading ? 'Executing Retrieval...' : 'Execute Search'}
            </button>
          </div>
        </form>

        {/* Quick query recommendation chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dark-line text-xs font-mono">
          <span className="text-crime-muted">Sample Queries:</span>
          {[
            'Poisoning hospital patients in European medical facilities',
            'Highway transit strangulation targeting young travellers',
            'Firearm crimes involving household members in South America',
            'Nighttime burglary and blunt force trauma',
          ].map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(sq);
                // trigger search with new query
                api
                  .executeSearch({ query: sq, method, top_k: 5 })
                  .then((res) => setSearchResult(res));
              }}
              className="bg-dark-card hover:bg-dark-cardHover border border-dark-line text-crime-subtext px-2.5 py-1 rounded transition-colors text-[11px]"
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      {/* Search Output Section */}
      {searchResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-crime-muted px-1">
            <div className="flex items-center gap-2">
              <span>Top {searchResult.top_k} Historical Matches</span>
              <span className="text-crime-tape">({searchResult.method.toUpperCase()} MODE)</span>
            </div>
            <div className="flex items-center gap-1.5 text-crime-cyan font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Query Latency: {searchResult.response_time_ms} ms</span>
            </div>
          </div>

          <div className="space-y-3">
            {searchResult.results.map((r, idx) => (
              <div
                key={idx}
                className="bg-dark-panel border border-dark-line hover:border-dark-lineLight p-5 rounded-lg shadow-lg space-y-3 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-crime-tape font-bold bg-crime-tape/10 px-2 py-0.5 rounded border border-crime-tape/30">
                      {r.case_id}
                    </span>
                    <h3 className="text-lg font-display font-bold text-crime-text">{r.case_name}</h3>
                    <span className="text-xs text-crime-muted font-mono">
                      ({r.country} · {r.macro_region} · {r.active_start_year}s)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="font-display font-bold text-xl text-crime-tape">
                      {r.score_percentage}%
                    </div>
                    <span className="text-[11px] font-mono text-crime-muted">MATCH</span>
                  </div>
                </div>

                {/* Sub-scores breakdown if hybrid */}
                {r.sub_scores && (
                  <div className="flex items-center gap-4 text-[11px] font-mono text-crime-muted bg-dark-card/60 px-3 py-1.5 rounded border border-dark-line">
                    <span>
                      SVD Semantic: <strong className="text-crime-cyan">{r.sub_scores.semantic}</strong>
                    </span>
                    <span>
                      BM25 Probabilistic: <strong className="text-crime-tape">{r.sub_scores.bm25}</strong>
                    </span>
                    <span>
                      TF-IDF Lexical: <strong className="text-crime-purple">{r.sub_scores.tfidf}</strong>
                    </span>
                  </div>
                )}

                <p className="text-xs leading-relaxed text-crime-subtext text-justify font-sans">
                  {r.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-dark-line font-mono text-xs">
                  <div className="text-crime-muted flex items-center gap-3">
                    <span>
                      Method: <strong className="text-crime-text">{r.method_category}</strong>
                    </span>
                    <span>
                      Victims: <strong className="text-crime-red">{r.victims_proven}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectCaseDetail(r.case_id)}
                      className="text-crime-tape hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Dossier
                    </button>
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-crime-muted hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Wikipedia
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benchmark Comparisons Grid */}
      {benchmarks.length > 0 && (
        <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl space-y-4">
          <h3 className="font-display font-bold text-lg text-crime-text flex items-center gap-2">
            <Database className="w-4 h-4 text-crime-tape" />
            <span>Information Retrieval Benchmark Across Test Query Set</span>
          </h3>
          <p className="text-xs text-crime-muted font-mono">
            Documented latency (ms) and top historical retrieval match across TF-IDF, BM25, Semantic SVD, and Hybrid ranking.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {benchmarks.map((b, i) => (
              <div key={i} className="bg-dark-card border border-dark-line p-3.5 rounded space-y-2">
                <div className="text-crime-tape font-bold">Query: "{b.query}"</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
                  {Object.entries(b.methods || {}).map(([mName, mData]: any) => (
                    <div key={mName} className="bg-dark-bg p-2 rounded border border-dark-line/70">
                      <div className="text-crime-muted uppercase tracking-wider font-semibold">
                        {mName}
                      </div>
                      <div className="text-crime-text font-bold truncate mt-0.5">
                        {mData.top_match}
                      </div>
                      <div className="text-crime-cyan text-[10px] mt-0.5">
                        {mData.response_time_ms} ms · Score: {mData.top_score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

