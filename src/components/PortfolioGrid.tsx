"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, X, Tag, Code, Layers, ShieldCheck, Check } from "lucide-react";

interface Project {
  id: string;
  name: string;
  category: string;
  desc: string;
  tech: string[];
  features: string[];
  problem: string;
  solution: string;
  result: string;
  link: string;
  themeColor: string;
}

const projects: Project[] = [
  {
    id: "manna-bible",
    name: "Manna Bible App",
    category: "Churches",
    desc: "Cross-platform mobile application delivering scripture reading feeds, offline caching, and study tools to believers globally.",
    tech: ["Flutter", "Dart", "Firebase Sync", "SQLite"],
    features: ["Offline bible reader", "Custom highlight engine", "Audio bible player", "Daily push notifications"],
    problem: "Churches and believers needed a fast, offline-first, mobile Scripture application that loads instantaneously even on low-bandwidth networks in international regions.",
    solution: "Built a fully local-first database cache using SQLite synced dynamically with Firebase when connectivity is restored, featuring a high-performance audio streamer.",
    result: "Deployed to Apple & Google Play stores with over 15,000+ active sessions and a 99.9% crash-free session rate.",
    link: "https://mannabible.web.app",
    themeColor: "from-cyan-500/20 to-blue-600/20",
  },
  {
    id: "nissie-shelters",
    name: "Nissie Ideal Shelters",
    category: "Real Estate",
    desc: "B2B client property portal linking listings, payment ledger schedules, and automated inquiry distribution tools.",
    tech: ["Next.js", "React", "Supabase DB", "Tailwind CSS"],
    features: ["Virtual property tours", "Ledger billing schedules", "Multi-agent CRM", "Document download hub"],
    problem: "Real estate brokers were losing deal pipelines due to fractured communication channels across WhatsApp, spreadsheets, and email inbox folders.",
    solution: "Engineered a centralized B2B property dashboard unifying listings metadata with an automated CRM webhook that assigns leads to sales reps based on regional zip codes.",
    result: "Reduced average inquiry response times from 18 hours to less than 5 minutes, boosting customer conversions by 32%.",
    link: "https://nissieshelters.com",
    themeColor: "from-emerald-500/20 to-teal-600/20",
  },
  {
    id: "educore-os",
    name: "Educore OS Portal",
    category: "Education",
    desc: "Automated student academic registry, online billing, class scheduling, and parent communication console.",
    tech: ["React", "Node.js", "PostgreSQL", "Google Cloud"],
    features: ["Automated grading rosters", "E-invoice payment channels", "SMS alert dispatcher", "Report card builder"],
    problem: "Private schools struggled with massive administrative workloads during end-of-term grading schedules and manual tuition payments.",
    solution: "Designed a secure web portal automating invoice generation, direct credit card payouts, and digital grade card distribution directly to parent profiles.",
    result: "Saved administrative staffs over 40+ hours per week, eliminating manual ledger reconciliations completely.",
    link: "#",
    themeColor: "from-purple-500/20 to-indigo-600/20",
  },
  {
    id: "healthsync-api",
    name: "HealthSync Portal",
    category: "Healthcare",
    desc: "Vulnerability-tested patient scheduling dashboard featuring medical intake forms and end-to-end encrypted messaging.",
    tech: ["Next.js", "Node.js", "Supabase", "HIPAA Compliant AWS"],
    features: ["Encrypted medical intake", "Live calendar booking", "EHR integrations", "Direct SMS reminders"],
    problem: "Clinical practitioners needed a secure, HIPAA-compliant patient intake portal that prevents data leaks while automating slot scheduling.",
    solution: "Engineered an end-to-end encrypted database architecture with strict data privacy parameters, combined with automated slot booking tools.",
    result: "Achieved 100% compliance rating in external security audits and decreased calendar booking double-allocations to zero.",
    link: "#",
    themeColor: "from-rose-500/20 to-red-600/20",
  },
  {
    id: "leadflow-ai",
    name: "LeadFlow AI Agent",
    category: "AI",
    desc: "Autonomous reasoning agent scraping incoming web traffic logs to qualify leads and trigger automated email responses.",
    tech: ["Gemini Pro", "Node.js", "Resend API", "MongoDB"],
    features: ["Natural language classifier", "Dynamic proposal generator", "Automated email sequences", "CRM lead synchronization"],
    problem: "Sales representatives spent hours classifying incoming B2B inquiries and drafting custom service quotes.",
    solution: "Deployed an autonomous Gemini classifier that scans inquiry body text, classifies lead intent, and generates a draft proposal for review in 60 seconds.",
    result: "Boosted consultation bookings by 54% and saved sales representatives over 3 hours of daily manual drafting work.",
    link: "#",
    themeColor: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: "thoram-portal",
    name: "Thoram Loop Console",
    category: "SaaS",
    desc: "Productized B2B client dashboard tracking engineering build loops, sprint approval stages, and Paystack invoicing.",
    tech: ["Next.js", "Firebase Hosting", "Paystack SDK", "Framer Motion"],
    features: ["Visual loop sprint trackers", "Paystack payment links", "Mock context loaders", "SHA-256 local security"],
    problem: "Clients wanted real-time visibility into active design and development sprints without joining daily developer meetings.",
    solution: "Built a dedicated, interactive client console displaying loop development stages (`completed`, `in-progress`, `locked`) powered by automated builds.",
    result: "Eliminated client communications overhead by 40% and simplified transaction billing into single-click Paystack payments.",
    link: "/portal",
    themeColor: "from-cyan-500/20 to-cyan-700/20",
  },
];

const categories = ["All", "AI", "SaaS", "Real Estate", "Healthcare", "Education", "Churches"];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section className="section bg-void py-24 border-b border-steel/30" id="portfolio">
      <div className="container-wide">
        
        {/* Heading Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="eyebrow mb-3 block">Our Work</span>
            <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4 md:mb-0">
              High-Converting Digital Assets.
            </h2>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-cyan-500 text-obsidian border-cyan-500 font-bold"
                    : "border-steel hover:border-cyan-border text-frost hover:text-ice bg-glass-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <motion.div
              layout
              key={p.id}
              className="glass rounded-2xl border border-steel/60 hover:border-cyan-border/40 overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-glow/5"
              onClick={() => setSelectedProject(p)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card visual top */}
              <div className={`h-40 bg-gradient-to-br ${p.themeColor} flex items-center justify-center p-6 border-b border-steel/40 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(#1c2a44_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                <div className="relative text-center group-hover:scale-105 transition-transform duration-300">
                  <h4 className="font-display text-body-xl font-extrabold text-ice tracking-tight drop-shadow-md">
                    {p.name}
                  </h4>
                  <span className="inline-block mt-2 font-mono text-[9px] text-cyan-400 bg-void/60 px-2 py-0.5 rounded-full border border-cyan-border/30">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-body-xs md:text-body-sm text-frost leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] text-frost bg-steel/30 px-2 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="text-[9px] text-mist font-mono px-1">
                        +{p.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-cyan-400 font-mono font-bold flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                    Technical Specifications <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Project Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-void/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-graphite border border-steel rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col justify-between"
              role="dialog"
              aria-modal="true"
              onKeyDown={(e) => e.key === "Escape" && setSelectedProject(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-steel/30 border border-steel/50 text-ice hover:bg-steel/50 transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Visual */}
              <div className={`h-36 bg-gradient-to-br ${selectedProject.themeColor} flex items-center justify-center p-6 border-b border-steel/40 relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(#1c2a44_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                <div className="text-center">
                  <h3 className="font-display text-display-sm font-extrabold text-ice drop-shadow-md">
                    {selectedProject.name}
                  </h3>
                  <span className="inline-block mt-2 font-mono text-[9px] text-cyan-400 bg-void/60 px-2.5 py-0.5 rounded-full border border-cyan-border/30">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                
                {/* Specs list */}
                <div className="grid grid-cols-2 gap-4 border-b border-steel/20 pb-4">
                  <div>
                    <span className="text-[10px] text-mist font-mono uppercase tracking-wider flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-cyan-400" /> Technologies
                    </span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-[9px] text-ice bg-steel/40 px-2 py-0.5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-mist font-mono uppercase tracking-wider flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Key Features
                    </span>
                    <ul className="mt-2 space-y-1">
                      {selectedProject.features.map((feat) => (
                        <li key={feat} className="text-[10px] text-frost flex items-center gap-1 leading-tight">
                          <Check className="w-3 h-3 text-cyan-400 flex-shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-body-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                      The Problem
                    </h4>
                    <p className="text-body-xs md:text-body-sm text-frost leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-body-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                      The Solution
                    </h4>
                    <p className="text-body-xs md:text-body-sm text-frost leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-body-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                      The Result
                    </h4>
                    <p className="text-body-xs md:text-body-sm text-frost leading-relaxed">
                      {selectedProject.result}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-steel/20 bg-void/50 flex items-center justify-between">
                <span className="text-[9px] text-mist font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Build Verified
                </span>
                
                {selectedProject.link !== "#" ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary py-2 px-4 rounded-xl text-body-xs font-bold font-mono flex items-center gap-1.5"
                  >
                    Visit Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[10px] text-mist font-mono px-3 py-2 bg-steel/20 rounded-xl">
                    Enterprise Portal IP (Closed Network)
                  </span>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
