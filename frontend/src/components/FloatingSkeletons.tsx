import React from 'react';

/**
 * Anatomical Full-Body Human Skeleton SVG with glowing crimson eyes.
 * Highly optimized, scalable vector graphic designed for eerie forensic ambient floating.
 */
export const SkeletonSvg: React.FC<{
  className?: string;
  glowEyes?: boolean;
  opacity?: number;
}> = ({ className = '', glowEyes = true, opacity = 1 }) => {
  return (
    <svg
      viewBox="0 0 160 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <g stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#18181b">
        {/* CRANIUM / SKULL */}
        <path
          d="M80 18 C64 18 56 30 56 42 C56 52 62 58 65 62 L65 70 C65 72 68 74 72 74 L88 74 C92 74 95 72 95 70 L95 62 C98 58 104 52 104 42 C104 30 96 18 80 18 Z"
          fill="#e4e4e7"
          stroke="#a1a1aa"
          strokeWidth="1.6"
        />
        {/* Jaw / Mandible */}
        <path
          d="M68 72 L70 82 C70 84 74 86 80 86 C86 86 90 84 90 82 L92 72 Z"
          fill="#d4d4d8"
          stroke="#71717a"
        />
        {/* Teeth divisions */}
        <line x1="72" y1="72" x2="88" y2="72" stroke="#52525b" strokeWidth="1" />
        <line x1="75" y1="70" x2="75" y2="75" stroke="#52525b" strokeWidth="0.8" />
        <line x1="80" y1="70" x2="80" y2="75" stroke="#52525b" strokeWidth="0.8" />
        <line x1="85" y1="70" x2="85" y2="75" stroke="#52525b" strokeWidth="0.8" />

        {/* Eye Sockets */}
        <path d="M66 42 C66 38 72 38 73 42 C74 46 68 47 66 42 Z" fill="#09090b" stroke="#3f3f46" />
        <path d="M87 42 C88 38 94 38 94 42 C94 47 88 46 87 42 Z" fill="#09090b" stroke="#3f3f46" />

        {/* Nasal Cavity */}
        <polygon points="80,50 78,57 82,57" fill="#09090b" stroke="#3f3f46" strokeWidth="0.5" />

        {/* Glowing Crimson Eyes */}
        {glowEyes && (
          <g className="animate-eye-glow">
            <circle cx="69.5" cy="42" r="2" fill="#ff1a1a" />
            <circle cx="90.5" cy="42" r="2" fill="#ff1a1a" />
          </g>
        )}

        {/* CERVICAL VERTEBRAE (Neck) */}
        <line x1="80" y1="86" x2="80" y2="102" stroke="#e4e4e7" strokeWidth="3" />
        <ellipse cx="80" cy="91" rx="4" ry="1.5" fill="#a1a1aa" />
        <ellipse cx="80" cy="97" rx="4.5" ry="1.5" fill="#a1a1aa" />

        {/* CLAVICLES (Collarbones) */}
        <path d="M80 102 C66 100 52 105 44 110" stroke="#e4e4e7" strokeWidth="2.4" />
        <path d="M80 102 C94 100 108 105 116 110" stroke="#e4e4e7" strokeWidth="2.4" />

        {/* STERNUM (Breastbone) & SPINAL COLUMN */}
        <line x1="80" y1="104" x2="80" y2="152" stroke="#f4f4f5" strokeWidth="3.5" />
        <line x1="80" y1="152" x2="80" y2="195" stroke="#e4e4e7" strokeWidth="3" />

        {/* RIBCAGE (7 Rib pairs) */}
        <path d="M78 110 C62 108 52 116 56 124 C60 130 74 126 78 122" stroke="#d4d4d8" strokeWidth="1.8" />
        <path d="M82 110 C98 108 108 116 104 124 C100 130 86 126 82 122" stroke="#d4d4d8" strokeWidth="1.8" />

        <path d="M78 118 C58 116 48 128 54 136 C60 142 74 136 78 132" stroke="#d4d4d8" strokeWidth="1.8" />
        <path d="M82 118 C102 116 112 128 106 136 C100 142 86 136 82 132" stroke="#d4d4d8" strokeWidth="1.8" />

        <path d="M78 126 C56 124 46 138 52 148 C58 154 74 146 78 140" stroke="#d4d4d8" strokeWidth="1.8" />
        <path d="M82 126 C104 124 114 138 108 148 C102 154 86 146 82 140" stroke="#d4d4d8" strokeWidth="1.8" />

        <path d="M78 135 C58 136 50 152 56 160 C62 164 74 156 78 150" stroke="#d4d4d8" strokeWidth="1.8" />
        <path d="M82 135 C102 136 110 152 104 160 C98 164 86 156 82 150" stroke="#d4d4d8" strokeWidth="1.8" />

        {/* Floating lower ribs */}
        <path d="M78 148 C64 152 58 166 64 172 C70 174 76 166 78 160" stroke="#a1a1aa" strokeWidth="1.5" />
        <path d="M82 148 C96 152 102 166 96 172 C90 174 84 166 82 160" stroke="#a1a1aa" strokeWidth="1.5" />

        {/* LUMBAR VERTEBRAE */}
        <ellipse cx="80" cy="165" rx="5" ry="2" fill="#a1a1aa" />
        <ellipse cx="80" cy="173" rx="5.5" ry="2" fill="#a1a1aa" />
        <ellipse cx="80" cy="181" rx="6" ry="2.2" fill="#a1a1aa" />
        <ellipse cx="80" cy="189" rx="6.5" ry="2.2" fill="#a1a1aa" />

        {/* PELVIS & SACRUM */}
        <path
          d="M62 192 C50 190 42 205 48 218 C52 226 62 230 70 224 L76 215 C76 215 78 226 80 226 C82 226 84 215 84 215 L90 224 C98 230 108 226 112 218 C118 205 110 190 98 192 C88 194 80 195 80 195 C80 195 72 194 62 192 Z"
          fill="#d4d4d8"
          stroke="#71717a"
          strokeWidth="2"
        />
        {/* Obturator foramina (pelvic holes) */}
        <ellipse cx="64" cy="216" rx="4" ry="5" fill="#09090b" stroke="#3f3f46" />
        <ellipse cx="96" cy="216" rx="4" ry="5" fill="#09090b" stroke="#3f3f46" />

        {/* LEFT ARM (Humerus, Radius, Ulna, Hand) */}
        {/* Shoulder Joint */}
        <circle cx="44" cy="112" r="3.5" fill="#e4e4e7" stroke="#71717a" />
        {/* Humerus */}
        <path d="M43 115 L32 160" stroke="#e4e4e7" strokeWidth="2.8" />
        <circle cx="32" cy="162" r="3" fill="#a1a1aa" />
        {/* Forearm (Radius + Ulna) */}
        <path d="M31 164 L24 205" stroke="#d4d4d8" strokeWidth="2" />
        <path d="M34 165 L27 206" stroke="#a1a1aa" strokeWidth="1.6" />
        {/* Hand & Fingers */}
        <circle cx="25" cy="210" r="2.5" fill="#71717a" />
        <path d="M25 212 L22 224" stroke="#d4d4d8" strokeWidth="1.2" />
        <path d="M26 212 L25 226" stroke="#d4d4d8" strokeWidth="1.2" />
        <path d="M28 212 L29 224" stroke="#d4d4d8" strokeWidth="1.2" />

        {/* RIGHT ARM (Humerus, Radius, Ulna, Hand) */}
        {/* Shoulder Joint */}
        <circle cx="116" cy="112" r="3.5" fill="#e4e4e7" stroke="#71717a" />
        {/* Humerus */}
        <path d="M117 115 L128 160" stroke="#e4e4e7" strokeWidth="2.8" />
        <circle cx="128" cy="162" r="3" fill="#a1a1aa" />
        {/* Forearm (Radius + Ulna) */}
        <path d="M129 164 L136 205" stroke="#d4d4d8" strokeWidth="2" />
        <path d="M126 165 L133 206" stroke="#a1a1aa" strokeWidth="1.6" />
        {/* Hand & Fingers */}
        <circle cx="135" cy="210" r="2.5" fill="#71717a" />
        <path d="M138 212 L141 224" stroke="#d4d4d8" strokeWidth="1.2" />
        <path d="M136 212 L137 226" stroke="#d4d4d8" strokeWidth="1.2" />
        <path d="M134 212 L133 224" stroke="#d4d4d8" strokeWidth="1.2" />

        {/* LEFT LEG (Femur, Patella, Tibia, Fibula, Foot) */}
        {/* Hip Joint */}
        <circle cx="62" cy="226" r="3.5" fill="#e4e4e7" stroke="#71717a" />
        {/* Femur */}
        <path d="M62 229 L58 290" stroke="#e4e4e7" strokeWidth="3.4" />
        {/* Knee (Patella) */}
        <ellipse cx="58" cy="293" rx="3.5" ry="3" fill="#d4d4d8" stroke="#71717a" />
        {/* Lower Leg (Tibia & Fibula) */}
        <path d="M57 296 L54 350" stroke="#e4e4e7" strokeWidth="2.6" />
        <path d="M61 297 L58 350" stroke="#a1a1aa" strokeWidth="1.6" />
        {/* Foot / Phalanges */}
        <path d="M54 351 L46 364 C44 366 48 368 54 366 L58 354" stroke="#d4d4d8" strokeWidth="2" fill="#52525b" />

        {/* RIGHT LEG (Femur, Patella, Tibia, Fibula, Foot) */}
        {/* Hip Joint */}
        <circle cx="98" cy="226" r="3.5" fill="#e4e4e7" stroke="#71717a" />
        {/* Femur */}
        <path d="M98 229 L102 290" stroke="#e4e4e7" strokeWidth="3.4" />
        {/* Knee (Patella) */}
        <ellipse cx="102" cy="293" rx="3.5" ry="3" fill="#d4d4d8" stroke="#71717a" />
        {/* Lower Leg (Tibia & Fibula) */}
        <path d="M103 296 L106 350" stroke="#e4e4e7" strokeWidth="2.6" />
        <path d="M99 297 L102 350" stroke="#a1a1aa" strokeWidth="1.6" />
        {/* Foot / Phalanges */}
        <path d="M106 351 L114 364 C116 366 112 368 106 366 L102 354" stroke="#d4d4d8" strokeWidth="2" fill="#52525b" />
      </g>
    </svg>
  );
};

/**
 * Full viewport ambient floating skeleton layer.
 * Manages multiple anatomical skeletons floating slowly across backgrounds with subtle red eye glows.
 * Optimized with pointer-events: none and GPU composite layers.
 */
export const FloatingSkeletons: React.FC<{ variant?: 'full' | 'hero' | 'ambient' }> = ({
  variant = 'full',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {/* 1. Giant Foreground Hero Skeleton (Subtle floating behind hero center) */}
      {(variant === 'full' || variant === 'hero') && (
        <div
          className="absolute -top-10 right-1/4 w-[380px] sm:w-[540px] md:w-[700px] h-[800px] sm:h-[1100px] opacity-[0.14] skeleton-bob"
          style={{ animationDuration: '14s' }}
        >
          <SkeletonSvg glowEyes opacity={1} className="w-full h-full filter drop-shadow-[0_0_25px_rgba(139,0,0,0.5)]" />
        </div>
      )}

      {/* 2. Slow Left-to-Right Floating Skeleton */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[28%] -left-[200px] w-[260px] sm:w-[380px] h-[600px] sm:h-[820px] opacity-[0.11] animate-skeleton-float-slow"
          style={{ animationDuration: '46s' }}
        >
          <div className="skeleton-bob" style={{ animationDuration: '9s' }}>
            <SkeletonSvg glowEyes opacity={0.9} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* 3. Slow Right-to-Left Floating Skeleton */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[60%] -right-[200px] w-[290px] sm:w-[420px] h-[660px] sm:h-[900px] opacity-[0.10] animate-skeleton-float-rev"
          style={{ animationDuration: '54s' }}
        >
          <div className="skeleton-bob" style={{ animationDuration: '11s', transform: 'scaleX(-1)' }}>
            <SkeletonSvg glowEyes opacity={0.85} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* 4. Deep Distant Ambient Skeleton Silhouette */}
      {variant === 'full' && (
        <div
          className="absolute bottom-10 left-[8%] w-[180px] sm:w-[260px] h-[400px] sm:h-[580px] opacity-[0.06] animate-skeleton-float-slow"
          style={{ animationDuration: '72s', animationDelay: '-15s' }}
        >
          <SkeletonSvg glowEyes={false} opacity={0.7} className="w-full h-full filter blur-[1px]" />
        </div>
      )}
    </div>
  );
};
