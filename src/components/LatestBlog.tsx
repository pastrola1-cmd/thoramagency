"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LatestBlog() {
  // Take the first 3 articles for the home feed
  const recentArticles = articles.slice(0, 3);

  return (
    <section className="section bg-void py-24 border-b border-steel/30" id="blog">
      <div className="container-wide">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="eyebrow mb-3 block">Insights</span>
            <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice mb-4 md:mb-0">
              Latest Technical Articles.
            </h2>
          </div>
          
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            Browse All Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {recentArticles.map((art) => (
            <Link href={`/insights/${art.slug}`} key={art.slug} className="block group">
              <motion.div
                variants={cardVariants}
                className="glass h-full p-6 rounded-2xl border border-steel/60 hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-glow border border-cyan-border/20 text-cyan-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-mist font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-body-lg font-bold text-ice mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-body-xs text-frost leading-relaxed mb-6 line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-steel/20 flex items-center justify-between text-[10px] text-mist font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {art.publishedAt}
                  </span>
                  <span className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-0.5">
                    Read Article <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
