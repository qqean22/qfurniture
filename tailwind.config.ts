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
        gold: { DEFAULT: "#a89868", light: "#b8a878", dark: "#8c7d52" },
        cream: "#faf8f5",
        warm: { DEFAULT: "#faf7f2", light: "#fdfbf8" },
      },
    },
  },
  plugins: [],
};
export default config;
