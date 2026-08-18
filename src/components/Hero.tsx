"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const proof = [
  { value: "₦100M+", label: "Payments processed on our platforms" },
  { value: "15,000+", label: "Active users shipped to market" },
  { value: "3.8x", label: "Client inquiries on one portal rebuild" },
  { value: "100%", label: "Source code & IP ownership — always" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 w-full">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-cyan-300">
            Product Studio & Technology Consulting
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6"
        >
          We build software that{" "}
          <span className="cyan-gradient">moves real numbers.</span>
        </motion.h1>

        {/* Subhead Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          AI agents, web platforms, and mobile apps — engineered to generate
          revenue, not just code. You own 100% of what we build.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="btn-solid text-sm font-bold py-3.5 px-6 flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/20"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/case-studies"
            className="btn-ghost text-sm font-semibold py-3.5 px-6 flex items-center justify-center gap-2"
          >
            <span>See Our Work</span>
          </Link>
        </motion.div>

        {/* Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
            Proof, not promises.
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {proof.map((item) => (
              <div key={item.label} className="border-l border-white/[0.08] pl-4">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}