import React, { useState, useEffect } from 'react';
import { CaseItem } from '../types';
import { api } from '../services/api';
import { Search, Filter, FolderSearch, ExternalLink, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseExplorerPageProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const CaseExplorerPage: React.FC<CaseExplorerPageProps> = ({ onSelectCaseDetail }) => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const [filterOptions, setFilterOptions] = useState<{
    macro_regions: string[];
    methods: string[];
    decades: number[];
  }>({ macro_regions: [], methods: [], decades: [] });

  useEffect(() => {
    api.getCaseFilters().then((res) => {
      setFilterOptions({
        macro_regions: res.macro_regions || [],
        methods: res.methods || [],
        decades: res.decades || [],
      });
    });
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await api.getCases({
        query: searchQuery.trim() || undefined,
        macro_region: selectedRegion || undefined,
        method_category: selectedMethod || undefined,
        decade: selectedDecade || undefined,
        skip: page * pageSize,
        limit: pageSize,
      });
      setCases(res.cases);
      setTotal(res.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [page, selectedRegion, selectedMethod, selectedDecade]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchCases();
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-dark-panel border border-dark-line p-5 rounded-lg shadow-lg">
        <div>
          <h2 className="text-2xl font-display font-bold text-crime-text flex items-center gap-2">
            <FolderSearch className="w-6 h-6 text-crime-tape" />
            <span>Historical Case Explorer</span>
          </h2>
          <p className="text-xs text-crime-muted font-mono mt-1">
            Browse, filter, and inspect verified historical serial cases with documented Wikipedia citations.
          </p>
        </div>
        <div className="font-mono text-xs px-3 py-1.5 rounded bg-dark-card border border-dark-line text-crime-tape">
          Total Records: <strong>{total}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-dark-panel border border-dark-line p-4 rounded-lg shadow-lg space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-crime-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case name, country, or investigative summary..."
              className="w-full bg-dark-card border border-dark-line rounded pl-9 pr-3 py-2 text-xs font-mono text-crime-text placeholder:text-crime-muted/40 focus:outline-none focus:border-crime-tape"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-xs font-mono text-crime-tape transition-colors flex items-center gap-1.5"
          >
            <span>Search</span>
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setPage(0);
            }}
            className="bg-dark-card border border-dark-line text-crime-text rounded p-2 focus:border-crime-tape"
          >
            <option value="">All Macro-Regions</option>
            {filterOptions.macro_regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            value={selectedMethod}
            onChange={(e) => {
              setSelectedMethod(e.target.value);
              setPage(0);
            }}
            className="bg-dark-card border border-dark-line text-crime-text rounded p-2 focus:border-crime-tape"
          >
            <option value="">All Method Categories</option>
            {filterOptions.methods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={selectedDecade === undefined ? '' : selectedDecade}
            onChange={(e) => {
              setSelectedDecade(e.target.value ? Number(e.target.value) : undefined);
              setPage(0);
            }}
            className="bg-dark-card border border-dark-line text-crime-text rounded p-2 focus:border-crime-tape"
          >
            <option value="">All Decades</option>
            {filterOptions.decades.map((d) => (
              <option key={d} value={d}>
                {d}s
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Case Table */}
      <div className="bg-dark-panel border border-dark-line rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-dark-card/90 border-b border-dark-line font-mono text-crime-muted text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Case / Subject</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Active Period</th>
                <th className="py-3 px-4">Method Category</th>
                <th className="py-3 px-4 text-center">Proven</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-line font-mono">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-crime-muted">
                    Loading historical case records...
                  </td>
                </tr>
              ) : cases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-crime-muted">
                    No matching cases found for the selected filters.
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr
                    key={c.case_id}
                    className="hover:bg-dark-card/60 transition-colors cursor-pointer"
                    onClick={() => onSelectCaseDetail(c.case_id)}
                  >
                    <td className="py-3 px-4 text-crime-tape font-semibold">{c.case_id}</td>
                    <td className="py-3 px-4 font-sans font-semibold text-crime-text text-sm">
                      {c.case_name}
                    </td>
                    <td className="py-3 px-4 text-crime-muted">
                      <div>{c.country}</div>
                      <div className="text-[10px] text-crime-muted/60">{c.macro_region}</div>
                    </td>
                    <td className="py-3 px-4 text-crime-subtext">
                      {c.active_start_year}–{c.active_end_year}
                      <span className="text-[10px] text-crime-muted ml-1.5">({c.duration_years}y)</span>
                    </td>
                    <td className="py-3 px-4 text-crime-subtext truncate max-w-[180px]">
                      {c.method_category}
                    </td>
                    <td className="py-3 px-4 text-center text-crime-red font-bold text-sm">
                      {c.victims_proven}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectCaseDetail(c.case_id)}
                          className="p-1.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-crime-tape hover:text-white transition-colors"
                          title="View Case Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={c.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-crime-muted hover:text-white transition-colors"
                          title="Open Wikipedia Source"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between p-4 border-t border-dark-line font-mono text-xs">
          <div className="text-crime-muted">
            Page {page + 1} of {Math.max(1, totalPages)} ({total} total cases)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line disabled:opacity-30 text-crime-text transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
              disabled={page + 1 >= totalPages}
              className="p-1.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line disabled:opacity-30 text-crime-text transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

