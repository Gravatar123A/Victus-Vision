"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles, TrendingUp, Users, Code2, Palette } from "lucide-react";

const posts = [
  { id: "1", title: "How to Build a Profitable Freelance Career in 2026", excerpt: "Discover the strategies top freelancers use to build six-figure careers on Victus Vision.", category: "Freelancing", readTime: "8 min", date: "Mar 15, 2026", featured: true },
  { id: "2", title: "The Ultimate Guide to Selling Digital Products", excerpt: "From pricing to marketing, learn how to maximize your digital product sales.", category: "Digital Products", readTime: "12 min", date: "Mar 12, 2026", featured: true },
  { id: "3", title: "Top 10 Skills in Demand for 2026", excerpt: "Stay ahead of the curve with the most sought-after skills in our marketplace.", category: "Industry", readTime: "6 min", date: "Mar 10, 2026", featured: false },
  { id: "4", title: "Building Trust: How Our Verification System Works", excerpt: "A deep dive into how we verify sellers and protect buyers on the platform.", category: "Platform", readTime: "5 min", date: "Mar 8, 2026", featured: false },
  { id: "5", title: "From Side Hustle to Full-Time: Creator Success Stories", excerpt: "Inspiring stories from creators who turned their passions into thriving businesses.", category: "Success Stories", readTime: "10 min", date: "Mar 5, 2026", featured: false },
  { id: "6", title: "Understanding the XP & Leveling System", excerpt: "How to earn XP, level up, and unlock premium features on Victus Vision.", category: "Platform", readTime: "4 min", date: "Mar 3, 2026", featured: false },
];

const categoryIcons: Record<string, React.ElementType> = {
  "Freelancing": Users,
  "Digital Products": Code2,
  "Industry": TrendingUp,
  "Platform": Sparkles,
  "Success Stories": BookOpen,
};

export default function BlogPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <BookOpen className="w-3 h-3" /> Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Insights & <span className="gradient-text">Resources</span></h1>
        <p className="mt-4 text-[var(--muted)]">Tips, guides, and news for creators and businesses.</p>
      </motion.div>

      {/* Featured Posts */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {posts.filter(p => p.featured).map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-primary/40 to-accent/40 relative">
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium">{post.category}</span>
              </div>
              <div className="p-6">
                <h2 className="font-display font-bold text-lg mb-2">{post.title}</h2>
                <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Posts */}
      <h2 className="text-xl font-display font-bold mb-6">All Articles</h2>
      <div className="space-y-4">
        {posts.filter(p => !p.featured).map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex flex-col sm:flex-row gap-4 card-hover">
              <div className="w-full sm:w-32 h-24 rounded-xl bg-gradient-to-br from-accent/30 to-primary/30 shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-medium text-primary">{post.category}</span>
                <h3 className="font-semibold mt-1">{post.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-1 line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
