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
  image?: string;
  gallery?: string[];
  liveUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "eduthoram-portal",
    title: "EduThoramOS — Multi-Branch School Management & Student Portal",
    client: "EduThoram Schools Network",
    industry: "School Management & Institutional Software",
    category: "edtech",
    image: "/case-studies/eduthoram-dashboard.png",
    liveUrl: "https://eduthoramos.web.app",
    gallery: [
      "/case-studies/eduthoram-dashboard.png",
      "/case-studies/eduthoram-guide.png",
      "/case-studies/eduthoram-timetable.png",
      "/case-studies/eduthoram-transport.png",
    ],
    summary:
      "Architected a comprehensive multi-campus school management portal automating tuition fee collection, academic grading computations, parent notifications, timetable scheduling, and fleet logistics.",
    challenge:
      "Managing manual tuition fee receipts, termly report card calculations, timetable conflicts, and student attendance records across multiple campuses caused administrative bottlenecks, billing discrepancies, and slow communication with parents.",
    solution:
      "We engineered an institutional school management portal (EduThoramOS) with automated Paystack fee collection, instant digital receipt generation, automated continuous assessment (CA) grade calculations, interactive timetable scheduling, and WhatsApp result delivery to parents with tamper-proof QR verification.",
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
      "Interactive timetable scheduling engine & school fleet transportation tracker",
      "WhatsApp Cloud API & SMS automated parent notification gateway with QR verification",
    ],
    tech: ["Next.js 14", "TypeScript", "Node.js", "PostgreSQL", "Paystack API", "Tailwind CSS", "Docker"],
    testimonial: {
      quote:
        "EduThoramOS transformed our school operations. What used to take our teachers two weeks of spreadsheet stress during end-of-term exams is now computed in seconds, and our fee collections are fully automated.",
      author: "Director of Academic Operations",
      role: "EduThoram Schools Network",
    },
  },
  {
    id: "manna-bible",
    title: "Manna Bible — Scripture Study, Audio & Community Platform",
    client: "Manna Bible Project",
    industry: "Mobile Engineering & Spiritual Tech",
    category: "mobile",
    image: "/case-studies/manna-home.png",
    gallery: [
      "/case-studies/manna-home.png",
      "/case-studies/manna-reader.png",
      "/case-studies/manna-community.png",
      "/case-studies/manna-reflections.png",
    ],
    summary:
      "Engineered an offline-first scripture platform featuring daily devotionals, distraction-free study reader modes, reflection journaling with sermon linking, and active community fellowship feeds.",
    challenge:
      "Creating an engaging digital scripture experience that combines offline-first reading performance with live social fellowship feeds, sermon note journaling, and daily streak tracking across mobile and web platforms.",
    solution:
      "We engineered Manna Bible with a refined dark-gold aesthetic, instant chapter loading, full-text scripture search, rich-media reflection journals with YouTube/audio attachments, and an interactive community hub.",
    impact: [
      "15,000+ active reading, study, and daily devotional sessions logged",
      "Sub-100ms on-device chapter rendering with instant verse lookups",
      "Rich reflection journaling with sermon audio and YouTube video integration",
      "Engaged community feed with testimony posts, prayer groups, and reading challenges",
    ],
    architecture: [
      "Cross-platform client architecture with dark luxury theme and smooth transitions",
      "Local-first SQLite caching for zero-latency offline Bible reading across all translations",
      "Real-time community social feed with media attachments and comment threads",
      "Cloud-synchronized reflection notes and user streak gamification engine",
    ],
    tech: ["Flutter", "Dart", "TypeScript", "Firebase", "SQLite", "Tailwind CSS", "Node.js"],
    testimonial: {
      quote:
        "Thoram Group brought our vision for Manna Bible to life with unmatched polish. The speed of the reader, the community feeds, and the reflection features make it a joy to use every day.",
      author: "Founder & Lead",
      role: "Manna Bible Project",
    },
  },
  {
    id: "dwealth-crm",
    title: "D-Wealth CRM — Admissions Pipeline & Counselor Command Engine",
    client: "D-Wealth Global / DGNCrm",
    industry: "Education Consultancy & Admissions CRM",
    category: "web",
    image: "/case-studies/dwealth-dashboard.png",
    liveUrl: "https://dgncrm.com",
    gallery: [
      "/case-studies/dwealth-dashboard.png",
      "/case-studies/dwealth-analytics.png",
    ],
    summary:
      "Architected an enterprise international student recruitment and admissions CRM with automated counselor pipeline tracking, live team velocity command, document vaults, and bottleneck detection.",
    challenge:
      "Tracking hundreds of international university applications and admission counselor outreach across decentralized spreadsheets led to missed student visa deadlines, untracked counselor workloads, and zero executive visibility into application pipeline bottlenecks.",
    solution:
      "We engineered D-Wealth CRM (dgncrm.com) — a full-suite agency operations platform featuring multi-stage applicant tracking, automated hot-lead priority queues, team performance logs, and real-time conversion velocity analytics.",
    impact: [
      "Over 500+ active student visa and university application pipelines tracked simultaneously",
      "Real-time counselor outreach logs and automated team bottleneck alerts",
      "100% centralized student document repository eliminating email attachment risks",
      "Sub-second database search across applicants, parent contacts, and global institutions",
    ],
    architecture: [
      "Dark-mode counselor command dashboard with real-time state management",
      "PostgreSQL relational admissions pipeline database with multi-stage indexation",
      "Automated lead prioritization engine with hot-lead scoring algorithms",
      "Team Performance Command with counselor outreach logs and bottleneck detection",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Cloudflare"],
    testimonial: {
      quote:
        "D-Wealth CRM gave our agency complete operational clarity. We track every student application and counselor action in real time with zero dropped leads.",
      author: "Managing Director",
      role: "D-Wealth Global",
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
      "High-value property buyer inquiries from ads and social campaigns were getting lost in spreadsheets and unassigned WhatsApp chats, causing 24-48 hour response delays that resulted in lost multi-million naira property sales.",
    solution:
      "We engineered a modern property catalog web application with sub-second page loads, automated 2-second lead routing to sales agents via WhatsApp Cloud API, and real-time lead status synchronization.",
    impact: [
      "3.8x increase in qualified buyer inquiry conversion rate within 60 days of launch",
      "Lead-to-agent response time reduced from 24 hours to under 2 seconds automatically",
      "Zero lost property inquiries across all active residential estate marketing campaigns",
      "99+ Google Lighthouse mobile performance score on all high-resolution estate pages",
    ],
    architecture: [
      "Next.js server-rendered property catalog with dynamic image optimization",
      "WhatsApp Business Cloud API automated lead distribution webhooks",
      "Custom lead intake pipeline with agent round-robin assignment logic",
      "Real-time analytics tracking property engagement, downloads, and inquiry sources",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WhatsApp Cloud API", "Vercel Edge Network", "PostgreSQL"],
    testimonial: {
      quote:
        "Before Thoram Group rebuilt our platform, leads were slipping through the cracks. Now, every buyer inquiry is instantly delivered to our sales reps' WhatsApp with full property context.",
      author: "Head of Marketing",
      role: "Nissie Ideal Shelters",
    },
  },
  {
    id: "scale-wealth",
    title: "Scale Wealth — Automated Investor Onboarding & Payment Gateway",
    client: "Scale Wealth Estate",
    industry: "Fintech & Fractional Real Estate",
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
];
