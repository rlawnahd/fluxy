/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Deep Teal 배경 계열
        dark: {
          DEFAULT: '#0A1A1F',
          100: '#0D2530',
          200: '#0F2D3A',
          300: '#143D4D',
          400: '#1A4D5E',
        },
        // 네온 컬러
        neon: {
          yellow: '#E8FF00',
          mint: '#00F5D4',
          cyan: '#00D4FF',
        },
        // Glassmorphism용
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
        // 기존 호환용
        primary: '#00F5D4',
        secondary: '#00D4FF',
        accent: '#E8FF00',
        danger: '#FF6B6B',
        success: '#00F5D4',
      },
      // Glassmorphism 배경
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
};
