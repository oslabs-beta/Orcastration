/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nightblue: {
          100: '#1A3AC7',
          200: '#1D37AE',
          300: '#19314D', //darker blue
          400: '#131F6E',
          500: '#182D87',
          600: '#131D5A',
          700: '#0A1032',
          800: '#050824',
        },
        darkblue: {
          500: '#19314D',
        },
        lightgrey: '#F3F5F7', //the overall background color, not accessed via tailwind but set in index.css
        midblue: '#4B84AA',
        secondarymidblue: '#6789b0',
        lightblue: '#95C6EF',
        grey: '#525251',

        lavender: {
          200: '#DFDDE7',
          300: '#C9C5D8',
        },
        pingloader: '#4bc0c0bf',
        custompurple: '#b517d4',
      },
    },
  },
  plugins: [],
};
