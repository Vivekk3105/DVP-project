/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#ffe5e5",
          100: "#fcbcbc",
          200: "#f28f8f",
          300: "#e75f5f",
          400: "#db2e2e",
          500: "#c21616",
          600: "#991010",
          700: "#700b0b",
          800: "#470606",
          900: "#1f0101",
        },
      },
    },
  },
  plugins: [],
};
