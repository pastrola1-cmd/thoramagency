"use client";

import { motion } from "framer-motion";
import { Compass, FileSearch, Figma, Layers, TestTube, Rocket, ShieldAlert } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "1. Discovery",
    tagline: "Scope Alignment",
    desc: "We analyze your operations, outline specifications, and map user flow architectures.",
    loop: "Loop 0 (Free)",
  },
  {
    icon: Compass,
    title: "2. Planning",
    tagline: "Sprint Roadmapping",
    desc: "We partition the project into specific $2,500 modular build loops with explicit deliverables.",
    loop: "Loop 0 (Free)",
  },
  {
    icon: Figma,
    title: "3. Design",
    tagline: "High-Fidelity UI",
    desc: "We design premium interfaces in Figma aligned with your corporate identity guidelines.",
    loop: "Loop 1 (Design)",
  },
  {
    icon: Layers,
    title: "4. Development",
    tagline: "Incremental Coding",
    desc: "We write clean typescript and native codebase assemblies, pushing builds directly to staging.",
    loop: "Loop 2-4 (Dev)",
  },
  {
    icon: TestTube,
    title: "5. Testing",
    tagline: "Automation Runs",
    desc: "We audit API validation rules, security permissions, and page response latency profiles.",
    loop: "Loop 5 (QA)",
  },
  {
    icon: Rocket,
    title: "6. Launch",
    tagline: "Production Push",
    desc: "We coordinate DNS routing, deploy files to global serverless CDNs, and verify live configurations.",
    loop: "Loop 5 (Deployment)",
  },
  {
    icon: ShieldAlert,
    title: "7. Support",
    tagline: "Continuous Ops",
    desc: "We configure rate-limiting, monitor uptime metrics, and scale loops as your user base scales.",
    loop: "Continuous",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProcessTimeline() {
  return (
    <section className="section bg-void py-24 border-b border-steel/30 relative overflow-hidden" id="process">
      {/* Background neon dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c2a44_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      <div className="container-wide relative z-10">
        
        {/* Title block */}
        <div className="max-w-3xl mb-20">
          <span className="eyebrow mb-3 block">Methodology</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            The Loop Engineering Process.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            We break complex software engineering challenges down into structured milestones. Here 
            is how we design, build, test, and host your growth infrastructure.
          </p>
        </div>

        {/* Stepper Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={fadeUpVariant}
                className="relative glass rounded-2xl p-6 border border-steel/60 hover:border-cyan-border/40 transition-all duration-300 flex flex-col justify-between group h-full hover:shadow-glow/5"
              >
                <div>
                  {/* Step Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-steel/30 border border-steel/50 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-cyan-glow border border-cyan-border/30 text-cyan-400 px-2 py-0.5 rounded-full uppercase">
                      {step.loop}
                    </span>
                  </div>

                  <h3 className="font-display text-body-md font-bold text-ice mb-1 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-[10px] text-frost/60 font-mono font-semibold mb-3 uppercase tracking-wider">
                    {step.tagline}
                  </div>
                  <p className="text-body-xs text-frost leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow Connector for larger screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-[52px] -right-4 w-8 h-[1px] bg-gradient-to-r from-steel to-transparent z-20 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
