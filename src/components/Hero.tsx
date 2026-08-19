"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "100%", label: "Source code & IP ownership" },
  { value: "15,000+", label: "Active users shipped" },
  { value: "3.8x", label: "Client inquiries on one portal" },
  { value: "48h", label: "Scoped proposal SLA" },
];

const clients = ["Manna Bible", "Nissie Shelters", "Scale Wealth", "EduThoram", "DWealth Global"];

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      {/* Soft ambient tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/[0.04] border border-zinc-900/[0.08] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
          <span className="text-xs font-mono font-medium text-cyan-700">
            Product Studio + Technology Consulting Firm
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 max-w-4xl leading-[1.06] mb-6"
        >
          Building digital products that{" "}
          <span className="text-cyan-700">earn their place.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-500 max-w-2xl leading-relaxed mb-10"
        >
          We work with founders, product leads, and growing businesses to design, engineer, and scale software people actually want to use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-20"
        >
          <Link
            href="/case-studies"
            className="btn-solid text-sm font-bold py-3.5 px-6 flex items-center justify-center gap-2 group"
          >
            <span>See Our Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="btn-ghost text-sm font-semibold py-3.5 px-6 flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
          </Link>
        </motion.div>

        {/* Numbers strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="border-t border-zinc-900/[0.06] pt-10"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-8">
            We let the numbers do some of the talking.
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 mt-1.5 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10 pt-8 border-t border-zinc-900/[0.06]">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Built for:
            </span>
            {clients.map((client) => (
              <span key={client} className="text-sm font-semibold text-zinc-700">
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}