/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightGrey': "#F6F6F6",
        'lightBlue': "#D6E4F0",
        'primaryBlue': "#74a0d1",
        'darkBlue': "#163172",
      }
    },
    fontFamily: {

      'display': ['Oswald'],
      'body': ['"Open Sans"'],
  },
  plugins: [],
}
}