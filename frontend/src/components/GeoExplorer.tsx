import React, { useState } from 'react';
import { Globe, MapPin, Users, Crosshair, Flame, ShieldAlert, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { GeoSummary } from '../types';

interface GeoExplorerProps {
  geoSummary: GeoSummary;
  onSelectCase: (caseId: string) => void;
}

export const GeoExplorer: React.FC<GeoExplorerProps> = ({ geoSummary, onSelectCase }) => {
  const [viewMode, setViewMode] = useState<'methods' | 'demographics' | 'density'>('methods');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [selectedDemographic, setSelectedDemographic] = useState<string>('All');
  const [hoveredMarker, setHoveredMarker] = useState<any | null>(null);

  // SVG world equirectangular projection mapping (-180..180, -90..90) to (920x480)
  const mapWidth = 920;
  const mapHeight = 480;

  const projectLon = (lon: number) => ((lon + 180) / 360) * mapWidth;
  const projectLat = (lat: number) => ((90 - lat) / 180) * mapHeight;

  // Filter markers based on selected controls
  const filteredMarkers = geoSummary.markers.filter((m) => {
    if (selectedRegion !== 'All' && m.macro_region !== selectedRegion) return false;
    if (selectedMethod !== 'All' && m.method_category !== selectedMethod) return false;
    if (selectedDemographic !== 'All' && m.victim_demographic !== selectedDemographic) return false;
    return true;
  });

  const methodColors: Record<string, string> = {
    'Strangulation / Asphyxiation': '#ff4d5e',
    'Poisoning / Medical': '#2ee6d0',
    'Firearm': '#ffc400',
    'Stabbing / Sharp Instrument': '#b57bff',
    'Blunt Force / Beating': '#f97316',
    'Arson / Fire': '#ef4444',
    'Mixed / Forensic Unspecified': '#71717a',
  };

  const demographicColors: Record<string, string> = {
    'Children / Minors': '#ef4444',
    'Medical Patients': '#2ee6d0',
    'Young Adults / Students': '#ffc400',
    'Elderly / Vulnerable': '#b57bff',
    'Travellers / Hitchhikers': '#3b82f6',
    'Sex Workers / Vulnerable Adults': '#f43f5e',
    'Household / Family Members': '#10b981',
    'General / Mixed Demographics': '#94a3b8',
  };

  const getMarkerColor = (m: any) => {
    if (viewMode === 'methods') {
      return methodColors[m.method_category] || '#ff4d5e';
    } else if (viewMode === 'demographics') {
      return demographicColors[m.victim_demographic] || '#ffc400';
    } else {
      // Density mode: gradient by victim count
      const v = m.victims_proven || 0;
      if (v >= 30) return '#e11d2e';
      if (v >= 15) return '#f59e0b';
      if (v >= 8) return '#10b981';
      return '#3b82f6';
    }
  };

  const getMarkerRadius = (m: any) => {
    const v = m.victims_proven || 1;
    if (viewMode === 'density') {
      return Math.min(18, Math.max(4, Math.sqrt(v) * 2.2));
    }
    return 4.2;
  };

  return (
    <div className="space-y-6">
      {/* View Mode Switcher Header */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-crime-tape/10 border border-crime-tape/30 text-[11px] font-mono text-crime-tape mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL FORENSIC GEOGRAPHY & VULNERABILITY MAPPING</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-crime-text">
              Where Murders Occurred & Which Demographic Groups Were Most Harmed
            </h3>
            <p className="text-xs text-crime-muted font-mono mt-0.5">
              Interactive global heat analysis: switch between dominant forensic methods, targeted population profiles, and casualty density.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-dark-card border border-dark-line p-1.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setViewMode('methods')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === 'methods'
                  ? 'bg-crime-red text-white font-bold shadow-md shadow-crime-redGlow'
                  : 'text-crime-muted hover:text-white'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Murder Methods</span>
            </button>
            <button
              onClick={() => setViewMode('demographics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === 'demographics'
                  ? 'bg-crime-tape text-black font-bold shadow-md shadow-crime-tapeGlow'
                  : 'text-crime-muted hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>People Most Harmed</span>
            </button>
            <button
              onClick={() => setViewMode('density')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === 'density'
                  ? 'bg-crime-cyan text-black font-bold shadow-md'
                  : 'text-crime-muted hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Casualty Heat Density</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-dark-line text-xs font-mono">
          <div>
            <label className="block text-crime-muted text-[11px] mb-1">Filter Macro-Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-dark-card border border-dark-line rounded p-2 text-crime-text focus:border-crime-tape"
            >
              <option value="All">All Regions ({geoSummary.total_mapped_cases})</option>
              {Object.entries(geoSummary.region_counts).map(([r, cnt]) => (
                <option key={r} value={r}>
                  {r} ({cnt} cases)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-crime-muted text-[11px] mb-1">Filter Specific Method:</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full bg-dark-card border border-dark-line rounded p-2 text-crime-text focus:border-crime-tape"
            >
              <option value="All">All Murder Methods</option>
              {Object.keys(methodColors).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-crime-muted text-[11px] mb-1">Filter Victim Demographic:</label>
            <select
              value={selectedDemographic}
              onChange={(e) => setSelectedDemographic(e.target.value)}
              className="w-full bg-dark-card border border-dark-line rounded p-2 text-crime-text focus:border-crime-tape"
            >
              <option value="All">All Target Demographics</option>
              {Object.keys(demographicColors).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* World Geographic Hotspot Map */}
        <div className="lg:col-span-8 bg-dark-panel border border-dark-line rounded-lg p-4 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 font-mono text-xs text-crime-muted">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-crime-red" />
                <span>
                  {viewMode === 'methods' && 'Forensic Murder Method Modalities'}
                  {viewMode === 'demographics' && 'Targeted Demographic Populations'}
                  {viewMode === 'density' && 'Documented Casualty Concentration (Victims Harmed)'}
                </span>
              </span>
              <span className="text-crime-tape font-bold">
                {filteredMarkers.length} Cases Displayed
              </span>
            </div>

            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto bg-[#07090e] rounded border border-dark-line select-none"
            >
              <defs>
                <filter id="heatGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
              </defs>

              {/* Geographic Graticule Grid */}
              {[-120, -60, 0, 60, 120].map((lon) => (
                <line
                  key={`lon-${lon}`}
                  x1={projectLon(lon)}
                  y1={0}
                  x2={projectLon(lon)}
                  y2={mapHeight}
                  stroke="#141926"
                  strokeWidth="1"
                />
              ))}
              {[-60, -30, 0, 30, 60].map((lat) => (
                <line
                  key={`lat-${lat}`}
                  x1={0}
                  y1={projectLat(lat)}
                  x2={mapWidth}
                  y2={projectLat(lat)}
                  stroke="#141926"
                  strokeWidth="1"
                />
              ))}

              {/* Continents Polygons */}
              <path
                d="M 120 120 Q 220 140 260 210 Q 230 260 170 230 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />
              <path
                d="M 230 250 Q 290 280 270 390 Q 220 380 230 250 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />
              <path
                d="M 430 110 Q 520 110 500 200 Q 420 180 430 110 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />
              <path
                d="M 430 210 Q 520 230 490 360 Q 420 310 430 210 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />
              <path
                d="M 520 100 Q 750 110 740 250 Q 580 240 520 100 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />
              <path
                d="M 690 320 Q 800 320 780 410 Q 690 390 690 320 Z"
                fill="#0f1422"
                stroke="#1c2438"
                strokeWidth="1"
              />

              {/* Incident Pins & Heat Bubbles */}
              {filteredMarkers.map((m) => {
                const cx = projectLon(m.longitude);
                const cy = projectLat(m.latitude);
                const color = getMarkerColor(m);
                const r = getMarkerRadius(m);

                return (
                  <g key={m.case_id}>
                    {/* Pulsing Heat Halo if density mode and high victim count */}
                    {viewMode === 'density' && (m.victims_proven || 0) >= 15 && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r * 1.8}
                        fill={color}
                        opacity="0.25"
                        filter="url(#heatGlow)"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={color}
                      stroke="#07080c"
                      strokeWidth={viewMode === 'density' ? '1.5' : '1'}
                      className="cursor-pointer transition-transform hover:scale-150 duration-150"
                      onClick={() => onSelectCase(m.case_id)}
                      onMouseEnter={() => setHoveredMarker(m)}
                      onMouseLeave={() => setHoveredMarker(null)}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Floating Marker Tooltip */}
          {hoveredMarker && (
            <div className="absolute bottom-5 left-6 bg-black/95 border-l-4 border-crime-tape border-y border-r border-dark-line p-3.5 rounded text-xs font-mono z-30 shadow-2xl pointer-events-none max-w-sm">
              <div className="text-crime-tape font-bold text-sm">{hoveredMarker.case_name}</div>
              <div className="text-crime-subtext mt-0.5">
                {hoveredMarker.country} · {hoveredMarker.macro_region} · {hoveredMarker.active_decade}s era
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-dark-line text-[11px]">
                <div>
                  <span className="text-crime-muted">Method: </span>
                  <strong className="text-crime-text">{hoveredMarker.method_category}</strong>
                </div>
                <div>
                  <span className="text-crime-muted">Targeted: </span>
                  <strong className="text-crime-text">{hoveredMarker.victim_demographic || 'General'}</strong>
                </div>
                <div className="col-span-2 text-crime-red font-bold">
                  Documented Victims Harmed: {hoveredMarker.victims_proven}
                </div>
              </div>
            </div>
          )}

          {/* Active Legend Bar */}
          <div className="mt-4 pt-3 border-t border-dark-line flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-crime-muted">Legend:</span>
            {viewMode === 'methods' &&
              Object.entries(methodColors).map(([m, col]) => (
                <span key={m} className="flex items-center gap-1.5 text-crime-subtext">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                  <span className="truncate max-w-[140px]">{m}</span>
                </span>
              ))}
            {viewMode === 'demographics' &&
              Object.entries(demographicColors).map(([v, col]) => (
                <span key={v} className="flex items-center gap-1.5 text-crime-subtext">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                  <span className="truncate max-w-[150px]">{v}</span>
                </span>
              ))}
            {viewMode === 'density' && (
              <div className="flex items-center gap-4 text-crime-subtext">
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#e11d2e]" /> Extreme (30+ Victims)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b]" /> High (15–29 Victims)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#10b981]" /> Moderate (8–14 Victims)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Standard (1–7 Victims)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Forensic Vulnerability Dossier Side Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Top Methods Breakdown */}
          <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl">
            <h4 className="font-display font-bold text-base text-crime-text flex items-center gap-2 mb-1">
              <Crosshair className="w-4 h-4 text-crime-red" />
              <span>Most Common Murder Methods</span>
            </h4>
            <p className="text-[11px] text-crime-muted font-mono mb-3">
              Total historical casualty tallies per modality.
            </p>

            <div className="space-y-2 text-xs font-mono">
              {(geoSummary.method_hotspots || []).slice(0, 5).map((m, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-line p-2.5 rounded flex items-center justify-between"
                >
                  <div className="truncate max-w-[170px]">
                    <div className="font-semibold text-crime-text truncate">{m.method_category}</div>
                    <div className="text-[10px] text-crime-muted">{m.case_count} documented cases</div>
                  </div>
                  <div className="text-right">
                    <span className="text-crime-red font-bold text-sm">{m.total_victims}</span>
                    <div className="text-[10px] text-crime-muted">victims</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* People Most Harmed Breakdown */}
          <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl">
            <h4 className="font-display font-bold text-base text-crime-text flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-crime-tape" />
              <span>Demographic Profiles Most Harmed</span>
            </h4>
            <p className="text-[11px] text-crime-muted font-mono mb-3">
              Target demographics with highest casualty impact.
            </p>

            <div className="space-y-2 text-xs font-mono">
              {(geoSummary.demographic_hotspots || []).slice(0, 5).map((v, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-line p-2.5 rounded flex items-center justify-between"
                >
                  <div className="truncate max-w-[170px]">
                    <div className="font-semibold text-crime-text truncate">{v.victim_demographic}</div>
                    <div className="text-[10px] text-crime-muted">{v.case_count} series</div>
                  </div>
                  <div className="text-right">
                    <span className="text-crime-tape font-bold text-sm">{v.total_victims}</span>
                    <div className="text-[10px] text-crime-muted">victims</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Vulnerability Summary */}
          {geoSummary.regional_vulnerability && (
            <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl">
              <h4 className="font-display font-bold text-base text-crime-cyan flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4" />
                <span>Regional Vulnerability Profiles</span>
              </h4>
              <p className="text-[11px] text-crime-muted font-mono mb-3">
                Prevalent murder modality & targeted group by continent.
              </p>

              <div className="space-y-2 text-xs font-mono max-h-52 overflow-y-auto pr-1">
                {Object.entries(geoSummary.regional_vulnerability).map(([reg, val]: any) => (
                  <div key={reg} className="bg-dark-card border border-dark-line p-2.5 rounded">
                    <div className="flex justify-between items-center text-crime-text font-bold">
                      <span>{reg}</span>
                      <span className="text-crime-red">{val.total_victims} victims</span>
                    </div>
                    <div className="text-[11px] text-crime-muted mt-1 space-y-0.5">
                      <div>Top Method: <strong className="text-crime-subtext">{val.dominant_method}</strong></div>
                      <div>Most Harmed: <strong className="text-crime-tape">{val.most_targeted_demographic}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
