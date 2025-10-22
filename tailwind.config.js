/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acciaio: "#1F232A",
        biancoTec: "#F5F5F5",
        rossoAttrezzi: "#D62828",
        bluMeccanico: "#003049",
        grigioAlluminio: "#ADB5BD",
      },
    },
  },
  plugins: [],
};
