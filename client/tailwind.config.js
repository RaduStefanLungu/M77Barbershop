/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'arimo' : ['Arimo', 'sans-serif'],
      'baskerville' : ['Libre Baskerville', 'serif'],
      'open-sans' : ['Open Sans', 'sans-serif'],
      'barlow' : ['Barlow Condensed', 'sans-serif']

    }
  },
  plugins: [],
})