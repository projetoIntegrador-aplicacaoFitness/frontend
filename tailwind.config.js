/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sunflower: ["Brown Sunflower Sans", "sans-serif"],
      },
      colors: {
        orange: {
          200: "#F5793B",
          400: "#f1580c",
        },
        peach: {
          200: "#f79a6b",
        },
        black: {
          200: "#0c0c0c",
          600: "#000000",
        },
        darkgray: {
          400: "#252525",
        },
      },
    },
  },
  plugins: [],
};
