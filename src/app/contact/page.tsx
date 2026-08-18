"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MessageCircle, Mail, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("ai-agents");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1000);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Title */}
        <div className="max-w-3xl mb-16">
          <div className="pill-badge mb-3">Let's Build</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Ready to build something <span className="cyan-gradient">remarkable?</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Book a free 30-minute discovery call. We'll identify your highest-impact opportunity, review technical feasibility, and outline exactly how we'd build it. No sales pitch. Just clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct WhatsApp & Email Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl studio-glass space-y-6">
              <h2 className="text-xl font-bold text-white">Direct Communication Channels</h2>
              
              <div className="space-y-4">
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WhatsApp Chat</div>
                      <div className="text-xs text-zinc-400">+234 906 791 4511 (Direct Lead)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:hello@thoramgroup.com"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Direct Email</div>
                      <div className="text-xs text-zinc-400">hello@thoramgroup.com</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-6 border-t border-white/[0.06] space-y-3 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>SLA: 1 business day response on all inquiries.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl studio-glass">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Discovery Request Received</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering director will review your project parameters and contact you within 24 hours with an actionable roadmap.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20just%20submitted%20a%20project%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow up instantly on WhatsApp</span>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Health"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                      Primary Service Focus
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#0E0E14] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="ai-agents">AI Agents & Autonomous Digital Workers</option>
                      <option value="web-engineering">Product Design & Web Engineering</option>
                      <option value="mobile-apps">Native Mobile App Development</option>
                      <option value="strategy-advisory">Strategy & Technical Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    Tell us about your project requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your product vision, existing tech stack, or operational bottlenecks..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-solid text-sm py-3.5 font-bold"
                >
                  {isSubmitting ? (
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
    </div>
  );
}
