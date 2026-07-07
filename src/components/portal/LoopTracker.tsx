"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Play, Lock, Award, ArrowRight } from "lucide-react";

// ─── Loops Data ───
const loops = [
  { id: 1, name: "Loop 1: Design Tokens", status: "completed", desc: "Design systems tokens & style-guide" },
  { id: 2, name: "Loop 2: Hero Section", status: "completed", desc: "Landing hero Outfit display headlines" },
  { id: 3, name: "Loop 3: Trust Bar", status: "completed", desc: "Geometric partner logo slots scroll triggers" },
  { id: 4, name: "Loop 4: Dashboard Mockup", status: "completed", desc: "Recharts conversion area & bar widgets" },
  { id: 5, name: "Loop 5: Products Grid", status: "completed", desc: "Asymmetrical list product hover checkmarks" },
  { id: 6, name: "Loop 6: Outcomes Showcase", status: "completed", desc: "Alternating CAC lines time-saved indicators" },
  { id: 7, name: "Loop 7: Case Studies", status: "completed", desc: "Problem solution detailed expanding cards" },
  { id: 8, name: "Loop 8: AI Widget", status: "completed", desc: "Floating scripted dialogue bubble widgets" },
  { id: 9, name: "Loop 9: Insights Scaffold", status: "completed", desc: "Blog articles layout index Dynamic reader" },
  { id: 10, name: "Loop 10: Application Form", status: "completed", desc: "Selective application form 3-step layouts" },
  { id: 11, name: "Loop 11: Header & Footer", status: "completed", desc: "Sticky blurs sitemap footer email newsletters" },
  { id: 12, name: "Loop 12: SEO Optimization", status: "completed", desc: "CLS zero shift preloads metatags indexers" },
  { id: 13, name: "Loop 13: Portal Shell Auth", status: "in-progress", desc: "Firebase auth protected layouts login redirects" },
  { id: 14, name: "Loop 14: Workspace Page", status: "in-progress", desc: "B2B loops tracking list progress indicators" },
  { id: 15, name: "Loop 15: Firestore Analytics", status: "locked", desc: "Database analytics logs dashboard synchronization" },
  { id: 16, name: "Loop 16: Stripe Billing", status: "locked", desc: "B2B invoice setups payment gateways hooks" },
  { id: 17, name: "Loop 17: Database Actions", status: "locked", desc: "Firestore contact form inputs writing database" },
  { id: 18, name: "Loop 18: Release Staging", status: "locked", desc: "Vercel release production build host deployment" },
];

export default function LoopTracker() {
  const completedCount = loops.filter((l) => l.status === "completed").length;
  const progressPercent = Math.round((completedCount / loops.length) * 100);

  return (
    <div className="space-y-8">
      {/* Progress header card */}
      <div className="glass rounded-2xl p-6 border border-steel/60 relative overflow-hidden bg-graphite/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] text-mist font-mono uppercase tracking-widest block">Build Completion</span>
            <h2 className="font-display text-display-sm font-bold text-ice flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-400" />
              {progressPercent}% Delivered
            </h2>
            <p className="text-body-xs text-frost">
              {completedCount} of {loops.length} loops completed and locked successfully.
            </p>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full md:w-80 space-y-2">
            <div className="h-2 w-full bg-steel/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500 rounded-full shadow-glow"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-mist font-mono">
              <span>MARKETING (1-12) LOCKED</span>
              <span>APP LAYER (13-18)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Loops */}
      <div>
        <h3 className="font-display text-body-sm font-bold text-ice uppercase tracking-wider mb-6 flex items-center gap-2">
          <span>✓</span> Build Loop Execution Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loops.map((loop) => {
            const isCompleted = loop.status === "completed";
            const isInProgress = loop.status === "in-progress";

            return (
              <div
                key={loop.id}
                className={`glass rounded-xl p-4 border flex flex-col justify-between min-h-[120px] transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-500/20 bg-emerald-500/2"
                    : isInProgress
                    ? "border-cyan-500/30 bg-cyan-glow/5 shadow-glow/5"
                    : "border-steel/40 bg-void/5 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-ice font-bold font-mono">
                      LOOP_0{loop.id}
                    </span>

                    {/* Badge */}
                    {isCompleted ? (
                      <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Locked
                      </span>
                    ) : isInProgress ? (
                      <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1 uppercase">
                        <Play className="w-2.5 h-2.5 animate-pulse" /> Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-mist flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Pending
                      </span>
                    )}
                  </div>

                  <h4 className="text-body-xs font-bold text-ice mb-1">{loop.name}</h4>
                  <p className="text-[10px] text-frost leading-normal">{loop.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
