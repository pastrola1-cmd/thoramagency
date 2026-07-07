"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

// ─── Dummy Data ───
const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 61000 },
  { name: "Apr", revenue: 58000 },
  { name: "May", revenue: 73000 },
  { name: "Jun", revenue: 95000 },
];

const leadsData = [
  { name: "Jan", leads: 320 },
  { name: "Feb", leads: 400 },
  { name: "Mar", leads: 480 },
  { name: "Apr", leads: 510 },
  { name: "May", leads: 690 },
  { name: "Jun", leads: 850 },
];

const conversionData = [
  { name: "Converted", value: 3.4, fill: "#06B6D4" },
  { name: "Remaining", value: 96.6, fill: "rgba(255, 255, 255, 0.05)" },
];

const recommendations = [
  {
    id: 1,
    title: "Redirect Ad Spend to High-Intent Channels",
    desc: "AI detected 4.2x higher conversion rate on Google Search vs. LinkedIn. Shift $12k budget.",
    impact: "High Impact",
  },
  {
    id: 2,
    title: "Deploy Automated Outreach Sequences",
    desc: "Trigger sales sequences automatically for prospects visiting the pricing page more than twice.",
    impact: "+28% Reply Rate",
  },
  {
    id: 3,
    title: "Optimize Hero Section Call-to-Action",
    desc: "A/B testing suggests replacing generic 'Sign Up' with 'Book Strategy Call' increases conversions by 18.5%.",
    impact: "Quick Win",
  },
];

// ─── Animations ───
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function DashboardMockup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="section bg-void">
        <div className="container-wide text-center py-20">
          <div className="animate-pulse text-mist">Loading dashboard preview...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-void relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-3 inline-block">Real-Time Insight</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Measure Every Step of Your Growth
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-warningGlow text-warning text-body-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sample Growth Report — illustrative data
          </div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Revenue Area Chart */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-caption text-mist uppercase tracking-widest block">Revenue Projection</span>
                <span className="font-display text-display-sm font-bold text-ice mt-1">$95,000 / mo</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 border border-success/20 text-success text-body-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                +31.4% MoM
              </div>
            </div>

            {/* Line/Area Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#5E6F8A"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#5E6F8A"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0C1425",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      color: "#E8EDF5",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Leads Bar Chart */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-caption text-mist uppercase tracking-widest block">Leads Generated</span>
                <span className="font-display text-display-sm font-bold text-ice mt-1">850 / mo</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-glow border border-cyan-border text-cyan-400 text-body-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                Target Met
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#5E6F8A"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#5E6F8A"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    contentStyle={{
                      background: "#0C1425",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      color: "#E8EDF5",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="leads" fill="#06B6D4" radius={[4, 4, 0, 0]}>
                    {leadsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === leadsData.length - 1 ? "#06B6D4" : "rgba(6, 182, 212, 0.3)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ROI & Conversion & Gauge metrics */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Target className="w-4 h-4" />
                <span className="text-caption text-mist uppercase tracking-widest block font-semibold">Conversion Rate</span>
              </div>
              <h3 className="font-display text-display-md font-bold text-ice mb-6">3.4%</h3>
            </div>

            {/* Micro Radial/Pie Chart for Conversion */}
            <div className="h-28 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={48}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-body-xs font-mono font-bold text-ice">10x</span>
                <span className="text-[9px] text-mist uppercase">vs. avg</span>
              </div>
            </div>

            <div className="mt-6 border-t border-steel/30 pt-4 flex items-center justify-between">
              <span className="text-body-sm text-frost">Marketing ROI</span>
              <span className="text-body-sm font-mono text-cyan-400 font-bold">5.8x Return</span>
            </div>
          </motion.div>

          {/* Website Performance score gauge */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Zap className="w-4 h-4" />
                <span className="text-caption text-mist uppercase tracking-widest block font-semibold font-display">Performance Score</span>
              </div>
              <h3 className="font-display text-display-md font-bold text-ice mb-4">98/100</h3>
            </div>

            {/* Visual Gauge line representation */}
            <div className="space-y-4 my-4">
              {[
                { label: "Core Web Vitals", val: 99 },
                { label: "Accessibility", val: 96 },
                { label: "SEO Optimization", val: 100 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-body-xs text-frost mb-1 font-mono">
                    <span>{s.label}</span>
                    <span>{s.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-steel/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.val}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-steel/30 pt-4 flex items-center justify-between">
              <span className="text-body-xs text-mist">Lighthouse Audit</span>
              <span className="text-[10px] uppercase font-semibold text-success font-mono">Perfect Score</span>
            </div>
          </motion.div>

          {/* AI Recommendations Panel */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-caption text-mist uppercase tracking-widest font-semibold">AI recommendations</span>
                </div>
                <span className="text-body-xs text-cyan-400 font-mono flex items-center gap-1">
                  Active Optimization <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Recommendation List */}
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-steel/30 bg-void/50 hover:bg-void/80 hover:border-cyan-border/40 transition-colors duration-300 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-body-sm font-semibold text-ice mb-1">{rec.title}</h4>
                      <p className="text-body-xs text-frost leading-normal">{rec.desc}</p>
                    </div>
                    <span className="flex-shrink-0 text-caption font-mono px-2 py-1 rounded bg-cyan-glow border border-cyan-border/30 text-cyan-400">
                      {rec.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
