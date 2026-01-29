/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          nexusBg: '#12141c',      // Dark outer background
          nexusCard: '#1a1d26',    // Darker inner card
          nexusPurple: '#a855f7',  // Primary purple
          nexusPink: '#d946ef',    // Gradient secondary
        },
      },
    },
    plugins: [],
  }