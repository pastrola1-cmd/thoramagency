"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  Cross,
  Truck,
  DollarSign,
  Factory,
  Landmark,
  TrendingUp,
} from "lucide-react";

interface Industry {
  icon: any;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

const industries: Industry[] = [
  {
    icon: Building2,
    title: "Real Estate",
    desc: "Deploy property listings dashboards, virtual tours engines, and CRM lead routers that coordinate agent schedules.",
    metric: "+32%",
    metricLabel: "Lead Conversion Increase",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    desc: "Build secure EHR integrations, patient scheduling consoles, and encrypted intake sheets matching compliance parameters.",
    metric: "100%",
    metricLabel: "Compliance Score",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Establish student registration grids, tuition billing consoles, and grading portfolios reducing workload overhead.",
    metric: "40 hrs",
    metricLabel: "Admin Time Saved / Wk",
  },
  {
    icon: Cross,
    title: "Churches & Ministries",
    desc: "Compile custom scripture apps, audio bible streamers, donation ledgers, and dynamic member announcements.",
    metric: "15k+",
    metricLabel: "Active Scripture Sessions",
  },
  {
    icon: Truck,
    title: "Logistics",
    desc: "Automate supply chain operations, route optimization calculations, track deliveries, and sync telemetry.",
    metric: "-22%",
    metricLabel: "Delivery Overheads",
  },
  {
    icon: DollarSign,
    title: "Finance",
    desc: "Secure multi-tenant payment pipelines, Paystack transaction systems, accounting logs, and digital invoices.",
    metric: "Instant",
    metricLabel: "Transaction Verification",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    desc: "Connect inventory logs to webhooks, optimize order dispatch queues, and monitor plant output metrics.",
    metric: "+18%",
    metricLabel: "Throughput Efficiency",
  },
  {
    icon: Landmark,
    title: "Government",
    desc: "Develop accessible public portals, citizen service intake forms, secure data repositories, and sitemaps.",
    metric: "A++",
    metricLabel: "Accessibility & Security",
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

export default function IndustriesGrid() {
  return (
    <section className="section bg-obsidian py-24 border-b border-steel/30" id="industries">
      <div className="container-wide">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">Market Verticals</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Custom Architecture by Industry.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            We adapt our development templates to match the security, accessibility, and metric 
            profiles of your specific vertical.
          </p>
        </div>

        {/* 8-Card Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                variants={cardVariants}
                className="glass p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-steel/30 border border-steel/50 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-body-lg font-bold text-ice mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-body-xs text-frost leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-steel/20 flex flex-col justify-start">
                  <span className="text-[10px] text-mist font-mono uppercase tracking-wider mb-0.5">
                    {ind.metricLabel}
                  </span>
                  <span className="font-display text-body-lg font-bold text-cyan-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-cyan-500" /> {ind.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
