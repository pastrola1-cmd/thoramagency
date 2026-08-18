"use client";

import { motion } from "framer-motion";
import { Bot, Globe, Smartphone, Compass, ArrowUpRight, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: "ai-agents",
      icon: Bot,
      pill: "Service 01",
      title: "AI Agents & Autonomous Digital Workers",
      tagline: "Custom AI execution layers that operate 24/7 with human-grade precision.",
      features: [
        "Autonomous outbound prospecting SDRs",
        "24/7 AI customer care & WhatsApp escalation",
        "Operations & webhook data coordinator",
        "Automated collections & invoice chasing",
      ],
      href: "/services",
    },
    {
      id: "web-engineering",
      icon: Globe,
      pill: "Service 02",
      title: "Product Design & Web Engineering",
      tagline: "High-performance web applications and SaaS platforms engineered for scale.",
      features: [
        "Custom multi-tenant SaaS architectures",
        "High-converting digital landing experiences",
        "Payment rails (Paystack, Stripe, Escrow)",
        "Edge caching with sub-second page loads",
      ],
      href: "/services",
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      pill: "Service 03",
      title: "Native Mobile App Development",
      tagline: "Cross-platform iOS and Android applications compiled with native fluid speed.",
      features: [
        "Single-codebase Flutter compilation",
        "Offline-first storage & local SQLite sync",
        "Push notifications & transaction alerts",
        "In-app purchases & subscription handling",
      ],
      href: "/services",
    },
    {
      id: "strategy-advisory",
      icon: Compass,
      pill: "Service 04",
      title: "Strategy, Architecture & Advisory",
      tagline: "Clear engineering blueprints and plain-English roadmaps before code is written.",
      features: [
        "Technical feasibility & cost audits",
        "Codebase security & vulnerability review",
        "AI opportunity mapping & ROI scoping",
        "Actionable MVP roadmaps with fixed pricing",
      ],
      href: "/services",
    },
  ];

  return (
    <section id="services" className="section-pad border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="pill-badge mb-3">Our Core Services</div>
          <h2 className="section-title">
            Engineering services built for{" "}
            <span className="cyan-gradient">commercial impact.</span>
          </h2>
          <p className="section-desc">
            We don’t build generic websites or deliver abstract slide decks. We engineer, deploy, and scale custom digital products that directly drive revenue.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold group self-start md:self-auto"
        >
          <span>View all service specifications</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-8 rounded-2xl studio-glass studio-glass-hover flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400/80 bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.06]">
                    {service.pill}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.tagline}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <Link
                  href="/services"
                  className="text-xs font-mono text-zinc-400 group-hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Start Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
