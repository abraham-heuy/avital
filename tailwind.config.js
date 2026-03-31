import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand tones
        rb: {
          light: '#EAF4FA',   // icy light blue / white tint
          blue: '#A7C7E7',    // soft Red Bull blue
          steel: '#6B7C8F',   // metallic blue-gray
          silver: '#C9CED6',  // aluminum can color
          gray: '#8A9198',    // mid gray
          dark: '#2E3338',    // deep charcoal
          black: '#121417',   // near-black contrast
        },

        // Optional accents
        accent: {
          glow: '#DCEEFF',    // subtle glow highlight
          border: '#BFC6CF',  // UI borders
        }
      },

      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },

      boxShadow: {
        metallic: '0 4px 12px rgba(0,0,0,0.15)',
        glow: '0 0 10px rgba(167, 199, 231, 0.6)',
      },

      backgroundImage: {
        'metal-gradient': 'linear-gradient(145deg, #EAF4FA, #C9CED6, #6B7C8F)',
      }
    },
  },
  plugins: [],
}