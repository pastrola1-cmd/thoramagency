"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Bot,
  Percent,
  Eye,
  Workflow,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Products Data ───
const products = [
  {
    id: "growth-os",
    icon: Layers,
    name: "Growth OS",
    tagline: "Everything needed to grow",
    description:
      "The complete unified command center. Consolidates attribution, tracks active pipeline value, and generates AI lead ratings under one dashboard.",
    subFeatures: [
      "Revenue Attribution Modeling",
      "Unified Customer Profiles",
      "AI Predictive Scoring Engine",
      "Live Pipeline Valuation",
    ],
    className: "md:col-span-2 md:row-span-2 border-cyan-border bg-cyan-glow/5 hover:border-cyan-400",
    accent: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.1)",
  },
  {
    id: "ai-sales-engine",
    icon: Bot,
    name: "AI Sales Engine",
    tagline: "Automated prospect nurturing",
    description:
      "Schedules, screens, and follows up with high-intent leads automatically across email, social, and Web. Zero manual outreach required.",
    subFeatures: [
      "Autonomous Prospect Sourcing",
      "Dynamic Verification Pipeline",
      "Multi-Channel Sequencing",
    ],
    className: "border-steel hover:border-cyan-400/40",
    accent: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.05)",
  },
  {
    id: "conversion-lab",
    icon: Percent,
    name: "Conversion Lab",
    tagline: "Optimized landing experiences",
    description:
      "Supercharge landing conversions with automated A/B variations, high-velocity UX heatmaps, and dynamic copy iterations.",
    subFeatures: [
      "Split A/B Testing Suite",
      "Automated Copy Optimization",
      "Visual Click Heatmapping",
    ],
    className: "border-steel hover:border-cyan-400/40",
    accent: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.05)",
  },
  {
    id: "brand-visibility",
    icon: Eye,
    name: "Brand Visibility Engine",
    tagline: "Authority outreach & visibility",
    description:
      "Dominates search keywords, manages automated content calendars, and distributes press announcements across key media platforms.",
    subFeatures: [
      "Semantic SEO Optimization",
      "Authority PR Outreach",
      "Automated Editorial Calendars",
    ],
    className: "border-steel hover:border-cyan-400/40",
    accent: "text-amber-400",
    glow: "rgba(251, 191, 36, 0.05)",
  },
  {
    id: "automation-studio",
    icon: Workflow,
    name: "Automation Studio",
    tagline: "Custom workflows & systems",
    description:
      "Integrates internal databases, builds custom customer portals, and bridges legacy CRMs through custom automated pipelines.",
    subFeatures: [
      "Custom REST/GraphQL APIs",
      "Bespoke Client Portals",
      "Automated CRM Syncing",
    ],
    className: "border-steel hover:border-cyan-400/40",
    accent: "text-purple-400",
    glow: "rgba(167, 139, 250, 0.05)",
  },
];

// ─── Animations ───
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Products() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section className="section bg-void relative overflow-hidden" id="products">
      {/* Top light glow */}
      <div className="absolute top-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

      <div className="container-wide relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">Product Suite</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Integrated Growth Infrastructure.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            Eliminate loose toolchains and disconnected subscriptions. Thoram Group provides a
            single, unified pipeline containing the core software engines needed to scale pipeline.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px] md:auto-rows-[250px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((prod) => {
            const Icon = prod.icon;
            const isHovered = hoveredCard === prod.id;
            const isGrowthOS = prod.id === "growth-os";

            return (
              <motion.div
                key={prod.id}
                variants={cardVariants}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/products/${prod.id}`)}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/products/${prod.id}`)}
                className={`glass rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${prod.className}`}
                onMouseEnter={() => setHoveredCard(prod.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: isHovered
                    ? `0 12px 40px -10px ${prod.glow}, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
                    : "inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
                }}
                whileHover={{ y: -4 }}
              >
                {/* Accent Background Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[64px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${prod.glow.replace("0.1", "0.15").replace("0.05", "0.1")} 0%, transparent 70%)`,
                  }}
                />

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-steel/30 border border-steel/50 ${prod.accent} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-body-xs text-mist font-mono group-hover:text-cyan-400 transition-colors duration-300 flex items-center gap-0.5">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-display text-body-lg font-bold text-ice mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {prod.name}
                  </h3>
                  <div className="text-body-xs text-cyan-400/80 font-semibold mb-2 font-mono">
                    {prod.tagline}
                  </div>
                  
                  {/* Switch between description and subfeatures on hover for a dynamic aesthetic */}
                  <div className="relative h-20 overflow-hidden mt-3">
                    <motion.p
                      className="text-body-xs md:text-body-sm text-frost leading-relaxed absolute inset-0"
                      animate={{
                        opacity: isHovered ? 0 : 1,
                        y: isHovered ? -15 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {prod.description}
                    </motion.p>

                    <motion.div
                      className="absolute inset-0 flex flex-col gap-2 justify-center"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 15,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {prod.subFeatures.map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="text-body-xs text-ice font-medium font-mono">{sub}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Visual grid highlight inside the card for asymmetric look */}
                {isGrowthOS && (
                  <div className="hidden md:block absolute bottom-6 right-6 w-56 h-36 border border-steel/40 bg-void/50 rounded-xl p-4 overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between border-b border-steel/50 pb-2 mb-2">
                      <span className="text-[10px] text-mist font-mono">OS_STATUS</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 font-mono text-[9px] text-frost">
                      <div>SYS_VAL: <span className="text-cyan-400 font-semibold">$348,200</span></div>
                      <div>ATTRIBUTION: <span className="text-ice">Google Search (74%)</span></div>
                      <div>AI_LTV_SCORE: <span className="text-emerald-400">9.8/10</span></div>
                    </div>
                  </div>
                )}

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
