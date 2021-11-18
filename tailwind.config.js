const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#050507",
      white: colors.white,
      gray: "#F3F2F2",
      "dark-gray": "#3F3D41",
      olive: "#8A8678",
      "light-khaki": "#C4C5BC",
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    fontFamily: {
      sans: ["Rajdhani", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
