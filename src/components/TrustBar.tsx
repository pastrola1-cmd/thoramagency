"use client";

import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ─── Abstract Geometric Logo Placeholders ───
function LogoPlaceholder({ index }: { index: number }) {
  // A set of clean, abstract shapes mimicking tech brand logos
  const shapes = [
    // Shape 1: Double Hexagon
    <svg className="w-6 h-6 text-frost group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>,
    // Shape 2: Intersecting Circles
    <svg className="w-6 h-6 text-frost group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" strokeDasharray="3 3" />
    </svg>,
    // Shape 3: Grid Matrix
    <svg className="w-6 h-6 text-frost group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>,
    // Shape 4: Infinite Loop
    <svg className="w-6 h-6 text-frost group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 12h.01M8 12a4 4 0 118 0 4 4 0 11-8 0z" />
    </svg>,
    // Shape 5: Chevron Ascent
    <svg className="w-6 h-6 text-frost group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 17l8-8 8 8" />
      <path d="M4 10l8-8 8 8" />
    </svg>,
  ];

  return (
    <motion.div
      variants={fadeUpVariant}
      whileHover={{ scale: 1.03, y: -2 }}
      className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-steel/40 bg-glass-white backdrop-blur-sm hover:bg-glass-hover hover:border-cyan-border transition-colors duration-300"
    >
      {shapes[index % shapes.length]}
      <span className="text-body-xs font-mono tracking-wider text-mist group-hover:text-ice transition-colors duration-300 uppercase">
        PARTNER_0{index + 1}
      </span>
    </motion.div>
  );
}

export default function TrustBar() {
  return (
    <section className="section bg-obsidian py-16 border-y border-steel/30 relative overflow-hidden">
      {/* Subtle top light bar */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <motion.div
        className="container-tight relative z-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeUpVariant}
          className="eyebrow inline-block mb-3"
        >
          Trusted Approach
        </motion.span>

        {/* Message */}
        <motion.h2
          variants={fadeUpVariant}
          className="font-display text-body-lg md:text-display-sm text-ice max-w-2xl mx-auto mb-10 leading-snug"
        >
          Helping startups, SMEs, and enterprise teams build{" "}
          <span className="text-cyan-400 font-semibold">predictable growth</span>.
        </motion.h2>

        {/* Brand placeholders */}
        <motion.div
          variants={staggerChildren}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <LogoPlaceholder key={i} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
