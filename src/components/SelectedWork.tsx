"use client";

import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    client: "Manna Notes Project",
    tags: ["Mobile App", "Audio AI"],
    title: "Manna Bible — Cross-Platform Audio & Study Platform",
    desc: "An offline-first scripture app with synchronized audio playback, AI text-to-speech, and semantic search across thousands of chapters.",
    results: [
      "15,000+ active reading and study sessions",
      "Sub-100ms offline search across 31,000+ verses",
      "4.9★ across both app stores",
    ],
  },
  {
    client: "Nissie Ideal Shelters",
    tags: ["Web Engineering", "Lead Automation"],
    title: "Nissie Shelters — High-Conversion Property Portal",
    desc: "A real estate marketing platform with direct CRM syncing and automated WhatsApp lead routing to sales reps.",
    results: [
      "3.8x increase in qualified property inquiries",
      "2-second automated lead handoff via WhatsApp",
      "Zero manual spreadsheet data entry",
    ],
  },
  {
    client: "Scale Wealth Estate",
    tags: ["Fintech", "SaaS Platform"],
    title: "Scale Wealth — Investor Onboarding & Payment Rails",
    desc: "A multi-tenant investor onboarding portal with KYC verification and automated recurring invoice reconciliation.",
    results: [
      "₦100M+ in payments processed with zero downtime",
      "100% automated invoice reconciliation",
      "Onboarding cut from 3 days to under 5 minutes",
    ],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="section-pad border-t border-zinc-900/[0.06]">
      <div className="max-w-2xl mb-16">
        <div className="pill-badge mb-3">Case Studies</div>
        <h2 className="section-title">
          A few things we've built.
        </h2>
        <p className="section-desc">
          Real clients. Real outcomes.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-zinc-900/[0.16] hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {project.client}
              </span>
              <span className="text-zinc-300">·</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-3">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed mb-6 max-w-2xl">
              {project.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {project.results.map((res) => (
                <div
                  key={res}
                  className="flex items-start gap-2 p-3.5 rounded-xl bg-zinc-50 border border-zinc-900/[0.06] text-sm text-zinc-700"
                >
                  <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-600 transition-colors"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}