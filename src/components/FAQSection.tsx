"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who owns the intellectual property, source code, and designs?",
      a: "You do. 100%. Upon project completion and final payment, all source code repositories, Figma designs, database schemas, and credentials transfer to your organization in full. We build zero vendor lock-in.",
    },
    {
      q: "What types of companies and problems do you work with?",
      a: "We partner with ambitious startups, scaling companies, and established enterprises. Whether you are automating repetitive operational handoffs, deploying custom AI digital workers, launching a mobile app, or building a high-conversion web platform—if the problem is real and your team is ready to move, we can help.",
    },
    {
      q: "How fast can we go from discovery to live deployment?",
      a: "Most scoped builds launch within 2 to 6 weeks. Because we operate in structured weekly sprints, you review and test working software in staging every week rather than waiting months for a big reveal.",
    },
    {
      q: "What currencies and payment terms do you support?",
      a: "We invoice transparently in USD, GBP, EUR, or NGN depending on your company's location and preference. Payments are tied to milestone deliverables so you always pay for verified outcomes.",
    },
    {
      q: "Do you stay involved after the product is live?",
      a: "Yes. We don't vanish after launch. We provide 30-day post-launch warranty and offer flexible Growth & Ops Retainers to monitor server uptime, tune AI agents, and roll out subsequent feature releases.",
    },
  ];

  return (
    <section id="faqs" className="section-pad border-t border-white/[0.06] bg-[#0A0A0D]/40">
      <div className="max-w-3xl mb-16">
        <div className="pill-badge mb-3">Frequently Asked Questions</div>
        <h2 className="section-title">
          Answers, before you ask.
        </h2>
        <p className="section-desc">
          Everything you need to know about partnering with Thoram Group, our delivery standards, and how we handle intellectual property.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.q}
              className="rounded-xl studio-glass overflow-hidden transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-semibold text-base sm:text-lg focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm sm:text-base text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
