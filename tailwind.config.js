import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      /* COLOR SYSTEM */
      colors: {
        canvas: '#F8F4EC',

        ink: {
          DEFAULT: '#2A2A2A',
          soft: '#6C6C6C',
          faint: '#B8B8B8',
        },

        accent: {
          lime: '#C7F36B',
          limeStrong: '#A6E200',
          peach: '#FFD699',
        },

        fog: {
          lime: 'rgba(199,243,107,0.12)',
          peach: 'rgba(255,214,153,0.12)',
          gray: 'rgba(184,184,184,0.08)',
        }
      },

      /* TYPOGRAPHY */
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Trebuchet MS"', '"Comic Sans MS"', 'cursive'],
        sketch: ['"Comic Sans MS"', '"Trebuchet MS"', 'cursive'],
      },

      /* SHADOWS */
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.06)',
        glow: '0 0 18px rgba(166,226,0,0.35)',
        press: '0 2px 6px rgba(0,0,0,0.08)',
      },

      /* BACKGROUNDS */
      backgroundImage: {
        'canvas-gradient':
          'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.85), #F8F4EC 70%)',

        'art-wash':
          'radial-gradient(circle at 18% 22%, rgba(199,243,107,0.10), transparent 28%), radial-gradient(circle at 82% 72%, rgba(255,214,153,0.10), transparent 30%)',

        'dot-pattern':
          'radial-gradient(circle, rgba(0,0,0,0.12) 0.8px, transparent 0.8px)',

        /* BUTTON GRADIENT */
        'lime-blend':
          'linear-gradient(135deg, #C7F36B, #A6E200)',
      },

      backgroundSize: {
        dots: '22px 22px',
      },

      /* RADIUS */
      borderRadius: {
        organic: '18px',
        blob: '40px',
        pill: '999px',
      },

      /* ANIMATIONS */
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drift: {
          '0%,100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(6px)' },
        },
        press: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        }
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        press: 'press 0.25s ease-in-out',
      },
    },
  },
  plugins: [],
}