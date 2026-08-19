"use client";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We sit with your team, study the problem, and map the terrain before drawing a single line.",
  },
  {
    num: "02",
    title: "Define",
    desc: "We turn ambiguity into a sharp brief: scope, success metrics, timelines, and trade-offs on the table.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Designers and engineers ship in tight loops. You see progress weekly, not at the end.",
  },
  {
    num: "04",
    title: "Launch & Handover",
    desc: "We ship, hand over 100% of the code and IP, and stay close. The work isn't done until it earns its place.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-pad border-t border-zinc-900/[0.06] bg-zinc-50/60">
      <div className="max-w-2xl mb-16">
        <div className="pill-badge mb-3">How We Work</div>
        <h2 className="section-title">A process that respects your time.</h2>
        <p className="section-desc">Four phases. Tight loops. No surprises at the end.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-7 rounded-2xl bg-white border border-zinc-900/[0.08] hover:border-cyan-700/40 transition-all duration-300"
          >
            <span className="text-2xl font-bold text-cyan-700">{step.num}</span>
            <h3 className="text-lg font-bold text-zinc-900 mt-4 mb-2">{step.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}