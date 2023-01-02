/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGrey: "#F6F6F6",
        veryLightBlue: "#D0DFF0",
        lightBlue: "#C6D8EC",
        primaryBlue: "#74a0d1",
        darkBlue: "#3970AC",
        sky: colors.sky,
        teal: colors.teal,
      },
      screens: {
        mob: { max: "660px" },
      },
    },
    fontFamily: {
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp"),require('@tailwindcss/aspect-ratio')],
};
