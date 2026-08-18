"use client";

import { motion } from "framer-motion";

export default function TrustBar() {
  const clients = [
    { name: "Manna Bible", category: "Mobile App & Audio AI" },
    { name: "Nissie Shelters", category: "Real Estate & Lead CRM" },
    { name: "Scale Wealth", category: "Fintech & Payments" },
    { name: "EduThoram", category: "EdTech & Learning OS" },
    { name: "DWealth Global", category: "Asset Management Portal" },
  ];

  return (
    <section className="py-12 border-y border-white/[0.06] bg-[#0A0A0D]/50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Trusted by founders & teams building scalable digital infrastructure
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col cursor-default transition-all duration-200"
              >
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-cyan-400 transition-colors">
                  {client.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
