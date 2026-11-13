import React from 'react';
import { ShieldAlert, FileText, Fingerprint, FolderArchive } from 'lucide-react';

interface EvidenceCard {
  id: string;
  name: string;
  years: string;
  archiveCode: string;
  bookingJurisdiction: string;
  provenance: string;
  imageSrc: string;
  imageClass?: string;
  rotation: string;
  label: 'HISTORICAL ARCHIVE' | 'CASE FILE' | 'DOCUMENTED RECORD' | 'FORENSIC REFERENCE';
}

const HISTORICAL_ARCHIVE_CARDS: EvidenceCard[] = [
  {
    id: 'bundy',
    name: 'Theodore R. Bundy',
    years: '1974 – 1978',
    archiveCode: 'FL-DOC-363',
    bookingJurisdiction: 'Florida Photographic Collection',
    provenance: 'Wikimedia Commons · Public Domain',
    imageSrc: '/assets/mugshots/ted_bundy.jpg',
    imageClass: 'object-cover object-top',
    rotation: '-rotate-2',
    label: 'HISTORICAL ARCHIVE',
  },
  {
    id: 'dahmer',
    name: 'Jeffrey L. Dahmer',
    years: '1978 – 1991',
    archiveCode: 'MPD-BK-81413',
    bookingJurisdiction: 'Milwaukee Police Dept Booking',
    provenance: 'Public Law Enforcement Archive',
    imageSrc: '/assets/archival_evidence_wall.jpg',
    imageClass: 'object-cover object-[34%_78%] scale-125',
    rotation: 'rotate-1',
    label: 'CASE FILE',
  },
  {
    id: 'gacy',
    name: 'John Wayne Gacy',
    years: '1972 – 1978',
    archiveCode: 'CCSO-122178',
    bookingJurisdiction: 'Cook County Arrest (Dec 21, 1978)',
    provenance: 'Wikimedia Commons · Public Domain',
    imageSrc: '/assets/mugshots/john_wayne_gacy.jpg',
    imageClass: 'object-cover object-top',
    rotation: '-rotate-1',
    label: 'DOCUMENTED RECORD',
  },
  {
    id: 'ramirez',
    name: 'Richard R. Ramirez',
    years: '1984 – 1985',
    archiveCode: 'LAPD-CR-1984',
    bookingJurisdiction: 'California DOJ Booking Archive',
    provenance: 'Wikimedia Commons · Public Domain',
    imageSrc: '/assets/mugshots/richard_ramirez.jpg',
    imageClass: 'object-cover object-top',
    rotation: 'rotate-2',
    label: 'FORENSIC REFERENCE',
  },
  {
    id: 'holmes',
    name: 'H. H. Holmes',
    years: '1891 – 1894',
    archiveCode: 'PHL-1895-MUDGETT',
    bookingJurisdiction: 'Philadelphia Police Archive (1895)',
    provenance: 'Wikimedia Commons · 19th-Century Public Domain',
    imageSrc: '/assets/mugshots/hh_holmes.jpg',
    imageClass: 'object-cover object-top',
    rotation: '-rotate-2',
    label: 'HISTORICAL ARCHIVE',
  },
];

export const ArchivalPhotoWall: React.FC = () => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#2a1315] bg-[#070709] shadow-2xl p-5 sm:p-8">
      {/* 1. Dark Investigation Room Atmospheric Backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <img
          src="/assets/evidence_room_1.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#080506]/85 to-[#050505]/95" />
        {/* Subtle dark blood-red ambient spotlight */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[120px]" />
      </div>

      {/* 2. Red Connecting Evidence Strings SVG Overlay */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1200 440"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 140 135 Q 260 205 380 145 T 610 155 T 840 140 T 1060 150"
          stroke="#990000"
          strokeWidth="1.4"
          className="opacity-65 drop-shadow-[0_0_5px_rgba(192,0,0,0.6)]"
        />
        <path
          d="M 140 135 Q 400 280 840 140"
          stroke="#700000"
          strokeWidth="1.1"
          strokeDasharray="5 4"
          className="opacity-50"
        />
        <path
          d="M 380 145 Q 590 270 1060 150"
          stroke="#8B0000"
          strokeWidth="1.2"
          className="opacity-55"
        />
      </svg>

      {/* 3. Section Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2a1315]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#14080a] border border-[#421318] flex items-center justify-center text-[#b30000]">
            <FolderArchive className="w-4 h-4" />
          </div>
          <div>
            <div className="font-gothic font-bold text-lg sm:text-xl text-[#e5e7eb] tracking-wider flex flex-wrap items-center gap-2">
              ARCHIVAL EVIDENCE WALL
              <span className="text-[10px] font-mono uppercase bg-[#1f090c] text-[#dc2626] border border-[#4a1318] px-2 py-0.5 rounded">
                Public Domain Records
              </span>
            </div>
            <div className="text-xs font-mono text-[#9ca3af]">
              Genuine Historical Law Enforcement Identification Photographs (1895 – 1991)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#9ca3af] bg-[#0e0f14] px-3 py-1.5 rounded border border-[#2a1518]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C00000] shrink-0" />
          <span>Decorative Historical Reference Only — Separate from Corpus Clustering</span>
        </div>
      </div>

      {/* 4. Pinned Vintage Mugshot Cards Grid */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {HISTORICAL_ARCHIVE_CARDS.map((card) => (
          <div
            key={card.id}
            className={`group relative bg-[#0c0c10] border border-[#2a181b] rounded p-3 transition-all duration-300 hover:border-[#8B0000] hover:shadow-[0_10px_28px_rgba(139,0,0,0.3)] hover:rotate-0 ${card.rotation}`}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 evidence-pin z-30" />

            {/* Top Stamp */}
            <div className="flex items-center justify-between text-[9px] font-mono mb-2 text-[#9ca3af]">
              <span className="text-[#b91c1c] tracking-wider uppercase font-semibold">
                {card.label}
              </span>
              <span className="text-[#6b7280]">{card.archiveCode}</span>
            </div>

            {/* Vintage Distressed Mugshot Frame */}
            <div className="relative h-52 w-full rounded-sm overflow-hidden border border-[#2e1b1e] bg-[#050506] mb-3 shadow-inner">
              <img
                src={card.imageSrc}
                alt={`${card.name} historical archive photograph`}
                loading="lazy"
                className={`w-full h-full filter grayscale contrast-125 brightness-90 group-hover:contrast-150 transition-all duration-500 ${card.imageClass}`}
              />

              {/* Subtle Dark Red Lighting & Film Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3b0000]/40 via-transparent to-black/50 mix-blend-multiply" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.85)]" />

              {/* Bottom Booking Tag */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between items-center text-[9px] font-mono text-[#d1d5db] bg-black/80 px-2 py-1 rounded-sm border border-white/10">
                <span className="truncate">{card.bookingJurisdiction}</span>
                <Fingerprint className="w-3 h-3 text-[#b91c1c] shrink-0 ml-1" />
              </div>
            </div>

            {/* Archival Caption */}
            <div className="space-y-0.5 font-mono text-xs">
              <div className="font-gothic font-bold text-sm text-[#e5e7eb] group-hover:text-[#ef4444] transition-colors truncate">
                {card.name}
              </div>
              <div className="flex justify-between text-[10px] text-[#9ca3af]">
                <span>Documented Span:</span>
                <span className="text-[#d1d5db] font-semibold">{card.years}</span>
              </div>
              <div className="text-[9px] text-[#6b7280] truncate" title={card.provenance}>
                {card.provenance}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Footer Attribution */}
      <div className="relative z-20 mt-6 pt-3 border-t border-[#241315] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#9ca3af] gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#991b1b]" />
          <span>
            Photographs sourced from public-domain historical archives (Wikimedia Commons / Law Enforcement Records).
          </span>
        </div>
        <div className="text-[#6b7280]">
          Strictly Educational · Non-Predictive Archival System
        </div>
      </div>
    </div>
  );
};
