"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Workflow,
  Palette,
  Server,
  Sparkles,
  Search,
  TrendingUp,
  Wrench,
  ArrowRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "ai-solutions",
    icon: Bot,
    title: "AI Solutions",
    tagline: "Autonomous Agent Architectures",
    desc: "Bespoke artificial intelligence models, LLM prompts, and agentic workflows designed to automate operational reasoning. We deploy custom local-first vector stores and orchestrate agent models.",
    tech: ["Gemini", "OpenAI", "Vector DBs"],
    glow: "rgba(139, 92, 246, 0.15)",
    span: "lg:col-span-2",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    tagline: "Cross-Platform Native Apps",
    desc: "High-performance iOS and Android client applications compiled using Flutter for rapid, single-codebase native execution.",
    tech: ["Flutter", "Dart", "Firebase"],
    glow: "rgba(59, 130, 246, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    tagline: "Engineered Web Experiences",
    desc: "Speed-optimized, SEO-dominant landing portals and static sites engineered using Next.js and Tailwind CSS. Built to pass Lighthouse core web vitals with 95+ scores.",
    tech: ["Next.js", "React", "Tailwind"],
    glow: "rgba(16, 185, 129, 0.15)",
    span: "lg:col-span-2",
  },
  {
    id: "crm-systems",
    icon: Database,
    title: "CRM Systems",
    tagline: "Custom Management Platforms",
    desc: "Integrated pipelines linking lead flow trackers directly to centralized databases.",
    tech: ["Salesforce", "Supabase", "SQL"],
    glow: "rgba(245, 158, 11, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "saas-development",
    icon: Cloud,
    title: "SaaS Development",
    tagline: "Scalable Cloud Platforms",
    desc: "Multi-tenant subscription web architectures engineered from concept to launch with secure transaction and billing cycles.",
    tech: ["Next.js", "Node.js", "Paystack"],
    glow: "rgba(139, 92, 246, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Automation",
    tagline: "Operational Workflow Sprints",
    desc: "Eliminate repetitive spreadsheet routines and manual data entry by stitching systems via custom secure webhook loops.",
    tech: ["REST APIs", "Webhooks", "JSON"],
    glow: "rgba(236, 72, 153, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    tagline: "High-Fidelity Interfaces",
    desc: "Design prototypes, onboarding systems, and interface systems optimized for client conversions and tap interactions.",
    tech: ["Figma", "UI Kit", "Tailwind"],
    glow: "rgba(6, 182, 212, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "cloud-deployment",
    icon: Server,
    title: "Cloud Deployment",
    tagline: "Serverless Architecture & Host",
    desc: "Deploy files safely to global content delivery networks (CDNs). Setup rate-limiting, secure headers, and caching rules.",
    tech: ["Vercel", "Google Cloud", "Firebase"],
    glow: "rgba(59, 130, 246, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "branding",
    icon: Sparkles,
    title: "Branding",
    tagline: "Digital Identity & Design Systems",
    desc: "Formulate unified vector designs, color systems, typography tokens, and guidelines that position your company as a leader.",
    tech: ["Logo Kit", "Typography", "CSS"],
    glow: "rgba(16, 185, 129, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO",
    tagline: "Search Visibility Domination",
    desc: "Optimize site crawling, structured data markup, schema details, and rank factors to secure top organic search positions.",
    tech: ["Schema", "Sitemap", "Robot.txt"],
    glow: "rgba(245, 158, 11, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    tagline: "Acquisition & Conversion Funnels",
    desc: "Configure analytics trackers, A/B landing experiments, conversion events, and run target ad campaigns.",
    tech: ["Analytics", "Pixels", "A/B test"],
    glow: "rgba(139, 92, 246, 0.15)",
    span: "lg:col-span-1",
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance",
    tagline: "Continuous Operations Support",
    desc: "Periodic codebase audits, vulnerability sweeps, software version updates, and active pipeline health monitoring.",
    tech: ["Security", "Audits", "Updates"],
    glow: "rgba(236, 72, 153, 0.15)",
    span: "lg:col-span-1",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="section bg-void relative overflow-hidden" id="services">
      {/* Top light glow */}
      <div className="absolute top-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

      <div className="container-wide relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">Engineering Capabilities</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Modular Software Engines.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            Configure custom automation, optimize user conversion rates, and deploy native client 
            sprints via our signature development loops. Select a service module to learn more.
          </p>
        </div>

        {/* Bento-style Asymmetrical Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((srv) => {
            const Icon = srv.icon;
            const isHovered = hoveredCard === srv.id;

            return (
              <Link href={`/services/${srv.id}`} key={srv.id} className={`block h-full group ${srv.span || ""}`}>
                <motion.div
                  variants={cardVariants}
                  className="h-full glass rounded-2xl p-6 md:p-8 border border-steel/60 hover:border-cyan-border/60 transition-all duration-300 flex flex-col justify-between hover:shadow-glow/10 relative overflow-hidden"
                  onMouseEnter={() => setHoveredCard(srv.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    boxShadow: isHovered
                      ? `0 12px 32px -8px ${srv.glow}, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
                      : "inset 0 1px 0 0 rgba(255, 255, 255, 0.02)",
                  }}
                  whileHover={{ y: -4 }}
                >
                  {/* Subtle bento grid background decoration for wider cards */}
                  {srv.span && srv.span.includes("lg:col-span-2") && (
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-steel/10 to-transparent border-l border-steel/20 hidden md:flex flex-col items-center justify-center p-4">
                      <Terminal className="w-12 h-12 text-steel/40" />
                      <span className="text-[9px] font-mono text-mist mt-2 select-none uppercase tracking-wider">Thoram Engine //</span>
                    </div>
                  )}

                  <div className={srv.span && srv.span.includes("lg:col-span-2") ? "md:pr-[35%]" : ""}>
                    {/* Icon and Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-steel/20 border border-steel/50 text-cyan-400 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-mist font-mono flex items-center gap-0.5 group-hover:text-cyan-400 transition-colors">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <h3 className="font-display text-body-lg font-bold text-ice mb-1 group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                    <div className="text-[10px] text-cyan-400/80 font-mono font-semibold mb-3 uppercase tracking-wider">
                      {srv.tagline}
                    </div>
                    <p className="text-body-xs md:text-body-sm text-frost leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className={`flex flex-wrap gap-1.5 pt-3 border-t border-steel/20 ${srv.span && srv.span.includes("lg:col-span-2") ? "md:pr-[35%]" : ""}`}>
                    {srv.tech.map((t) => (
                      <span key={t} className="text-[9px] text-ice bg-steel/30 px-2 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
