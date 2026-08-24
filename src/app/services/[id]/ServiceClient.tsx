"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Check,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface ServiceClientProps {
  service: ServiceData;
}

export default function ServiceClient({ service }: ServiceClientProps) {
  const deliveryGuarantees = [
    {
      title: "100% Source Code & IP Ownership",
      desc: "Full transfer of all GitHub repositories, Figma design files, and database schemas upon completion.",
    },
    {
      title: "Production-Grade Engineering",
      desc: "Zero cookie-cutter templates. Engineered using modern type-safe architectures with 99.99% uptime target.",
    },
    {
      title: "Direct Engineering Lead Access",
      desc: "Work directly with our senior product architects. No communication middle-men or account manager telephone games.",
    },
    {
      title: "30-Day Post-Launch Warranty",
      desc: "Complimentary monitoring, prompt bug fixes, and operational stability warranty following live deployment.",
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-orange-600 transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>

        {/* Service Header */}
        <div className="mb-16">
          <div className="pill-badge mb-3">{service.category}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-orange-600/90 font-mono mb-6">
            {service.tagline}
          </p>
          <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-3xl">
            {service.desc}
          </p>
        </div>

        {/* Challenge vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl studio-glass space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
              The Operational Bottleneck
            </div>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              {service.problem}
            </p>
          </div>

          <div className="p-8 rounded-2xl studio-glass space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
              Our Engineering Solution
            </div>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Deliverables & Engineering Guarantees Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left: Deliverables list */}
          <div className="lg:col-span-7 p-8 rounded-2xl studio-glass space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600">
              <Layers className="w-4 h-4" />
              <span>Core Scope & Deliverables</span>
            </div>

            <div className="space-y-4">
              {service.deliverables.map((del) => (
                <div key={del.name} className="p-4 rounded-xl bg-zinc-900/[0.02] border border-zinc-900/[0.05]">
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 mb-1">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{del.name}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed pl-6">
                    {del.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Delivery Guarantees */}
          <div className="lg:col-span-5 p-8 rounded-2xl studio-glass space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Delivery Standards</span>
            </div>

            <div className="space-y-3.5">
              {deliveryGuarantees.map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-zinc-900/[0.02] border border-zinc-900/[0.05]">
                  <div className="text-xs font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="p-8 rounded-2xl studio-glass mb-16 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 mr-2">Technologies & Protocols:</span>
            {service.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded bg-zinc-900/[0.03] border border-zinc-900/[0.06] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl studio-glass text-center max-w-2xl mx-auto space-y-6">
          <div className="pill-badge">Consultation</div>
          <h2 className="text-3xl font-bold text-zinc-900">
            Ready to deploy this capability?
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto">
            Book a 30-minute discovery session with our engineering director. We will assess your context and provide a transparent proposal in 48 hours.
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
