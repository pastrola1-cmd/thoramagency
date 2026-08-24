"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Zap, Heart, Gift, ArrowRight, CheckCircle2, FileText } from "lucide-react";

const positions = [
  {
    title: "AI Systems Engineer",
    type: "Full-time • Remote",
    desc: "Scale autonomous LLM retrieval setups, prompt templates, and vector databases.",
    loops: "4 loops experience",
  },
  {
    title: "UI/UX Product Designer",
    type: "Contract • Remote",
    desc: "Design high-fidelity conversion layouts and corporate wireframe design systems.",
    loops: "2 loops experience",
  },
];

const benefits = [
  { icon: Zap, title: "Loop Autonomy", desc: "We measure throughput by milestone sprint completions, not arbitrary clock hours." },
  { icon: Heart, title: "Modern Tech Stack", desc: "Collaborate on Next.js, Gemini API architectures, and Flutter native apps." },
  { icon: Gift, title: "Growth Learning", desc: "Learn custom automation flows, CRM pipelines, and programmatics." },
];

export default function CareersPage() {
  const [applyModal, setApplyModal] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setApplyModal(null);
      setSuccess(false);
      setEmail("");
      setResumeLink("");
    }, 2000);
  };

  return (
    <div className="py-20 bg-void relative overflow-hidden">
      <div className="container-wide">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">Join Thoram</span>
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl font-bold text-ice mb-4 leading-tight">
            Build the Future of Growth.
          </h1>
          <p className="text-body-md text-frost leading-relaxed">
            We are looking for self-driven developer sprints, design systems managers, and operations 
            engineers. Explore active listings below.
          </p>
        </div>

        {/* Core Benefits */}
        <div className="mb-24">
          <h2 className="font-display text-body-lg md:text-display-sm font-bold text-ice mb-8">Culture & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="glass p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-steel/20 border border-steel/50 text-orange-500 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-body-md font-bold text-ice mb-1">{b.title}</h3>
                  <p className="text-body-xs text-frost leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Openings */}
        <div className="max-w-3xl">
          <h2 className="font-display text-body-lg md:text-display-sm font-bold text-ice mb-8">Active Openings</h2>
          
          <div className="space-y-4">
            {positions.map((pos) => (
              <div
                key={pos.title}
                className="glass p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div>
                  <h3 className="font-display text-body-lg font-bold text-ice mb-1 group-hover:text-cyan-300 transition-colors">
                    {pos.title}
                  </h3>
                  <div className="text-[10px] text-orange-500 font-mono uppercase tracking-wider mb-2">
                    {pos.type}
                  </div>
                  <p className="text-body-xs text-frost leading-relaxed">
                    {pos.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-[9px] text-mist font-mono uppercase">
                    Req: {pos.loops}
                  </span>
                  <button
                    onClick={() => setApplyModal(pos.title)}
                    className="btn btn-secondary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1 hover:border-cyan-border"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Application Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-void/80 backdrop-blur-md" onClick={() => setApplyModal(null)} />
          
          <div className="relative w-full max-w-md bg-graphite border border-steel rounded-2xl p-6 md:p-8 shadow-2xl z-10">
            <h3 className="font-display text-body-lg font-bold text-ice mb-2">Apply for {applyModal}</h3>
            <p className="text-body-xs text-frost mb-6">
              Enter your details to initiate the developer screening process.
            </p>

            {success ? (
              <div className="p-4 rounded-xl bg-success-glow border border-success/30 text-success text-body-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Application registered in our ATS queue!</span>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label htmlFor="applicant-email" className="text-[10px] text-frost font-mono uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="applicant-email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-steel bg-steel/10 text-ice focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all focus:outline-none text-body-xs"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="applicant-resume" className="text-[10px] text-frost font-mono uppercase tracking-wider block mb-1">
                    Portfolio / Resume Link
                  </label>
                  <input
                    type="url"
                    id="applicant-resume"
                    placeholder="https://github.com/..."
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-steel bg-steel/10 text-ice focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all focus:outline-none text-body-xs"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn btn-primary py-3 px-6 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow"
                >
                  Submit Application <FileText className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
