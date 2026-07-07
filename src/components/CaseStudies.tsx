"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ShieldAlert,
  ChevronDown,
  Building2,
  TrendingUp,
  Quote,
  Sparkles,
} from "lucide-react";

// ─── Case Studies Data ───
const caseStudies = [
  {
    id: "logistics-saas",
    category: "Logistics SaaS",
    title: "Autonomous Pipeline Generation",
    metrics: [
      { label: "New Pipeline Created", value: "$3.4M" },
      { label: "Cost Per Lead", value: "-42%" },
    ],
    problem:
      "A B2B logistics SaaS platform relied entirely on manual outbound sales agents, resulting in inconsistent pipeline velocity and high acquisition costs.",
    solution:
      "Deployed the AI Sales Engine to dynamically scrape target leads, qualify profile fit, and trigger personalized email sequences. Integrated real-time tracking via Growth OS.",
    testimonial: {
      quote:
        "The automated sourcing pipeline completely changed our outbound strategy. We generated more pipeline value in 3 months than the entire previous year.",
      author: "VP of Sales",
      company: "Anonymized Logistics Provider",
    },
    accent: "border-cyan-border hover:border-cyan-400",
  },
  {
    id: "fintech-conversions",
    category: "B2B FinTech",
    title: "Funnel Conversion Optimization",
    metrics: [
      { label: "Conversion Rate", value: "3.8x" },
      { label: "Qualified Registrations", value: "+180%" },
    ],
    problem:
      "A high-volume financial transaction company was driving massive traffic but struggling with a low conversion rate on their onboarding forms.",
    solution:
      "Implemented Conversion Lab's visual heatmapping and programmatic copy matching. Deployed contextual A/B variations based on visitor traffic sources.",
    testimonial: {
      quote:
        "We saw conversion rates double within 30 days of deploying the optimized layouts. The intelligence behind the form adjustments is incredible.",
      author: "Director of Marketing",
      company: "Anonymized Payment Platform",
    },
    accent: "border-emerald-950/30 hover:border-emerald-400/40",
  },
  {
    id: "medical-authority",
    category: "AI HealthTech",
    title: "Brand Authority Amplification",
    metrics: [
      { label: "Organic Search Traffic", value: "+320%" },
      { label: "Inbound Demos", value: "2.5x" },
    ],
    problem:
      "An AI-powered medical diagnostics startup struggled to gain market trust and authority online, leading to a long sales cycle.",
    solution:
      "Leveraged the Brand Visibility Engine to auto-generate high-quality editorial content, optimize semantic keywords, and distribute announcements to medical outlets.",
    testimonial: {
      quote:
        "The content strategy drove qualified inbound prospects who already trusted our brand. Our demo velocity has never been higher.",
      author: "Chief Growth Officer",
      company: "Anonymized Diagnostic Platform",
    },
    accent: "border-purple-950/30 hover:border-purple-400/40",
  },
];

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="section bg-void relative overflow-hidden" id="case-studies">
      <div className="container-wide relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-3 inline-block">Proven Outcomes</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Real Impact. Engineered Solutions.
          </h2>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-steel/50 bg-glass-white text-frost text-body-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Illustrative Scenarios — based on anonymized client composite outcomes
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {caseStudies.map((study) => {
            const isExpanded = expandedId === study.id;

            return (
              <motion.div
                key={study.id}
                layout="position"
                className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${study.accent}`}
              >
                {/* Header card view */}
                <div
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-glass-hover/50 transition-colors"
                  onClick={() => toggleExpand(study.id)}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-caption text-mist uppercase font-mono">{study.category}</span>
                    </div>
                    <h3 className="font-display text-body-lg md:text-display-sm font-bold text-ice">
                      {study.title}
                    </h3>
                    <p className="text-body-xs md:text-body-sm text-frost line-clamp-2 md:line-clamp-none">
                      {study.problem}
                    </p>
                  </div>

                  {/* Metrics & Expand Trigger */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10 border-t border-steel/30 pt-4 md:pt-0 md:border-t-0">
                    <div className="flex gap-6 md:gap-8">
                      {study.metrics.map((m, idx) => (
                        <div key={idx} className="text-right">
                          <div className="font-display text-body-lg md:text-display-sm text-cyan-400 font-bold">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-mist font-mono uppercase mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 rounded-full bg-steel/30 border border-steel/50 text-ice"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-steel/30 pt-6 space-y-6 bg-void/30">
                        {/* Process columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center gap-2 text-cyan-400 mb-2 font-mono text-caption uppercase">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              The Challenge
                            </div>
                            <p className="text-body-sm text-frost leading-relaxed">
                              {study.problem}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-emerald-400 mb-2 font-mono text-caption uppercase">
                              <Sparkles className="w-3.5 h-3.5" />
                              The Solution
                            </div>
                            <p className="text-body-sm text-frost leading-relaxed">
                              {study.solution}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial Quote */}
                        <div className="p-5 rounded-xl border border-steel/40 bg-graphite/40 relative">
                          <Quote className="w-10 h-10 text-cyan-500/10 absolute top-3 left-3" />
                          <p className="text-body-xs md:text-body-sm text-ice italic relative z-10 pl-6 leading-relaxed">
                            "{study.testimonial.quote}"
                          </p>
                          <div className="mt-3 flex justify-between items-center text-[10px] pl-6">
                            <span className="font-mono text-mist uppercase font-semibold">
                              {study.testimonial.author}
                            </span>
                            <span className="font-mono text-cyan-400 uppercase">
                              {study.testimonial.company}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
