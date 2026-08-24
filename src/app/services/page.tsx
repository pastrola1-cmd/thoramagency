"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Globe, Smartphone, Zap, Compass, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const capabilities = [
    {
      id: "business-systems",
      icon: LayoutGrid,
      pill: "Capability 01",
      title: "Business Systems",
      tagline: "Custom software that replaces fragmented spreadsheets and manual operations.",
      description:
        "We build operational software systems engineered around how your business actually functions. From multi-branch management portals and custom inventory engines to automated ERP workflows and role-based staff portals.",
      deliverables: [
        {
          name: "Multi-Tenant Operational Portals",
          desc: "Role-based dashboards with granular permission controls for management, staff, and accountants.",
        },
        {
          name: "Automated Record & Calculation Engines",
          desc: "Algorithmic computation systems that eliminate spreadsheet errors and automate complex operational math.",
        },
        {
          name: "Database Consolidation & ERP Syncing",
          desc: "Unifying fragmented legacy databases into a secure, high-uptime PostgreSQL backbone.",
        },
        {
          name: "Digital Document & Certificate Verification",
          desc: "Cryptographic QR-verified document generation to prevent forgery and streamline compliance.",
        },
      ],
      tech: ["Next.js 14", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    },
    {
      id: "customer-platforms",
      icon: Globe,
      pill: "Capability 02",
      title: "Customer Platforms & SaaS",
      tagline: "High-performance web platforms designed to acquire, serve, and retain customers.",
      description:
        "We engineer full-stack web applications, subscription SaaS platforms, and customer-facing portals with extreme attention to conversion velocity, security, and sub-second page loads.",
      deliverables: [
        {
          name: "Custom SaaS Subscription Architectures",
          desc: "End-to-end customer self-service portals with automated recurring billing and account management.",
        },
        {
          name: "High-Converting Digital Landing Experiences",
          desc: "Speed-optimized web experiences engineered to convert inbound traffic into qualified leads.",
        },
        {
          name: "Payment Gateway & Billing Infrastructure",
          desc: "Seamless Paystack, Stripe, and bank transfer rails with automated webhook reconciliation.",
        },
        {
          name: "Real-Time User & Admin Dashboards",
          desc: "Interactive data analytics, activity feeds, and notification centers.",
        },
      ],
      tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Redis", "Paystack API", "Stripe", "Cloudflare"],
    },
    {
      id: "mobile-products",
      icon: Smartphone,
      pill: "Capability 03",
      title: "Mobile Products",
      tagline: "Fast, reliable iOS and Android applications built for real-world usage.",
      description:
        "We build native-performance mobile applications using Flutter, delivering robust iOS and Android experiences from a single codebase. We handle everything from UX architecture to App Store & Google Play launch.",
      deliverables: [
        {
          name: "Single-Codebase iOS & Android Compilation",
          desc: "Fluid 60fps performance on both Apple App Store and Google Play without duplicate engineering overhead.",
        },
        {
          name: "Offline-First Storage & Local Caching",
          desc: "Reliable offline performance with background synchronization when network connectivity resumes.",
        },
        {
          name: "Push Notifications & Device Integrations",
          desc: "Targeted push messaging, biometrics, audio players, camera access, and background sync.",
        },
        {
          name: "App Store Publishing & Release Management",
          desc: "Complete handling of Apple and Google submission, review guidelines, and OTA updates.",
        },
      ],
      tech: ["Flutter", "Dart", "SQLite / Isar", "Firebase Cloud Messaging", "Audio Engine", "REST / GraphQL"],
    },
    {
      id: "automation-ai",
      icon: Zap,
      pill: "Capability 04",
      title: "Automation & AI Workflows",
      tagline: "Systems that reduce repetitive work and give your team immense operational leverage.",
      description:
        "We engineer automated workflows and AI execution layers that integrate directly into your communications, databases, and third-party tools. From instant WhatsApp lead routing to automated customer support.",
      deliverables: [
        {
          name: "WhatsApp Cloud API & CRM Routing",
          desc: "Instant 2-second lead handoffs from web forms to sales reps on WhatsApp with full context.",
        },
        {
          name: "Automated Invoice & Collections Chasing",
          desc: "Trigger-based payment reminders, digital receipt issuance, and automated ledger reconciliation.",
        },
        {
          name: "Custom AI Knowledge Assistants",
          desc: "Retrieval-augmented AI agents trained on private company documentation for instant support resolution.",
        },
        {
          name: "Multi-System Webhook Orchestration",
          desc: "Connecting disparate platforms into a unified automated data pipeline.",
        },
      ],
      tech: ["Python", "Node.js", "WhatsApp Cloud API", "LangGraph", "Vector DBs", "Claude / OpenAI APIs"],
    },
    {
      id: "strategy-architecture",
      icon: Compass,
      pill: "Capability 05",
      title: "Product Strategy & Architecture",
      tagline: "A clear technical and product roadmap before you spend heavily on development.",
      description:
        "Not sure what to build or how to build it? We analyze the commercial bottleneck, define the technical requirements, design the system architecture, and map out an executable development plan.",
      deliverables: [
        {
          name: "Technical Architecture & System Design",
          desc: "Comprehensive database schemas, API specs, infrastructure topologies, and security protocols.",
        },
        {
          name: "Scoped Product Roadmap & Milestone Breakdown",
          desc: "Fixed-cost, timeline-bound engineering milestones that prevent scope bloat and wasted capital.",
        },
        {
          name: "Interactive Figma UX/UI Prototypes",
          desc: "High-fidelity clickable designs ready for user validation and engineering handoff.",
        },
        {
          name: "Build vs. Buy Evaluation",
          desc: "Objective technical analysis on where custom engineering delivers competitive advantage.",
        },
      ],
      tech: ["Figma", "System Architecture Diagrams", "PostgreSQL Schemas", "OpenAPI Specifications"],
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="pill-badge mb-3">What We Build</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            Software engineered for{" "}
            <span className="text-cyan-700">commercial outcomes.</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            We design and build digital products around real business problems — not trends, templates, or unnecessary complexity.
          </p>
        </div>

        {/* Capabilities List */}
        <div className="space-y-12 mb-24">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                id={cap.id}
                className="p-8 sm:p-12 rounded-3xl bg-white border border-zinc-900/[0.08] hover:border-zinc-900/[0.16] hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900/[0.04] border border-zinc-900/[0.08] text-cyan-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
                        {cap.pill}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                      {cap.title}
                    </h2>
                    <p className="text-sm font-medium text-zinc-700">
                      {cap.tagline}
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {cap.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                        Core Technologies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-zinc-50/80 p-6 sm:p-8 rounded-2xl border border-zinc-900/[0.06] space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-semibold block">
                      Core Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cap.deliverables.map((del) => (
                        <div
                          key={del.name}
                          className="p-4 rounded-xl bg-white border border-zinc-200/80 space-y-1.5"
                        >
                          <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                            <span>{del.name}</span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {del.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
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
