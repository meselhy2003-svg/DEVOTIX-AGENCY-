/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF1E27',
          redHover: '#E0141D',
          dark: '#050505',
          darkCard: '#0E0E10',
          darkBorder: '#222226',
          muted: '#8A8A93',
          lightBg: '#F8F9FA',
          lightCard: '#FFFFFF',
          lightBorder: '#E5E7EB',
          lightText: '#111827',
          lightMuted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Noto Kufi Arabic', 'Cairo', 'Tajawal', 'Poppins', 'sans-serif'],
        display: ['Montserrat', 'Noto Kufi Arabic', 'Cairo', 'Syne', 'sans-serif'],
        arabic: ['Noto Kufi Arabic', 'Cairo', 'Tajawal', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
