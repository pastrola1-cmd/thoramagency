export interface ServiceDeliverable {
  name: string;
  desc: string;
}

export interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  desc: string;
  problem: string;
  solution: string;
  deliverables: ServiceDeliverable[];
  tech: string[];
  features: string[];
  simulatorType: "ai" | "mobile" | "web" | "strategy";
}

export const servicesData: ServiceData[] = [
  {
    id: "ai-agents",
    title: "AI Agents & Autonomous Digital Workers",
    tagline: "Frontier AI execution layers that operate 24/7 with human-grade reasoning.",
    category: "Service 01",
    desc: "We engineer, fine-tune, and deploy bespoke autonomous AI agents and multi-agent orchestrations that integrate directly into your communications, databases, and operational workflows. From autonomous outbound prospecting SDRs to 24/7 customer care and automated invoice reconciliation.",
    problem: "Sales, support, and ops teams lose hundreds of hours every month to repetitive manual tasks—reading routine emails, qualifying cold leads, and copy-pasting data across tools.",
    solution: "We build custom multi-agent architectures (LangGraph, CrewAI) powered by Claude 3.5 Sonnet, OpenAI o3-mini/GPT-4o, and Gemini 2.0, connected to your private vector database and operational tools via webhooks and MCP.",
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
        desc: "Coordinates complex workflows between CRM, databases, accounting software, and external APIs using Model Context Protocol.",
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
      "FastAPI & Supabase",
    ],
    features: [
      "Multi-agent reasoning with fallback guardrails",
      "Semantic knowledge base retrieval (RAG)",
      "Human-in-the-loop escalation checkpoints",
      "Zero-retention private data security",
    ],
    simulatorType: "ai",
  },
  {
    id: "ai-solutions", // Alias for backward compatibility
    title: "AI Agents & Autonomous Digital Workers",
    tagline: "Frontier AI execution layers that operate 24/7 with human-grade reasoning.",
    category: "Service 01",
    desc: "We engineer, fine-tune, and deploy bespoke autonomous AI agents and multi-agent orchestrations.",
    problem: "Teams spend hundreds of hours on manual administrative tasks that restrict growth.",
    solution: "We deploy custom autonomous AI agents and vector pipelines that execute operations with precision.",
    deliverables: [
      {
        name: "Autonomous Outbound SDR",
        desc: "Researches prospects and books meetings automatically.",
      },
      {
        name: "24/7 AI Support Worker",
        desc: "Resolves customer support tickets with zero wait time.",
      },
    ],
    tech: ["Claude 3.5 Sonnet", "OpenAI o3-mini", "Gemini 2.0", "LangGraph", "Vector DBs"],
    features: ["Autonomous routing", "Private knowledge base", "Audit logging"],
    simulatorType: "ai",
  },
  {
    id: "web-engineering",
    title: "Product Design & Web Engineering",
    tagline: "Next-Gen, High-Speed Platforms Engineered for Scale and Conversions",
    category: "Service 02",
    desc: "We engineer full-stack web applications, subscription SaaS portals, and enterprise landing experiences designed for maximum conversion and speed. Built on modern Next.js 15, React 19, Turbopack, and edge serverless architectures.",
    problem: "Slow-loading legacy website builders and fragmented tech stacks destroy conversion rates, rank poorly on search engines, and fail under heavy traffic spikes.",
    solution: "We build high-performance Next.js 15 web platforms with sub-second page loads, clean UI/UX design in Figma, and automated payment gateway integrations (Paystack / Stripe).",
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
    features: [
      "99+ Google Lighthouse Core Web Vitals score",
      "Edge caching and global CDN distribution",
      "Automated Paystack & Stripe subscription webhooks",
      "Role-based access control (RBAC)",
    ],
    simulatorType: "web",
  },
  {
    id: "web-development", // Alias
    title: "Product Design & Web Engineering",
    tagline: "Next-Gen, High-Speed Platforms Engineered for Scale and Conversions",
    category: "Service 02",
    desc: "We engineer full-stack web applications, subscription SaaS portals, and enterprise landing experiences designed for maximum conversion.",
    problem: "Legacy websites fail to convert visitors and suffer from technical debt.",
    solution: "We engineer modern Next.js platforms optimized for speed and revenue.",
    deliverables: [
      { name: "Custom SaaS Architectures", desc: "Scalable cloud platforms." },
      { name: "Payment Integrations", desc: "Automated billing rails." },
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    features: ["Core Web Vitals 99+", "Edge CDN", "Stripe & Paystack"],
    simulatorType: "web",
  },
  {
    id: "mobile-apps",
    title: "Native Mobile App Development",
    tagline: "Cross-Platform iOS & Android Applications with Native 60fps Fluidity",
    category: "Service 03",
    desc: "We build high-performance mobile applications using Flutter 3.24, delivering beautiful native iOS and Android experiences from a single robust codebase. We manage everything from UI architecture to App Store & Google Play launch.",
    problem: "Developing and maintaining separate iOS (Swift) and Android (Kotlin) codebases doubles development expense, causes feature fragmentation, and slows down release cycles.",
    solution: "We build cross-platform mobile apps with Flutter 3.24 and Dart, achieving 60fps native performance and seamless offline data synchronization from a single unified codebase.",
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
    features: [
      "Biometric authentication (FaceID & Fingerprint)",
      "Offline-first local vector & SQL caching",
      "Real-time background sync & push notifications",
      "Automated CI/CD build distribution",
    ],
    simulatorType: "mobile",
  },
  {
    id: "strategy-advisory",
    title: "Strategy, Technical Architecture & Advisory",
    tagline: "Clear Engineering Blueprints & Plain-English Roadmaps Before Code",
    category: "Service 04",
    desc: "For teams who want complete clarity before committing to a major engineering build. We audit legacy systems, map technical feasibility, design scalable database architectures, and deliver actionable MVP roadmaps.",
    problem: "Building software without a rigorous technical blueprint leads to scope creep, architecture dead-ends, and thousands of dollars wasted on throwaway code.",
    solution: "We produce detailed system architecture specifications, API contract definitions, database schemas, and phased sprint roadmaps before you spend on heavy engineering.",
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
    features: [
      "Interactive architecture diagrams",
      "Itemized technical specification document",
      "Database schema entity-relationship models",
      "Clear 48-hour proposal & estimate",
    ],
    simulatorType: "strategy",
  },
];
