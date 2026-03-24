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
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        heading: ["Rajdhani", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        data:    ["Roboto Mono", "monospace"],
      },
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        panel: {
          DEFAULT: "hsl(var(--panel))",
          foreground: "hsl(var(--panel-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow:       "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        danger: {
          DEFAULT:    "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
          glow:       "hsl(var(--danger-glow))",
        },
        warning: {
          DEFAULT:    "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        status: {
          online:  "hsl(var(--status-online))",
          offline: "hsl(var(--status-offline))",
        },
        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        panel:       "var(--shadow-panel)",
        card:        "var(--shadow-card)",
        "glow-green": "var(--shadow-glow-green)",
        "glow-red":   "var(--shadow-glow-red)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "scan-line": {
          "0%":   { top: "-2px" },
          "100%": { top: "100%" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 6px hsl(142 76% 47% / 0.5)" },
          "50%":      { boxShadow: "0 0 14px hsl(142 76% 47% / 0.9)" },
        },
        "emergency-flash": {
          "0%, 100%": { borderColor: "hsl(353 70% 50% / 0.4)" },
          "50%":      { borderColor: "hsl(353 70% 50% / 1)", boxShadow: "0 0 30px hsl(353 70% 50% / 0.5)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-page-in": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 hsl(150 40% 38% / 0.6)" },
          "70%":  { boxShadow: "0 0 0 10px hsl(150 40% 38% / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(150 40% 38% / 0)" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "scan-line":       "scan-line 3s linear infinite",
        "pulse-green":     "pulse-green 2s ease-in-out infinite",
        "emergency-flash": "emergency-flash 1.5s ease-in-out infinite",
        "fade-in-up":      "fade-in-up 0.4s ease-out both",
        "slide-page-in":   "slide-page-in 0.35s ease-out both",
        "spin-slow":       "spin-slow 2s linear infinite",
        "blink":           "blink-cursor 1s step-end infinite",
        "pulse-ring":      "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
