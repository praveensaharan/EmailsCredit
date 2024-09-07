/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"], // Bricolage Grotesque
        body: ["var(--font-body)", "monospace"], // Space Mono
        handjet: ["Handjet", "sans-serif"],
      },
      colors: {
        customGold: "#d79922",
        customLightGold: "#efe2ba",
        customRed: "#f13c20",
        customBlue: "#4056a1",
        customLightBlue: "#c5cbe3",
        background: "hsl(210, 100%, 6%)",
        foreground: "hsl(180, 100%, 90%)",
        primary: {
          DEFAULT: "hsl(200, 100%, 28%)",
          foreground: "hsl(180, 100%, 90%)",
        },
        secondary: {
          DEFAULT: "hsl(203, 23%, 30%)",
          foreground: "hsl(180, 100%, 90%)",
        },
        accent: {
          DEFAULT: "hsl(198, 70%, 50%)",
          foreground: "hsl(185, 10%, 13%)",
        },
        muted: {
          DEFAULT: "hsl(200, 50%, 30%)",
          foreground: "hsl(180, 100%, 90%)",
        },
        card: {
          DEFAULT: "hsl(210, 100%, 12%)",
          foreground: "hsl(180, 100%, 90%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 98%, 44%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        popover: {
          DEFAULT: "hsl(210, 100%, 15%)",
          foreground: "hsl(180, 100%, 90%)",
        },
        border: "hsl(210, 50%, 40%)",
        input: "hsl(210, 50%, 40%)",
        ring: "hsl(180, 100%, 90%)",
        chart: {
          1: "hsl(200, 100%, 28%)",
          2: "hsl(201, 99%, 25%)",
          3: "hsl(203, 98%, 22%)",
          4: "hsl(204, 100%, 18%)",
          5: "hsl(206, 100%, 15%)",
        },
      },
      maxHeight: {
        "200vh": "200vh", // Two screen heights
      },
    },
  },
  plugins: [],
};
