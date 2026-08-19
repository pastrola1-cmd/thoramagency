"use client";

const reasons = [
  {
    num: "01",
    title: "Origin with context",
    desc: "Built on the African continent, working with teams globally. We bring a perspective most studios don't have.",
  },
  {
    num: "02",
    title: "No vanity work",
    desc: "Fixed scopes, honest pricing, and a proposal within 48 hours. Clear communication and sensible timelines are the standard.",
  },
  {
    num: "03",
    title: "End to end, then after",
    desc: "Strategy through engineering through design — one team, full coverage. And 100% of the source code is yours when we're done.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section-pad border-t border-zinc-900/[0.06]">
      <div className="max-w-2xl mb-16">
        <div className="pill-badge mb-3">Why Thoram</div>
        <h2 className="section-title">Built different, on purpose.</h2>
      </div>

      <div className="space-y-0">
        {reasons.map((reason) => (
          <div
            key={reason.num}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-zinc-900/[0.06] hover:bg-zinc-50/60 transition-colors"
          >
            <div className="md:col-span-2 text-2xl font-bold text-cyan-700">
              {reason.num}
            </div>
            <div className="md:col-span-4">
              <h3 className="text-xl font-bold text-zinc-900">{reason.title}</h3>
            </div>
            <div className="md:col-span-6">
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-zinc-900/[0.06]" />
      </div>
    </section>
  );
}