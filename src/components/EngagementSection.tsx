"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function EngagementSection() {
  const tiers = [
    {
      name: "Strategy & Scoping Session",
      badge: "Discovery",
      tagline: "For teams exploring opportunities before committing to a full build.",
      deliverables: [
        "1-on-1 Deep-Dive Architectural Audit",
        "Prioritized Software & AI Opportunity Map",
        "Technical Feasibility & Cost Assessment",
        "Actionable Product Roadmap Document",
      ],
      cta: "Book Strategy Session",
      href: "#contact",
      highlight: false,
    },
    {
      name: "Dedicated Product Build",
      badge: "Most Popular",
      tagline: "For businesses ready to build, launch, and deploy custom software or AI.",
      deliverables: [
        "Full-Scope System UI/UX & Architecture",
        "Bespoke AI Agent or Web/Mobile Application",
        "Full Quality Assurance & Real-Scenario Testing",
        "Production Launch & 100% IP Handover",
        "30-Day Post-Launch Support & Warranty",
      ],
      cta: "Get a Custom Proposal",
      href: "#contact",
      highlight: true,
    },
    {
      name: "Growth & Ops Retainer",
      badge: "Continuous Scale",
      tagline: "For scaling companies needing dedicated ongoing engineering bandwidth.",
      deliverables: [
        "Continuous Feature Iteration & Sprints",
        "24/7 Server Health & AI Performance Monitoring",
        "Database Scaling & Security Vulnerability Audits",
        "Bi-Weekly Executive Strategy & Roadmap Reviews",
      ],
      cta: "Explore Retainer Options",
      href: "#contact",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="section-pad border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Engagement Models</div>
        <h2 className="section-title">
          Priced for the outcome.{" "}
          <span className="cyan-gradient">Not the hour.</span>
        </h2>
        <p className="section-desc">
          We scope every project rigorously before quoting. No hidden fees, no scope creep, and no surprises. Book a 30-minute call and get a tailored proposal within 48 hours.
        </p>
      </div>

      {/* 3 Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
              tier.highlight
                ? "bg-[#0E0E14] border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/5 lg:-translate-y-2"
                : "studio-glass studio-glass-hover"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>{tier.badge}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {tier.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {tier.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                {tier.tagline}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/[0.06] mb-8">
                {tier.deliverables.map((del) => (
                  <div key={del} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={tier.href}
              className={`w-full text-center py-3 px-4 rounded-lg font-semibold text-xs transition-all ${
                tier.highlight
                  ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20"
                  : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
