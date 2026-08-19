"use client";

import { Bot, Globe, Smartphone, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: "ai-agents",
      icon: Bot,
      title: "AI Agents & Automation",
      desc: "AI agents and automations that save your team real hours every week. Less manual work, more time on the things that actually grow your business.",
      href: "/services",
    },
    {
      id: "web-engineering",
      icon: Globe,
      title: "Product Design & Web Engineering",
      desc: "You leave with a product that works, scales, and holds up in front of real users. Design, engineering, and everything in between.",
      href: "/services",
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      title: "Native Mobile Apps",
      desc: "iOS and Android from a single codebase — offline-first, fast, and shipped to both app stores.",
      href: "/services",
    },
    {
      id: "strategy-advisory",
      icon: Compass,
      title: "Strategy & Architecture",
      desc: "We figure out exactly what to build, what it costs, and create a path that makes sense for your team and your budget.",
      href: "/services",
    },
  ];

  return (
    <section id="services" className="section-pad border-t border-zinc-900/[0.06] bg-zinc-50/60">
      <div className="max-w-2xl mb-16">
        <div className="pill-badge mb-3">What We Do</div>
        <h2 className="section-title">
          Strategy. Engineering. Design.
        </h2>
        <p className="section-desc">
          No vanity work. Just products that move metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={service.href}
              className="group p-8 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-cyan-700/40 hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300 flex flex-col justify-between gap-8"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-cyan-700 flex items-center justify-center mb-6 group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="text-xs font-semibold text-zinc-500 group-hover:text-cyan-700 flex items-center gap-1.5 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}