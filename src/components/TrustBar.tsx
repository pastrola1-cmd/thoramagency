"use client";

export default function TrustBar() {
  const clients = ["Manna Bible", "Nissie Shelters", "Scale Wealth", "EduThoram", "DWealth Global"];

  return (
    <section className="py-10 border-y border-white/[0.06] bg-[#0A0A0D]/50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
          Products we've built and scaled
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <span key={client} className="text-sm font-semibold text-zinc-300">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}