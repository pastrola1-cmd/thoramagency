"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    index: "01 · OWNERSHIP",
    value: "100%",
    label: "Client ownership (Source code, IP & design handover)",
  },
  {
    index: "02 · SCALE",
    value: "15,000+",
    label: "Active users on shipped platforms",
  },
  {
    index: "03 · VELOCITY",
    value: "3.8x",
    label: "Lead inquiry lift on active client portals",
  },
  {
    index: "04 · SLA SPEED",
    value: "48h",
    label: "Transparent, scoped proposal turnaround",
  },
];

const clients = [
  { name: "EduThoram", category: "School Portal" },
  { name: "Manna Bible", category: "Mobile App" },
  { name: "Nissie Shelters", category: "Real Estate CRM" },
  { name: "Scale Wealth", category: "Fintech Rails" },
  { name: "DWealth Global", category: "Asset Platform" },
];

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      {/* Soft ambient tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/[0.06] border border-orange-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-mono font-medium text-orange-600 uppercase tracking-wider">
            Product Engineering & Technology Studio
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 max-w-4xl leading-[1.06] mb-6"
        >
          We build the software that{" "}
          <span className="text-orange-600">moves businesses forward.</span>
        </motion.h1>

        {/* Subhead Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-600 max-w-2xl leading-relaxed mb-10"
        >
          From business systems and customer platforms to mobile applications and automation, Thoram Group designs, builds, and scales high-performance digital products for companies ready to move faster.
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
            className="btn-solid text-sm font-bold py-3.5 px-6 flex items-center justify-center gap-2 group"
          >
            <span>Build With Thoram</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/case-studies"
            className="btn-ghost text-sm font-semibold py-3.5 px-6 flex items-center justify-center gap-2"
          >
            <span>See What We've Built</span>
          </Link>
        </motion.div>

        {/* Elevated Editorial Proof Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-8 sm:p-10 rounded-3xl bg-[#F8F8F6] border border-zinc-200/80 shadow-sm space-y-8"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-200/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
                Built to work. Built for you.
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Zero Vendor Lock-in · 100% Client Ownership</span>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.index}
                className="p-6 rounded-2xl bg-white border border-zinc-200/70 shadow-xs flex flex-col justify-between"
              >
                <div className="text-[11px] font-mono text-zinc-400 font-semibold tracking-wider mb-3">
                  {stat.index}
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-zinc-900 font-mono tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client Badges Row */}
          <div className="pt-6 border-t border-zinc-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold shrink-0">
              Selected Systems Built For:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-800 font-medium shadow-2xs hover:border-orange-500/50 transition-colors"
                >
                  <span className="font-semibold text-zinc-900">{client.name}</span>
                  <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-100">
                    {client.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
