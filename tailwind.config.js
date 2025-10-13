/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        black: "#1D242B",
        white: "#FAFAFA",
        light_blue: "#C7EEFF",
        blue: "#0077C0",
        dark_blue: "#004A7C",
        background: {
          DEFAULT: "#0A0A0A",
          light: "#FAFAFA",
        },
      },
    },
    plugins: [
      [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
    ],
  },
};
