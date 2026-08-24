"use client";

import { LayoutGrid, Globe, Smartphone, Zap, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const capabilities = [
    {
      id: "business-systems",
      icon: LayoutGrid,
      title: "Business Systems",
      desc: "Replace fragmented spreadsheets, manual workflows and disconnected tools with custom software built around how your business actually operates.",
      href: "/services",
    },
    {
      id: "customer-platforms",
      icon: Globe,
      title: "Customer Platforms",
      desc: "High-performance web platforms and SaaS products designed to acquire, serve, and retain customers with sub-second page speed.",
      href: "/services",
    },
    {
      id: "mobile-products",
      icon: Smartphone,
      title: "Mobile Products",
      desc: "Fast, reliable iOS and Android applications built for real-world usage and deployed to both Apple App Store and Google Play.",
      href: "/services",
    },
    {
      id: "automation-ai",
      icon: Zap,
      title: "Automation & AI",
      desc: "Automate repetitive operations, connect your data systems via webhooks and APIs, and give your team immense operational leverage.",
      href: "/services",
    },
    {
      id: "strategy-architecture",
      icon: Compass,
      title: "Product Strategy & Architecture",
      desc: "Not sure what to build? We turn the business problem into a technical roadmap, system architecture and executable product plan before you spend heavily.",
      href: "/services",
    },
  ];

  return (
    <section id="services" className="section-pad border-t border-zinc-900/[0.06] bg-zinc-50/60">
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">What We Build</div>
        <h2 className="section-title">
          No vanity work. Just products that move metrics.
        </h2>
        <p className="section-desc">
          We design and engineer digital products around real business problems — not trends, templates, or unnecessary complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          const isWide = idx === 3 || idx === 4;
          return (
            <Link
              key={cap.id}
              href={cap.href}
              className={`group p-8 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-orange-600/40 hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300 flex flex-col justify-between gap-6 ${
                idx === 3 ? "lg:col-span-1 md:col-span-1" : ""
              } ${idx === 4 ? "lg:col-span-2 md:col-span-2" : ""}`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2.5">
                  {cap.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
              <div className="text-xs font-semibold text-zinc-500 group-hover:text-orange-600 flex items-center gap-1.5 transition-colors">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
