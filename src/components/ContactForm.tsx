"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck } from "lucide-react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Step Steps ───
const steps = [
  { id: 1, title: "Company Profile" },
  { id: 2, title: "Growth Objectives" },
  { id: 3, title: "Operations & Budget" },
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    revenueRange: "",
    primaryGoal: "",
    biggestChallenge: "",
    timeline: "",
    budget: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const isMock = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-");

      if (isMock) {
        // Mock Firestore fallback (Local Storage)
        const currentApps = localStorage.getItem("thoram_mock_applications") || "[]";
        const appsList = JSON.parse(currentApps);
        appsList.push({
          ...formData,
          id: `mock-app-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("thoram_mock_applications", JSON.stringify(appsList));
        console.log("Mock Firestore App Saved:", formData);
      } else {
        // Real Firestore sync
        await addDoc(collection(db, "applications"), {
          ...formData,
          timestamp: new Date().toISOString(),
        });
        console.log("Real Firestore App Saved:", formData);
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Application submit error:", err);
      setSubmitError(err?.message || "Submit failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section bg-obsidian py-32 relative overflow-hidden" id="apply">
      {/* Background design */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(6,182,212,0.06),transparent_80%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-3 block">APPLICATION GATES</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4">
            Let's Build Your Growth Engine.
          </h2>
          <p className="text-body-sm md:text-body-md text-frost max-w-xl mx-auto">
            We partner with a limited cohort of ambitious firms each quarter. Submit your details to check compatibility.
          </p>
        </div>

        {/* Step Indicators */}
        {!isSubmitted && (
          <div className="flex justify-between items-center mb-12 max-w-md mx-auto">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-body-xs font-bold transition-all duration-300 ${
                      currentStep >= s.id
                        ? "bg-cyan-500 border-cyan-500 text-obsidian shadow-glow"
                        : "border-steel bg-graphite text-mist"
                    }`}
                  >
                    {s.id}
                  </div>
                  <span className="text-[10px] text-mist font-mono uppercase mt-2 hidden sm:block">
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-[1px] flex-grow mx-4 transition-all duration-500 ${
                      currentStep > s.id ? "bg-cyan-500" : "bg-steel"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Form Container */}
        <div className="glass rounded-2xl p-8 border border-steel/60 relative overflow-hidden bg-void/50 min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
                
                {/* Step 1: Company Profile */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corporation"
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        Current Annual Revenue Range
                      </label>
                      <select
                        name="revenueRange"
                        value={formData.revenueRange}
                        onChange={handleInputChange}
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
                        required
                      >
                        <option value="">Select current range...</option>
                        <option value="under-1m">Under $1M</option>
                        <option value="1m-5m">$1M — $5M</option>
                        <option value="5m-20m">$5M — $20M</option>
                        <option value="over-20m">$20M+</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Growth Objectives */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        Primary Growth Objective
                      </label>
                      <select
                        name="primaryGoal"
                        value={formData.primaryGoal}
                        onChange={handleInputChange}
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
                        required
                      >
                        <option value="">Select your main goal...</option>
                        <option value="leads">Autonomous Lead Sourcing</option>
                        <option value="conversion">Conversion Optimization</option>
                        <option value="brand">Brand Authority Expansion</option>
                        <option value="automation">Operations & Database Automation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        What is your biggest current bottleneck?
                      </label>
                      <textarea
                        name="biggestChallenge"
                        value={formData.biggestChallenge}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="e.g. Sales reps spending 10h/week on CRM entries, cold outreach conversion is below 1%..."
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors resize-none"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Operations & Budget */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
                        required
                      >
                        <option value="">Select target window...</option>
                        <option value="immediate">Immediate (Within 30 Days)</option>
                        <option value="1-3-months">1 — 3 Months</option>
                        <option value="3-6-months">3 — 6 Months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption text-mist uppercase font-mono mb-2">
                        Target Monthly Growth Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-void border border-steel rounded-xl px-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
                        required
                      >
                        <option value="">Select monthly range...</option>
                        <option value="5k-10k">$5k — $10k / mo</option>
                        <option value="10k-25k">$10k — $25k / mo</option>
                        <option value="over-25k">$25k+ / mo</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Footer Navigation */}
                <div className="flex items-center justify-between border-t border-steel/30 pt-6 mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`btn px-4 py-2 border border-steel rounded-lg flex items-center gap-1.5 text-body-xs font-mono transition-opacity ${
                      currentStep === 1 ? "opacity-35 cursor-not-allowed" : "hover:bg-steel/10"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="btn btn-primary px-5 py-2.5 rounded-lg flex items-center gap-1 text-body-xs font-mono font-bold"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary px-6 py-3 rounded-lg flex items-center gap-1.5 text-body-sm font-semibold shadow-glow"
                    >
                      {submitting ? "Submitting..." : "Apply for Strategy Call"} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {submitError && (
                  <div className="mt-4 p-3 rounded-lg border border-danger/25 bg-danger/10 text-danger text-[10px] font-mono text-center">
                    {submitError}
                  </div>
                )}

              </form>
            ) : (
              // Submission Success View
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6 flex flex-col items-center justify-center h-full"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-body-lg md:text-display-sm font-bold text-ice mb-2">
                    Application Received
                  </h3>
                  <p className="text-body-xs md:text-body-sm text-frost max-w-md mx-auto leading-relaxed">
                    Thank you for applying. Our operations team is evaluating your company details and bottleneck parameters. We will contact you within 24 hours.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-steel/60 bg-steel/20 text-mist text-[10px] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  ID_AUTH: MATCHING_VAL_QUEUE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
