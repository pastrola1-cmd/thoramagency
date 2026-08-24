"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Layers, Clock, HeartHandshake, Globe2, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "You own what we build.",
      desc: "100% of your source code repositories, intellectual property, database schemas, and design assets belong to you in full. Zero vendor lock-in.",
    },
    {
      icon: Layers,
      title: "We build around the business.",
      desc: "We don't force your operation into a rigid off-the-shelf template. Every software system is engineered around your exact commercial workflows.",
    },
    {
      icon: Clock,
      title: "We move with discipline.",
      desc: "Defined scopes, fixed milestone pricing, weekly progress demos, and direct engineering access. Transparent timelines with zero mystery.",
    },
    {
      icon: HeartHandshake,
      title: "We don't disappear after launch.",
      desc: "Launch is the beginning of a product's life, not the end of the engagement. We provide active monitoring, QA stability warranties, and ongoing support.",
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-20">
          <div className="pill-badge mb-3">About Thoram Group</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            Product Engineering &{" "}
            <span className="text-orange-600">Technology Studio.</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            We design, build, and scale high-performance digital products for businesses ready to move faster — from internal business systems and customer platforms to mobile applications and automation.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              The Technology Partner for Critical Software
            </h2>
            <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
              <p>
                Too many businesses get caught between two extremes: expensive consultancies that deliver strategy decks without writing code, and offshore agencies that build generic templates without understanding commercial context.
              </p>
              <p>
                <strong className="text-zinc-900">Thoram Group was built to be the bridge.</strong> We are the technology partner businesses call when software becomes critical to how they operate, serve customers, or scale.
              </p>
              <p>
                Whether it's building multi-campus school management portals, native mobile apps with tens of thousands of active users, or automated real estate and fintech payment rails, we turn complex problems into reliable digital products.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#F8F8F6] border border-zinc-200/80 space-y-6">
            <div className="flex items-center gap-3 text-orange-600 font-mono text-xs uppercase tracking-wider font-semibold">
              <Globe2 className="w-4 h-4" />
              <span>Built in Africa. Working Globally.</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We understand the realities of building technology in complex, fast-moving markets — connectivity constraints, fragmented payment rails, operational nuances, and rapidly growing digital demand. That firsthand experience equips us to engineer robust products that perform reliably anywhere in the world.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200">
              <div className="p-4 rounded-xl bg-white border border-zinc-200/70">
                <div className="text-2xl font-bold text-zinc-900 font-mono">100%</div>
                <div className="text-xs text-zinc-500 mt-1">Client IP Ownership</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200/70">
                <div className="text-2xl font-bold text-zinc-900 font-mono">48h</div>
                <div className="text-xs text-zinc-500 mt-1">Proposal SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <div className="pill-badge mb-3">Why Companies Choose Thoram</div>
            <h2 className="text-3xl font-bold text-zinc-900">
              How we operate and deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="p-8 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-orange-600/40 hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-orange-600 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 sm:p-14 rounded-3xl bg-[#F8F8F6] border border-zinc-200/80 text-center max-w-3xl mx-auto space-y-6">
          <div className="pill-badge">Start a Project</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Have a product worth building?
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Tell us what you're trying to build, fix, or automate. We'll assess the problem, tell you what it will take, what it should cost, and give you a clear path forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="btn-solid text-sm">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20have%20a%20project%20I%20would%20like%20to%20discuss."
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
