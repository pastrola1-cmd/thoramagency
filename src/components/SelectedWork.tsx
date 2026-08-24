"use client";

import { Check, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    client: "EduThoram Schools Network",
    tags: ["School Portal", "Institutional Software"],
    title: "EduThoramOS",
    headline: "From fragmented school administration to a unified operating system.",
    desc: "A comprehensive multi-campus school management portal automating tuition fee billing, continuous assessment grade computations, timetable scheduling, and parent WhatsApp notifications.",
    image: "/case-studies/eduthoram-dashboard.png",
    liveUrl: "https://eduthoramos.web.app",
    results: [
      "12,000+ student records managed",
      "99.9% uptime architecture",
      "Report-card computation: 2 weeks → 30s",
    ],
  },
  {
    client: "D-Wealth Global / DGNCrm",
    tags: ["Admissions CRM", "Pipeline Analytics"],
    title: "D-Wealth CRM",
    headline: "From spreadsheet chaos to real-time counselor pipeline and team velocity command.",
    desc: "An enterprise international student admissions CRM featuring multi-stage applicant tracking, automated hot-lead priority queues, document vaults, and team bottleneck detection.",
    image: "/case-studies/dwealth-dashboard.png",
    liveUrl: "https://dgncrm.com",
    results: [
      "500+ student visa & university pipelines tracked",
      "Real-time counselor outreach velocity logs",
      "100% centralized student document repository",
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
    tags: ["Brokerage CRM", "Lead Sourcing"],
    title: "ScaleWealth Estate",
    headline: "Brokerage CRM with automated Google Places lead extraction and pipeline tracking.",
    desc: "An all-in-one real estate agency platform featuring automated Google Places prospect sourcing, deal stage pipelines, revenue goal tracking, and inspection dispatching.",
    image: "/case-studies/scalewealth-dashboard.png",
    results: [
      "₦800M+ deal pipelines & revenue tracked",
      "Automated Google Places API lead discovery",
      "Centralized inspection calendar & task routing",
    ],
  },
  {
    client: "Manna Bible Project",
    tags: ["Scripture App", "Audio & Community"],
    title: "Manna Bible",
    headline: "High-performance scripture platform with devotionals, study reader, and community.",
    desc: "An offline-first scripture platform featuring daily devotionals, distraction-free reader modes, reflection journaling with sermon linking, and active community fellowship feeds.",
    image: "/case-studies/manna-home.png",
    results: [
      "15,000+ active reading & devotional sessions",
      "Sub-100ms on-device search with zero lag",
      "Integrated reflection journal & community feeds",
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
          className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-600 hover:text-orange-500 font-semibold group self-start md:self-auto"
        >
          <span>View all case studies</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-900/[0.08] hover:border-zinc-900/[0.16] hover:shadow-xl hover:shadow-zinc-900/[0.04] transition-all duration-300 group overflow-hidden"
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
              <span className="text-xs font-mono text-orange-600 font-semibold uppercase tracking-wider block mb-1">
                {project.title}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-tight">
                {project.headline}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed mb-6 max-w-3xl">
              {project.desc}
            </p>

            {/* Product Screenshot Showcase (when available) */}
            {project.image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-900/[0.10] bg-zinc-900/[0.02] shadow-sm">
                {/* Browser Top Bar */}
                <div className="px-4 py-2.5 bg-zinc-100/90 border-b border-zinc-900/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 truncate max-w-[280px]">
                    {project.liveUrl || project.title}
                  </div>
                  <div className="w-8" />
                </div>
                {/* Image */}
                <div className="relative w-full bg-zinc-950/5 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} Interface Preview`}
                    className="w-full h-auto max-h-[620px] object-contain rounded-xl shadow-xs group-hover:scale-[1.005] transition-transform duration-500"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {project.results.map((res) => (
                <div
                  key={res}
                  className="flex items-start gap-2 p-3.5 rounded-xl bg-zinc-50 border border-zinc-900/[0.06] text-xs sm:text-sm text-zinc-700 font-medium"
                >
                  <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-500 transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <span>Live System</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
