"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/#products" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Apply", href: "/#apply" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-steel/30 bg-void/70 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-50">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-obsidian group-hover:scale-105 transition-transform duration-300">
            <Bot className="w-4.5 h-4.5" />
          </div>
          <span className="font-display text-body-lg font-bold text-ice group-hover:text-cyan-300 transition-colors duration-300">
            Thoram <span className="text-cyan-400">Group</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-body-xs font-mono text-frost hover:text-cyan-400 uppercase tracking-wider transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#apply"
            className="btn btn-primary px-5 py-2.5 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1"
          >
            Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-steel/30 border border-steel/50 text-ice relative z-50 hover:bg-steel/50 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-void/98 backdrop-blur-2xl z-40 flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-8 mb-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-display-sm font-bold text-ice hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/#apply"
                onClick={() => setIsOpen(false)}
                className="w-full btn btn-primary py-4 px-6 rounded-xl text-body-sm font-bold flex items-center justify-center gap-1.5 shadow-glow"
              >
                Book Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
