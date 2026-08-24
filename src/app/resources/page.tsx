"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { articles } from "@/data/articles";
import FAQAccordion from "@/components/FAQAccordion";
import { BookOpen, FileDown, Search, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    title: "AI Integration Playbook",
    desc: "A step-by-step checklist outlining how B2B firms can deploy Gemini reasoning loops safely.",
    fileSize: "2.4 MB",
    downloads: "420+",
  },
  {
    title: "Conversion Engine Blueprint",
    desc: "Visual mockups and landing copy wireframes designed to double inquiry conversion rates.",
    fileSize: "4.1 MB",
    downloads: "680+",
  },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("blog"); // blog, guides, faqs
  const [emailModal, setEmailModal] = useState<string | null>(null);
  const [downloadEmail, setDownloadEmail] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredArticles = articles.filter((art) =>
    art.title.toLowerCase().includes(search.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      setEmailModal(null);
      setDownloadSuccess(false);
      setDownloadEmail("");
    }, 2000);
  };

  return (
    <div className="py-20 bg-void relative overflow-hidden">
      <div className="container-wide">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mb-3 block">Knowledge Base</span>
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl font-bold text-ice mb-4 leading-tight">
            Resources & Guides.
          </h1>
          <p className="text-body-md text-frost leading-relaxed">
            Scan our latest technical articles, download B2B deployment guides, and review 
            common developer implementation FAQs.
          </p>
        </div>

        {/* Tab triggers and search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-steel/20 pb-6 mb-12">
          <div className="flex gap-2">
            {[
              { id: "blog", label: "Blog Articles" },
              { id: "guides", label: "Guides & PDFs" },
              { id: "faqs", label: "FAQ Database" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wider border transition-all ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-obsidian border-orange-500 font-bold"
                    : "border-steel hover:border-cyan-border text-frost hover:text-ice bg-glass-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "blog" && (
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-steel bg-steel/10 text-ice placeholder-mist focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all focus:outline-none text-body-xs font-mono"
              />
            </div>
          )}
        </div>

        {/* Tab contents */}
        <div>
          {activeTab === "blog" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <Link href={`/insights/${art.slug}`} key={art.slug} className="block group">
                  <div className="glass h-full p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-glow border border-cyan-border/20 text-orange-500 font-mono text-[9px] uppercase tracking-wider font-semibold mb-4">
                        {art.category}
                      </span>
                      <h3 className="font-display text-body-lg font-bold text-ice mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-body-xs text-frost leading-relaxed mb-6 line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="text-[10px] text-orange-500 font-mono font-bold flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                      Read Article <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {guides.map((g) => (
                <div key={g.title} className="glass p-8 rounded-3xl border border-steel/60 hover:border-cyan-border/40 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-steel/20 border border-steel/50 text-orange-500 flex items-center justify-center mb-6">
                      <FileDown className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-body-lg font-bold text-ice mb-2">{g.title}</h3>
                    <p className="text-body-xs md:text-body-sm text-frost leading-relaxed mb-6">{g.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-steel/20 flex items-center justify-between">
                    <span className="text-[10px] text-mist font-mono">
                      {g.fileSize} • {g.downloads} downloads
                    </span>
                    <button
                      onClick={() => setEmailModal(g.title)}
                      className="btn btn-primary py-2 px-4 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-glow"
                    >
                      Download PDF <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="max-w-4xl">
              <FAQAccordion />
            </div>
          )}
        </div>

      </div>

      {/* Email Gate Modal for Downloads */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-void/80 backdrop-blur-md" onClick={() => setEmailModal(null)} />
          
          <div className="relative w-full max-w-md bg-graphite border border-steel rounded-2xl p-6 md:p-8 shadow-2xl z-10">
            <h3 className="font-display text-body-lg font-bold text-ice mb-2">Download {emailModal}</h3>
            <p className="text-body-xs text-frost mb-6">
              Enter your corporate email address to receive the secure PDF download link instantly.
            </p>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-success-glow border border-success/30 text-success text-body-xs flex items-center gap-2">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Link dispatched! Check your corporate inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-4">
                <div>
                  <label htmlFor="gate-email" className="text-[10px] text-frost font-mono uppercase tracking-wider block mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    id="gate-email"
                    placeholder="you@company.com"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-steel bg-steel/10 text-ice placeholder-mist focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all focus:outline-none text-body-xs"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn btn-primary py-3 px-6 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow"
                >
                  Confirm & Download <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
