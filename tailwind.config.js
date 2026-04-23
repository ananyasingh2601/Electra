/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0B0F1A',
          light: '#141824',
          surface: '#1C2233',
          elevated: '#242B3D',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dim: '#A8A0B8',
          muted: '#6B6480',
        },
        gold: {
          DEFAULT: '#D4A853',
          light: '#E8C97A',
          dark: '#B8903F',
        },
        crimson: {
          DEFAULT: '#C0392B',
          light: '#E74C3C',
          dark: '#96281B',
        },
        emerald: {
          DEFAULT: '#16A34A',
          light: '#22C55E',
        },
        violet: {
          DEFAULT: '#7C3AED',
          light: '#8B5CF6',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 168, 83, 0.3)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(0,0,0,0.4)',
        'editorial-lg': '0 20px 60px rgba(0,0,0,0.6)',
        'gold': '0 0 30px rgba(212, 168, 83, 0.15)',
      },
    },
  },
  plugins: [],
};
