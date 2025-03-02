/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0b132b",
        secondary: "#1c2541",
        tertiary: "#3a506b",
        quaternary: "#aab2ff",
        fifth: "#8E99E3",
        sixth: "#D0D4FF",
      },
    },
    screens: {
      lg: { max: "2023px" },
      
      sm: { max: "1000px" },
    },
  },
  plugins: [],
};
