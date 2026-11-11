import {
  DashboardStats,
  CaseItem,
  ClusteringData,
  TimelineData,
  SearchResult,
  GraphData,
  AnomalyData,
  AssociationData,
  AnalyzeCaseResult,
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error [${res.status}]: ${errorText || res.statusText}`);
  }
  return res.json();
}

export const api = {
  getOverviewStats: () => fetchJson<DashboardStats>(`${API_BASE}/overview/stats`),

  getCases: (params?: {
    query?: string;
    country?: string;
    macro_region?: string;
    method_category?: string;
    victim_demographic?: string;
    decade?: number;
    skip?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.query) query.set('query', params.query);
    if (params?.country) query.set('country', params.country);
    if (params?.macro_region) query.set('macro_region', params.macro_region);
    if (params?.method_category) query.set('method_category', params.method_category);
    if (params?.victim_demographic) query.set('victim_demographic', params.victim_demographic);
    if (params?.decade) query.set('decade', params.decade.toString());
    if (params?.skip !== undefined) query.set('skip', params.skip.toString());
    if (params?.limit !== undefined) query.set('limit', params.limit.toString());

    return fetchJson<{ total: number; skip: number; limit: number; cases: CaseItem[] }>(
      `${API_BASE}/cases?${query.toString()}`
    );
  },

  getCaseFilters: () =>
    fetchJson<{
      countries: string[];
      macro_regions: string[];
      methods: string[];
      victim_demographics: string[];
      decades: number[];
      location_types: string[];
    }>(`${API_BASE}/cases/filters`),

  getCaseDetail: (caseId: string) => fetchJson<CaseItem>(`${API_BASE}/cases/${caseId}`),

  getTimeline: () => fetchJson<TimelineData>(`${API_BASE}/timeline`),

  getGeographySummary: () =>
    fetchJson<{
      region_counts: Record<string, number>;
      top_countries: Array<{ country: string; macro_region: string; case_count: number; total_victims: number }>;
      total_mapped_cases: number;
      markers: Array<{
        case_id: string;
        case_name: string;
        country: string;
        macro_region: string;
        latitude: number;
        longitude: number;
        victims_proven: number;
        method_category: string;
        active_decade: number;
      }>;
    }>(`${API_BASE}/geography/summary`),

  getClusteringResults: () => fetchJson<ClusteringData>(`${API_BASE}/clustering/results`),

  executeSearch: (payload: { query: string; method?: string; top_k?: number }) =>
    fetchJson<SearchResult>(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  getSearchBenchmarks: () =>
    fetchJson<Array<{ query: string; methods: Record<string, any> }>>(`${API_BASE}/search/benchmarks`),

  getGraphNetwork: () => fetchJson<GraphData>(`${API_BASE}/graph/network`),

  getDijkstraPath: (sourceId: string, targetId: string) =>
    fetchJson<{ found: boolean; path: string[]; total_distance: number | null; hop_count?: number }>(
      `${API_BASE}/graph/dijkstra?source_id=${sourceId}&target_id=${targetId}`
    ),

  getAnomalies: () => fetchJson<AnomalyData>(`${API_BASE}/anomaly/outliers`),

  getAssociationRules: () => fetchJson<AssociationData>(`${API_BASE}/patterns/rules`),

  getOptimizationResults: () => fetchJson<Record<string, any>>(`${API_BASE}/optimization/results`),

  analyzeCase: (payload: {
    macro_region: string;
    method_category: string;
    victim_demographic: string;
    active_decade: number;
    location_type: string;
    written_description?: string;
  }) =>
    fetchJson<AnalyzeCaseResult>(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  getMethodology: () => fetchJson<Record<string, any>>(`${API_BASE}/methodology`),
};

