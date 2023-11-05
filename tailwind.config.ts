import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "144": "36rem",
      },
      colors: {
        "custom-blue1": "#7fb2ff",
        "custom-blue2": "#408cff",
        "custom-blue3": "#6f6fff",
        "custom-blue4": "#3e13ea",
        "custom-blue5": "#102340",
        "custom-blue6": "#2424bf",
        "custom-blue7": "#99d6ff",
        "custom-blue8": "#181880",
      },
    },
  },
  plugins: [],
};
export default config;
