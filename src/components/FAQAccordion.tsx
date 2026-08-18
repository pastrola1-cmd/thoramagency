"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does development take?",
    answer: "Project timelines depend entirely on the scope of build loops. Simple website developments are completed in 1–2 loops (1–2 weeks), while complex SaaS platforms and enterprise AI integrations require 4–8 loops. We deliver working code updates to your staging environment every single week.",
  },
  {
    question: "How much does a website or application cost?",
    answer: "We productize our development cycles into fixed-price $2,500 build loops (sprints). A typical marketing website takes 1–2 loops ($2,500 – $5,000), a custom CRM/portal takes 2–4 loops ($5,000 – $10,000), and custom AI pipelines scale from 4+ loops upwards. You pay per loop milestone, keeping budgets fully predictable.",
  },
  {
    question: "Can you build AI software and agentic workflows?",
    answer: "Yes, we specialize in AI-first development. We design custom Gemini and OpenAI agent integrations, vector search embeddings, semantic data routers, natural language processors, and autonomous workflows that connect directly to your CRM, databases, and client dashboards.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Absolutely. We offer a system ops and maintenance module which covers codebase updates, continuous security audits, vulnerability sweeps, API health tracking, database optimization, and active uptime monitoring.",
  },
  {
    question: "Can you redesign my existing website or app?",
    answer: "Yes. We perform comprehensive codebase audits, identify page speed and UI/UX vulnerabilities, and rewrite legacy setups into fully responsive Next.js and Tailwind CSS frontends linked to secure serverless database layers.",
  },
  {
    question: "How do payments work?",
    answer: "We support instant online B2B payments secured via our Paystack gateway integration. When a loop milestone is scheduled, you authorize payment for that specific sprint loop in advance. Once the milestone passes QA testing and receives your explicit approval, we lock it and schedule the next active loop.",
  },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section bg-void py-24 border-b border-steel/30" id="faqs">
      <div className="container-tight">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-3 inline-block">Got Questions?</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice">
            Frequently Asked Questions.
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass rounded-2xl border border-steel/60 hover:border-cyan-border/30 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-ice hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-t-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-body-md md:text-body-lg font-bold flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-steel/30 border border-steel/50 text-ice flex-shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: "easeOut" },
                          opacity: { duration: 0.2, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: "easeIn" },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-6 text-body-xs md:text-body-sm text-frost leading-relaxed border-t border-steel/20 pt-4 bg-void/25">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
