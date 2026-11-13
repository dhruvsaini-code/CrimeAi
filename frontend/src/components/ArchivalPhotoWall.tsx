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
  offsetClass: string;
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
    offsetClass: '-rotate-2 lg:translate-y-2',
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
    offsetClass: 'rotate-1 lg:-translate-y-3',
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
    offsetClass: '-rotate-1 lg:translate-y-4',
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
    offsetClass: 'rotate-2 lg:-translate-y-1',
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
    offsetClass: '-rotate-2 lg:translate-y-3',
    label: 'HISTORICAL ARCHIVE',
  },
];

export const ArchivalPhotoWall: React.FC = () => {
  return (
    <div className="relative w-full rounded-sm overflow-hidden border border-[#242220] bg-[#08080a] shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-5 sm:p-8">
      {/* 1. Investigation Room Photographic Backdrop + Film Grain */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
        <img
          src="/assets/evidence_room_1.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#070607]/75 to-[#050505]/95" />
        <div className="absolute inset-0 film-grain opacity-70" />
      </div>

      {/* 2. Red Evidence Connecting Strings SVG Overlay */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1200 460"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 140 155 Q 260 220 380 140 T 610 175 T 840 150 T 1060 165"
          stroke="#7f1d1d"
          strokeWidth="1.3"
          className="opacity-80"
        />
        <path
          d="M 140 155 Q 400 295 840 150"
          stroke="#5c0f0f"
          strokeWidth="1.1"
          strokeDasharray="6 4"
          className="opacity-65"
        />
        <path
          d="M 380 140 Q 620 265 1060 165"
          stroke="#8B0000"
          strokeWidth="1.1"
          className="opacity-60"
        />
      </svg>

      {/* 3. Section Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 mb-7 pb-4 border-b border-[#242220]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[#141312] border border-[#302c28] flex items-center justify-center text-[#b91c1c]">
            <FolderArchive className="w-4 h-4" />
          </div>
          <div>
            <div className="font-oswald font-semibold text-xl sm:text-2xl text-[#ededed] uppercase tracking-wide flex flex-wrap items-center gap-2.5">
              Archival Evidence Wall
              <span className="text-[10px] font-typewriter uppercase bg-[#1a1514] text-[#d1d5db] border border-[#3a2826] px-2 py-0.5 rounded-sm">
                Public Domain Records
              </span>
            </div>
            <div className="text-xs font-sans text-[#9ca3af]">
              Genuine historical law enforcement identification photographs (1895 – 1991)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-typewriter text-[#d1d5db] bg-[#111012]/90 px-3 py-1.5 rounded-sm border border-[#2a2726]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#b91c1c] shrink-0" />
          <span>Decorative Historical Reference · Separate from Corpus Clustering</span>
        </div>
      </div>

      {/* 4. Pinned Vintage Mugshot Cards (Asymmetric & Distressed Paper Borders) */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 py-2">
        {HISTORICAL_ARCHIVE_CARDS.map((card) => (
          <div
            key={card.id}
            className={`group relative archival-photo p-3 rounded-sm transition-all duration-300 hover:border-[#7f1d1d] hover:rotate-0 ${card.offsetClass}`}
          >
            {/* Red Pushpin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 evidence-pin z-30" />

            {/* Top Stamp in Special Elite Typewriter Font */}
            <div className="flex items-center justify-between text-[10px] font-typewriter mb-2 text-[#a1a1aa]">
              <span className="text-[#dc2626] uppercase">{card.label}</span>
              <span className="text-[#71717a]">{card.archiveCode}</span>
            </div>

            {/* Vintage Black-and-White Photographic Print */}
            <div className="relative h-56 w-full overflow-hidden border border-[#2c2925] bg-[#0a0a0c] mb-3 shadow-inner">
              <img
                src={card.imageSrc}
                alt={`${card.name} historical archive photograph`}
                loading="lazy"
                className={`w-full h-full filter grayscale contrast-125 brightness-95 group-hover:contrast-150 transition-all duration-500 ${card.imageClass}`}
              />

              {/* Subtle Paper Grain & Natural Darkroom Vignette */}
              <div className="absolute inset-0 pointer-events-none film-grain opacity-45" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.85)]" />

              {/* Bottom Booking Strip */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between items-center text-[9px] font-typewriter text-[#e5e7eb] bg-black/80 px-2 py-1 border border-white/10">
                <span className="truncate">{card.bookingJurisdiction}</span>
                <Fingerprint className="w-3 h-3 text-[#b91c1c] shrink-0 ml-1" />
              </div>
            </div>

            {/* Archival Caption */}
            <div className="space-y-0.5">
              <div className="font-oswald font-semibold text-base text-[#f3f4f6] uppercase tracking-tight group-hover:text-[#ef4444] transition-colors truncate">
                {card.name}
              </div>
              <div className="flex justify-between text-[11px] font-sans text-[#9ca3af]">
                <span>Documented Span:</span>
                <span className="text-[#e5e7eb] font-medium">{card.years}</span>
              </div>
              <div className="text-[10px] font-typewriter text-[#71717a] truncate pt-0.5" title={card.provenance}>
                {card.provenance}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Footer Attribution */}
      <div className="relative z-20 mt-7 pt-3 border-t border-[#242220] flex flex-wrap items-center justify-between text-[11px] font-typewriter text-[#9ca3af] gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#991b1b]" />
          <span>
            Photographs sourced from public-domain historical archives (Wikimedia Commons / Law Enforcement Records).
          </span>
        </div>
        <div className="text-[#71717a]">
          Strictly Educational · Non-Predictive Archival System
        </div>
      </div>
    </div>
  );
};
