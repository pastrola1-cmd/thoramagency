"use client";

import { motion } from "framer-motion";
import { Compass, Target, ShieldCheck, HeartHandshake, Layers, Code, Globe2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const principles = [
    {
      icon: Target,
      title: "Priced for the outcome, not the hour",
      desc: "We don’t believe in bloated billable hours or vague retainers. We scope every milestone precisely so you always know what is being built and why it matters.",
    },
    {
      icon: Layers,
      title: "Engineered for your exact context",
      desc: "We don't install cookie-cutter templates. Every AI agent, database schema, and interface is custom-tailored to how your team operates and what your clients demand.",
    },
    {
      icon: Code,
      title: "We speak both tech and business",
      desc: "Most developers get lost in syntax, while most consultants speak in abstract slides. We bridge deep technical execution with clear commercial logic from day one.",
    },
    {
      icon: ShieldCheck,
      title: "100% IP & Code Ownership",
      desc: "All source code, database architectures, Figma UI kits, and credentials belong to you in full. We build zero vendor lock-in.",
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-20">
          <div className="pill-badge mb-3">About Thoram Group</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            A modern product studio working with{" "}
            <span className="cyan-gradient">ambitious teams worldwide.</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            We partner with ambitious founders, startups, and growing enterprises to design, engineer, and scale digital products that drive real revenue.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why we exist
            </h2>
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>
                In today's fast-moving software and AI landscape, too many businesses get caught between two extremes: expensive consultancies that deliver strategy decks without writing code, and offshore agencies that build generic templates without understanding business context.
              </p>
              <p>
                <strong className="text-white">Thoram Group was built to be the bridge.</strong> We combine high-conviction product design, frontier full-stack engineering, and practical commercial strategy to ship software that moves the needle.
              </p>
              <p>
                Whether it's deploying autonomous AI agents that handle 24/7 client operations, building native mobile apps with 15k+ active users, or architecting custom SaaS billing platforms, we build technology you can depend on for years.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl studio-glass space-y-6">
            <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Studio Snapshot</span>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div>
                <div className="text-3xl font-bold text-white font-mono">100%</div>
                <div className="text-xs text-zinc-400 mt-1">Client IP Ownership</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white font-mono">48h</div>
                <div className="text-xs text-zinc-400 mt-1">Scoped Proposal SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white font-mono">99.9%</div>
                <div className="text-xs text-zinc-400 mt-1">Uptime Architecture</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white font-mono">Zero</div>
                <div className="text-xs text-zinc-400 mt-1">Vendor Lock-In</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <div className="pill-badge mb-3">Core Principles</div>
            <h2 className="text-3xl font-bold text-white">
              How we operate and build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="p-8 rounded-2xl studio-glass studio-glass-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 rounded-3xl studio-glass text-center max-w-3xl mx-auto space-y-6">
          <div className="pill-badge">Let's Build Together</div>
          <h2 className="text-3xl font-bold text-white">
            Ready to scale your digital infrastructure?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a free 30-minute discovery call. We’ll identify your highest-impact opportunity and tell you exactly how we’d build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="btn-solid text-sm">
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
