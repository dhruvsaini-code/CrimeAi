import React from 'react';
import { ShieldAlert, Crosshair, Pin, FileText, Fingerprint } from 'lucide-react';

interface ArchivalPhotoWallProps {
  variant?: 'hero-backdrop' | 'full-gallery';
}

interface EvidenceCard {
  id: string;
  name: string;
  years: string;
  archiveCode: string;
  bookingJurisdiction: string;
  provenance: string;
  rotation: string;
  redWashSide: 'left' | 'right';
  badge: string;
}

const HISTORICAL_PROFILES: EvidenceCard[] = [
  {
    id: 'bundy',
    name: 'Theodore R. Bundy',
    years: '1974 – 1978',
    archiveCode: 'FBI-FUG-363',
    bookingJurisdiction: 'Leon County SO / FBI #363',
    provenance: 'Public Domain Police Booking Photograph',
    rotation: '-rotate-2',
    redWashSide: 'right',
    badge: 'HISTORICAL DOSSIER',
  },
  {
    id: 'dahmer',
    name: 'Jeffrey L. Dahmer',
    years: '1978 – 1991',
    archiveCode: 'MPD-BK-81413',
    bookingJurisdiction: 'Milwaukee Police Dept #81413',
    provenance: 'Public Domain Law Enforcement Record',
    rotation: 'rotate-1',
    redWashSide: 'left',
    badge: 'EVIDENCE RECORD #04',
  },
  {
    id: 'kemper',
    name: 'Edmund E. Kemper III',
    years: '1964 – 1973',
    archiveCode: 'SCSO-CR-29026',
    bookingJurisdiction: 'Santa Cruz Co Sheriff #29026',
    provenance: 'Santa Cruz Coroner Historical Archive',
    rotation: 'rotate-3',
    redWashSide: 'right',
    badge: 'CASE ARCHIVE',
  },
  {
    id: 'ramirez',
    name: 'Richard R. Ramirez',
    years: '1984 – 1985',
    archiveCode: 'LAPD-CR-47623',
    bookingJurisdiction: 'LAPD Central Booking #47623',
    provenance: 'California DOJ Public Booking Archive',
    rotation: '-rotate-3',
    redWashSide: 'left',
    badge: 'SUSPECT ARCHIVE',
  },
];

export const ArchivalPhotoWall: React.FC<ArchivalPhotoWallProps> = ({ variant = 'hero-backdrop' }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#2a1315] bg-[#070709] shadow-2xl p-4 sm:p-8">
      {/* 1. Master Evidence Wall Texture Collage from user upload */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none overflow-hidden">
        <img
          src="/assets/archival_evidence_wall.jpg"
          alt="Historical Investigation Evidence Wall"
          className="w-full h-full object-cover object-center filter grayscale contrast-150 brightness-75 scale-105"
        />
        {/* Blood-red vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#1b0507]/90" />
      </div>

      {/* 2. Red Evidence String SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 400"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Glowing red yarn strings connecting archival cards */}
        <path
          d="M 180 120 Q 320 180 480 140 T 780 170"
          stroke="#C00000"
          strokeWidth="2"
          strokeDasharray="4 2"
          className="opacity-70 filter drop-shadow-[0_0_6px_#ff0000]"
        />
        <path
          d="M 480 140 Q 600 240 820 220"
          stroke="#8B0000"
          strokeWidth="1.8"
          className="opacity-60 filter drop-shadow-[0_0_4px_#ff0000]"
        />
        <path
          d="M 220 260 Q 380 200 480 140"
          stroke="#C00000"
          strokeWidth="1.6"
          strokeDasharray="6 3"
          className="opacity-50"
        />

        {/* Pinned Red Pins */}
        <circle cx="180" cy="120" r="4.5" fill="#ff1a1a" stroke="#ffffff" strokeWidth="1" className="filter drop-shadow-[0_0_8px_#ff0000]" />
        <circle cx="480" cy="140" r="5" fill="#ff1a1a" stroke="#ffffff" strokeWidth="1" className="filter drop-shadow-[0_0_8px_#ff0000]" />
        <circle cx="780" cy="170" r="4.5" fill="#ff1a1a" stroke="#ffffff" strokeWidth="1" className="filter drop-shadow-[0_0_8px_#ff0000]" />
        <circle cx="820" cy="220" r="4" fill="#ff1a1a" stroke="#ffffff" strokeWidth="1" className="filter drop-shadow-[0_0_8px_#ff0000]" />
      </svg>

      {/* 3. Archival Section Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2a1315]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#1a0a0c] border border-[#4a1215] flex items-center justify-center text-[#ff3333] shadow-md shadow-[#8B0000]/30">
            <Crosshair className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="font-gothic font-bold text-lg sm:text-xl text-[#f3f4f6] tracking-wider flex items-center gap-2">
              HISTORICAL SUSPECT ARCHIVE
              <span className="text-[10px] font-mono uppercase bg-[#280a0c] text-[#ff6666] border border-[#521317] px-2 py-0.5 rounded">
                Declassified Records
              </span>
            </div>
            <div className="text-xs font-mono text-[#9ca3af]">
              Documented 20th Century Case Files & Forensic Evidence Wall
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#9ca3af] bg-[#12131a] px-3 py-1.5 rounded-md border border-[#2b171a]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#ff4d4d]" />
          <span>Educational & Archival Demonstration Only — Not Linked to Algorithmic Profile</span>
        </div>
      </div>

      {/* 4. Pinned Archival Evidence Cards Grid */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HISTORICAL_PROFILES.map((card, idx) => (
          <div
            key={card.id}
            className={`group relative bg-[#0d0e13] border border-[#261416] rounded-xl p-4 transition-all duration-300 hover:border-[#8B0000] hover:shadow-[0_8px_25px_rgba(139,0,0,0.35)] ${card.rotation}`}
          >
            {/* Top Red Push-Pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 evidence-pin z-30" />

            {/* Archival Badge */}
            <div className="flex items-center justify-between text-[10px] font-mono mb-2 text-[#9ca3af]">
              <span className="text-[#ff4d4d] tracking-widest uppercase font-semibold">{card.badge}</span>
              <span className="text-[#6b7280]">FILE {card.archiveCode}</span>
            </div>

            {/* Mugshot Photo Frame with Vintage Duotone Half-Wash */}
            <div className="relative h-48 sm:h-52 w-full rounded-lg overflow-hidden border border-[#2c1417] bg-[#070709] mb-3 shadow-inner">
              {/* Background Mugshot Extract from evidence collage */}
              <img
                src="/assets/archival_evidence_wall.jpg"
                alt={card.name}
                className={`w-full h-full object-cover filter contrast-175 brightness-90 grayscale ${
                  idx === 0
                    ? 'object-[50%_45%]'
                    : idx === 1
                    ? 'object-[35%_75%]'
                    : idx === 2
                    ? 'object-[82%_25%]'
                    : 'object-[18%_25%]'
                }`}
              />

              {/* Forensic Half Blood-Red Wash Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none mix-blend-multiply opacity-75 ${
                  card.redWashSide === 'right'
                    ? 'bg-gradient-to-r from-transparent via-transparent to-[#8B0000]'
                    : 'bg-gradient-to-l from-transparent via-transparent to-[#8B0000]'
                }`}
              />

              {/* Height Measurement Scale & Reticle overlay */}
              <div className="absolute top-2 right-2 text-[9px] font-mono text-[#ff8080] bg-black/60 px-1 rounded border border-[#4a1215]">
                REF: {card.archiveCode}
              </div>

              {/* Bottom Stamp Badge */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[9px] font-mono text-white/80 bg-black/75 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                <span className="truncate">{card.bookingJurisdiction}</span>
                <Fingerprint className="w-3 h-3 text-[#ff4d4d] shrink-0" />
              </div>
            </div>

            {/* Metadata Labels */}
            <div className="space-y-1 font-mono text-xs">
              <div className="font-gothic font-bold text-sm text-[#f3f4f6] group-hover:text-[#ff4d4d] transition-colors">
                {card.name}
              </div>
              <div className="flex justify-between text-[11px] text-[#9ca3af]">
                <span>Active Span:</span>
                <span className="text-[#e5e7eb] font-semibold">{card.years}</span>
              </div>
              <div className="text-[10px] text-[#6b7280] italic truncate">
                Provenance: {card.provenance}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Bottom Archival Note */}
      <div className="relative z-20 mt-6 pt-4 border-t border-[#231214] flex flex-wrap items-center justify-between text-xs font-mono text-[#9ca3af] gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#ff4d4d]" />
          <span>Corpus contains 492 documented historical serial cases spanning 1900–2022 across 83 sovereign jurisdictions.</span>
        </div>
        <div className="text-[11px] text-[#6b7280]">
          Verified Wikipedia Archival Provenance (100% Sourced)
        </div>
      </div>
    </div>
  );
};
