"use client";

import { ShieldCheck, Layers, Clock, HeartHandshake, Globe2 } from "lucide-react";

const reasons = [
  {
    num: "01",
    title: "You own what we build.",
    desc: "100% of your source code repositories, intellectual property, database schemas and design assets belong to you upon completion. Zero vendor lock-in.",
  },
  {
    num: "02",
    title: "We build around the business.",
    desc: "We don't force your operation into a rigid off-the-shelf template. Every software system is engineered around your exact commercial workflows.",
  },
  {
    num: "03",
    title: "We move with discipline.",
    desc: "Defined scopes, fixed milestone pricing, weekly progress demos, and direct engineering access. Transparent timelines with zero mystery.",
  },
  {
    num: "04",
    title: "We don't disappear after launch.",
    desc: "Launch is the beginning of a product's life, not the end of the engagement. We provide active monitoring, QA stability warranties, and ongoing support.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section-pad border-t border-zinc-900/[0.06]">
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Why Thoram Group</div>
        <h2 className="section-title">
          Why companies choose Thoram
        </h2>
        <p className="section-desc">
          The technology partner businesses call when software becomes critical to how they operate, serve customers, or scale.
        </p>
      </div>

      <div className="space-y-0 mb-16">
        {reasons.map((reason) => (
          <div
            key={reason.num}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-zinc-900/[0.06] hover:bg-zinc-50/60 transition-colors"
          >
            <div className="md:col-span-2 text-2xl font-bold text-orange-600 font-mono">
              {reason.num}
            </div>
            <div className="md:col-span-4">
              <h3 className="text-xl font-bold text-zinc-900">{reason.title}</h3>
            </div>
            <div className="md:col-span-6">
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-zinc-900/[0.06]" />
      </div>

      {/* Strategic Origin Box */}
      <div className="p-8 sm:p-10 rounded-2xl bg-zinc-50 border border-zinc-900/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-600 uppercase tracking-wider font-semibold">
            <Globe2 className="w-4 h-4" />
            <span>Strategic Perspective · Built in Africa. Working Globally.</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            We understand the realities of building technology in complex, fast-moving markets — connectivity constraints, fragmented payment rails, operational nuances, and rapidly surging digital adoption. That firsthand experience equips us to engineer robust products that perform reliably anywhere in the world.
          </p>
        </div>
      </div>
    </section>
  );
}
