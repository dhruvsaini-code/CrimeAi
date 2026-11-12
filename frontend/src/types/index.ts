export interface CaseItem {
  case_id: string;
  case_name: string;
  country: string;
  macro_region: string;
  latitude: number;
  longitude: number;
  active_start_year: number;
  active_end_year: number;
  active_decade: number;
  duration_years: number;
  victims_proven: number;
  victims_possible?: number | null;
  victims_confessed?: number | null;
  victims_max: number;
  victim_count_category: string;
  victim_demographic: string;
  method_category: string;
  location_type: string;
  operated_alone: boolean;
  medical_professional: boolean;
  law_enforcement: boolean;
  summary: string;
  source_title: string;
  source_url: string;
  verification_status: string;
  data_completeness_pct: number;
}

export interface DashboardStats {
  total_cases: number;
  total_countries: number;
  year_span: string;
  total_years_covered: number;
  average_completeness_pct: number;
  total_proven_victims: number;
  quality_report: {
    total_cases: number;
    total_countries: number;
    method_distributions: Record<string, number>;
    victim_demographic_distributions: Record<string, number>;
    regional_distributions: Record<string, number>;
    location_type_distributions: Record<string, number>;
  };
  model_status: {
    status: string;
    version: string;
    training_timestamp: string;
    models_ready: string[];
  };
}

export interface ClusterSummary {
  cluster_id: number;
  name: string;
  color: string;
  case_count: number;
  pct_of_dataset: number;
  mean_victims: number;
  year_range: [number, number];
  dominant_method: string;
  dominant_region: string;
  dominant_victim_type: string;
  centroid_pca: [number, number];
}

export interface CasePoint {
  case_id: string;
  case_name: string;
  country: string;
  macro_region: string;
  active_start_year: number;
  victims_proven: number;
  method_category: string;
  victim_demographic: string;
  kmeans_cluster: number;
  dbscan_cluster: number;
  agg_cluster: number;
  gmm_cluster: number;
  spectral_cluster: number;
  pca_x: number;
  pca_y: number;
}

export interface ClusteringData {
  elbow_data: Array<{ k: number; inertia: number; silhouette: number }>;
  comparison_metrics: Array<{
    algorithm: string;
    n_clusters: number;
    silhouette: number | null;
    davies_bouldin: number | null;
    calinski_harabasz: number | null;
    noise_count: number;
  }>;
  cluster_summaries: ClusterSummary[];
  case_points: CasePoint[];
  explained_variance: number[];
  total_variance_explained: number;
}

export interface TimelineData {
  decades: string[];
  timeline_series: Array<{
    decade: string;
    year: number;
    total_cases: number;
    cluster_0: number;
    cluster_1: number;
    cluster_2: number;
    cluster_3: number;
    cluster_4: number;
  }>;
  peak_decade: string;
  peak_case_count: number;
}

export interface SearchResult {
  query: string;
  method: string;
  response_time_ms: number;
  top_k: number;
  results: Array<{
    case_id: string;
    case_name: string;
    country: string;
    macro_region: string;
    active_start_year: number;
    victims_proven: number;
    method_category: string;
    victim_demographic: string;
    summary: string;
    source_url: string;
    similarity_score: number;
    score_percentage: number;
    sub_scores?: {
      tfidf: number;
      semantic: number;
      bm25: number;
    };
  }>;
}

export interface GraphNode {
  id: string;
  name: string;
  country: string;
  region: string;
  decade: number;
  method: string;
  victims: number;
  pagerank: number;
  community: number;
  degree: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  reasons: string[];
}

export interface GraphData {
  total_nodes: number;
  total_edges: number;
  total_communities: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AnomalyCase {
  case_id: string;
  case_name: string;
  country: string;
  macro_region: string;
  active_start_year: number;
  duration_years: number;
  victims_proven: number;
  method_category: string;
  location_type: string;
  isolation_forest_flag: boolean;
  lof_flag: boolean;
  iso_score: number;
  lof_score: number;
  anomaly_reasons: string[];
}

export interface AnomalyData {
  total_evaluated: number;
  flagged_anomalies_count: number;
  contamination_threshold: number;
  isolation_forest_count: number;
  lof_count: number;
  flagged_cases: AnomalyCase[];
}

export interface AssociationRule {
  antecedent: string[];
  consequent: string[];
  support: number;
  confidence: number;
  lift: number;
  rule_text: string;
}

export interface AssociationData {
  total_rules_mined: number;
  total_transactions: number;
  min_support: number;
  min_confidence: number;
  min_lift: number;
  rules: AssociationRule[];
  sequential_patterns: Array<{
    transition: string;
    from_decade: string;
    to_decade: string;
    from_pattern: string;
    to_pattern: string;
    transition_support: number;
    significance: string;
  }>;
}

export interface AnalyzeCaseResult {
  status: string;
  input_summary: {
    macro_region: string;
    method_category: string;
    victim_demographic: string;
    active_decade: string;
    location_type: string;
    written_description?: string;
  };
  pca_projection: {
    x: number;
    y: number;
  };
  assigned_cluster: {
    cluster_id: number;
    name: string;
    color: string;
    rationale: string;
  };
  top_historical_matches: Array<{
    case_id: string;
    case_name: string;
    country: string;
    macro_region: string;
    active_decade: number;
    active_start_year: number;
    victims_proven: number;
    method_category: string;
    victim_demographic: string;
    location_type: string;
    summary: string;
    source_title: string;
    source_url: string;
    similarity_score: number;
    score_percentage: number;
    shared_attributes: string[];
    differing_attributes: string[];
  }>;
  methodology_explanation: string;
  ethical_disclaimer: string;
}


export interface GeoSummary {
  region_counts: Record<string, number>;
  top_countries: Array<{ country: string; macro_region: string; case_count: number; total_victims: number }>;
  method_hotspots?: Array<{ method_category: string; case_count: number; total_victims: number }>;
  demographic_hotspots?: Array<{ victim_demographic: string; case_count: number; total_victims: number }>;
  regional_vulnerability?: Record<
    string,
    {
      total_cases: number;
      total_victims: number;
      dominant_method: string;
      most_targeted_demographic: string;
    }
  >;
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
    victim_demographic?: string;
    location_type?: string;
    active_decade: number;
  }>;
}
