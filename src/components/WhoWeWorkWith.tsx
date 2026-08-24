"use client";

import { Sparkles, TrendingUp, Rocket, RefreshCw } from "lucide-react";

const personas = [
  {
    icon: Rocket,
    title: "Founders & Venture Teams",
    desc: "Turning a validated market thesis into a production-ready, scalable software product with zero architectural debt.",
  },
  {
    icon: TrendingUp,
    title: "Growing Businesses",
    desc: "Replacing fragile spreadsheets, manual bottlenecks, and disconnected tools with custom software built around how you operate.",
  },
  {
    icon: Sparkles,
    title: "Companies Launching New Products",
    desc: "From initial technical architecture and UX design to full-stack engineering, payment rails, and production launch.",
  },
  {
    icon: RefreshCw,
    title: "Organizations Modernizing Legacy Systems",
    desc: "Connecting fragmented operational tools, ERPs, and databases into a unified, high-uptime digital platform.",
  },
];

export default function WhoWeWorkWith() {
  return (
    <section className="section-pad border-t border-zinc-900/[0.06]">
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Who We Work With</div>
        <h2 className="section-title">
          Engineered for teams at critical inflection points.
        </h2>
        <p className="section-desc">
          We partner with organizations where technology is central to commercial execution and long-term scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {personas.map((persona) => {
          const Icon = persona.icon;
          return (
            <div
              key={persona.title}
              className="p-8 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-orange-600/40 hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-orange-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2.5">
                  {persona.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {persona.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
