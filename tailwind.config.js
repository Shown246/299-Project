import daisyui from "daisyui";
// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = withMT({
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        genoa: "#149FA8", // light blue
        teal: "#06303E",
        accent: "#CAE6D3",
        flamingo: "#F42A41",
        river: "#43525B",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light"],
  },
});
