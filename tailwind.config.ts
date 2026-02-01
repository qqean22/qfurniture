import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-geist-mono)", "Georgia", "serif"],
      },
      colors: {
        primary: { DEFAULT: "#1a1a1a", light: "#2d2d2d" },
        accent: "#234652",
        teal: { DEFAULT: "#234652", light: "#2d5a6a" },
        gold: { DEFAULT: "#c9a227", light: "#d4af37", dark: "#b8860b" },
        cream: "#faf8f5",
      },
    },
  },
  plugins: [],
};
export default config;
