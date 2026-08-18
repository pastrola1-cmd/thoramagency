"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { caseStudiesData, CaseStudy } from "@/data/caseStudies";
import {
  Smartphone,
  Globe,
  Wallet,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Layers,
  Quote,
} from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Selected Work" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "web", label: "Web Engineering" },
    { id: "fintech", label: "Fintech & Payments" },
    { id: "edtech", label: "EdTech & Learning" },
  ];

  const filteredStudies =
    selectedCategory === "all"
      ? caseStudiesData
      : caseStudiesData.filter((c) => c.category === selectedCategory);

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="pill-badge mb-3">Selected Work & Case Studies</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Real software built for{" "}
            <span className="cyan-gradient">measurable outcomes.</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Explore how we partner with ambitious teams to solve complex operational challenges, deploy AI and modern web platforms, and unlock sustainable business growth.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-14 pb-4 border-b border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies List */}
        <div className="space-y-16">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              id={study.id}
              className="p-8 sm:p-12 rounded-3xl studio-glass space-y-10 relative overflow-hidden"
            >
              {/* Header */}
              <div className="pb-8 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                    <span>{study.industry}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{study.client}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {study.title}
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="btn-solid text-xs py-2.5 px-4 font-semibold shrink-0"
                >
                  <span>Build a Similar System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Challenge vs Engineering Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    The Commercial Challenge
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    The Engineering Solution
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Measured Business Results */}
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
                  <TrendingUp className="w-4 h-4" />
                  <span>Key Measured Business Results</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.impact.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture Highlights */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Architecture & Infrastructure Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.architecture.map((arch) => (
                    <div key={arch} className="text-xs sm:text-sm text-zinc-300 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial (if available) */}
              {study.testimonial && (
                <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.06] flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed mb-3">
                      "{study.testimonial.quote}"
                    </p>
                    <div className="text-xs font-semibold text-white">
                      {study.testimonial.author} · <span className="text-zinc-400 font-normal">{study.testimonial.role}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-zinc-400 mr-2">Technologies Used:</span>
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-20 p-10 rounded-3xl studio-glass text-center max-w-3xl mx-auto space-y-6">
          <div className="pill-badge">Start Your Project</div>
          <h2 className="text-3xl font-bold text-white">
            Have a project ready to scale?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a free 30-minute discovery session. We will evaluate your business context and outline an actionable technical proposal in 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="btn-solid text-sm">
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
