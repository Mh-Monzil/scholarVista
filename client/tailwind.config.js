/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': "'Poppins', sans-serif",
      },
      colors: {
        'navy': '#0E2A46',
        'yellow': '#F2A227'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

