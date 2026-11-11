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
          bg: '#07080c',
          panel: '#0e1118',
          card: '#131722',
          cardHover: '#181e2b',
          line: '#232837',
          lineLight: '#2e3547',
        },
        crime: {
          red: '#e11d2e',
          redGlow: 'rgba(225, 29, 46, 0.35)',
          tape: '#ffc400',
          tapeGlow: 'rgba(255, 196, 0, 0.3)',
          cyan: '#2ee6d0',
          blue: '#3b82f6',
          purple: '#b57bff',
          text: '#efe9e1',
          muted: '#8b8f9a',
          subtext: '#c9c4bb',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

