import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neueGraphica: ["Neue-Graphica", "sans-serif"],
        satochi: ["Satochi", "sans-serif"],
        dmSans: ["DM Sans", "sans-serif"],
        gabarito: ["Gabarito", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        grayDescription: "#E5E5E5",
        yellow: "#E9CD2A60",
        violet: "#9747FF80",
        violetTitle: "#9747FF",
        yellowTitle: "#E9CD2A"
      },
      fontSize: {
        "title-about": ["64px", "80px"],
        "title-other": ["48px", "50px"],
        description: ["20px", "32px"],
        button: ["16px", "24px"],
        "title-mobile": ["32px", "40px"],
        "description-mobile": ["14px", "20px"], 
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },
  },
  plugins: [],
} satisfies Config;