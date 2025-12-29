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
        primary: '#4ECDC4',
        secondary: '#45B7D1',
        danger: '#FF6B6B',
        warning: '#FFEAA7',
        success: '#96CEB4',
      },
    },
  },
  plugins: [],
};
