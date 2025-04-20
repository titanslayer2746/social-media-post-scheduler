
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(0 0% 80%)",
        input: "hsl(0 0% 80%)",
        ring: "hsl(0 0% 0%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 0%)",
        primary: {
          DEFAULT: "hsl(0 0% 0%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 90%)",
          foreground: "hsl(0 0% 0%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 90%)",
          foreground: "hsl(0 0% 50%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 90%)",
          foreground: "hsl(0 0% 0%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 0%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
