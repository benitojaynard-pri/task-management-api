/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Sinisigurado nito na babasahin lahat ng files sa src
    ],
    theme: {
      extend: {
        colors: {
          nexusBg: '#0f111a',
          nexusCard: '#1a1d26',
          nexusPurple: '#a855f7',
        },
      },
    },
    plugins: [],
  }