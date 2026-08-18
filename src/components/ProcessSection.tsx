"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discovery & Alignment",
      subtitle: "We get into your business.",
      desc: "We understand your operational workflows, team bottlenecks, and where custom software or AI agents will deliver the fastest return on investment. No assumptions.",
    },
    {
      num: "02",
      icon: PenTool,
      title: "Architecture & Design",
      subtitle: "Mapped in plain English.",
      desc: "We design intuitive user interfaces and architect the data models in clear, accessible language before writing a single line of code. You approve the blueprint, then we build.",
    },
    {
      num: "03",
      icon: Code2,
      title: "Engineering & QA",
      subtitle: "Tested on real scenarios.",
      desc: "We write clean, modular, production-grade code. We train and stress-test every feature and automation against real edge cases from your actual day-to-day operations.",
    },
    {
      num: "04",
      icon: Rocket,
      title: "Deployment & Handover",
      subtitle: "Keys transferred. 100% yours.",
      desc: "We launch your systems to live production, transfer 100% of the intellectual property, source code, and credentials, and provide ongoing monitoring so you scale without hitch.",
    },
  ];

  return (
    <section id="how-it-works" className="section-pad border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Delivery Protocol</div>
        <h2 className="section-title">
          From first conversation to live deployment.
        </h2>
        <p className="section-desc">
          Four structured steps. Zero guesswork. You always know what is being built, why it matters, and when it will go live.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-7 rounded-2xl studio-glass studio-glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {step.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mb-3">
                  {step.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
