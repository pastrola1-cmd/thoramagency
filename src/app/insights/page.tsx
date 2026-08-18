import { articles } from "@/data/articles";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Insights & Strategy — Thoram Group",
  description: "In-depth guides, engineering breakdowns, and tactical strategies to scale pipelines, improve site conversions, and build automated infrastructure.",
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation header */}
      <div className="max-w-6xl mx-auto mb-16 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice hover:text-cyan-400 transition-colors">
          Thoram<span className="text-cyan-400">.</span>
        </Link>
        <Link href="/" className="text-body-sm text-frost hover:text-cyan-400 transition-colors">
          ← Back to site
        </Link>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-3 block">RESOURCES & PERSPECTIVES</span>
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-ice mb-4">
            Insights & Strategy.
          </h1>
          <p className="text-body-md text-frost leading-relaxed">
            In-depth guides, engineering breakdowns, and tactical strategies to scale pipelines, improve site conversions, and build automated infrastructure.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Link key={art.slug} href={`/insights/${art.slug}`} className="block h-full group">
              <div className="h-full glass rounded-2xl p-6 border border-steel/60 hover:border-cyan-border/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between hover:shadow-glow/20">
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-caption px-2.5 py-1 rounded bg-cyan-glow border border-cyan-border/30 text-cyan-400 font-mono">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-mist flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {art.publishedAt}
                    </span>
                  </div>

                  <h3 className="font-display text-body-lg font-bold text-ice mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-body-xs md:text-body-sm text-frost leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                {/* Read time & Link CTA */}
                <div className="mt-6 border-t border-steel/30 pt-4 flex items-center justify-between">
                  <span className="text-body-xs text-mist flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                  <span className="text-body-xs text-cyan-400 font-mono flex items-center gap-0.5">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
