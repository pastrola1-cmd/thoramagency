"use client";

import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { submitLeadViaWhatsApp, mailtoFallback } from "@/lib/lead";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Business Systems & Custom Software",
    message: "",
  });

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLeadViaWhatsApp(form);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad border-t border-zinc-900/[0.06] bg-zinc-50/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="pill-badge">Start a Project</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Have a product <span className="text-cyan-700">worth building?</span>
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">
              Tell us what you're trying to build, fix or automate. We'll assess the problem, tell you what it will take, what it should cost, and whether Thoram is the right team to do it.
            </p>

            <div className="pt-4 space-y-3">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20have%20a%20project%20I%20would%20like%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-zinc-900/[0.08] hover:border-emerald-600/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-700">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">Chat on WhatsApp</div>
                    <div className="text-xs text-zinc-500">+234 906 791 4511 (Direct Lead)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Email Direct */}
              <a
                href="mailto:hello@thoramgroup.com"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-zinc-900/[0.08] hover:border-cyan-700/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-700/10 border border-cyan-700/20 flex items-center justify-center text-cyan-700">
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

            {/* SLA Badges */}
            <div className="pt-6 border-t border-zinc-900/[0.06] space-y-3 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-700" />
                <span>Guaranteed 24-hour turnaround on all project inquiries.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client IP & Source Code Transfer upon completion.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-zinc-900/[0.08]">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">Project Brief Received</h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering director will review your project parameters and contact you within 24 hours with an actionable roadmap.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,%20I%20just%20submitted%20a%20project%20inquiry."
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="e.g. Alex Oladimeji"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-lg px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="alex@company.com"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-lg px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="e.g. Acme Health"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-lg px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Primary Project Focus
                    </label>
                    <select
                      value={form.interest}
                      onChange={update("interest")}
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-lg px-4 py-3 text-sm text-zinc-900 focus:outline-none transition-colors"
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
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                    Tell us what you're trying to build, fix or automate *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Describe the operational bottleneck, product vision, or technical requirements..."
                    className="w-full bg-zinc-50 border border-zinc-900/[0.08] focus:border-cyan-700 focus:bg-white rounded-lg px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-solid text-sm py-3.5 font-bold"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Start a Project</span>
                    <Send className="w-4 h-4" />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}