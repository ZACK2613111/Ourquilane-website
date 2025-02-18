import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        neueGraphica: ["Neue-Graphica", "sans-serif"], 
        satochi: ["Satochi", "sans-serif"], 
        dmSans: ["DM Sans", "sans-serif"], 
        gabarito: ["Gabarito", "sans-serif"],
      },
      borderRadius: {
        "4xl":"2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
