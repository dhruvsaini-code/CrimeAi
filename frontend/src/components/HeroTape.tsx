import React from 'react';

export const HeroTape: React.FC = () => {
  const message =
    'DOCUMENTED HISTORICAL CASES ONLY  ///  NO LIVING PERSON PROFILING  ///  UNSUPERVISED AI DISCOVERY  ///  PUBLIC PROVENANCE CITED  ///  EDUCATIONAL & RESEARCH USE ONLY  ///  ';

  return (
    <div className="relative z-20 bg-crime-tape text-black font-display font-semibold text-sm tracking-widest py-2 transform -rotate-1 shadow-lg shadow-crime-tapeGlow border-y-2 border-black overflow-hidden select-none">
      <div className="whitespace-nowrap animate-marquee flex">
        <span>{message.repeat(6)}</span>
        <span>{message.repeat(6)}</span>
      </div>
    </div>
  );
};

