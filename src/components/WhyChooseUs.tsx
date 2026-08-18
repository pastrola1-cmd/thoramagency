"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, DollarSign, BrainCircuit, Users, Compass } from "lucide-react";

const fadeUpVariant = {
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

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Zap,
      title: "Fast Delivery",
      desc: "Our modular sprint architecture allows us to ship working updates to staging environments every week, reducing overhead.",
    },
    {
      icon: Compass,
      title: "Modern Tech Stack",
      desc: "We compile native code using Flutter, build web layouts with Next.js, and scale infrastructure via serverless backend loops.",
    },
    {
      icon: BrainCircuit,
      title: "AI-First Approach",
      desc: "We build Gemini-powered agents, custom embeddings, and reasoning models into your products from day one.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      desc: "Zero hidden costs or variable quotes. Projects are broken down into fixed-price $2,500 build loops, so you stay in budget.",
    },
    {
      icon: ShieldCheck,
      title: "Ongoing Support",
      desc: "We monitor performance, run automated security audits, and provide active codebase maintenance to guarantee uptime.",
    },
    {
      icon: Users,
      title: "Experienced Team",
      desc: "Our senior developers, UI researchers, and growth engineers have designed products for startups and enterprises worldwide.",
    },
  ];

  return (
    <section className="section bg-obsidian py-24 border-y border-steel/30 relative overflow-hidden" id="why-us">
      {/* Background cyan light path */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

      <div className="container-wide relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-3 block">Why Thoram</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Bespoke Engineering, Delivered Weekly.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            We reject slow-moving traditional agency timelines. We compile enterprise-grade code 
            built to capture market demand with absolute speed and clarity.
          </p>
        </div>

        {/* 6-Card Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUpVariant}
                className="glass p-8 rounded-2xl border border-steel/60 hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-steel/30 border border-steel/50 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-body-lg font-bold text-ice mb-2">
                  {card.title}
                </h3>
                <p className="text-body-xs md:text-body-sm text-frost leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
