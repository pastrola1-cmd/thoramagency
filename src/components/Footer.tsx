"use client";

import Link from "next/link";
import { MessageCircle, Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050507] py-16 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-black text-sm">
                T
              </div>
              <span className="font-bold text-lg text-white">Thoram Group</span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              A modern product studio and technology consulting firm partnering with ambitious teams to design, engineer, and scale digital products.
            </p>
          </div>

          {/* Practice Areas Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Our Services
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/services/ai-agents" className="hover:text-cyan-400 transition-colors">
                  AI Agents & Digital Workers
                </Link>
              </li>
              <li>
                <Link href="/services/web-engineering" className="hover:text-cyan-400 transition-colors">
                  Web & Cloud Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="hover:text-cyan-400 transition-colors">
                  Native Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/services/strategy-advisory" className="hover:text-cyan-400 transition-colors">
                  Strategy & Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/case-studies" className="hover:text-cyan-400 transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-cyan-400 transition-colors">
                  Why Thoram
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Direct Channels
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a
                  href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@thoramgroup.com"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Team</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div>
            © {new Date().getFullYear()} Thoram Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
