"use client";

import { motion } from "framer-motion";
import { Layers, Clock, HeartHandshake, ShieldCheck } from "lucide-react";

export default function WhyUsSection() {
  const differentiators = [
    {
      icon: Layers,
      title: "Built for your exact context",
      desc: "We don't install generic tools and call it a day. Every software engine and AI worker is tailored to your real team workflows, customer inquiries, and commercial goals.",
    },
    {
      icon: Clock,
      title: "Scoped proposal in 48 hours",
      desc: "You get a fixed-price scope with milestones before any work begins. No bloated billable hours, no vague retainers, no surprises at invoice time.",
    },
    {
      icon: HeartHandshake,
      title: "We stay in the room after launch",
      desc: "We don't vanish after handing over the keys. We actively monitor server health, optimize AI prompt performance, and ensure your product thrives in production.",
    },
    {
      icon: ShieldCheck,
      title: "100% Source Code & IP Ownership",
      desc: "All source code, database architecture, Figma designs, and credentials belong to you in full upon completion. No vendor lock-in, no hidden retainers.",
    },
  ];

  return (
    <section id="why-us" className="section-pad border-t border-white/[0.06] bg-[#0A0A0D]/40">
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Why Thoram</div>
        <h2 className="section-title">
          Built for your business.{" "}
          <span className="cyan-gradient">Not the other way around.</span>
        </h2>
        <p className="section-desc">
          Four reasons founders and growing companies keep building with us long after the initial launch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {differentiators.map((diff) => {
          const Icon = diff.icon;
          return (
            <div
              key={diff.title}
              className="p-8 rounded-2xl studio-glass studio-glass-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {diff.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {diff.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
