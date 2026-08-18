"use client";

import { motion } from "framer-motion";
import { Bot, Globe, Smartphone, Compass, Check, ArrowRight, Sparkles, Shield, Cpu, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "ai-agents",
      icon: Bot,
      pill: "Service 01",
      title: "AI Agents & Autonomous Digital Workers",
      tagline: "Custom AI execution layers that operate 24/7 with human-grade reasoning.",
      description:
        "We build, fine-tune, and deploy bespoke AI agents that integrate directly into your communications, databases, and operational workflows. We replace fragile manual processes with autonomous digital workers that scale your business without increasing payroll overhead.",
      deliverables: [
        {
          name: "Autonomous Outbound SDR & Lead Qualification",
          desc: "Researches prospective accounts, crafts hyper-personalized outreach, qualifies replies, and books meetings into your team's calendar.",
        },
        {
          name: "24/7 AI Customer Care & Support",
          desc: "Trained on your private documentation and ticketing history to resolve 80%+ of customer inquiries instantly across web and WhatsApp.",
        },
        {
          name: "Multi-Agent Operations Coordinator (MCP)",
          desc: "Moves structured data between your CRM, accounting software, and internal tools using Model Context Protocol.",
        },
        {
          name: "Automated Collections & Invoice Chasing",
          desc: "Tracks invoice aging, sends respectful follow-up sequences, and reconciles incoming payments automatically.",
        },
      ],
      tech: [
        "Claude 3.5 Sonnet",
        "OpenAI o3-mini & GPT-4o",
        "Gemini 2.0 Flash",
        "DeepSeek-R1",
        "LangGraph & CrewAI",
        "Pinecone & pgvector",
        "Model Context Protocol (MCP)",
        "Python 3.12",
        "Supabase",
      ],
    },
    {
      id: "web-engineering",
      icon: Globe,
      pill: "Service 02",
      title: "Product Design & Web Engineering",
      tagline: "High-performance web applications and SaaS platforms engineered for scale.",
      description:
        "We engineer full-stack web platforms, subscription SaaS portals, and enterprise dashboards with extreme attention to performance, security, and conversion rates. Built on modern Next.js 15, React 19, Turbopack, and edge serverless foundations for 99.99% uptime.",
      deliverables: [
        {
          name: "Custom Multi-Tenant SaaS Architectures",
          desc: "End-to-end subscription portals with workspace permissions, user roles, and team administration.",
        },
        {
          name: "High-Converting Digital Landing Experiences",
          desc: "Speed-optimized, SEO-dominant landing pages engineered to convert visitors into qualified sales pipeline.",
        },
        {
          name: "Payment Gateway & Billing Infrastructure",
          desc: "Seamless integration of Paystack, Stripe, and crypto payment rails with automated webhook reconciliation.",
        },
        {
          name: "API Design & Database Schema Modeling",
          desc: "Clean RESTful and GraphQL APIs with PostgreSQL and Upstash Redis caching for sub-millisecond query responses.",
        },
      ],
      tech: [
        "Next.js 15",
        "React 19",
        "TypeScript 5.5",
        "Tailwind CSS",
        "Turbopack",
        "PostgreSQL (Drizzle / Prisma)",
        "Upstash Redis",
        "Paystack & Stripe Rails",
        "Cloudflare Edge",
      ],
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      pill: "Service 03",
      title: "Native Mobile App Development",
      tagline: "Cross-platform iOS and Android applications compiled with native fluid speed.",
      description:
        "We build high-performance mobile applications using Flutter 3.24, delivering beautiful native iOS and Android experiences from a single robust codebase. We handle everything from UI design and sensor integration to App Store & Google Play approval.",
      deliverables: [
        {
          name: "Single-Codebase iOS & Android Compilation",
          desc: "Native 60fps performance on both Apple App Store and Google Play Store without doubling development cost.",
        },
        {
          name: "Offline-First Storage & Local Caching",
          desc: "Seamless offline capability using local SQLite & Isar databases that sync bidirectionally when connectivity returns.",
        },
        {
          name: "Real-Time Push Notifications & Background Ops",
          desc: "Reliable APNs and Firebase Cloud Messaging for targeted retention and transaction alerts.",
        },
        {
          name: "In-App Purchases & Subscriptions",
          desc: "Apple StoreKit 2 and Google Play Billing v7 workflows with receipt validation and entitlement management.",
        },
      ],
      tech: [
        "Flutter 3.24",
        "Dart",
        "Swift & Kotlin Native Bridges",
        "Firebase Auth & Cloud Messaging",
        "SQLite & Isar Vector Cache",
        "StoreKit 2 & Play Billing v7",
        "GitHub Actions Mobile CI/CD",
      ],
    },
    {
      id: "strategy-advisory",
      icon: Compass,
      pill: "Service 04",
      title: "Strategy, Technical Architecture & Advisory",
      tagline: "Clear engineering blueprints and plain-English roadmaps before code is written.",
      description:
        "For teams who want complete clarity before committing to a major engineering build. We audit legacy systems, map technical feasibility, design scalable database architectures, and deliver actionable MVP roadmaps.",
      deliverables: [
        {
          name: "Technical Feasibility & Architecture Blueprints",
          desc: "Complete system architecture diagrams, infrastructure cost estimates, and risk mitigation strategies.",
        },
        {
          name: "Codebase Security & Vulnerability Audits",
          desc: "Comprehensive review of existing repositories for security flaws, performance bottlenecks, and technical debt.",
        },
        {
          name: "AI Opportunity Mapping & ROI Scoping",
          desc: "We analyze your business workflows to pinpoint the highest-ROI automation use-cases before investing.",
        },
        {
          name: "MVP Scope Specification & Phased Roadmaps",
          desc: "Itemized sprint roadmaps ensuring your product launches on schedule with zero scope bloat.",
        },
      ],
      tech: [
        "System Architecture Blueprints",
        "Cloudflare Workers & AWS Infrastructure",
        "Docker & Containerization",
        "Schema Design (PostgreSQL / Redis)",
        "Security Audits & Penetration Testing",
        "Fixed-Scope Sprint Specs",
      ],
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-20">
          <div className="pill-badge mb-3">Our Core Services</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Services engineered for{" "}
            <span className="cyan-gradient">real business growth.</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            We partner with ambitious teams to engineer bespoke digital products. From autonomous AI agents to mission-critical web and mobile applications, our engineering standards are designed for measurable commercial outcomes.
          </p>
        </div>

        {/* Services Deep Dives */}
        <div className="space-y-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="p-8 sm:p-12 rounded-3xl studio-glass relative overflow-hidden"
              >
                {/* Header of Service */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/[0.06] mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                        {service.pill}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-solid text-xs py-2.5 px-5 font-semibold shrink-0"
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Description & Core Value */}
                <div className="max-w-3xl mb-10">
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* 4 Deliverable Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {service.deliverables.map((del) => (
                    <div
                      key={del.name}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{del.name}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">
                        {del.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Footer */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 mr-2">Technologies & Protocols:</span>
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Consult on this service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-20 p-10 rounded-3xl studio-glass text-center max-w-3xl mx-auto space-y-6">
          <div className="pill-badge">Let's Build</div>
          <h2 className="text-3xl font-bold text-white">
            Have a project in mind?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a free 30-minute discovery call. We’ll identify your highest-impact opportunity and tell you exactly how we’d build it. No pitch. Just clarity.
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
