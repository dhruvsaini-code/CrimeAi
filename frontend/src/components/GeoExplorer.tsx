import React, { useState } from 'react';
import { Globe, MapPin, Eye } from 'lucide-react';

interface GeoExplorerProps {
  geoSummary: {
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
  };
  onSelectCase: (caseId: string) => void;
}

export const GeoExplorer: React.FC<GeoExplorerProps> = ({ geoSummary, onSelectCase }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [hoveredMarker, setHoveredMarker] = useState<any | null>(null);

  // SVG world equirectangular projection mapping (-180..180, -90..90) to (900x480)
  const mapWidth = 900;
  const mapHeight = 480;

  const projectLon = (lon: number) => ((lon + 180) / 360) * mapWidth;
  const projectLat = (lat: number) => ((90 - lat) / 180) * mapHeight;

  const filteredMarkers =
    selectedRegion === 'All'
      ? geoSummary.markers
      : geoSummary.markers.filter((m) => m.macro_region === selectedRegion);

  const regionColors: Record<string, string> = {
    'North America': '#ff4d5e',
    Europe: '#2ee6d0',
    Asia: '#b57bff',
    'South America': '#5bb8ff',
    Africa: '#ffc400',
    Oceania: '#34d399',
  };

  return (
    <div className="space-y-6">
      {/* Top Region Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-dark-panel border border-dark-line p-3.5 rounded-lg">
        <div className="flex items-center gap-2 font-mono text-xs text-crime-muted">
          <Globe className="w-4 h-4 text-crime-cyan" />
          <span>Macro-Region Distribution:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedRegion('All')}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
              selectedRegion === 'All'
                ? 'bg-crime-cyan text-black font-bold'
                : 'bg-dark-card text-crime-muted hover:text-white border border-dark-line'
            }`}
          >
            All ({geoSummary.total_mapped_cases})
          </button>
          {Object.entries(geoSummary.region_counts).map(([reg, cnt]) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                selectedRegion === reg
                  ? 'bg-crime-cyan text-black font-bold'
                  : 'bg-dark-card text-crime-muted hover:text-white border border-dark-line'
              }`}
            >
              {reg} ({cnt})
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Top Countries Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* World Coordinates SVG Map */}
        <div className="lg:col-span-8 bg-dark-panel border border-dark-line rounded-lg p-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 font-mono text-xs text-crime-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-crime-red" /> Documented Global Incident Coordinates
            </span>
            <span>Displaying {filteredMarkers.length} Cases</span>
          </div>

          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="w-full h-auto bg-[#0a0c12] rounded border border-dark-line"
          >
            {/* World Graticule Lines */}
            {[-120, -60, 0, 60, 120].map((lon) => (
              <line
                key={`lon-${lon}`}
                x1={projectLon(lon)}
                y1={0}
                x2={projectLon(lon)}
                y2={mapHeight}
                stroke="#161b28"
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
                stroke="#161b28"
                strokeWidth="1"
              />
            ))}

            {/* Approximate Continental Outlines (Abstracted Geometry) */}
            <path
              d="M 120 120 Q 220 140 260 210 Q 230 260 170 230 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />
            <path
              d="M 230 250 Q 290 280 270 390 Q 220 380 230 250 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />
            <path
              d="M 430 110 Q 520 110 500 200 Q 420 180 430 110 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />
            <path
              d="M 430 210 Q 520 230 490 360 Q 420 310 430 210 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />
            <path
              d="M 520 100 Q 750 110 740 250 Q 580 240 520 100 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />
            <path
              d="M 690 320 Q 800 320 780 410 Q 690 390 690 320 Z"
              fill="#111622"
              stroke="#1f2638"
              strokeWidth="1"
            />

            {/* Incident Pins */}
            {filteredMarkers.map((m) => {
              const cx = projectLon(m.longitude);
              const cy = projectLat(m.latitude);
              const color = regionColors[m.macro_region] || '#ff4d5e';

              return (
                <circle
                  key={m.case_id}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill={color}
                  stroke="#07080c"
                  strokeWidth="1"
                  className="cursor-pointer transition-all hover:scale-150 duration-150"
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                  onClick={() => onSelectCase(m.case_id)}
                  onMouseEnter={() => setHoveredMarker(m)}
                  onMouseLeave={() => setHoveredMarker(null)}
                />
              );
            })}
          </svg>

          {/* Floating Marker Tooltip */}
          {hoveredMarker && (
            <div className="absolute bottom-4 left-4 bg-black/95 border border-crime-tape p-3 rounded text-xs font-mono z-20 shadow-2xl pointer-events-none">
              <div className="text-crime-tape font-bold">{hoveredMarker.case_name}</div>
              <div className="text-crime-subtext">
                {hoveredMarker.country} · {hoveredMarker.macro_region} · {hoveredMarker.active_decade}s
              </div>
              <div className="text-crime-muted text-[11px] mt-0.5">
                {hoveredMarker.method_category} · {hoveredMarker.victims_proven} victims
              </div>
            </div>
          )}
        </div>

        {/* Top Sovereign Jurisdictions Table */}
        <div className="lg:col-span-4 bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-lg text-crime-text tracking-wide mb-1">
              Top Country Jurisdictions
            </h4>
            <p className="text-xs text-crime-muted font-mono mb-4">
              Historical case volume and documented victim tallies.
            </p>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {geoSummary.top_countries.slice(0, 12).map((c, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-line p-2.5 rounded flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-mono text-crime-text font-semibold">{c.country}</div>
                    <div className="text-[10px] text-crime-muted font-mono">{c.macro_region}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-crime-tape font-bold">{c.case_count} cases</div>
                    <div className="text-[10px] text-crime-muted">{c.total_victims} victims</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-line text-[11px] text-crime-muted font-mono">
            Geographic granularity reflects sovereign borders at archival publication.
          </div>
        </div>
      </div>
    </div>
  );
};

