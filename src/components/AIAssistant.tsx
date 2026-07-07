"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, X, MessageSquare, ArrowRight, Bot } from "lucide-react";

// ─── Conversational Mapping ───
const responses: Record<string, { answer: string; cta: string }> = {
  leads: {
    answer:
      "We build autonomous scraping pipelines that extract target accounts matching your ICP and automatically run verification checks before outbound dispatch.",
    cta: "Optimize Outbound Sourcing",
  },
  conversion: {
    answer:
      "We implement visual heatmapping and programmatic CTA variations to double site conversion percentages within 30 days.",
    cta: "Improve Site Conversion",
  },
  visibility: {
    answer:
      "We build organic search campaigns that claim high-value keywords and distribute automated announcements to high-authority media channels.",
    cta: "Boost Brand Authority",
  },
  automation: {
    answer:
      "We sync databases across CRMs and build custom customer portals to save up to 40 hours of manual spreadsheet tracking per week.",
    cta: "Automate Operations",
  },
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: "ai" | "user"; text: string; action?: string }>
  >([
    {
      sender: "ai",
      text: "Hello! I'm Thoram's growth helper. What is your biggest growth hurdle today?",
    },
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleOptionClick = (key: string, label: string) => {
    if (isTyping) return;

    setHasInteracted(true);
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: label }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const res = responses[key];
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.answer,
          action: res.cta,
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[350px] md:w-[380px] h-[480px] rounded-2xl glass border border-cyan-border/40 shadow-xl overflow-hidden flex flex-col justify-between mb-4 bg-void/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-steel/50 bg-graphite/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-border text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-body-xs font-bold text-ice font-display">Thoram Growth Engine</h4>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-steel/30 text-mist hover:text-ice transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-body-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-500 text-obsidian rounded-br-sm font-medium"
                        : "bg-steel/30 border border-steel/60 text-ice rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {msg.action && (
                      <button className="mt-3 w-full btn btn-primary py-2 px-3 text-[10px] rounded-lg flex items-center justify-center gap-1 font-mono font-bold shadow-sm">
                        {msg.action}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-steel/30 border border-steel/60 p-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons (only show if not user-interacted or after response) */}
            <div className="p-4 border-t border-steel/50 bg-graphite/20">
              {!hasInteracted || !isTyping ? (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "leads", label: "Leads Sourcing" },
                    { key: "conversion", label: "Site Conversions" },
                    { key: "visibility", label: "Brand Visibility" },
                    { key: "automation", label: "Process Automation" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionClick(opt.key, opt.label)}
                      className="p-2 text-[10px] text-left rounded-lg border border-steel/60 hover:border-cyan-border/60 bg-steel/20 hover:bg-cyan-glow/20 text-frost hover:text-cyan-300 font-mono transition-colors duration-300"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-obsidian shadow-glow hover:shadow-glow-lg transition-all duration-300 border border-cyan-400/20 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur group-hover:scale-125 transition-transform duration-300" />
        <MessageSquare className="w-6 h-6 relative z-10" />
      </motion.button>
    </div>
  );
}
