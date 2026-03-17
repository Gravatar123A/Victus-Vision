"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, DollarSign, MessageSquare,
  Settings, Star, Reply, ThumbsUp
} from "lucide-react";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Post a Service", icon: Briefcase, href: "/dashboard/new-gig" },
  { label: "List Product", icon: Package, href: "/dashboard/new-product" },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews", active: true },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const reviews = [
  { id: "r1", user: "John Smith", rating: 5, service: "Website Development", comment: "Absolutely amazing work! The website exceeded all my expectations. Fast delivery and great communication throughout.", date: "Mar 10, 2026", replied: true },
  { id: "r2", user: "Emily Brown", rating: 5, service: "Logo Design", comment: "Perfect logo design. Captured exactly what I was looking for. Very professional and creative!", date: "Mar 9, 2026", replied: true },
  { id: "r3", user: "Tom Harris", rating: 5, service: "Discord Bot", comment: "The bot works flawlessly. Great code quality and documentation. Will definitely order again!", date: "Mar 8, 2026", replied: false },
  { id: "r4", user: "Anna White", rating: 4, service: "Mobile App MVP", comment: "Great work on the app. Minor design tweaks were needed but handled promptly. Overall very satisfied.", date: "Mar 7, 2026", replied: false },
  { id: "r5", user: "Sam Green", rating: 5, service: "UI/UX Design", comment: "Incredible attention to detail. The designs are modern, clean, and user-friendly. Highly recommend!", date: "Mar 6, 2026", replied: true },
  { id: "r6", user: "Lisa Chen", rating: 4, service: "SEO Optimization", comment: "Good results within the first month. Rankings improved significantly. Would use service again.", date: "Mar 5, 2026", replied: false },
  { id: "r7", user: "David Park", rating: 5, service: "Brand Identity", comment: "Full brand kit was incredible. Logo, colors, typography — everything was cohesive and premium.", date: "Mar 4, 2026", replied: true },
];

const ratingDistribution = [
  { stars: 5, count: 289, percent: 84 },
  { stars: 4, count: 42, percent: 12 },
  { stars: 3, count: 8, percent: 2 },
  { stars: 2, count: 2, percent: 1 },
  { stars: 1, count: 1, percent: 0.3 },
];

export default function DashboardReviewsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? reviews :
    filter === "replied" ? reviews.filter(r => r.replied) :
    reviews.filter(r => !r.replied);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sidebarItems.map(item => (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? "bg-primary/10 text-primary" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-2xl font-display font-bold">Reviews</h1>
            <p className="text-[var(--muted)] text-sm mt-1">See what buyers are saying about your work.</p>
          </motion.div>

          {/* Rating Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Overall Rating */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
              <p className="text-5xl font-bold gradient-text">4.9</p>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-5 h-5 ${s <= 5 ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />
                ))}
              </div>
              <p className="text-sm text-[var(--muted)] mt-2">342 total reviews</p>
            </div>

            {/* Distribution */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h3 className="font-semibold text-sm mb-4">Rating Distribution</h3>
              <div className="space-y-2">
                {ratingDistribution.map(r => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--muted)] w-12 flex items-center gap-1">{r.stars} <Star className="w-3 h-3 text-warning fill-warning" /></span>
                    <div className="flex-1 h-2 rounded-full bg-[var(--surface-alt)]">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${r.percent}%` }} transition={{ delay: 0.3, duration: 0.8 }} className="h-full rounded-full gradient-bg" />
                    </div>
                    <span className="text-xs text-[var(--muted)] w-8">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "all", label: `All (${reviews.length})` },
              { id: "unreplied", label: `Needs Reply (${reviews.filter(r => !r.replied).length})` },
              { id: "replied", label: `Replied (${reviews.filter(r => r.replied).length})` },
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === f.id ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filtered.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{review.user.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium">{review.user}</p>
                      <p className="text-xs text-[var(--muted)]">{review.service} · {review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--border-color)]">
                  {review.replied ? (
                    <span className="text-xs text-success flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Replied</span>
                  ) : (
                    <button className="text-xs text-primary flex items-center gap-1 hover:underline"><Reply className="w-3 h-3" /> Reply to review</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
