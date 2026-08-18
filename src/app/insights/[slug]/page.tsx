import { articles } from "@/data/articles";
import { ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const article = articles.find((art) => art.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Thoram Insights`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: PageProps) {
  const slug = params.slug;
  const article = articles.find((art) => art.slug === slug);
  const relatedArticles = articles.filter((art) => art.slug !== slug).slice(0, 3);

  if (!article) {
    notFound();
  }

  // Parse paragraphs/markdown simply for presentation
  const paragraphs = article.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-void py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between border-b border-steel/30 pb-6 relative z-10">
        <Link href="/" className="font-display text-body-lg font-bold text-ice">
          Thoram<span className="text-cyan-400">.</span>
        </Link>
        <Link href="/insights" className="text-body-sm text-frost hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-start">
        {/* Main Article Content */}
        <article className="flex-1 max-w-3xl glass rounded-2xl p-6 md:p-10 border border-steel/60">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-body-xs text-mist font-mono mb-6">
            <span className="text-caption px-2.5 py-1 rounded bg-cyan-glow border border-cyan-border/30 text-cyan-400">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-display-sm md:text-display-md font-extrabold text-ice mb-8 leading-snug">
            {article.title}
          </h1>

          {/* Parsed body content */}
          <div className="space-y-6 text-frost text-body-sm md:text-body-md leading-relaxed border-t border-steel/30 pt-8">
            {paragraphs.map((p, idx) => {
              const text = p.trim();

              // Custom simple parser check order (most specific first)
              if (text.startsWith("### ")) {
                return (
                  <h4 key={idx} className="font-display text-body-md font-semibold text-ice pt-2 mb-1">
                    {text.replace(/^###\s+/, "")}
                  </h4>
                );
              }
              if (text.startsWith("## ")) {
                return (
                  <h3 key={idx} className="font-display text-body-lg font-bold text-ice pt-4 mb-2">
                    {text.replace(/^##\s+/, "")}
                  </h3>
                );
              }
              if (text.startsWith("# ")) {
                return (
                  <h2 key={idx} className="font-display text-body-lg md:text-display-sm font-bold text-ice pt-4 mb-2">
                    {text.replace(/^#\s+/, "")}
                  </h2>
                );
              }
              if (text.startsWith("`")) {
                return (
                  <pre key={idx} className="p-4 rounded-xl border border-steel/60 bg-graphite font-mono text-body-xs text-cyan-400 overflow-x-auto my-6 leading-normal">
                    <code>{text.replace(/`/g, "")}</code>
                  </pre>
                );
              }
              if (text.startsWith("*") || text.startsWith("-")) {
                const items = text.split("\n");
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-frost">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^[\*\-]\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }

              return <p key={idx} className="text-frost">{text}</p>;
            })}
          </div>
        </article>

        {/* Related Articles Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <div className="glass rounded-xl p-5 border border-steel/60">
            <h3 className="font-display text-body-md font-bold text-ice mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              Related Insights
            </h3>
            
            <div className="space-y-4">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/insights/${rel.slug}`} className="block group">
                  <div className="p-3.5 rounded-lg border border-transparent hover:border-steel/60 hover:bg-steel/10 transition-all duration-300">
                    <span className="text-[9px] text-cyan-400 font-mono uppercase block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-body-xs font-bold text-ice group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-[9px] text-mist flex items-center gap-1 font-mono mt-2">
                      <Clock className="w-3 h-3" />
                      {rel.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
