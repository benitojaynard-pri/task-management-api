/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          nexusDark: '#0f111a',    // Deep background
          nexusCard: '#1a1d29',    // Card/Identity Rail
          nexusPurple: '#a855f7',  // Primary brand color
          nexusAccent: '#c026d3',  // Gradient/Highlight
          nexusText: '#94a3b8',    // Muted secondary text
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Professional UI font
        },
      },
    },
    plugins: [],
  }