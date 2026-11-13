import React from 'react';
import { FloatingSkeletons } from './FloatingSkeletons';

/**
 * Full-Viewport Multi-Layered Forensic Investigation Room Backdrop.
 * Combines dark evidence room photography, drifting crimson smoke,
 * film grain, floating dust, deep edge vignette, and large anatomical
 * skeleton silhouettes partially emerging from viewport edges.
 */
export const ForensicBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#040406]">
      {/* Layer 1: Dark Forensic Investigation Room Photograph */}
      <img
        src="/assets/evidence_room_1.jpg"
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.28] opacity-55 scale-105"
      />

      {/* Layer 2: Secondary Evidence Corkboard Texture Overlay */}
      <img
        src="/assets/evidence_board_dark.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-right mix-blend-lighten opacity-[0.14] filter grayscale contrast-150"
      />

      {/* Layer 3: Drifting Crimson Smoke from Edges */}
      <img
        src="/assets/crimson_smoke.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-16 -left-24 w-[650px] sm:w-[900px] h-auto mix-blend-screen opacity-[0.24] archival-drift"
        style={{ animationDuration: '28s' }}
      />
      <img
        src="/assets/crimson_smoke.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute -top-24 -right-24 w-[700px] h-auto mix-blend-screen opacity-[0.18] rotate-180 archival-drift"
        style={{ animationDuration: '34s', animationDelay: '-12s' }}
      />

      {/* Layer 4: Subtle Edge Crimson Illumination */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#5a0000]/15 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6b0000]/18 to-transparent" />

      {/* Layer 5: Giant Anatomical Skeletons Emerging on Left & Right Edges */}
      <FloatingSkeletons variant="full" />

      {/* Layer 6: Film Grain & Deep Edge Vignette */}
      <div className="absolute inset-0 film-grain opacity-65" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(5,5,7,0.35) 0%, rgba(4,4,6,0.78) 65%, rgba(2,2,3,0.96) 100%)',
        }}
      />
    </div>
  );
};
