import React from 'react';

interface BloodDripProps {
  className?: string;
  variant?: 'top-banner' | 'divider';
}

/**
 * Realistic viscous dark-crimson liquid drip component.
 * Uses multi-stop blood gradients, glossy specular highlights, asymmetric organic drips,
 * and subtle drop shadows for a photorealistic liquid appearance.
 */
export const BloodDrip: React.FC<BloodDripProps> = ({ className = '', variant = 'top-banner' }) => {
  if (variant === 'divider') {
    return (
      <div className={`relative w-full h-10 overflow-hidden pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 1200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bloodDivGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b0000" />
              <stop offset="45%" stopColor="#6b0000" />
              <stop offset="85%" stopColor="#990000" />
              <stop offset="100%" stopColor="#4a0000" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 H1200 V2 C1140 2 1134 14 1131 19 C1128 24 1124 24 1122 18 C1119 10 1114 2 1050 2 C980 2 975 9 972 13 C969 16 966 15 964 11 C961 4 955 2 840 2 C770 2 764 22 760 31 C757 37 752 37 749 30 C745 20 740 2 650 2 C580 2 574 12 571 17 C568 21 564 20 562 15 C559 7 553 2 410 2 C345 2 339 18 335 27 C332 33 327 33 324 26 C320 17 315 2 220 2 C140 2 135 10 132 15 C129 19 125 18 123 13 C120 6 115 2 0 2 Z"
            fill="url(#bloodDivGrad)"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full pointer-events-none select-none z-40 overflow-visible -mt-[1px] ${className}`}>
      <svg
        viewBox="0 0 1440 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-16 drop-shadow-[0_6px_10px_rgba(0,0,0,0.95)]"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Deep coagulated arterial crimson gradient */}
          <linearGradient id="viscousBlood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f0000" />
            <stop offset="25%" stopColor="#4f0000" />
            <stop offset="65%" stopColor="#820000" />
            <stop offset="92%" stopColor="#a60505" />
            <stop offset="100%" stopColor="#5e0000" />
          </linearGradient>

          {/* Glossy wet highlight gradient */}
          <linearGradient id="wetGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,190,190,0.0)" />
            <stop offset="60%" stopColor="rgba(255,170,170,0.28)" />
            <stop offset="100%" stopColor="rgba(255,210,210,0.45)" />
          </linearGradient>
        </defs>

        {/* Irregular organic pooling and varied long/short drips */}
        <path
          d="M0 0 H1440 V4
             C1410 4 1405 9 1401 15 C1398 19 1394 18 1392 13 C1389 6 1384 4 1340 4
             C1295 4 1291 26 1287 44 C1285 52 1279 52 1277 43 C1274 25 1270 4 1230 4
             C1175 4 1170 11 1167 16 C1164 20 1160 19 1158 14 C1155 7 1150 4 1090 4
             C1048 4 1043 36 1039 58 C1037 67 1031 67 1029 57 C1025 35 1020 4 985 4
             C930 4 926 15 923 22 C920 27 916 26 914 20 C911 11 906 4 855 4
             C815 4 810 21 807 29 C804 35 799 35 797 28 C794 18 789 4 720 4
             C676 4 672 31 668 51 C666 59 660 59 658 50 C654 30 649 4 605 4
             C545 4 540 12 537 17 C534 21 530 20 528 15 C525 8 520 4 465 4
             C422 4 418 28 414 46 C412 54 406 54 404 45 C400 27 395 4 345 4
             C295 4 291 14 288 20 C285 25 281 24 279 18 C276 10 271 4 215 4
             C176 4 172 34 168 56 C166 64 160 64 158 55 C154 33 149 4 112 4
             C75 4 71 17 68 24 C65 29 61 28 59 22 C56 13 51 4 0 4 Z"
          fill="url(#viscousBlood)"
        />

        {/* Glossy liquid specular highlights on bulbous droplet tips */}
        <ellipse cx="163" cy="54" rx="1.5" ry="4.5" fill="url(#wetGloss)" />
        <ellipse cx="409" cy="44" rx="1.3" ry="3.8" fill="url(#wetGloss)" />
        <ellipse cx="663" cy="49" rx="1.4" ry="4.2" fill="url(#wetGloss)" />
        <ellipse cx="802" cy="27" rx="1.1" ry="2.8" fill="url(#wetGloss)" />
        <ellipse cx="1034" cy="56" rx="1.6" ry="5.0" fill="url(#wetGloss)" />
        <ellipse cx="1282" cy="42" rx="1.3" ry="3.8" fill="url(#wetGloss)" />
      </svg>

      {/* Subtle animated falling droplets from longest tips */}
      <div className="absolute top-10 sm:top-12 left-0 w-full h-14 overflow-hidden pointer-events-none">
        <span
          className="absolute left-[11.2%] w-1.5 h-3 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#6e0000] to-[#b30505] shadow-[inset_-1px_-1px_2px_rgba(255,180,180,0.4)] animate-drip-1"
          style={{ animationDuration: '5.5s' }}
        />
        <span
          className="absolute left-[45.9%] w-1.5 h-3.5 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#6e0000] to-[#b30505] shadow-[inset_-1px_-1px_2px_rgba(255,180,180,0.4)] animate-drip-2"
          style={{ animationDuration: '7.2s' }}
        />
        <span
          className="absolute left-[71.7%] w-2 h-3.5 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#6e0000] to-[#b30505] shadow-[inset_-1px_-1px_2px_rgba(255,180,180,0.4)] animate-drip-3"
          style={{ animationDuration: '6.4s' }}
        />
      </div>
    </div>
  );
};
