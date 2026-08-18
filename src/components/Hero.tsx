"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, Zap, Bot, Code, Cpu } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Subtle Radial Gradient */}
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
            Product Studio & Technology Consulting Firm
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6"
        >
          We design, engineer, and scale digital products for{" "}
          <span className="cyan-gradient">ambitious teams.</span>
        </motion.h1>

        {/* Subhead Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          From custom AI agents and enterprise web platforms to high-performance mobile apps. We turn complex operational bottlenecks into reliable, revenue-generating software.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16"
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="btn-solid text-sm font-bold py-3.5 px-6 flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/20"
          >
            <span>Book a Free Discovery Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary WhatsApp Direct */}
          <a
            href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20am%20interested%20in%20discussing%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm font-semibold py-3.5 px-6 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>

        {/* Capability Matrix Console Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-6 sm:p-8 rounded-2xl studio-glass border border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Live Studio Execution Environment
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>Delivery Standard: Zero Lock-in</span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">100% IP Transfer</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1.5">
                <Bot className="w-4 h-4" />
                <span>AI Agents</span>
              </div>
              <div className="text-sm font-bold text-white">Autonomous Workers</div>
              <p className="text-xs text-zinc-400 mt-1">Multi-agent orchestrations & custom LLM pipelines</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1.5">
                <Code className="w-4 h-4" />
                <span>Web Platforms</span>
              </div>
              <div className="text-sm font-bold text-white">Full-Stack SaaS</div>
              <p className="text-xs text-zinc-400 mt-1">Next.js 15, React 19 & automated billing rails</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1.5">
                <Cpu className="w-4 h-4" />
                <span>Mobile Apps</span>
              </div>
              <div className="text-sm font-bold text-white">Native Flutter</div>
              <p className="text-xs text-zinc-400 mt-1">Cross-platform iOS & Android offline-first apps</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Advisory</span>
              </div>
              <div className="text-sm font-bold text-white">Architecture & QA</div>
              <p className="text-xs text-zinc-400 mt-1">Feasibility audits, schema design & MVP specs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
