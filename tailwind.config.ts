import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fg: {
          blue: "#0B50A2",
          yellow: "#FABE00",
          red: "#CC3333",
          green: "#00B050",
          navy: "#071C35",
          soft: "#EDF4FC",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
