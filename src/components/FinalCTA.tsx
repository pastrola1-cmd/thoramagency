"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarRange, FileText } from "lucide-react";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FinalCTA() {
  return (
    <section className="section bg-void py-24 relative overflow-hidden" id="final-cta">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="container-tight relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="glass p-10 md:p-16 rounded-3xl border border-steel/60 hover:border-cyan-border/40 text-center relative overflow-hidden shadow-2xl max-w-4xl mx-auto"
        >
          {/* Subtle grid lines background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1c2a44_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Eyebrow */}
          <span className="eyebrow mb-4 inline-block">Start Your Sprint</span>

          {/* Heading */}
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-6 leading-tight max-w-2xl mx-auto">
            Ready to Build Something Amazing?
          </h2>

          {/* Description */}
          <p className="text-body-sm md:text-body-md text-frost max-w-xl mx-auto mb-10 leading-relaxed">
            Partner with Thoram Group to launch your custom AI software, web platform, or mobile app 
            milestone. Book your strategy session to outline Loop 0.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link href="/contact" className="w-full sm:w-auto flex-1">
              <button className="btn btn-primary w-full py-4 px-6 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow hover:scale-[1.02] transition-all">
                <CalendarRange className="w-4 h-4" /> Schedule Consultation
              </button>
            </Link>

            <Link href="/contact?mode=quote" className="w-full sm:w-auto flex-1">
              <button className="btn btn-secondary w-full py-4 px-6 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-glass-hover hover:scale-[1.02] transition-all">
                <FileText className="w-4 h-4" /> Get Free Quote
              </button>
            </Link>
          </div>

          {/* Bottom Trust Badge */}
          <div className="mt-8 flex justify-center items-center gap-2 text-[10px] text-mist font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Developer availability open for this week</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
