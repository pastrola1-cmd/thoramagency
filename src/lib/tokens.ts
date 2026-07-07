// ─────────────────────────────────────────────────────────────
// Thoram Group — Design Tokens
// Single source of truth for the entire design system.
// Every component, page, and style references this file.
// ─────────────────────────────────────────────────────────────

export const colors = {
  // Core palette — "Obsidian + Electric Cyan"
  obsidian:    "#050A14",   // deepest background
  void:        "#080E1C",   // page background
  graphite:    "#0C1425",   // card / surface
  slate:       "#141E33",   // elevated surface / sidebar
  steel:       "#1C2A44",   // borders, dividers
  
  // Text hierarchy
  ice:         "#E8EDF5",   // primary text (headings, body)
  frost:       "#A3B1CC",   // secondary text
  mist:        "#5E6F8A",   // muted text, captions
  
  // Accent — Electric Cyan
  cyan:        "#06B6D4",   // primary accent
  cyanLight:   "#22D3EE",   // hover / active state
  cyanDark:    "#0891B2",   // pressed state
  cyanGlow:    "rgba(6, 182, 212, 0.15)",  // glow background
  cyanBorder:  "rgba(6, 182, 212, 0.25)",  // subtle border
  
  // Semantic
  success:     "#10B981",
  successGlow: "rgba(16, 185, 129, 0.15)",
  warning:     "#F59E0B",
  warningGlow: "rgba(245, 158, 11, 0.15)",
  danger:      "#EF4444",
  dangerGlow:  "rgba(239, 68, 68, 0.15)",
  
  // Glass
  glassWhite:  "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.06)",
  glassHover:  "rgba(255, 255, 255, 0.05)",
} as const;

export const fonts = {
  display: '"Outfit", system-ui, sans-serif',
  body:    '"Inter", system-ui, sans-serif',
  mono:    '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const fontSizes = {
  // Display scale (Outfit)
  "display-2xl": ["5rem",    { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
  "display-xl":  ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "800" }],
  "display-lg":  ["3rem",    { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "700" }],
  "display-md":  ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
  "display-sm":  ["1.875rem",{ lineHeight: "1.2",  letterSpacing: "-0.01em", fontWeight: "600" }],
  
  // Body scale (Inter)
  "body-xl":     ["1.25rem", { lineHeight: "1.6" }],
  "body-lg":     ["1.125rem",{ lineHeight: "1.6" }],
  "body-md":     ["1rem",    { lineHeight: "1.6" }],
  "body-sm":     ["0.875rem",{ lineHeight: "1.5" }],
  "body-xs":     ["0.75rem", { lineHeight: "1.5" }],
  
  // Utility
  "caption":     ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
} as const;

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "2px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
} as const;

export const radius = {
  sm:   "6px",
  md:   "10px",
  lg:   "16px",
  xl:   "24px",
  "2xl": "32px",
  full: "9999px",
} as const;

export const shadows = {
  sm:      "0 2px 8px -2px rgba(0, 0, 0, 0.4)",
  md:      "0 4px 16px -4px rgba(0, 0, 0, 0.5)",
  lg:      "0 8px 32px -8px rgba(0, 0, 0, 0.6)",
  xl:      "0 16px 48px -12px rgba(0, 0, 0, 0.7)",
  glow:    "0 0 24px -4px rgba(6, 182, 212, 0.3)",
  glowLg:  "0 0 48px -8px rgba(6, 182, 212, 0.25)",
  inner:   "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
} as const;

export const glass = {
  background: "rgba(12, 20, 37, 0.6)",
  border:     "1px solid rgba(255, 255, 255, 0.06)",
  blur:       "blur(20px)",
  hoverBg:    "rgba(12, 20, 37, 0.8)",
} as const;

export const animation = {
  fast:     "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  default:  "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  smooth:   "400ms cubic-bezier(0.16, 1, 0.3, 1)",
  spring:   "600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  slow:     "800ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

// ─────────────────────────────────────────────────────────────
// Component Variants (used with CVA or direct className)
// ─────────────────────────────────────────────────────────────

export const buttonVariants = {
  primary: "bg-cyan-500 hover:bg-cyan-400 text-obsidian font-semibold shadow-glow hover:shadow-glowLg transition-all duration-300 hover:-translate-y-0.5",
  secondary: "border border-steel bg-glass-white hover:bg-glass-hover text-ice font-medium transition-all duration-300 hover:-translate-y-0.5",
  outline: "border border-cyan-border text-cyan-500 hover:bg-cyan-glow font-medium transition-all duration-300",
  ghost: "text-frost hover:text-ice hover:bg-glass-hover font-medium transition-all duration-200",
  danger: "bg-danger hover:bg-red-600 text-white font-semibold transition-all duration-200",
} as const;

export const cardVariants = {
  default: "bg-graphite border border-steel rounded-lg",
  glass: "bg-glass-white backdrop-blur-xl border border-glass-border rounded-xl shadow-lg",
  elevated: "bg-slate border border-steel rounded-xl shadow-xl",
  glow: "bg-graphite border border-cyan-border rounded-xl shadow-glow",
} as const;
