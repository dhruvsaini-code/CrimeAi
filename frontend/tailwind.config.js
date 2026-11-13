/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          bgArchival: '#07080c',
          panel: '#0a0b0e',
          card: '#101116',
          cardHover: '#171216',
          line: '#241416',
          lineLight: '#381c1f',
        },
        crime: {
          blood: '#8B0000',
          crimson: '#C00000',
          red: '#e11d2e',
          redGlow: 'rgba(192, 0, 0, 0.45)',
          bloodGlow: 'rgba(139, 0, 0, 0.65)',
          tape: '#ffc400',
          tapeGlow: 'rgba(255, 196, 0, 0.3)',
          cyan: '#2ee6d0',
          blue: '#3b82f6',
          purple: '#b57bff',
          bone: '#e5e7eb',
          text: '#f3f4f6',
          muted: '#9ca3af',
          subtext: '#d1d5db',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        typewriter: ['"Special Elite"', 'monospace'],
        display: ['"Bebas Neue"', '"Oswald"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'blood-drip': 'bloodDrip 3.5s ease-in infinite',
        'skeleton-float-slow': 'skeletonFloatSlow 25s ease-in-out infinite',
        'skeleton-float-rev': 'skeletonFloatRev 32s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        bloodDrip: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '0.9' },
          '60%': { transform: 'translateY(12px) scaleY(1.4)', opacity: '0.95' },
          '85%': { transform: 'translateY(28px) scaleY(1.8)', opacity: '0.7' },
          '100%': { transform: 'translateY(40px) scaleY(0.5)', opacity: '0' },
        },
        skeletonFloatSlow: {
          '0%': { transform: 'translateX(-10%) translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(55%) translateY(-22px) rotate(2.5deg)' },
          '100%': { transform: 'translateX(110%) translateY(0px) rotate(0deg)' },
        },
        skeletonFloatRev: {
          '0%': { transform: 'translateX(110%) translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(45%) translateY(24px) rotate(-3deg)' },
          '100%': { transform: 'translateX(-15%) translateY(0px) rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}

