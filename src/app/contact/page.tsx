"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MessageCircle, Mail, CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { submitLeadViaWhatsApp, mailtoFallback } from "@/lib/lead";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Business Systems & Custom Software");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitLeadViaWhatsApp({ name, email, company, interest: service, message });
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 600);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Page Title */}
        <div className="max-w-3xl mb-16">
          <div className="pill-badge mb-3">Start a Project</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            Have a product <span className="text-cyan-700">worth building?</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Tell us what you're trying to build, fix, or automate. We'll assess the problem, tell you what it will take, what it should cost, and whether Thoram is the right team to do it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct WhatsApp & Email Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-zinc-900/[0.08] space-y-6">
              <h2 className="text-xl font-bold text-zinc-900">Direct Communication Channels</h2>
              
              <div className="space-y-4">
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20have%20a%20project%20I%20would%20like%20to%20discuss."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-900/[0.08] hover:border-emerald-600/50 hover:bg-emerald-600/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Chat on WhatsApp</div>
                      <div className="text-xs text-zinc-500">+234 906 791 4511 (Lead Partner)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:hello@thoramgroup.com"
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-900/[0.08] hover:border-cyan-700/50 hover:bg-cyan-700/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-700/10 border border-cyan-700/20 text-cyan-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Direct Email</div>
                      <div className="text-xs text-zinc-500">hello@thoramgroup.com</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-700 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-6 border-t border-zinc-900/[0.06] space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-mono">
                  <Clock className="w-4 h-4 text-cyan-700" />
                  <span>Transparent scoped proposal within 48 hours</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Client IP & Source Code Ownership</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Brief Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-zinc-900/[0.08]">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">Project Brief Received</h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                  Thank you for sharing your project parameters. A senior partner will review your requirements and follow up with a clear proposal within 48 hours.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20just%20submitted%20a%20project%20brief."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 text-xs font-semibold hover:bg-emerald-600/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow up instantly on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Oladimeji"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Health"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                      Primary Capability *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none transition-colors"
                    >
                      <option value="Business Systems & Custom Software">Business Systems & Custom Software</option>
                      <option value="Customer Platforms & SaaS">Customer Platforms & SaaS</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Automation & AI Workflows">Automation & AI Workflows</option>
                      <option value="Product Strategy & Architecture">Product Strategy & Architecture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                    Project Requirements & Business Bottlenecks *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're trying to build, fix, or automate. Include any technical preferences or timeline targets..."
                    className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-solid text-sm py-4 font-bold tracking-wide"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>{isSubmitting ? "Submitting Brief..." : "Submit Project Brief"}</span>
                    <Send className="w-4 h-4" />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
