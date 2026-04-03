import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        "canvas-elevated": "rgb(var(--color-canvas-elevated) / <alpha-value>)",
        "canvas-strong": "rgb(var(--color-canvas-strong) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        mint: "rgb(var(--color-mint) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        orange: "rgb(var(--color-orange) / <alpha-value>)"
      },
      boxShadow: {
        panel:
          "0 0 0 1px rgba(255, 255, 255, 0.06), 0 14px 34px rgba(0, 0, 0, 0.24)",
        glow: "0 0 0 1px rgba(0, 248, 183, 0.12), 0 18px 48px rgba(0, 248, 183, 0.08)"
      },
      fontFamily: {
        display: ["Space Grotesk", "Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "monospace"]
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(155,168,188,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155,168,188,0.08) 1px, transparent 1px)"
      },
      animation: {
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "scan-line": "scanLine 10s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        },
        scanLine: {
          "0%": { transform: "translateY(-12%)" },
          "100%": { transform: "translateY(112%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
