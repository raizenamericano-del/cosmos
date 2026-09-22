import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cosmos: {
          void: '#0a0e1a',
          deep: '#070a14',
          panel: '#111a2e',
          line: 'rgba(148,163,184,0.16)'
        },
        fact: {
          DEFAULT: '#38bdf8',
          soft: 'rgba(56,189,248,0.12)'
        },
        fiction: {
          DEFAULT: '#c084fc',
          soft: 'rgba(192,132,252,0.12)'
        }
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 24px rgba(139,92,246,0.35)',
        'glow-cyan': '0 0 28px rgba(34,211,238,0.35)',
        'glow-soft': '0 0 60px rgba(99,102,241,0.18)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)'
      },
      backgroundImage: {
        'aurora-gradient':
          'linear-gradient(120deg, #8b5cf6 0%, #6366f1 35%, #22d3ee 100%)',
        'panel-gradient':
          'linear-gradient(160deg, rgba(30,41,59,0.72) 0%, rgba(11,17,32,0.85) 100%)',
        'grid-lines':
          'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translateX(0)' },
          '20%': { clipPath: 'inset(12% 0 62% 0)', transform: 'translateX(-3px)' },
          '40%': { clipPath: 'inset(48% 0 24% 0)', transform: 'translateX(3px)' },
          '60%': { clipPath: 'inset(76% 0 8% 0)', transform: 'translateX(-2px)' },
          '80%': { clipPath: 'inset(30% 0 44% 0)', transform: 'translateX(2px)' }
        },
        'wormhole-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.08)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        hyperspace: {
          '0%': { opacity: '0', transform: 'scale(1)' },
          '35%': { opacity: '1', transform: 'scale(1.4)' },
          '100%': { opacity: '0', transform: 'scale(2.2)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        twinkle: 'twinkle 3.4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        scanline: 'scanline 3.5s linear infinite',
        glitch: 'glitch 1.1s steps(2, end) infinite',
        'wormhole-spin': 'wormhole-spin 18s linear infinite',
        hyperspace: 'hyperspace 1.1s ease-out forwards',
        marquee: 'marquee 26s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
