/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightGrey': "#F6F6F6",
        'lightBlue': "#C6D8EC",
        'primaryBlue': "#74a0d1",
        'darkBlue': "#3970AC",
      }
    },
    fontFamily: {

      'display': ['Oswald'],
      'body': ['"Open Sans"'],
  },
  plugins: [],
}
}