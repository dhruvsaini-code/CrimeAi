import React from 'react';
import { X, ExternalLink, Calendar, MapPin, Skull, Shield, Crosshair, Users } from 'lucide-react';
import { CaseItem } from '../types';

interface CaseDossierModalProps {
  caseItem: CaseItem | null;
  onClose: () => void;
}

export const CaseDossierModal: React.FC<CaseDossierModalProps> = ({ caseItem, onClose }) => {
  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm p-4 sm:p-6 transition-all">
      <div className="bg-dark-panel border-l-4 border-crime-red border-y border-r border-dark-line rounded-r-lg w-full max-w-xl h-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-dark-line">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-crime-tape bg-crime-tape/10 px-2 py-0.5 rounded border border-crime-tape/30">
                  {caseItem.case_id}
                </span>
                <span className="font-mono text-xs text-crime-muted bg-dark-card px-2 py-0.5 rounded border border-dark-line">
                  {caseItem.verification_status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-crime-text tracking-wide">
                {caseItem.case_name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-crime-muted hover:text-white hover:bg-dark-card border border-transparent hover:border-dark-line transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
            <div className="bg-dark-card border border-dark-line p-3 rounded">
              <div className="flex items-center gap-1.5 text-xs text-crime-muted mb-1 font-mono">
                <Skull className="w-3.5 h-3.5 text-crime-red" />
                Proven Victims
              </div>
              <div className="text-xl font-display font-bold text-crime-red">
                {caseItem.victims_proven}
              </div>
              <div className="text-[10px] text-crime-muted">
                Max Est: {caseItem.victims_max}
              </div>
            </div>

            <div className="bg-dark-card border border-dark-line p-3 rounded">
              <div className="flex items-center gap-1.5 text-xs text-crime-muted mb-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-crime-tape" />
                Active Era
              </div>
              <div className="text-xl font-display font-bold text-crime-text">
                {caseItem.active_start_year}–{caseItem.active_end_year}
              </div>
              <div className="text-[10px] text-crime-muted">
                {caseItem.duration_years} yr duration
              </div>
            </div>

            <div className="bg-dark-card border border-dark-line p-3 rounded col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-crime-muted mb-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-crime-cyan" />
                Region
              </div>
              <div className="text-base font-display font-bold text-crime-cyan truncate">
                {caseItem.macro_region}
              </div>
              <div className="text-[10px] text-crime-muted truncate">
                {caseItem.country}
              </div>
            </div>
          </div>

          {/* Attributes List */}
          <div className="space-y-3 my-4 text-xs">
            <div className="bg-dark-card/60 border border-dark-line p-3 rounded flex items-center justify-between">
              <span className="text-crime-muted flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-crime-red" /> Primary Method
              </span>
              <span className="font-medium text-crime-text">{caseItem.method_category}</span>
            </div>

            <div className="bg-dark-card/60 border border-dark-line p-3 rounded flex items-center justify-between">
              <span className="text-crime-muted flex items-center gap-1.5">
                <Users className="w-4 h-4 text-crime-tape" /> Target Profile
              </span>
              <span className="font-medium text-crime-text">{caseItem.victim_demographic}</span>
            </div>

            <div className="bg-dark-card/60 border border-dark-line p-3 rounded flex items-center justify-between">
              <span className="text-crime-muted flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-crime-purple" /> Site Type
              </span>
              <span className="font-medium text-crime-text">{caseItem.location_type}</span>
            </div>
          </div>

          {/* Neutral Historical Synopsis */}
          <div className="my-5">
            <div className="text-xs font-mono text-crime-muted uppercase tracking-wider mb-2">
              Historical Archival Summary
            </div>
            <p className="text-sm leading-relaxed text-crime-subtext bg-dark-card border border-dark-line p-4 rounded text-justify">
              {caseItem.summary}
            </p>
          </div>
        </div>

        {/* Footer with External Wikipedia Source Citation */}
        <div className="pt-4 border-t border-dark-line">
          <div className="flex items-center justify-between">
            <div className="text-xs text-crime-muted">
              Source:{' '}
              <span className="text-crime-text font-medium">{caseItem.source_title}</span>
            </div>
            <a
              href={caseItem.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-dark-card hover:bg-dark-cardHover border border-dark-line text-xs font-mono text-crime-tape hover:text-white transition-colors"
            >
              Wikipedia Archive <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

