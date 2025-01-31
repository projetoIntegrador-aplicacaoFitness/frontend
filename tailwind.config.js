/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#232323",
        gray: "#979EA2",
        beige: "#D9D7CE",
        blue: {
          DEFAULT: "#0967E7",
          light: "#5A9FF7",
        },
        pink: {
          DEFAULT: "#FF0084",
          light: "#FF66B0",
        },
        dark: "#111111",
      },
    },
  },
  plugins: [],
};
