"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const support = [
    { label: "Resources", href: "/resources" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="border-t border-zinc-900/[0.08] bg-zinc-50/60 py-14 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-zinc-900/[0.06]">
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center font-bold text-white text-sm group-hover:bg-cyan-700 transition-colors">
                T
              </div>
              <span className="font-bold text-lg text-zinc-900">Thoram Group</span>
            </Link>

            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              A product studio built on the continent, working with teams globally.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-semibold">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm text-zinc-500">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-cyan-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-semibold">
              Support
            </div>
            <ul className="space-y-2 text-sm text-zinc-500">
              {support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-cyan-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-semibold">
              Contact
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <a
                  href="https://wa.me/2349067914511?text=Hello%20Thoram%20Group,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>+234 906 791 4511</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@thoramgroup.com"
                  className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>hello@thoramgroup.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>© {new Date().getFullYear()} Thoram Group. All rights reserved.</div>
          <div>Lagos, Nigeria · Working Globally</div>
        </div>
      </div>
    </footer>
  );
}