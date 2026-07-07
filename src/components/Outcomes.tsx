"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Percent,
  Coins,
  Clock,
  ArrowRight,
  TrendingDown,
  Sparkles,
} from "lucide-react";

// ─── Outcomes Data ───
const outcomes = [
  {
    id: "leads",
    statement: "Increase qualified leads.",
    description:
      "Deploy AI-driven sourcing pipelines that target prospects matching your ideal customer profile. Filter out unqualified inquiries before they reach your sales representatives.",
    metric: "+240%",
    metricLabel: "Lead Volume Increase",
    accent: "text-cyan-400 border-cyan-border bg-cyan-glow",
    widget: (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-graphite border border-steel/60 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mist font-mono uppercase">pipeline_leads</span>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">+240% Target</span>
        </div>
        <div className="flex items-end gap-2 h-20 mt-4">
          <div className="w-full bg-steel/30 h-1/4 rounded-sm" />
          <div className="w-full bg-steel/30 h-2/5 rounded-sm" />
          <div className="w-full bg-steel/30 h-3/5 rounded-sm" />
          <div className="w-full bg-cyan-500/30 h-4/5 rounded-sm" />
          <div className="w-full bg-cyan-500 h-full rounded-sm relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold bg-cyan-500 text-obsidian px-1.5 py-0.5 rounded shadow">
              2.4k
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-steel/30">
          <span className="text-[10px] text-frost font-medium">Qualified Leads</span>
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>
    ),
  },
  {
    id: "cac",
    statement: "Reduce customer acquisition costs.",
    description:
      "Automate outreach sequences and lead validation checks. Lower marketing costs by focusing ad spending on channels with proven, high-intent conversions.",
    metric: "-45%",
    metricLabel: "CAC Reduction",
    accent: "text-blue-400 border-blue-950/20 bg-blue-500/5",
    widget: (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-graphite border border-steel/60 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mist font-mono uppercase">cac_tracker</span>
          <span className="text-[10px] text-blue-400 font-mono font-bold">-45% Saved</span>
        </div>
        {/* Draw a descending curve */}
        <div className="h-20 mt-4 flex items-end relative">
          <svg className="w-full h-full" viewBox="0 0 200 80" fill="none">
            <path
              d="M0,20 Q50,30 100,55 T200,70"
              stroke="#60A5FA"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0,20 Q50,30 100,55 T200,70 L200,80 L0,80 Z"
              fill="url(#blueGrad)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="70" r="3" fill="#60A5FA" />
          </svg>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-steel/30">
          <span className="text-[10px] text-frost font-medium">Acquisition Cost</span>
          <TrendingDown className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>
    ),
  },
  {
    id: "conversion",
    statement: "Convert more visitors.",
    description:
      "A/B test your core site variations in real-time. Use predictive algorithms to adjust headings and conversion forms based on visitor referral data.",
    metric: "3.4x",
    metricLabel: "Conversion Increase",
    accent: "text-emerald-400 border-emerald-950/20 bg-emerald-500/5",
    widget: (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-graphite border border-steel/60 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mist font-mono uppercase">conversion_score</span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">A/B Winner</span>
        </div>
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex justify-between text-[9px] text-frost font-mono mb-1">
              <span>Variant B (AI Generated)</span>
              <span className="text-emerald-400">3.4%</span>
            </div>
            <div className="h-2 w-full bg-steel/30 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] text-mist font-mono mb-1">
              <span>Variant A (Original)</span>
              <span>1.0%</span>
            </div>
            <div className="h-2 w-full bg-steel/30 rounded-full overflow-hidden">
              <div className="h-full bg-steel/60 rounded-full w-[25%]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-steel/30">
          <span className="text-[10px] text-frost font-medium">Conversion Rate</span>
          <Percent className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>
    ),
  },
  {
    id: "automation",
    statement: "Automate repetitive work.",
    description:
      "Ditch spreadsheets. Sync leads across CRMs automatically, run validation checks on email formats, and queue automated callback schedules.",
    metric: "40 hrs",
    metricLabel: "Saved Per Week",
    accent: "text-amber-400 border-amber-950/20 bg-amber-500/5",
    widget: (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-graphite border border-steel/60 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mist font-mono uppercase">automation_hours</span>
          <span className="text-[10px] text-amber-400 font-mono font-bold">1 Full Week</span>
        </div>
        <div className="flex items-center justify-center h-20 mt-4">
          <div className="relative flex items-center justify-center">
            {/* Clock wheel shape */}
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-500/40 animate-[spin_10s_linear_infinite]" />
            <Clock className="w-6 h-6 text-amber-400 absolute" />
          </div>
          <div className="ml-4 font-display text-display-sm text-ice font-bold">
            -40h <span className="text-[10px] text-mist block font-mono font-normal">Task automation</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-steel/30">
          <span className="text-[10px] text-frost font-medium">Manual Overhead</span>
          <Coins className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>
    ),
  },
  {
    id: "revenue",
    statement: "Scale revenue with AI.",
    description:
      "Integrate programmatic scoring models to identify expansion opportunities. Trigger contextual upgrade calls based on active customer usage spikes.",
    metric: "$280k",
    metricLabel: "AI Generated Value",
    accent: "text-purple-400 border-purple-950/20 bg-purple-500/5",
    widget: (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-graphite border border-steel/60 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full" />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mist font-mono uppercase">attribution_value</span>
          <span className="text-[10px] text-purple-400 font-mono font-bold">Scale Mode</span>
        </div>
        <div className="flex items-end gap-2 h-20 mt-4">
          <div className="w-full bg-steel/30 h-1/3 rounded-sm" />
          <div className="w-full bg-steel/30 h-1/2 rounded-sm" />
          <div className="w-full bg-purple-500/40 h-3/4 rounded-sm" />
          <div className="w-full bg-purple-500 h-full rounded-sm relative">
            <Sparkles className="w-3 h-3 text-purple-200 absolute top-1 left-1 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-steel/30">
          <span className="text-[10px] text-frost font-medium">Attributed ARR</span>
          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
        </div>
      </div>
    ),
  },
];

// ─── Animations ───
const textVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const widgetVariant = {
  hidden: { opacity: 0, x: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Outcomes() {
  return (
    <section className="section bg-void relative overflow-hidden" id="outcomes">
      {/* Background border design */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-steel/20 via-steel/40 to-transparent hidden lg:block" />

      <div className="container-wide relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-24">
          <span className="eyebrow mb-3 inline-block">Business Outcomes</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice max-w-2xl mx-auto">
            Growth is a Science, Not Guesswork.
          </h2>
          <p className="text-body-md text-frost mt-4 max-w-xl mx-auto">
            We don't sell marketing tasks. We engineer predictable revenue pipelines designed to hit specific metrics.
          </p>
        </div>

        {/* Alternating Outcomes List */}
        <div className="space-y-32 md:space-y-40">
          {outcomes.map((out, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={out.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Statement text side */}
                <motion.div
                  className="flex-1 space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={textVariant}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-body-sm text-cyan-400 font-bold">
                      0{idx + 1}.
                    </span>
                    <span className="h-[1px] w-8 bg-cyan-500/40" />
                  </div>

                  <h3 className="font-display text-display-sm md:text-display-md font-bold text-ice leading-tight">
                    {out.statement}
                  </h3>

                  <p className="text-body-md text-frost leading-relaxed">
                    {out.description}
                  </p>

                  <div className="flex items-center gap-6 pt-4">
                    <div>
                      <div className="font-display text-display-sm text-cyan-400 font-bold">
                        {out.metric}
                      </div>
                      <div className="text-body-xs text-mist uppercase font-mono mt-1">
                        {out.metricLabel}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Micro chart visual side */}
                <motion.div
                  className="flex-1 w-full max-w-md aspect-[4/3]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={widgetVariant}
                >
                  {out.widget}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
