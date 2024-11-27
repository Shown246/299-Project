/* eslint-disable no-undef */
import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
module.exports = {
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
}
