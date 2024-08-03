/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGold: "#d79922",
        customLightGold: "#efe2ba",
        customRed: "#f13c20",
        customBlue: "#4056a1",
        customLightBlue: "#c5cbe3",
      },
      maxHeight: {
        "200vh": "200vh", // Two screen heights
      },
    },
  },
  plugins: [],
};
