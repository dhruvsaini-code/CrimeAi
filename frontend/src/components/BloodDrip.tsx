import React from 'react';

interface BloodDripProps {
  className?: string;
  variant?: 'top-banner' | 'divider' | 'compact';
}

export const BloodDrip: React.FC<BloodDripProps> = ({ className = '', variant = 'top-banner' }) => {
  if (variant === 'divider') {
    return (
      <div className={`relative w-full h-8 overflow-hidden pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 1200 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-crime-blood opacity-80"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 H1200 V4 C1120 4 1100 18 1080 18 C1060 18 1040 6 980 6 C920 6 900 24 880 24 C860 24 840 5 760 5 C700 5 680 28 660 28 C640 28 620 4 540 4 C480 4 460 22 440 22 C420 22 400 6 320 6 C260 6 240 26 220 26 C200 26 180 5 100 5 C40 5 20 16 0 16 Z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute left-[220px] top-6 w-2 h-2.5 rounded-full bg-crime-crimson animate-drip-1" />
        <span className="absolute left-[660px] top-7 w-2 h-3 rounded-full bg-crime-crimson animate-drip-2" />
        <span className="absolute left-[880px] top-6 w-1.5 h-2 rounded-full bg-crime-crimson animate-drip-3" />
      </div>
    );
  }

  // Top banner dripping border
  return (
    <div className={`relative w-full pointer-events-none select-none z-40 overflow-hidden ${className}`}>
      {/* Upper continuous drip edge */}
      <svg
        viewBox="0 0 1440 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-9 sm:h-12 text-[#8B0000] drop-shadow-[0_4px_8px_rgba(139,0,0,0.5)]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 H1440 V6 C1400 6 1390 28 1380 28 C1370 28 1360 8 1320 8 C1280 8 1270 38 1260 38 C1250 38 1240 9 1190 9 C1150 9 1140 32 1130 32 C1120 32 1110 7 1060 7 C1010 7 1000 42 990 42 C980 42 970 8 920 8 C870 8 860 30 850 30 C840 30 830 6 780 6 C730 6 720 36 710 36 C700 36 690 9 640 9 C590 9 580 44 570 44 C560 44 550 7 500 7 C450 7 440 34 430 34 C420 34 410 8 360 8 C310 8 300 36 290 36 C280 36 270 6 220 6 C170 6 160 40 150 40 C140 40 130 9 80 9 C40 9 30 25 0 25 Z"
          fill="currentColor"
        />
        {/* Dark crimson secondary shade */}
        <path
          d="M0 0 H1440 V4 C1405 4 1395 22 1385 22 C1375 22 1365 5 1325 5 C1285 5 1275 30 1265 30 C1255 30 1245 6 1195 6 C1155 6 1145 25 1135 25 C1125 25 1115 5 1065 5 C1015 5 1005 34 995 34 C985 34 975 6 925 6 C875 6 865 24 855 24 C845 24 835 4 785 4 C735 4 725 28 715 28 C705 28 695 6 645 6 C595 6 585 35 575 35 C565 35 555 5 505 5 C455 5 445 27 435 27 C425 27 415 6 365 6 C315 6 305 29 295 29 C285 29 275 4 225 4 C175 4 165 32 155 32 C145 32 135 6 85 6 C45 6 35 19 0 19 Z"
          fill="#5a0000"
          opacity="0.8"
        />
      </svg>

      {/* Dripping Animated Droplets */}
      <div className="absolute top-7 sm:top-9 left-0 w-full h-12 overflow-hidden pointer-events-none">
        <span className="absolute left-[10.5%] w-2 h-2.5 rounded-full bg-[#C00000] shadow-[0_0_8px_#ff0000] animate-drip-1" />
        <span className="absolute left-[29.8%] w-2.5 h-3.5 rounded-full bg-[#C00000] shadow-[0_0_8px_#ff0000] animate-drip-2" />
        <span className="absolute left-[39.5%] w-1.5 h-2 rounded-full bg-[#C00000] animate-drip-3" />
        <span className="absolute left-[49.3%] w-2.5 h-3 rounded-full bg-[#C00000] shadow-[0_0_8px_#ff0000] animate-drip-1" />
        <span className="absolute left-[68.7%] w-2 h-3 rounded-full bg-[#C00000] animate-drip-2" />
        <span className="absolute left-[87.5%] w-2.5 h-3.5 rounded-full bg-[#C00000] shadow-[0_0_8px_#ff0000] animate-drip-3" />
      </div>
    </div>
  );
};
