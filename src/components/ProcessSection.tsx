"use client";

const steps = [
  {
    num: "01",
    phase: "SCOPE & ARCHITECTURE",
    title: "Technical Discovery",
    desc: "We analyze the business problem, model database schemas and APIs, and provide a fixed-milestone roadmap before writing code.",
  },
  {
    num: "02",
    phase: "WEEKLY SPRINTS",
    title: "Design & Engineering",
    desc: "Full-stack engineers build in rapid weekly sprints. You test working software in private staging environments every week.",
  },
  {
    num: "03",
    phase: "SECURITY & QA",
    title: "System Hardening",
    desc: "End-to-end stress testing, edge case handling, payment gateway webhook verification, and 99.9% uptime validation.",
  },
  {
    num: "04",
    phase: "100% IP HANDOVER",
    title: "Launch & Stability",
    desc: "Full repository and credential handover, production go-live, and 30 days of active stability monitoring.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-pad border-t border-zinc-900/[0.06] bg-zinc-50/60">
      <div className="max-w-2xl mb-16">
        <div className="pill-badge mb-3">Engineering Discipline</div>
        <h2 className="section-title">A process built for predictability.</h2>
        <p className="section-desc">Defined scopes. Weekly progress demos. No surprises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-7 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-orange-600/40 hover:shadow-lg hover:shadow-zinc-900/[0.04] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-orange-600 font-mono">{step.num}</span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                  {step.phase}
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
