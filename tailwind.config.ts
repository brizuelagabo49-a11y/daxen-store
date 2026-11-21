import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#0e0e0e",
        line: "#1f1f1f",
        bone: "#f5f5f5",
        mute: "#9a9a9a",
        pink: { DEFAULT: "#f1a2c7", deep: "#d4669b" },
        wa: "#25d366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spinY: { from: { transform: "rotateY(0deg)" }, to: { transform: "rotateY(-360deg)" } },
        shine: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        spinY: "spinY 40s linear infinite",
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
