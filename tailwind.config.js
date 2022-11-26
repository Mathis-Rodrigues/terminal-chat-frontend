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
      fontFamily: {
        vt323: ['VT323', "monospace"],
      },
    },
  },
  plugins: [],
}
