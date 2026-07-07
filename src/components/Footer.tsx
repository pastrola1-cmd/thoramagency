"use client";

import { useState } from "react";
import { Bot, Mail, ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-steel/30 bg-void/50 backdrop-blur-md relative overflow-hidden py-16 px-6">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 relative z-10">
        
        {/* Company Identity */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-obsidian">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-body-lg font-bold text-ice">
              Thoram <span className="text-cyan-400">Group</span>
            </span>
          </Link>
          <p className="text-body-xs text-frost max-w-sm leading-relaxed">
            Predictable growth infrastructure. We build custom software automation pipelines, optimized conversion loops, and dynamic brand positioning engines for growth cohorts.
          </p>
          <div className="flex gap-4 text-mist">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sitemap Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-caption text-mist uppercase font-mono mb-4">Infrastructure</h4>
            <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider">
              <li>
                <Link href="/#products" className="text-frost hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="text-frost hover:text-cyan-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-frost hover:text-cyan-400 transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/style-guide" className="text-frost hover:text-cyan-400 transition-colors">
                  Style Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-caption text-mist uppercase font-mono mb-4">Company</h4>
            <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider">
              <li>
                <a href="#" className="text-frost hover:text-cyan-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-frost hover:text-cyan-400 transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-frost hover:text-cyan-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-frost hover:text-cyan-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="text-caption text-mist uppercase font-mono">Stay Ahead</h4>
          <p className="text-body-xs text-frost leading-normal">
            Subscribe to get raw technical strategy, A/B conversion studies, and automated pipeline engineering teardowns.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-void border border-steel rounded-xl px-3.5 py-2.5 text-body-xs text-ice focus:border-cyan-500 outline-none transition-colors"
              />
              <button
                type="submit"
                className="btn btn-primary px-4 py-2.5 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center"
              >
                Join
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-cyan-border/30 bg-cyan-glow text-cyan-400 text-[10px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> Subscribed successfully
            </div>
          )}
        </div>

      </div>

      {/* Copyright Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-steel/20 flex flex-col md:flex-row items-center justify-between text-[10px] text-mist font-mono relative z-10">
        <span>© {new Date().getFullYear()} Thoram Group. All rights reserved.</span>
        <span className="mt-2 md:mt-0 uppercase tracking-widest text-cyan-500/60 font-semibold">
          Engineered for scale
        </span>
      </div>
    </footer>
  );
}
