"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

// ─── Products Detail Data ───
const productsDetailData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    deliverables: string[];
    specs: { label: string; value: string }[];
    theme: {
      accent: string;
      glow: string;
      radialGlow: string;
    };
  }
> = {
  "growth-os": {
    name: "Growth OS",
    tagline: "The command center for pipeline attribution.",
    description:
      "Growth OS consolidates your entire B2B funnel. Integrate visual attribution pipelines, calculate user lifetime values using predictive models, and sync real-time marketing channels under one interface. Say goodbye to scattered spreadsheets and loose analytics tools.",
    deliverables: [
      "Revenue Attribution Multi-touch Models",
      "Unified Lead Profile databases",
      "AI Predictive Lead Value scoring",
      "Real-time Pipeline dashboards",
    ],
    specs: [
      { label: "Sync Latency", value: "< 1.5s" },
      { label: "AI Model Accuracy", value: "94.2%" },
      { label: "Integrations", value: "HubSpot, Salesforce, Segment" },
    ],
    theme: {
      accent: "text-orange-600 border-orange-600/20 bg-orange-600/2",
      glow: "rgba(6, 182, 212, 0.15)",
      radialGlow: "from-cyan-700/5",
    },
  },
  "ai-sales-engine": {
    name: "AI Sales Engine",
    tagline: "Autonomous prospect sourcing and verification.",
    description:
      "The AI Sales Engine functions as a full-time automated outbound rep. It scrapes target list records matching your exact ICP parameters, executes credential and email checks to guarantee 0% bounces, and initiates multi-channel outreach campaigns automatically.",
    deliverables: [
      "Dynamic B2B Lead Scraping loops",
      "Active Email Validation pipelines",
      "Multi-Channel Outreach sequencing",
      "Automated Booking integration",
    ],
    specs: [
      { label: "Email Deliverability", value: "99.8%" },
      { label: "Manual Sourcing Saved", value: "15h/week" },
      { label: "Sequence Channels", value: "Email, LinkedIn, Web" },
    ],
    theme: {
      accent: "text-blue-400 border-blue-500/20 bg-blue-500/2",
      glow: "rgba(96, 165, 250, 0.15)",
      radialGlow: "from-blue-500/5",
    },
  },
  "conversion-lab": {
    name: "Conversion Lab",
    tagline: "High-velocity onboarding and form experiments.",
    description:
      "Stop wasting paid traffic on low-converting signup grids. Conversion Lab deploys real-time A/B visual variants, executes automated copy matching, and generates scroll heatmaps to increase registration rate. Verify funnel bottlenecks with dynamic behavioral metrics.",
    deliverables: [
      "Automated A/B Form experiments",
      "Dynamic Headings copy rotation",
      "Visual User Scroll heatmaps",
      "Onboarding Dropoff alert indexes",
    ],
    specs: [
      { label: "Average Lift", value: "+38%" },
      { label: "Test Setup Time", value: "< 10 min" },
      { label: "Supported Frameworks", value: "Next.js, React, HTML5" },
    ],
    theme: {
      accent: "text-emerald-600 border-emerald-600/20 bg-emerald-600/2",
      glow: "rgba(52, 211, 153, 0.15)",
      radialGlow: "from-emerald-600/5",
    },
  },
  "brand-visibility": {
    name: "Brand Visibility Engine",
    tagline: "Claim search keywords and distribute press.",
    description:
      "Automate your company's organic content lifecycle. The Brand Visibility Engine runs semantic keyword analysis to identify gaps in search results, builds search-optimized articles, and distributes press announcements across high-authority publication channels.",
    deliverables: [
      "Semantic SEO Keyword planners",
      "Press Release publication loops",
      "Automated Editorial content calendars",
      "Backlink Authority monitors",
    ],
    specs: [
      { label: "Average Rank Lift", value: "14 days" },
      { label: "Distribution Reach", value: "120+ Outlets" },
      { label: "SEO Semantic Depth", value: "100%" },
    ],
    theme: {
      accent: "text-amber-400 border-amber-500/20 bg-amber-500/2",
      glow: "rgba(251, 191, 36, 0.15)",
      radialGlow: "from-amber-500/5",
    },
  },
  "automation-studio": {
    name: "Automation Studio",
    tagline: "CRM synchronization and custom client portals.",
    description:
      "Bespoke system automation for scaling organizations. Connect internal PostgreSQL databases directly with third-party CRMs, construct customized partner login portals, and establish automated operational loops that save manual entry hours.",
    deliverables: [
      "Custom REST / GraphQL API setups",
      "Client Login & Upload portals",
      "Automated CRM database syncs",
      "Slack Alert webhook triggers",
    ],
    specs: [
      { label: "Supported CRMs", value: "Salesforce, Zoho, Pipedrive" },
      { label: "Sync Frequency", value: "Real-time Webhook" },
      { label: "API Protocol", value: "REST/GraphQL" },
    ],
    theme: {
      accent: "text-purple-400 border-purple-500/20 bg-purple-500/2",
      glow: "rgba(167, 139, 250, 0.15)",
      radialGlow: "from-purple-500/5",
    },
  },
};

export default function ProductClient() {
  const params = useParams();
  const id = params?.id as string;
  const product = productsDetailData[id];

  // Simulator Sliders States
  const [val1, setVal1] = useState(5000); // generic slider 1
  const [val2, setVal2] = useState(3.0); // generic slider 2

  if (!product) {
    notFound();
  }

  // ─── Render Specific Interactive Widgets based on Product ID ───
  const renderInteractiveWidget = () => {
    switch (id) {
      case "growth-os":
        // Growth OS Simulator
        const estPipeline = Math.round(val1 * (val2 / 100) * 2500);
        const roiScore = (val2 * 2.2).toFixed(1);
        return (
          <div className="space-y-6">
            <h4 className="text-body-xs font-mono uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> LTV & ROI Score Simulator
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Monthly Traffic</span>
                  <span className="text-orange-600 font-bold">{val1.toLocaleString()} visitors</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Conversion Rate</span>
                  <span className="text-orange-600 font-bold">{val2.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>
            </div>

            <div className="border-t border-steel/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Est. Pipeline</span>
                <span className="text-body-md font-bold text-ice">${estPipeline.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">AI ROI Score</span>
                <span className="text-body-md font-bold text-emerald-600">{roiScore} / 10</span>
              </div>
            </div>
          </div>
        );

      case "ai-sales-engine":
        // AI Sales Engine Sourcing calculator
        const expectedReplies = Math.round(val1 * (val2 / 100));
        const hoursSaved = Math.round((val1 / 100) * 1.5);
        return (
          <div className="space-y-6">
            <h4 className="text-body-xs font-mono uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Outreach Sourcing Planner
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Target Leads / mo</span>
                  <span className="text-orange-600 font-bold">{val1.toLocaleString()} contacts</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Target Reply Rate</span>
                  <span className="text-orange-600 font-bold">{val2.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>
            </div>

            <div className="border-t border-steel/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Expected Replies</span>
                <span className="text-body-md font-bold text-ice">{expectedReplies} / mo</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Hours Reclaimed</span>
                <span className="text-body-md font-bold text-emerald-600">+{hoursSaved} hrs / wk</span>
              </div>
            </div>
          </div>
        );

      case "conversion-lab":
        // Conversion Lab lift simulator
        const liftValue = Math.round(val1 * (val2 / 100) * 120);
        return (
          <div className="space-y-6">
            <h4 className="text-body-xs font-mono uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> A/B Conversion Value Simulator
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Current Signups / mo</span>
                  <span className="text-orange-600 font-bold">{val1.toLocaleString()} signups</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Target Lift</span>
                  <span className="text-orange-600 font-bold">+{val2.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>
            </div>

            <div className="border-t border-steel/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">New Signups</span>
                <span className="text-body-md font-bold text-ice">+{Math.round(val1 * (1 + val2 / 100))}</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Annual Val Lift</span>
                <span className="text-body-md font-bold text-emerald-600">+${liftValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );

      case "brand-visibility":
        // Brand Visibility keyword periods
        const estPeriod = Math.max(10, Math.round(90 - val1 * 2.5 - val2 * 10));
        const estimatedVisitors = Math.round(val1 * 850 * (val2 / 2));
        return (
          <div className="space-y-6">
            <h4 className="text-body-xs font-mono uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> SEO Domain Velocity Planner
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Monthly Articles</span>
                  <span className="text-orange-600 font-bold">{val1} articles / mo</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>PR Distribution Frequency</span>
                  <span className="text-orange-600 font-bold">{val2.toFixed(0)} releases / Q</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>
            </div>

            <div className="border-t border-steel/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Est. Time to Rank</span>
                <span className="text-body-md font-bold text-ice">{estPeriod} days</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Monthly Traffic Inbound</span>
                <span className="text-body-md font-bold text-emerald-600">+{estimatedVisitors.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );

      case "automation-studio":
        // Automation Studio time saver
        const teamSavedHours = Math.round(val1 * val2 * 4.3);
        const dollarsSaved = Math.round(teamSavedHours * 45);
        return (
          <div className="space-y-6">
            <h4 className="text-body-xs font-mono uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Operational Savings Calculator
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Sales / Ops Reps</span>
                  <span className="text-orange-600 font-bold">{val1} members</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-frost mb-1">
                  <span>Data entry time / member</span>
                  <span className="text-orange-600 font-bold">{val2.toFixed(1)} hrs / wk</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full h-1 bg-steel rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
              </div>
            </div>

            <div className="border-t border-steel/30 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Team Hours Saved</span>
                <span className="text-body-md font-bold text-ice">{teamSavedHours} hrs / mo</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Reclaimed Value</span>
                <span className="text-body-md font-bold text-emerald-600">${dollarsSaved.toLocaleString()} / mo</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${product.theme.radialGlow} to-transparent blur-[120px] pointer-events-none`} />

      {/* Navigation header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice">
          Thoram<span className="text-orange-600">.</span>
        </Link>
        <Link href="/services" className="text-body-sm text-frost hover:text-orange-600 transition-colors flex items-center gap-1.5 font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Left column: Overview & Deliverables */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow max-w-3xl glass rounded-2xl p-6 md:p-10 border border-steel/60 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <span className="text-[10px] text-orange-600 font-mono uppercase tracking-widest block">
              PRODUCT DETAILS
            </span>
            <h1 className="font-display text-display-sm md:text-display-md font-extrabold text-ice leading-snug">
              {product.name}
            </h1>
            <p className="text-body-xs font-mono text-orange-600 font-semibold uppercase tracking-wider">
              {product.tagline}
            </p>
            <p className="text-body-xs md:text-body-sm text-frost leading-relaxed border-t border-steel/30 pt-6">
              {product.description}
            </p>

            <div className="space-y-3 pt-4">
              <h3 className="font-display text-body-xs font-bold text-ice uppercase tracking-wider">
                CORE DELIVERABLES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-body-xs text-frost font-mono">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-steel/30">
            <Link
              href="/#apply"
              className="inline-flex btn btn-primary py-3.5 px-6 rounded-xl text-body-xs font-mono font-bold items-center gap-1.5 shadow-glow"
            >
              Configure & Request Sprints <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right column: Interactive Tool & Specs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-96 flex flex-col gap-6"
        >
          {/* Simulator Card */}
          <div className="glass rounded-2xl p-6 border border-steel/60 bg-graphite/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-[50px] rounded-full pointer-events-none" />
            {renderInteractiveWidget()}
          </div>

          {/* Specifications Card */}
          <div className="glass rounded-2xl p-6 border border-steel/60 flex-grow space-y-4">
            <h4 className="text-[10px] font-mono text-mist uppercase tracking-widest border-b border-steel/30 pb-2">
              System Specifications
            </h4>
            <div className="space-y-3 font-mono text-[10px] text-frost">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-mist uppercase">{spec.label}:</span>
                  <span className="text-ice font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
