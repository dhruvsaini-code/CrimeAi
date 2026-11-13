import React, { useEffect, useRef } from 'react';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let animId: number;
    let W = (cv.width = cv.parentElement?.clientWidth || window.innerWidth);
    let H = (cv.height = cv.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!cv) return;
      W = cv.width = cv.parentElement?.clientWidth || window.innerWidth;
      H = cv.height = cv.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', onResize);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; isAccent: boolean }> = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.8,
        isAccent: i % 8 === 0,
      });
    }

    const draw = () => {
      cx.clearRect(0, 0, W, H);

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            cx.strokeStyle = `rgba(192, 0, 0, ${alpha})`;
            cx.lineWidth = 0.8;
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.lineTo(b.x, b.y);
            cx.stroke();
          }
        }
      }

      // Draw particle dots
      particles.forEach((p) => {
        cx.fillStyle = p.isAccent ? '#C00000' : '#d4d4d8';
        cx.shadowColor = p.isAccent ? '#ff1a1a' : '#8B0000';
        cx.shadowBlur = p.isAccent ? 12 : 6;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fill();
      });
      cx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
};

