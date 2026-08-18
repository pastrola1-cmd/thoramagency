"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Laptop, Database, BrainCircuit, CloudLightning, ShieldCheck } from "lucide-react";

interface TechItem {
  name: string;
  desc: string;
  tagline: string;
}

interface TechCategories {
  [key: string]: {
    icon: any;
    label: string;
    items: TechItem[];
  };
}

const techStack: TechCategories = {
  frontend: {
    icon: Laptop,
    label: "Frontend Dev",
    items: [
      { name: "React", tagline: "Component Architectures", desc: "Open-source user interface library for building dynamic reactive client states." },
      { name: "Next.js", tagline: "Production Framework", desc: "React framework for pre-rendered search SEO, routing, and fast static builds." },
      { name: "Flutter", tagline: "Cross-Platform Native", desc: "Google-designed client SDK compiling native mobile assemblies from a single codebase." },
    ],
  },
  backend: {
    icon: Database,
    label: "Backend & Data",
    items: [
      { name: "Firebase", tagline: "Serverless Application Kit", desc: "Realtime synchronized document caches, file cloud storages, and authentication databases." },
      { name: "Supabase", tagline: "Postgres BaaS Platform", desc: "Open-source relational database layer with realtime webhooks and secure access parameters." },
      { name: "Node.js", tagline: "Asynchronous Server Runtime", desc: "Scalable javascript execution environment for building custom API proxy routers." },
    ],
  },
  ai: {
    icon: BrainCircuit,
    label: "Artificial Intelligence",
    items: [
      { name: "Gemini Pro", tagline: "Reasoning Models", desc: "Google's multi-modal reasoning engine for structuring files and running workflows." },
      { name: "OpenAI API", tagline: "Text Classifier Sprints", desc: "Large language models deployed to classify incoming client query bodies." },
      { name: "Claude API", tagline: "Context Processing", desc: "Bespoke LLM context routers for scanning corporate contracts and files." },
    ],
  },
  cloud: {
    icon: CloudLightning,
    label: "Infrastructure & CDN",
    items: [
      { name: "Vercel", tagline: "Edge Delivery Network", desc: "Speed-optimized routing CDN for fast, globally-distributed web application endpoints." },
      { name: "Google Cloud", tagline: "Enterprise Compute Engines", desc: "Secure GCP instances configured with rate-limiting and virtual networks." },
      { name: "Firebase Hosting", tagline: "Static Web Host", desc: "Zero-cold-start hosting CDN providing free automatic SSL certification." },
    ],
  },
};

export default function TechGrid() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section className="section bg-void py-24 border-b border-steel/30" id="tech-stack">
      <div className="container-wide">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">Development Stack</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Our Enterprise Technology Grid.
          </h2>
          <p className="text-body-md text-frost leading-relaxed">
            We leverage industry-standard web engines, native compilers, serverless databases, 
            and advanced LLM reasoning pipelines to secure maximum performance.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Menu */}
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-64 overflow-x-auto pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-steel/30 pr-0 lg:pr-6">
            {Object.entries(techStack).map(([key, category]) => {
              const Icon = category.icon;
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-mono text-[11px] uppercase tracking-wider border transition-all duration-300 w-full whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "bg-cyan-500 text-obsidian border-cyan-500 font-bold shadow-glow"
                      : "border-steel hover:border-cyan-border text-frost hover:text-ice bg-glass-white"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cards Display Grid */}
          <div className="flex-grow w-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {techStack[activeTab].items.map((tech) => (
                <div
                  key={tech.name}
                  className="glass p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <h3 className="font-display text-body-lg font-bold text-ice mb-1 group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </h3>
                    <div className="text-[9px] text-cyan-400 font-mono uppercase tracking-wider mb-4">
                      {tech.tagline}
                    </div>
                    <p className="text-body-xs text-frost leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-3 border-t border-steel/20 flex items-center justify-between text-[9px] text-mist font-mono">
                    <span>Active Integration</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
