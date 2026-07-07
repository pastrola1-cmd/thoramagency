"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Check, X, AlertCircle, Zap } from "lucide-react";
import { colors, fonts, radius, shadows } from "@/lib/tokens";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Color Swatch ───
function Swatch({ name, hex, className }: { name: string; hex: string; className?: string }) {
  return (
    <motion.div variants={fadeUp} className="group">
      <div
        className={`w-full aspect-[3/2] rounded-xl border border-steel/50 shadow-md transition-transform duration-300 group-hover:scale-105 ${className || ""}`}
        style={{ backgroundColor: hex }}
      />
      <div className="mt-3">
        <div className="text-body-sm font-semibold text-ice">{name}</div>
        <div className="text-body-xs text-mist font-mono">{hex}</div>
      </div>
    </motion.div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <div className="border-b border-steel/50 bg-graphite/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-obsidian" />
            </div>
            <span className="font-display text-body-lg font-bold text-ice">
              Thoram <span className="text-cyan-400">Style Guide</span>
            </span>
          </div>
          <a href="/" className="text-body-sm text-frost hover:text-cyan-400 transition-colors">
            ← Back to site
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 space-y-24">

        {/* ═══════════════ COLORS ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Design Tokens</span>
            <h2 className="font-display text-display-md font-bold text-ice">Color Palette</h2>
            <p className="text-body-md text-frost mt-2 max-w-xl">
              Obsidian + Electric Cyan — a dark, sophisticated palette inspired by Linear and Vercel.
            </p>
          </motion.div>

          {/* Core palette */}
          <div className="mb-12">
            <h3 className="text-body-sm font-semibold text-mist uppercase tracking-wider mb-4">Core Backgrounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Swatch name="Obsidian" hex="#050A14" />
              <Swatch name="Void" hex="#080E1C" />
              <Swatch name="Graphite" hex="#0C1425" />
              <Swatch name="Slate" hex="#141E33" />
              <Swatch name="Steel" hex="#1C2A44" />
            </div>
          </div>

          {/* Text colors */}
          <div className="mb-12">
            <h3 className="text-body-sm font-semibold text-mist uppercase tracking-wider mb-4">Text Hierarchy</h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <Swatch name="Ice (Primary)" hex="#E8EDF5" />
              <Swatch name="Frost (Secondary)" hex="#A3B1CC" />
              <Swatch name="Mist (Muted)" hex="#5E6F8A" />
            </div>
          </div>

          {/* Accent */}
          <div className="mb-12">
            <h3 className="text-body-sm font-semibold text-mist uppercase tracking-wider mb-4">Accent — Electric Cyan</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              <Swatch name="Cyan 300" hex="#67E8F9" />
              <Swatch name="Cyan 400" hex="#22D3EE" />
              <Swatch name="Cyan 500" hex="#06B6D4" />
              <Swatch name="Cyan 600" hex="#0891B2" />
              <Swatch name="Cyan 700" hex="#0E7490" />
            </div>
          </div>

          {/* Semantic */}
          <div>
            <h3 className="text-body-sm font-semibold text-mist uppercase tracking-wider mb-4">Semantic</h3>
            <div className="grid grid-cols-3 gap-4">
              <Swatch name="Success" hex="#10B981" />
              <Swatch name="Warning" hex="#F59E0B" />
              <Swatch name="Danger" hex="#EF4444" />
            </div>
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ TYPOGRAPHY ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Typography</span>
            <h2 className="font-display text-display-md font-bold text-ice">Type Scale</h2>
            <p className="text-body-md text-frost mt-2">
              Outfit for display, Inter for body, JetBrains Mono for utility.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Display sizes */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">DISPLAY 2XL — Outfit 800 — 5rem</div>
              <div className="font-display text-display-2xl font-extrabold text-ice leading-tight">Growth, Engineered.</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">DISPLAY XL — Outfit 800 — 3.75rem</div>
              <div className="font-display text-display-xl font-extrabold text-ice">Scale Revenue with AI</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">DISPLAY LG — Outfit 700 — 3rem</div>
              <div className="font-display text-display-lg font-bold text-ice">Automate Everything</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">DISPLAY MD — Outfit 700 — 2.25rem</div>
              <div className="font-display text-display-md font-bold text-ice">Products & Services</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">DISPLAY SM — Outfit 600 — 1.875rem</div>
              <div className="font-display text-display-sm font-semibold text-ice">Case Studies</div>
            </motion.div>

            <div className="border-t border-steel/30 my-6" />

            {/* Body sizes */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">BODY XL — Inter — 1.25rem</div>
              <div className="font-body text-body-xl text-frost">We combine AI, software, automation, and marketing to help ambitious companies grow.</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">BODY LG — Inter — 1.125rem</div>
              <div className="font-body text-body-lg text-frost">Predictable growth through intelligent systems and data-driven strategy.</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">BODY MD — Inter — 1rem</div>
              <div className="font-body text-body-md text-frost">Every feature is designed to reduce friction and increase conversion rates across your funnel.</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">BODY SM — Inter — 0.875rem</div>
              <div className="font-body text-body-sm text-frost">Built for growth teams who demand results, not dashboards.</div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">MONO — JetBrains Mono — 0.875rem</div>
              <div className="font-mono text-body-sm text-cyan-400">const roi = revenue / adSpend * 100;</div>
            </motion.div>

            {/* Gradient text */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-3">GRADIENT TEXT</div>
              <div className="font-display text-display-lg font-bold text-gradient-cyan">Engineered for Scale</div>
            </motion.div>
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ BUTTONS ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Components</span>
            <h2 className="font-display text-display-md font-bold text-ice">Buttons</h2>
            <p className="text-body-md text-frost mt-2">
              Magnetic hover with spring physics. Four variants: Primary, Secondary, Outline, Ghost.
            </p>
          </motion.div>

          {/* Button rows */}
          <div className="space-y-8">
            {/* Primary */}
            <motion.div variants={fadeUp} className="p-8 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-4">PRIMARY</div>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn btn-primary text-base px-8 py-4 rounded-xl">
                  Book Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button className="btn btn-primary px-6 py-3 rounded-lg">
                  Default Size
                </button>
                <button className="btn btn-primary px-4 py-2 rounded-md text-body-sm">
                  Small
                </button>
                <button className="btn btn-primary px-6 py-3 rounded-lg opacity-50 cursor-not-allowed">
                  Disabled
                </button>
              </div>
            </motion.div>

            {/* Secondary */}
            <motion.div variants={fadeUp} className="p-8 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-4">SECONDARY</div>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn btn-secondary text-base px-8 py-4 rounded-xl">
                  <Play className="w-4 h-4 mr-1" /> See Our Platform
                </button>
                <button className="btn btn-secondary px-6 py-3 rounded-lg">
                  Default Size
                </button>
                <button className="btn btn-secondary px-4 py-2 rounded-md text-body-sm">
                  Small
                </button>
              </div>
            </motion.div>

            {/* Outline */}
            <motion.div variants={fadeUp} className="p-8 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-4">OUTLINE</div>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn btn-outline text-base px-8 py-4 rounded-xl">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button className="btn btn-outline px-6 py-3 rounded-lg">
                  Default Size
                </button>
                <button className="btn btn-outline px-4 py-2 rounded-md text-body-sm">
                  Small
                </button>
              </div>
            </motion.div>

            {/* Ghost */}
            <motion.div variants={fadeUp} className="p-8 rounded-xl border border-steel/50 bg-graphite/30">
              <div className="text-caption text-mist mb-4">GHOST</div>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn text-frost hover:text-ice hover:bg-glass-hover px-6 py-3 rounded-lg">
                  Ghost Button
                </button>
                <button className="btn text-cyan-400 hover:text-cyan-300 hover:bg-cyan-glow px-6 py-3 rounded-lg">
                  Cyan Ghost
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ CARDS ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Components</span>
            <h2 className="font-display text-display-md font-bold text-ice">Cards</h2>
            <p className="text-body-md text-frost mt-2">
              Four variants: Default, Glass, Elevated, Glow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default */}
            <motion.div variants={fadeUp} className="p-6 rounded-lg bg-graphite border border-steel hover:border-steel/80 transition-all duration-300 hover:-translate-y-1">
              <div className="text-caption text-mist mb-3">DEFAULT CARD</div>
              <h3 className="font-display text-body-lg font-semibold text-ice mb-2">AI Sales Engine</h3>
              <p className="text-body-sm text-frost">Finds, qualifies, and nurtures prospects automatically using intelligent automation.</p>
            </motion.div>

            {/* Glass */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl glass hover:bg-graphite/40 transition-all duration-300 hover:-translate-y-1">
              <div className="text-caption text-mist mb-3">GLASS CARD</div>
              <h3 className="font-display text-body-lg font-semibold text-ice mb-2">Conversion Lab</h3>
              <p className="text-body-sm text-frost">Improves websites and landing pages to significantly increase sales conversion rates.</p>
            </motion.div>

            {/* Elevated */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-slate border border-steel shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-caption text-mist mb-3">ELEVATED CARD</div>
              <h3 className="font-display text-body-lg font-semibold text-ice mb-2">Brand Visibility</h3>
              <p className="text-body-sm text-frost">SEO, content marketing, social media, PR, and video production under one roof.</p>
            </motion.div>

            {/* Glow */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-graphite border border-cyan-border shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-caption text-mist mb-3">GLOW CARD</div>
              <h3 className="font-display text-body-lg font-semibold text-ice mb-2">Growth OS</h3>
              <p className="text-body-sm text-frost">Everything needed to grow — the complete platform for revenue acceleration.</p>
            </motion.div>
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ SPACING ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Spacing</span>
            <h2 className="font-display text-display-md font-bold text-ice">Spacing Scale</h2>
            <p className="text-body-md text-frost mt-2">
              4px base unit scale: 4 → 8 → 16 → 24 → 48 → 96px.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              { label: "4px",  size: "w-1" },
              { label: "8px",  size: "w-2" },
              { label: "16px", size: "w-4" },
              { label: "24px", size: "w-6" },
              { label: "48px", size: "w-12" },
              { label: "96px", size: "w-24" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="flex items-center gap-4">
                <span className="text-body-sm text-mist font-mono w-16 text-right">{s.label}</span>
                <div className={`${s.size} h-3 bg-cyan-500/60 rounded-sm`} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ SHADOWS ═══════════════ */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Effects</span>
            <h2 className="font-display text-display-md font-bold text-ice">Shadows & Glow</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Shadow SM", cls: "shadow-sm" },
              { label: "Shadow MD", cls: "shadow-md" },
              { label: "Shadow LG", cls: "shadow-lg" },
              { label: "Shadow XL", cls: "shadow-xl" },
              { label: "Glow", cls: "shadow-glow border-cyan-border" },
              { label: "Glow LG", cls: "shadow-glow-lg border-cyan-border" },
              { label: "Glass", cls: "glass" },
              { label: "Glass Strong", cls: "glass-strong" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className={`aspect-square rounded-xl bg-graphite border border-steel flex items-center justify-center ${s.cls}`}
              >
                <span className="text-body-xs text-mist text-center">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="border-t border-steel/30" />

        {/* ═══════════════ ANIMATIONS PREVIEW ═══════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow mb-2 block">Motion</span>
            <h2 className="font-display text-display-md font-bold text-ice">Animation Samples</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              className="aspect-square rounded-xl bg-graphite border border-steel flex items-center justify-center"
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-body-xs text-mist">Hover: Scale</span>
            </motion.div>
            
            <motion.div
              className="aspect-square rounded-xl bg-graphite border border-steel flex items-center justify-center overflow-hidden"
              whileHover={{ borderColor: "rgba(6, 182, 212, 0.4)" }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                whileHover={{ background: "rgba(6, 182, 212, 0.05)" }}
              >
                <span className="text-body-xs text-mist">Hover: Glow</span>
              </motion.div>
            </motion.div>

            <div className="aspect-square rounded-xl bg-graphite border border-steel flex items-center justify-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-cyan-500"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="aspect-square rounded-xl bg-graphite border border-steel flex items-center justify-center">
              <motion.div
                className="w-8 h-0.5 bg-cyan-500"
                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <div className="text-center py-12 border-t border-steel/30">
          <p className="text-body-sm text-mist">
            Thoram Group Design System v1.0 — Loop 1 Lock Check ✓
          </p>
        </div>
      </div>
    </div>
  );
}
