import React from 'react';

interface RealisticSkeletonProps {
  className?: string;
  variant?: 1 | 2;
  opacity?: number;
}

/**
 * Photorealistic anatomical human skeleton image composited cleanly into dark
 * backgrounds using screen blending mode.
 */
export const RealisticSkeleton: React.FC<RealisticSkeletonProps> = ({
  className = '',
  variant = 1,
  opacity = 0.22,
}) => {
  const src =
    variant === 1
      ? '/assets/skeleton_realistic_1.jpg'
      : '/assets/skeleton_realistic_2.jpg';

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ opacity }}
      className={`select-none pointer-events-none mix-blend-screen object-contain filter contrast-125 brightness-[0.78] sepia-[0.18] drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)] ${className}`}
    />
  );
};

/**
 * Full-viewport cinematic forensic ambient skeleton layer.
 * Places photorealistic 380–660px anatomical specimens drifting slowly across
 * screen edges and deep backgrounds with aged ivory and dark grey tones.
 */
export const FloatingSkeletons: React.FC<{ variant?: 'full' | 'hero' | 'ambient' }> = ({
  variant = 'full',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {/* 1. Left Edge Emerging Specimen (420-600px tall) */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[16%] -left-24 sm:-left-16 h-[420px] sm:h-[600px] w-auto animate-skeleton-float-slow"
          style={{ animationDuration: '74s' }}
        >
          <div className="skeleton-bob h-full" style={{ animationDuration: '14s' }}>
            <RealisticSkeleton
              variant={1}
              opacity={0.16}
              className="h-full w-auto"
            />
          </div>
        </div>
      )}

      {/* 2. Right Edge Emerging Angled Specimen (460-640px tall) */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[42%] -right-28 sm:-right-14 h-[460px] sm:h-[640px] w-auto animate-skeleton-float-rev"
          style={{ animationDuration: '82s' }}
        >
          <div className="skeleton-bob h-full" style={{ animationDuration: '16s' }}>
            <RealisticSkeleton
              variant={2}
              opacity={0.14}
              className="h-full w-auto"
            />
          </div>
        </div>
      )}

      {/* 3. Deep Distant Background Specimen (360px tall, softer) */}
      {variant === 'full' && (
        <div
          className="hidden md:block absolute bottom-2 left-[15%] h-[360px] w-auto animate-skeleton-float-slow"
          style={{ animationDuration: '96s', animationDelay: '-28s' }}
        >
          <RealisticSkeleton
            variant={2}
            opacity={0.09}
            className="h-full w-auto filter blur-[0.8px]"
          />
        </div>
      )}
    </div>
  );
};
