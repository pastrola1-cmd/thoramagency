export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: "mobile" | "web" | "fintech" | "ai" | "edtech";
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  architecture: string[];
  tech: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "manna-bible",
    title: "Manna Bible — Cross-Platform Mobile Scripture & Audio Engine",
    client: "Manna Notes Project",
    industry: "Consumer Mobile & Audio AI",
    category: "mobile",
    summary:
      "Engineered an offline-first mobile scripture app with synchronized audio playback, AI text-to-speech, and semantic search across thousands of chapters.",
    challenge:
      "The client needed a mobile application that could synchronize complex audio streams with live text highlighting in real time, while maintaining instant load times in low-bandwidth network environments across West Africa and globally.",
    solution:
      "We built a local-first SQLite indexing architecture compiled natively via Flutter. Audio tracks and text indices are cached on-device with zero background playback latency, backed by Firebase Authentication and cloud sync.",
    impact: [
      "15,000+ active mobile reading and audio study sessions",
      "Sub-100ms on-device search across 31,000+ verses with zero network lag",
      "4.9★ rating across Apple App Store and Google Play Store",
      "Single codebase deployment reducing client engineering maintenance overhead by 50%",
    ],
    architecture: [
      "Local-first SQLite on-device database",
      "Flutter native audio background state machine",
      "Firebase Cloud Messaging & APNs real-time sync",
      "Automated CI/CD App Store distribution pipelines",
    ],
    tech: ["Flutter", "Dart", "Firebase", "SQLite", "Audio Engine", "App Store Connect", "Google Play"],
    testimonial: {
      quote:
        "Thoram Group took our vision for an offline-first scripture audio experience and delivered a native app that feels lightning-fast. Our readers love the speed and offline reliability.",
      author: "Product Lead",
      role: "Manna Notes Project",
    },
  },
  {
    id: "nissie-shelters",
    title: "Nissie Shelters — High-Conversion Real Estate Portal & Lead CRM",
    client: "Nissie Ideal Shelters",
    industry: "Real Estate & Lead Infrastructure",
    category: "web",
    summary:
      "Architected a luxury real estate marketing platform that automates property buyer inquiries, routes leads to sales agents within 2 seconds via WhatsApp, and syncs directly into centralized CRM pipelines.",
    challenge:
      "The sales team was losing high-ticket real estate leads due to slow email responses and manual spreadsheet data entry, creating severe operational friction and lost commissions during active marketing campaigns.",
    solution:
      "We engineered a speed-optimized Next.js web portal linked to automated WhatsApp Cloud API webhooks and Supabase database triggers, instantly routing buyer criteria to the designated sales consultant within seconds.",
    impact: [
      "3.8x increase in qualified property buyer inquiries within the first 60 days",
      "Instant 2-second automated lead handoff directly to sales reps via WhatsApp",
      "100% elimination of manual spreadsheet data entry and lost prospect records",
      "Zero downtime through high-traffic property launch marketing campaigns",
    ],
    architecture: [
      "Next.js 14 serverless edge-rendered landing portal",
      "WhatsApp Cloud API webhook routing pipeline",
      "Supabase PostgreSQL real-time database triggers",
      "Automated sales representative lead rotation logic",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WhatsApp Cloud API", "Supabase", "Serverless Functions"],
    testimonial: {
      quote:
        "The automated WhatsApp lead routing completely changed our sales velocity. Inquiries that used to sit in spreadsheets for hours are now engaged in 2 seconds. Our conversion rate skyrocketed.",
      author: "Managing Director",
      role: "Nissie Ideal Shelters",
    },
  },
  {
    id: "scale-wealth",
    title: "Scale Wealth — Secure Investor Onboarding & Payment Rails",
    client: "Scale Wealth Estate",
    industry: "Fintech & Wealth Management",
    category: "fintech",
    summary:
      "Engineered an automated investor onboarding platform with identity verification, automated recurring invoice reconciliation, and Paystack payment gateway integrations.",
    challenge:
      "Managing multi-million naira property investment installments manually was leading to reconciliation delays, payment mismatches, and delayed investor verification, risking buyer trust.",
    solution:
      "We designed and built a bank-grade web portal with automated KYC document upload, Paystack recurring subscription webhooks, and automatic receipt generation.",
    impact: [
      "Over ₦100M+ in investment payments processed securely with zero downtime",
      "100% automated invoice reconciliation with zero accounting mismatches",
      "Investor onboarding time reduced from 3 business days to under 5 minutes",
      "Complete audit logging and compliance-ready transaction reporting",
    ],
    architecture: [
      "Next.js multi-tenant customer dashboard",
      "Paystack secure recurring payment webhook processor",
      "PostgreSQL encrypted ledger database",
      "Automated PDF receipt and statement generator",
    ],
    tech: ["Next.js", "Node.js", "Paystack Webhooks", "PostgreSQL", "Tailwind CSS", "Cloudflare Security"],
    testimonial: {
      quote:
        "Thoram Group built an institutional-grade investment platform for us. The automated reconciliation alone saved our accounting team dozens of hours every single week.",
      author: "Chief Operating Officer",
      role: "Scale Wealth Estate",
    },
  },
  {
    id: "eduthoram-portal",
    title: "EduThoram — Multi-Branch School Management & Student Portal",
    client: "EduThoram Schools Network",
    industry: "School Management & Institutional Software",
    category: "edtech",
    summary:
      "Architected a comprehensive multi-campus school management portal automating tuition fee collection, academic grading computations, parent notifications, and digital transcript verification.",
    challenge:
      "Managing manual tuition fee receipts, termly report card calculations, and student attendance records across multiple campuses caused administrative bottlenecks, billing discrepancies, and slow communication with parents.",
    solution:
      "We engineered an institutional school management portal with automated Paystack fee collection, instant digital receipt generation, automated GPA/continuous assessment grade calculations, and WhatsApp result delivery to parents with tamper-proof QR verification.",
    impact: [
      "100% elimination of tuition receipt falsification with instant automated bank reconciliation",
      "Termly report card computation time slashed from 2 weeks to under 30 seconds per class",
      "Over 12,000+ student academic records and billing accounts managed with 99.9% uptime",
      "Instant automated parent notifications for fee receipts and attendance alerts via WhatsApp & SMS",
    ],
    architecture: [
      "Multi-tenant role-based portal (Super Admin, Principal, Teacher, Accountant, Parent, Student)",
      "Paystack recurring tuition installment payment processor with automated bank webhooks",
      "Algorithmic continuous assessment (CA) grade computation & dynamic PDF report card generator",
      "WhatsApp Cloud API & SMS automated parent notification gateway with QR verification",
    ],
    tech: ["Next.js 14", "TypeScript", "Node.js", "PostgreSQL", "Paystack API", "Tailwind CSS", "Docker"],
    testimonial: {
      quote:
        "EduThoram transformed our school operations. What used to take our teachers two weeks of spreadsheet stress during end-of-term exams is now computed in seconds, and our fee collections are fully automated.",
      author: "Director of Academic Operations",
      role: "EduThoram Schools Network",
    },
  },
];
