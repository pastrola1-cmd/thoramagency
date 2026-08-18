import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette mapped to dynamic CSS variables
        obsidian:    "var(--bg-obsidian)",
        void:        "var(--bg-void)",
        graphite:    "var(--bg-graphite)",
        slate:       "var(--bg-slate)",
        steel:       "var(--border-steel)",
        
        // Text mapped to dynamic CSS variables
        ice:         "var(--text-ice)",
        frost:       "var(--text-frost)",
        mist:        "var(--text-mist)",
        
        // Accent — Electric Cyan
        cyan: {
          DEFAULT: "#06B6D4",
          50:  "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        
        // Semantic
        success:     "#10B981",
        warning:     "#F59E0B",
        danger:      "#EF4444",
        
        // Glass tokens (mapped to dynamic CSS variables for bg-* / border-* usage)
        "glass-white":  "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
        "glass-hover":  "var(--glass-hover)",
        "cyan-glow":    "rgba(6, 182, 212, 0.15)",
        "cyan-border":  "rgba(6, 182, 212, 0.25)",
        "success-glow": "rgba(16, 185, 129, 0.15)",
        "warning-glow": "rgba(245, 158, 11, 0.15)",
        "danger-glow":  "rgba(239, 68, 68, 0.15)",
      },
      
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      
      fontSize: {
        "display-2xl": ["5rem",    { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.2",  letterSpacing: "-0.01em" }],
        "body-xl":     ["1.25rem", { lineHeight: "1.6" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.6" }],
        "body-md":     ["1rem",    { lineHeight: "1.6" }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.5" }],
        "body-xs":     ["0.75rem", { lineHeight: "1.5" }],
        "caption":     ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "160": "40rem",
      },
      
      borderRadius: {
        sm:   "6px",
        md:   "10px",
        lg:   "16px",
        xl:   "24px",
        "2xl": "32px",
      },
      
      boxShadow: {
        sm:      "0 2px 8px -2px rgba(0, 0, 0, 0.4)",
        md:      "0 4px 16px -4px rgba(0, 0, 0, 0.5)",
        lg:      "0 8px 32px -8px rgba(0, 0, 0, 0.6)",
        xl:      "0 16px 48px -12px rgba(0, 0, 0, 0.7)",
        glow:    "0 0 24px -4px rgba(6, 182, 212, 0.3)",
        "glow-lg": "0 0 48px -8px rgba(6, 182, 212, 0.25)",
        inner:   "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
      },
      
      backdropBlur: {
        xs:  "4px",
        xl:  "20px",
        "2xl": "40px",
      },
      
      animation: {
        "fade-in":       "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up":       "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-down":     "fadeDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in":      "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right":   "slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-left":    "slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
        "float":         "float 6s ease-in-out infinite",
        "mesh-shift":    "meshShift 12s ease-in-out infinite",
        "shimmer":       "shimmer 2.5s linear infinite",
        "gradient-x":    "gradientX 8s ease infinite",
      },
      
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%":   { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%":      { transform: "translateY(-12px) rotate(1deg)" },
          "66%":      { transform: "translateY(6px) rotate(-1deg)" },
        },
        meshShift: {
          "0%":   { transform: "translate(0, 0) scale(1)" },
          "25%":  { transform: "translate(5%, -5%) scale(1.05)" },
          "50%":  { transform: "translate(-3%, 3%) scale(0.97)" },
          "75%":  { transform: "translate(4%, 2%) scale(1.03)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
