"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation header */}
      <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice hover:text-orange-500 transition-colors">
          Thoram<span className="text-orange-500">.</span>
        </Link>
        <Link href="/" className="text-body-sm text-frost hover:text-orange-500 transition-colors flex items-center gap-1.5 font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        <div>
          <span className="eyebrow mb-3 block">LEGAL FRAMEWORKS</span>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-ice">
            Privacy Policy.
          </h1>
          <p className="text-body-xs text-mist font-mono uppercase mt-2">
            Last Updated: July 07, 2026
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 border border-steel/60 space-y-6 text-frost text-body-xs md:text-body-sm leading-relaxed font-mono">
          <div className="flex items-center gap-2 text-orange-500 pb-2 border-b border-steel/30">
            <ShieldCheck className="w-4 h-4" />
            <span>SECURE_COMPLIANCE_PROTOCOL</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">1. Information Collection</h2>
            <p>
              We collect company domain metadata, email logs, and target audience coordinates exclusively to train and configure your custom autonomous lead engines. We do not sell, rent, or lease CRM datasets.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">2. Database Sync Policies</h2>
            <p>
              When connecting your PostgreSQL databases or Salesforce instances to Automation Studio, all API payloads are routed through encrypted transit loops (TLS 1.3). Database access logs are cached locally on client browser cache limits when in mock sandbox modes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-ice font-bold text-body-sm uppercase">3. Customer Opt-Out</h2>
            <p>
              You can revoke read permissions on our scraper crawlers at any point by configuring your domains robots.txt or sending a direct purge instruction to our compliance desk.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
