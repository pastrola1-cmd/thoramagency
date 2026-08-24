"use client";

import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    client: "EduThoram Schools Network",
    tags: ["School Portal", "Institutional Software"],
    title: "EduThoram",
    headline: "From fragmented school administration to a unified operating system.",
    desc: "A comprehensive multi-campus school management portal automating tuition fee billing, continuous assessment grade computations, and parent WhatsApp notifications.",
    results: [
      "12,000+ student records managed",
      "99.9% uptime architecture",
      "Report-card computation: 2 weeks → 30s",
    ],
  },
  {
    client: "Nissie Ideal Shelters",
    tags: ["Web Platform", "WhatsApp Lead Routing"],
    title: "Nissie Shelters",
    headline: "From lost spreadsheet leads to 2-second automated WhatsApp CRM routing.",
    desc: "A luxury property marketing portal with sub-second page loads and automated 2-second lead handoff directly to sales reps via WhatsApp Cloud API.",
    results: [
      "3.8x increase in qualified property inquiries",
      "2-second automated lead handoff via WhatsApp",
      "Zero manual spreadsheet data entry",
    ],
  },
  {
    client: "Scale Wealth Estate",
    tags: ["Fintech", "Payment Rails", "Automated KYC"],
    title: "Scale Wealth",
    headline: "Bank-grade investor onboarding and automated payment reconciliation.",
    desc: "An enterprise investor onboarding portal with KYC document verification, Paystack recurring subscription webhooks, and automated statement generation.",
    results: [
      "₦100M+ in payments processed safely",
      "100% automated invoice reconciliation",
      "Investor onboarding: 3 days → under 5 mins",
    ],
  },
  {
    client: "Manna Notes Project",
    tags: ["Mobile App", "Audio Engine", "Flutter"],
    title: "Manna Bible",
    headline: "High-performance scripture platform with synchronized audio and local-first caching.",
    desc: "An offline-first mobile scripture app with synchronized multi-track audio playback, on-device caching, and instant search across 31,000+ verses.",
    results: [
      "15,000+ active reading & study sessions",
      "Sub-100ms on-device search with zero lag",
      "4.9★ rating across Apple & Google app stores",
    ],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="section-pad border-t border-zinc-900/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="pill-badge mb-3">Case Studies & Impact</div>
          <h2 className="section-title">
            Real products. Real outcomes.
          </h2>
          <p className="section-desc">
            We don't build portfolios of mockups. We engineer software that moves critical business metrics and eliminates operational friction.
          </p>
        </div>

        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-700 hover:text-cyan-600 font-semibold group self-start md:self-auto"
        >
          <span>View all case studies</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-zinc-900/[0.16] hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300 group"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
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

            <div className="mb-4">
              <span className="text-xs font-mono text-cyan-700 font-semibold uppercase tracking-wider block mb-1">
                {project.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-cyan-700 transition-colors">
                {project.headline}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed mb-6 max-w-3xl">
              {project.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {project.results.map((res) => (
                <div
                  key={res}
                  className="flex items-start gap-2 p-3.5 rounded-xl bg-zinc-50 border border-zinc-900/[0.06] text-xs sm:text-sm text-zinc-700 font-medium"
                >
                  <Check className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-600 transition-colors"
            >
              <span>Read Full Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}