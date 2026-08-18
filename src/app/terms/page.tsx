"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation header */}
      <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice hover:text-cyan-400 transition-colors">
          Thoram<span className="text-cyan-400">.</span>
        </Link>
        <Link href="/" className="text-body-sm text-frost hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        <div>
          <span className="eyebrow mb-3 block">LEGAL AGREEMENTS</span>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-ice">
            Terms of Service.
          </h1>
          <p className="text-body-xs text-mist font-mono uppercase mt-2">
            Last Updated: July 07, 2026
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 border border-steel/60 space-y-6 text-frost text-body-xs md:text-body-sm leading-relaxed font-mono">
          <div className="flex items-center gap-2 text-cyan-400 pb-2 border-b border-steel/30">
            <ShieldCheck className="w-4 h-4" />
            <span>TERMS_AND_Sprint_REGULATIONS</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">1. Development Sprints</h2>
            <p>
              Each development sprint is funded in locked increments of $2,500.00 (the "Loop Fee") via Paystack or integrated billing channels. Sprints are scheduled immediately upon callback verification checks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">2. Automated Actions</h2>
            <p>
              By configuring active outreach campaigns inside the AI Sales Engine, the user grants Thoram Group permission to execute automated interactions and contact scrapers on their behalf. The user maintains liability for outbound message content compliance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">3. Guarantee Limits</h2>
            <p>
              While our software optimizes site traffic conversion and outbound reply indices, B2B sales cycles depend on organic market demand. We do not guarantee specific monetary valuations on new qualified pipelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
