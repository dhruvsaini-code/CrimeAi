import React, { useState } from 'react';
import { AnalyzeCaseResult } from '../types';
import { api } from '../services/api';
import { Network, Sparkles, AlertCircle, ShieldAlert, ArrowRight, CheckCircle2, Download, Bookmark } from 'lucide-react';

interface CaseAnalyzerProps {
  onSelectCaseDetail: (caseId: string) => void;
}

export const CaseAnalyzer: React.FC<CaseAnalyzerProps> = ({ onSelectCaseDetail }) => {
  const [region, setRegion] = useState('North America');
  const [method, setMethod] = useState('Strangulation / Asphyxiation');
  const [victimType, setVictimType] = useState('Young Adults / Students');
  const [decade, setDecade] = useState(1980);
  const [locationType, setLocationType] = useState('Highway / Rural / Remote');
  const [writtenDescription, setWrittenDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeCaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const archetypes = [
    {
      title: 'Highway Transit Strangulation',
      region: 'North America',
      method: 'Strangulation / Asphyxiation',
      victim: 'Young Adults / Students',
      decade: 1970,
      location: 'Highway / Rural / Remote',
      desc: 'Targeted young travellers and hitchhikers along interstate highway corridors during the 1970s.',
    },
    {
      title: 'Healthcare Poisoning Modality',
      region: 'Europe',
      method: 'Poisoning / Medical',
      victim: 'Medical Patients',
      decade: 1980,
      location: 'Healthcare / Institutional',
      desc: 'Pharmacological overdoses administered to vulnerable inpatients within hospital wards.',
    },
    {
      title: 'South American Firearm Domestic',
      region: 'South America',
      method: 'Firearm',
      victim: 'Household / Family Members',
      decade: 1980,
      location: 'Residential / Private Residence',
      desc: 'Firearm incidents centered within private households and family residences.',
    },
    {
      title: 'Urban Residential Blunt Force',
      region: 'Asia',
      method: 'Blunt Force / Beating',
      victim: 'General / Mixed Demographics',
      decade: 1990,
      location: 'Residential / Private Residence',
      desc: 'Burglary-associated blunt force trauma in urban apartment complexes during late evenings.',
    },
  ];

  const applyArchetype = (arc: typeof archetypes[0]) => {
    setRegion(arc.region);
    setMethod(arc.method);
    setVictimType(arc.victim);
    setDecade(arc.decade);
    setLocationType(arc.location);
    setWrittenDescription(arc.desc);
  };

  const handleDownloadDossier = () => {
    if (!result) return;
    const content = `# CrimePattern AI — Forensic Analysis Dossier
Generated: Academic & Educational Pattern Discovery Report
Ethical Status: Historical Comparison Only (Strictly Non-Predictive)

## 1. Input Forensic Parameters
- Macro-Region: ${result.input_summary.macro_region}
- Method Category: ${result.input_summary.method_category}
- Target Profile: ${result.input_summary.victim_demographic}
- Active Era: ${result.input_summary.active_decade}
- Site Type: ${result.input_summary.location_type}
- Narrative Description: ${result.input_summary.written_description || 'None provided'}

## 2. Modality Cluster Assignment
- Assigned Cluster: ${result.assigned_cluster.name}
- PCA Coordinates: [${result.pca_projection.x}, ${result.pca_projection.y}]
- Forensic Rationale: ${result.assigned_cluster.rationale}

## 3. Top Historical Matches
${result.top_historical_matches
  .map(
    (m, i) =>
      `### ${i + 1}. ${m.case_name} (${m.case_id}) — ${m.score_percentage}% Similarity
- Jurisdiction: ${m.country} (${m.macro_region})
- Active Era: ${m.active_decade}s (${m.active_start_year})
- Documented Victims: ${m.victims_proven}
- Shared Attributes: ${m.shared_attributes.join(', ') || 'None'}
- Differing Attributes: ${m.differing_attributes.join(', ') || 'None'}
- Summary: ${m.summary}
`
  )
  .join('\n')}

## 4. Methodology & Disclaimer
${result.methodology_explanation}

Notice: ${result.ethical_disclaimer}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CrimePattern_Dossier_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.analyzeCase({
        macro_region: region,
        method_category: method,
        victim_demographic: victimType,
        active_decade: decade,
        location_type: locationType,
        written_description: writtenDescription.trim() || undefined,
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze case');
    } finally {
      setLoading(false);
    }
  };

  // Mini SVG projection board width/height
  const svgW = 520;
  const svgH = 300;
  const padding = 40;

  // Map PCA coordinates (-4..4) to SVG
  const mapX = (x: number) => padding + ((x + 4) / 8) * (svgW - 2 * padding);
  const mapY = (y: number) => svgH - padding - ((y + 4) / 8) * (svgH - 2 * padding);

  return (
    <div className="space-y-6">
      {/* Disclaimer Alert */}
      <div className="bg-dark-panel border-l-4 border-crime-tape border-y border-r border-dark-line p-4 rounded-lg flex items-start gap-3 shadow-md">
        <ShieldAlert className="w-5 h-5 text-crime-tape shrink-0 mt-0.5" />
        <div className="text-xs font-mono text-crime-subtext leading-relaxed">
          <strong className="text-crime-tape">ACADEMIC & FORENSIC MANDATE:</strong> This analysis
          compares input parameters strictly against verified historical case archives. It discovers
          unsupervised pattern similarities, shared traits, and cluster modalities. It{' '}
          <strong>never</strong> predicts whether a living person is a criminal, identifies suspects, or profiles real individuals.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 font-display font-bold text-lg text-crime-text border-b border-dark-line pb-3">
            <Network className="w-5 h-5 text-crime-red" />
            <span>Forensic Attribute Parameters</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-crime-muted mb-1">Macro Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text focus:outline-none focus:border-crime-tape"
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            <div>
              <label className="block text-crime-muted mb-1">Primary Method Category</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text focus:outline-none focus:border-crime-tape"
              >
                <option value="Strangulation / Asphyxiation">Strangulation / Asphyxiation</option>
                <option value="Stabbing / Sharp Instrument">Stabbing / Sharp Instrument</option>
                <option value="Firearm">Firearm</option>
                <option value="Blunt Force / Beating">Blunt Force / Beating</option>
                <option value="Poisoning / Medical">Poisoning / Medical</option>
                <option value="Arson / Fire">Arson / Fire</option>
                <option value="Mixed / Forensic Unspecified">Mixed / Forensic Unspecified</option>
              </select>
            </div>

            <div>
              <label className="block text-crime-muted mb-1">Target Victim Demographic</label>
              <select
                value={victimType}
                onChange={(e) => setVictimType(e.target.value)}
                className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text focus:outline-none focus:border-crime-tape"
              >
                <option value="Young Adults / Students">Young Adults / Students</option>
                <option value="Children / Minors">Children / Minors</option>
                <option value="Elderly / Vulnerable">Elderly / Vulnerable</option>
                <option value="Medical Patients">Medical Patients</option>
                <option value="Travellers / Hitchhikers">Travellers / Hitchhikers</option>
                <option value="Sex Workers / Vulnerable Adults">Sex Workers / Vulnerable Adults</option>
                <option value="Household / Family Members">Household / Family Members</option>
                <option value="General / Mixed Demographics">General / Mixed Demographics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-crime-muted mb-1">Active Era (Decade)</label>
                <select
                  value={decade}
                  onChange={(e) => setDecade(Number(e.target.value))}
                  className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text focus:outline-none focus:border-crime-tape"
                >
                  {[1920, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010].map((d) => (
                    <option key={d} value={d}>
                      {d}s
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-crime-muted mb-1">Site / Location Type</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                  className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text focus:outline-none focus:border-crime-tape"
                >
                  <option value="Highway / Rural / Remote">Highway / Rural / Remote</option>
                  <option value="Residential / Private Residence">Residential / Private Residence</option>
                  <option value="Urban / Commercial Area">Urban / Commercial Area</option>
                  <option value="Healthcare / Institutional">Healthcare / Institutional</option>
                  <option value="Mixed / Multi-Site">Mixed / Multi-Site</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-crime-muted mb-1">
                Optional Case Narrative Description (NLP Semantic Retrieval)
              </label>
              <textarea
                value={writtenDescription}
                onChange={(e) => setWrittenDescription(e.target.value)}
                placeholder="E.g. Targeted college students travelling along coastal highway roads during summer evenings..."
                rows={3}
                className="w-full bg-dark-card border border-dark-line rounded p-2.5 text-crime-text placeholder:text-crime-muted/40 focus:outline-none focus:border-crime-tape"
              />
            </div>

            {error && (
              <div className="bg-crime-red/20 border border-crime-red p-2.5 rounded text-crime-red flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded bg-crime-red hover:bg-crime-red/90 text-white font-display font-bold text-base tracking-widest uppercase transition-all shadow-lg shadow-crime-redGlow disabled:opacity-50"
            >
              {loading ? 'Evaluating Forensic Similarity...' : 'Compare With Historical Records'}
            </button>
          </form>
        </div>

        {/* Right Output: Projection Galaxy & Match Dossier */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mini Visual PCA Projection Board */}
          <div className="bg-dark-panel border border-dark-line rounded-lg p-4 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center text-xs font-mono text-crime-muted mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-crime-tape" /> PCA Projection Space
              </span>
              <span>
                {result ? `Cluster: ${result.assigned_cluster.name}` : 'Awaiting Input Execution'}
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto bg-[#090b10] rounded border border-dark-line">
              {/* Grid Lines */}
              {[-2, 0, 2].map((v) => (
                <g key={v}>
                  <line
                    x1={mapX(v)}
                    x2={mapX(v)}
                    y1={padding}
                    y2={svgH - padding}
                    stroke="#161b28"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <line
                    x1={padding}
                    x2={svgW - padding}
                    y1={mapY(v)}
                    y2={mapY(v)}
                    stroke="#161b28"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                </g>
              ))}

              {/* Arcs from Query Point to Top Matches */}
              {result &&
                result.top_historical_matches.map((m, idx) => {
                  const qx = mapX(result.pca_projection.x);
                  const qy = mapY(result.pca_projection.y);
                  // Generate an offset for target matches
                  const tx = mapX(result.pca_projection.x + (idx - 2) * 1.2);
                  const ty = mapY(result.pca_projection.y + ((idx % 2 === 0 ? 1 : -1) * 1.5));
                  const midX = (qx + tx) / 2;
                  const midY = Math.min(qy, ty) - 30;

                  return (
                    <path
                      key={idx}
                      d={`M ${qx} ${qy} Q ${midX} ${midY} ${tx} ${ty}`}
                      fill="none"
                      stroke="#ffc400"
                      strokeWidth="1.6"
                      className="arc-draw"
                      style={{ filter: 'drop-shadow(0 0 5px #ffc400)' }}
                    />
                  );
                })}

              {/* Pulsing Query Point */}
              {result && (
                <g>
                  <circle
                    cx={mapX(result.pca_projection.x)}
                    cy={mapY(result.pca_projection.y)}
                    r="8"
                    fill="none"
                    stroke="#ffc400"
                    strokeWidth="2"
                    className="radar-pulse"
                  />
                  <circle
                    cx={mapX(result.pca_projection.x)}
                    cy={mapY(result.pca_projection.y)}
                    r="6.5"
                    fill="#ffc400"
                    stroke="#07080c"
                    strokeWidth="2"
                  />
                  <text
                    x={mapX(result.pca_projection.x) + 12}
                    y={mapY(result.pca_projection.y) + 4}
                    fill="#ffc400"
                    fontSize="11"
                    fontFamily="IBM Plex Mono"
                    fontWeight="bold"
                  >
                    Query Input
                  </text>
                </g>
              )}

              {!result && (
                <text
                  x={svgW / 2}
                  y={svgH / 2}
                  textAnchor="middle"
                  fill="#5c6272"
                  fontSize="12"
                  fontFamily="IBM Plex Mono"
                >
                  Submit forensic attributes to project point
                </text>
              )}
            </svg>
          </div>

          {/* Results Dossier */}
          <div className="bg-dark-panel border-t-4 border-crime-tape border-x border-b border-dark-line rounded-lg p-5 shadow-xl">
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-crime-muted uppercase tracking-wider">
                      Optimal Modality Assignment
                    </div>
                    <div className="text-2xl font-display font-bold text-crime-tape">
                      {result.assigned_cluster.name}
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-crime-muted">
                    <span>PCA Coords: </span>
                    <span className="text-crime-text font-bold">
                      [{result.pca_projection.x}, {result.pca_projection.y}]
                    </span>
                  </div>
                </div>

                <p className="text-xs text-crime-subtext font-mono bg-dark-card border border-dark-line p-3 rounded">
                  {result.assigned_cluster.rationale}
                </p>

                {/* Top Matches Breakdown */}
                <div className="space-y-3 mt-4">
                  <div className="text-xs font-mono text-crime-muted uppercase tracking-wider">
                    Closest Documented Historical Cases
                  </div>

                  {result.top_historical_matches.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-dark-card border border-dark-line p-3.5 rounded space-y-2 hover:border-dark-lineLight transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs text-crime-tape font-bold mr-2">
                            {m.case_id}
                          </span>
                          <span className="font-display font-bold text-crime-text text-sm sm:text-base">
                            {m.case_name}
                          </span>
                        </div>
                        <span className="font-display font-bold text-lg text-crime-red">
                          {m.score_percentage}%
                        </span>
                      </div>

                      <div className="text-xs text-crime-muted font-mono flex items-center justify-between">
                        <span>{m.country} ({m.macro_region})</span>
                        <span>{m.active_decade}s era · {m.victims_proven} victims</span>
                      </div>

                      {/* Percentage Bar */}
                      <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-line">
                        <div
                          className="bg-gradient-to-r from-crime-red to-crime-tape h-full rounded-full transition-all duration-700"
                          style={{ width: `${m.score_percentage}%` }}
                        />
                      </div>

                      {/* Shared & Differing Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {m.shared_attributes.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" /> {tag}
                          </span>
                        ))}
                        {m.differing_attributes.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-dark-bg border border-dark-line text-crime-muted text-[10px] font-mono px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onSelectCaseDetail(m.case_id)}
                          className="text-xs font-mono text-crime-tape hover:underline flex items-center gap-1"
                        >
                          View Case Dossier <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-crime-muted font-mono text-xs">
                <Network className="w-8 h-8 text-crime-tape/40 mx-auto mb-2" />
                <div>AWAITING INPUT EXECUTION</div>
                <p className="text-[11px] text-crime-muted/60 mt-1 max-w-sm mx-auto">
                  Configure the forensic characteristics on the left to compute weighted similarity
                  against all 492 documented historical records.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

