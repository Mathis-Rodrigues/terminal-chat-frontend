/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      teal: colors.teal,
      orange: colors.orange,
      lime: colors.lime,
      cyan: colors.cyan,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      sky: colors.sky,
      amber: colors.amber,
      primary: "#fcb800",
    },
    extend: {
      boxShadow: {
        'cyber': 'inset #886400 0px 0px 2rem 0px, #886400 0px 0px 2rem 0px',
      },
      fontFamily: {
        vt323: ['VT323', "monospace"],
      },
      height: {
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      }
    },
    plugins: [],
    }
}
