import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ["var(--font-space)"],
      },
      backgroundImage: {
        "simplain-gradient": 
        "linear-gradient(to bottom, #62A2F3 0%, #41BBD9 100%)",
      },
    },
  },
  plugins: [],
}

export default config
