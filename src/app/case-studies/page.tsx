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
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

function StudyGallery({ study }: { study: CaseStudy }) {
  const images = study.gallery || (study.image ? [study.image] : []);
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-900/[0.10] bg-zinc-50/90 p-3 sm:p-4 space-y-3">
      <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xs">
        {/* Browser Topbar */}
        <div className="px-4 py-2.5 bg-zinc-100/90 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="text-[11px] font-mono text-zinc-400">
            {study.title.split("—")[0].trim()} · Production Interface Preview
          </div>
          <div className="text-[11px] font-mono text-zinc-400">
            {activeIdx + 1} / {images.length}
          </div>
        </div>
        {/* Main Screenshot */}
        <div className="relative aspect-[16/9] w-full bg-zinc-950 overflow-hidden">
          <img
            src={images[activeIdx]}
            alt={`${study.title} Preview ${activeIdx + 1}`}
            className="w-full h-full object-cover object-top transition-all duration-300"
          />
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setActiveIdx(idx)}
              className={`relative rounded-xl overflow-hidden border transition-all h-14 sm:h-16 aspect-[16/9] shrink-0 ${
                activeIdx === idx
                  ? "border-orange-600 ring-2 ring-orange-500/30 shadow-xs"
                  : "border-zinc-200 opacity-60 hover:opacity-100 hover:border-zinc-400"
              }`}
            >
              <img
                src={img}
                alt="Thumbnail"
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Selected Work" },
    { id: "edtech", label: "School Portals (SMS/SIS)" },
    { id: "web", label: "Web Platforms & CRM" },
    { id: "fintech", label: "Fintech & Payments" },
    { id: "mobile", label: "Mobile Apps" },
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            Real products.{" "}
            <span className="text-orange-600">Real outcomes.</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            We don't build portfolios of mockups. We engineer software that moves critical business metrics and eliminates operational friction.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-14 pb-4 border-b border-zinc-900/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/10"
                  : "bg-zinc-900/[0.03] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/[0.06] border border-zinc-900/[0.06]"
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
              <div className="pb-8 border-b border-zinc-900/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-600 uppercase tracking-wider mb-2">
                    <span>{study.industry}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-500">{study.client}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
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

              {/* Product Gallery Showcase (if screenshots available) */}
              <StudyGallery study={study} />

              {/* Challenge vs Engineering Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-zinc-900/[0.02] border border-zinc-900/[0.05] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    The Commercial Challenge
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/[0.02] border border-zinc-900/[0.05] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
                    The Engineering Solution
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Measured Business Results */}
              <div className="p-8 rounded-2xl bg-zinc-900/[0.03] border border-zinc-900/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-orange-600 uppercase tracking-wider mb-6">
                  <TrendingUp className="w-4 h-4" />
                  <span>Key Measured Business Results</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.impact.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-zinc-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture Highlights */}
              <div className="p-6 rounded-2xl bg-zinc-900/[0.02] border border-zinc-900/[0.05] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Architecture & Infrastructure Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.architecture.map((arch) => (
                    <div key={arch} className="text-xs sm:text-sm text-zinc-600 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial (if available) */}
              {study.testimonial && (
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-900/[0.06] flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-orange-600/10 text-orange-600 shrink-0">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-zinc-600 italic leading-relaxed mb-3">
                      "{study.testimonial.quote}"
                    </p>
                    <div className="text-xs font-semibold text-zinc-900">
                      {study.testimonial.author} · <span className="text-zinc-500 font-normal">{study.testimonial.role}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900/[0.06]">
                <span className="text-xs font-mono text-zinc-500 mr-2">Technologies Used:</span>
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900/[0.03] border border-zinc-900/[0.06] text-zinc-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-20 p-10 sm:p-14 rounded-3xl bg-[#F8F8F6] border border-zinc-200/80 text-center max-w-3xl mx-auto space-y-6">
          <div className="pill-badge">Start a Project</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Have a product worth building?
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Tell us what you're trying to build, fix, or automate. We'll assess the problem, tell you what it will take, what it should cost, and give you a clear path forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="btn-solid text-sm">
              <span>Start a Project</span>
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
