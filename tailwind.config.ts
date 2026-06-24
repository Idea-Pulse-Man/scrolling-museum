import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          soft: "#16161a",
        },
        canvas: {
          DEFAULT: "#f7f5f1",
          muted: "#e9e6df",
        },
        stone: {
          450: "#9b958c",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        placard: "0 -20px 60px -15px rgba(0,0,0,0.5)",
        rail: "0 8px 30px rgba(0,0,0,0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.35)" },
          "100%": { transform: "scale(1)" },
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "pop": "pop 0.4s ease",
        "float-up": "float-up 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
        "shimmer": "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
