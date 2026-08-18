"use client";

import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, ArrowRight, Clock } from "lucide-react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="section-pad border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Call-to-Action & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="pill-badge">Let's Build</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ready to build something <span className="cyan-gradient">remarkable?</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Book a free 30-minute discovery session. We’ll analyze your bottlenecks, identify high-impact AI/software opportunities, and outline exactly how we’d build it.
            </p>
            <p className="text-sm font-mono text-cyan-400">
              No sales pitch. Zero pressure. Just clarity.
            </p>

            <div className="pt-4 space-y-3">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl studio-glass studio-glass-hover text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Chat instantly on WhatsApp</div>
                    <div className="text-xs text-zinc-400">+234 906 791 4511 (Direct Lead)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Email Direct */}
              <a
                href="mailto:hello@thoramgroup.com"
                className="w-full flex items-center justify-between p-4 rounded-xl studio-glass studio-glass-hover text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Email us directly</div>
                    <div className="text-xs text-zinc-400">hello@thoramgroup.com</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>We reply to all proposals within one business day.</span>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl studio-glass">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Discovery Request Received</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering director will review your requirements and reach out within 24 hours with next steps.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20just%20submitted%20a%20project%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Follow up on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Oladimeji"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Company / Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Health"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Primary Interest
                    </label>
                    <select className="w-full bg-[#0E0E14] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors">
                      <option value="ai">AI Agents & Digital Workers</option>
                      <option value="web">Web & Cloud Engineering</option>
                      <option value="mobile">Native Mobile Application</option>
                      <option value="strategy">Strategy & Technical Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    Tell us about what you want to build *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your product goals, team bottlenecks, or existing tech stack..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-solid text-sm py-3.5 font-bold"
                >
                  {loading ? (
                    <span>Submitting Discovery Request...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Request Discovery Session</span>
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
