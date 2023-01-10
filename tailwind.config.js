/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nightblue': {
          100: '#1A3AC7',
          200: '#1D37AE',
          300: '#092fd6',
          400: '#131F6E',
          500: '#182D87',
          600: '#131D5A',
          700: '#0A1032',
          800: '#050824'
        },
        'lavender': {
          200: '#DFDDE7',
          300: '#C9C5D8'
        },
        'custompurple': '#b517d4'
      }
    },
  },
  plugins: [],
}
