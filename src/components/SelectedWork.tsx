"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, TrendingUp, Smartphone, Building2, Wallet } from "lucide-react";

export default function SelectedWork() {
  const projects = [
    {
      title: "Manna Bible — Cross-Platform Audio & Study Platform",
      client: "Manna Notes Project",
      category: "Mobile App & Audio AI",
      icon: Smartphone,
      description:
        "Engineered an offline-first mobile scripture app with synchronized audio playback, AI text-to-speech, and semantic search across thousands of chapters.",
      results: [
        "15,000+ active mobile reading sessions",
        "Sub-100ms offline query & search response",
        "Single-codebase deployment for iOS & Android",
      ],
      tech: ["Flutter", "Dart", "Firebase", "Offline SQLite", "AI Audio Engine"],
      link: "#contact",
    },
    {
      title: "Nissie Shelters — High-Conversion Property & CRM Engine",
      client: "Nissie Ideal Shelters",
      category: "Web Engineering & Lead Automation",
      icon: Building2,
      description:
        "Designed and engineered a high-converting luxury real estate marketing platform with direct CRM syncing and automated WhatsApp notifications for high-intent buyers.",
      results: [
        "3.8x increase in qualified property inquiries",
        "Instant 2-second automated lead handoff to sales reps",
        "Zero manual spreadsheet data entry required",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp Cloud API", "Supabase"],
      link: "#contact",
    },
    {
      title: "Scale Wealth — Secure Investor Onboarding & Payment Rails",
      client: "Scale Wealth Estate",
      category: "Fintech & SaaS Platform",
      icon: Wallet,
      description:
        "Architected an automated multi-tenant investor onboarding portal with KYC verification, automated recurring invoice reconciliation, and Paystack payment gateway integration.",
      results: [
        "Processed high-volume secure property transactions",
        "100% automated invoice reconciliation with zero accounting mismatch",
        "Bank-grade authentication and audit trail logging",
      ],
      tech: ["Next.js", "Node.js", "Paystack", "PostgreSQL", "Tailwind CSS"],
      link: "#contact",
    },
  ];

  return (
    <section id="work" className="section-pad border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Selected Work</div>
        <h2 className="section-title">
          Proven outcomes. <span className="cyan-gradient">Production-ready.</span>
        </h2>
        <p className="section-desc">
          A selection of digital products, AI automation pipelines, and mobile platforms we have built and scaled for our partners.
        </p>
      </div>

      {/* Case Studies Cards */}
      <div className="space-y-8">
        {projects.map((project, idx) => {
          const Icon = project.icon;
          return (
            <div
              key={project.title}
              className="p-8 sm:p-10 rounded-2xl studio-glass studio-glass-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Context & Overview */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {project.category}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {project.client}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Measurable Impact & Action */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Key Measured Outcomes</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {project.results.map((res) => (
                      <div key={res} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/[0.06] text-xs font-semibold text-zinc-300 hover:text-cyan-400 transition-colors"
                >
                  <span>Discuss a similar project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
