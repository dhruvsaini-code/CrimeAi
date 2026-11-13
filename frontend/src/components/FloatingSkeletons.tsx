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
      className={`select-none pointer-events-none mix-blend-screen object-contain filter contrast-125 brightness-90 drop-shadow-[0_0_25px_rgba(139,0,0,0.35)] ${className}`}
    />
  );
};

/**
 * Full-viewport cinematic forensic ambient skeleton layer.
 * Places photorealistic 300–600px anatomical specimens drifting slowly across
 * screen edges and deep backgrounds without interfering with UI legibility.
 */
export const FloatingSkeletons: React.FC<{ variant?: 'full' | 'hero' | 'ambient' }> = ({
  variant = 'full',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {/* 1. Left Edge Emerging Specimen (380-540px tall) */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[18%] -left-20 sm:-left-12 h-[380px] sm:h-[520px] w-auto animate-skeleton-float-slow"
          style={{ animationDuration: '68s' }}
        >
          <div className="skeleton-bob h-full" style={{ animationDuration: '13s' }}>
            <RealisticSkeleton
              variant={1}
              opacity={0.18}
              className="h-full w-auto"
            />
          </div>
        </div>
      )}

      {/* 2. Right Edge Emerging Angled Specimen (420-580px tall) */}
      {(variant === 'full' || variant === 'ambient') && (
        <div
          className="absolute top-[48%] -right-24 sm:-right-10 h-[420px] sm:h-[560px] w-auto animate-skeleton-float-rev"
          style={{ animationDuration: '76s' }}
        >
          <div className="skeleton-bob h-full" style={{ animationDuration: '15s' }}>
            <RealisticSkeleton
              variant={2}
              opacity={0.16}
              className="h-full w-auto"
            />
          </div>
        </div>
      )}

      {/* 3. Deep Distant Background Specimen (320-380px tall, softer) */}
      {variant === 'full' && (
        <div
          className="hidden md:block absolute bottom-4 left-[18%] h-[340px] w-auto animate-skeleton-float-slow"
          style={{ animationDuration: '92s', animationDelay: '-25s' }}
        >
          <RealisticSkeleton
            variant={2}
            opacity={0.10}
            className="h-full w-auto filter blur-[0.8px]"
          />
        </div>
      )}
    </div>
  );
};
