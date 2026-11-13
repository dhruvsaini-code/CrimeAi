import React from 'react';

interface BloodDripProps {
  className?: string;
  variant?: 'top-banner' | 'divider';
}

/**
 * Photographic Practical-Effect Blood Accents.
 * Uses real macro photography of viscous crimson liquid on pure black,
 * composited via screen blending rather than repeating vector waves.
 */
export const BloodDrip: React.FC<BloodDripProps> = ({ className = '', variant = 'top-banner' }) => {
  if (variant === 'divider') {
    return (
      <div className={`relative w-full h-10 flex items-center pointer-events-none select-none overflow-hidden ${className}`}>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#6b0000]/70 to-transparent" />
        <img
          src="/assets/blood_drop_macro.jpg"
          alt=""
          aria-hidden="true"
          className="absolute right-[14%] top-0 h-16 w-auto mix-blend-screen opacity-65 animate-photo-drop-1"
        />
      </div>
    );
  }

  // Restraint under navbar: clean dark crimson hairline + 2 subtle asymmetric falling macro droplets
  return (
    <div className={`relative w-full pointer-events-none select-none z-30 ${className}`}>
      <div className="w-full h-[1px] bg-gradient-to-r from-[#2b0505] via-[#7f1d1d]/65 to-[#180404]" />
      <div className="relative max-w-7xl mx-auto h-0 overflow-visible">
        {/* Subtle single falling photographic droplet on right side */}
        <img
          src="/assets/blood_drop_macro.jpg"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute right-12 -top-1 h-24 w-auto mix-blend-screen opacity-60 animate-photo-drop-1 filter contrast-125"
        />
        {/* Faint secondary droplet on far left */}
        <img
          src="/assets/blood_drop_macro.jpg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute left-20 -top-2 h-16 w-auto mix-blend-screen opacity-40 animate-photo-drop-2 filter contrast-125"
        />
      </div>
    </div>
  );
};
