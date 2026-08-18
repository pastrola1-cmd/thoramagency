"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Newspaper } from "lucide-react";
import Link from "next/link";

const announcements = [
  {
    title: "Thoram Group Announces Launch of Paystack Billing Sprints Integration",
    date: "July 02, 2026",
    outlet: "Global Fintech Weekly",
    excerpt: "Thoram Group launches automated Paystack invoicing solutions to fund Next.js/Firebase developer loops for scaling operations.",
  },
  {
    title: "B2B Outreach Sourcing Performance Reaches Record Highs via AI Sprints",
    date: "June 14, 2026",
    outlet: "Modern Revenue Operations Journal",
    excerpt: "Autonomous verification loops reduce target account prospecting list bounce rates to 0.2%, reclaiming over 15 hours per CRM rep/week.",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation header */}
      <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice hover:text-cyan-400 transition-colors">
          Thoram<span className="text-cyan-400">.</span>
        </Link>
        <Link href="/" className="text-body-sm text-frost hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        <div>
          <span className="eyebrow mb-3 block">PRESS RELEASE ROOM</span>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-ice">
            Press Room.
          </h1>
          <p className="text-body-md text-frost mt-4 leading-relaxed">
            Teardowns, announcements, and coverage tracking Thoram Group growth integrations.
          </p>
        </div>

        {/* Press list */}
        <div className="space-y-6">
          {announcements.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass rounded-2xl p-6 border border-steel/60 hover:border-cyan-border/60 transition-all duration-300 space-y-4"
            >
              <div className="flex justify-between items-center text-[10px] font-mono uppercase text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" /> {post.outlet}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </span>
              </div>

              <h2 className="text-ice font-bold text-body-sm md:text-body-md leading-snug">
                {post.title}
              </h2>

              <p className="text-body-xs text-frost leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href="/#apply"
                  className="text-body-xs text-cyan-400 hover:text-cyan-300 font-mono inline-flex items-center gap-1"
                >
                  View Release <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
