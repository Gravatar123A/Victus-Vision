"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Download, Shield, ArrowLeft, Check, Heart, Tag, Clock, FileText, MessageSquare, History, ChevronRight } from "lucide-react";

const product = {
  id: "p1",
  title: "SaaS Dashboard UI Kit",
  description: "A comprehensive, production-ready dashboard UI kit built with React and TailwindCSS. Includes 50+ components, 20+ pages, dark/light mode, and responsive design.\n\nPerfect for SaaS applications, admin panels, analytics dashboards, and internal tools.\n\n**What's included:**\n• 50+ reusable components\n• 20+ page templates\n• Dark and light mode\n• Fully responsive design\n• TypeScript support\n• Well-documented code\n• Regular updates\n• Priority support",
  seller: { name: "DesignPro Studio", avatar: "/avatars/7.jpg" },
  price: 49,
  rating: 4.8,
  reviews: 234,
  downloads: 1890,
  category: "Templates",
  tags: ["React", "TailwindCSS", "Dashboard", "TypeScript", "UI Kit"],
  versions: [
    { version: "3.2.0", date: "Mar 5, 2026", notes: "Added 5 new chart components, improved dark mode colors" },
    { version: "3.1.0", date: "Feb 20, 2026", notes: "New settings page layout, bug fixes" },
    { version: "3.0.0", date: "Jan 15, 2026", notes: "Major redesign, TailwindCSS v4 support, new component library" },
  ],
  screenshots: [1, 2, 3, 4],
  userReviews: [
    { id: "r1", user: "David R.", rating: 5, comment: "Absolutely incredible kit. Saved me weeks of development time. The components are polished and the code is clean.", date: "1 week ago" },
    { id: "r2", user: "Sarah T.", rating: 5, comment: "Best dashboard kit I've purchased. Regular updates and great support.", date: "2 weeks ago" },
    { id: "r3", user: "Mike L.", rating: 4, comment: "Very good quality. Only wish there were more chart variations.", date: "1 month ago" },
  ],
};

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("description");
  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "changelog", label: "Changelog", icon: History },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "support", label: "Support", icon: MessageSquare },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Screenshot Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.screenshots.map(s => (
                <div key={s} className="rounded-xl h-20 bg-gradient-to-br from-accent/30 to-primary/30 cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-primary" />
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex gap-1 border-b border-[var(--border-color)] mb-6">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <div className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">{product.description}</div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
                  {product.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-lg bg-[var(--surface-alt)] text-xs font-medium">{tag}</span>)}
                </div>
              </div>
            )}

            {activeTab === "changelog" && (
              <div className="space-y-3">
                {product.versions.map(v => (
                  <div key={v.version} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-mono font-medium">v{v.version}</span>
                      <span className="text-xs text-[var(--muted)]">{v.date}</span>
                    </div>
                    <p className="text-sm text-[var(--muted)]">{v.notes}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-3">
                {product.userReviews.map(r => (
                  <div key={r.id} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{r.user.charAt(0)}</div>
                        <div><p className="text-sm font-medium">{r.user}</p><p className="text-xs text-[var(--muted)]">{r.date}</p></div>
                      </div>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}</div>
                    </div>
                    <p className="text-sm text-[var(--muted)]">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "support" && (
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
                <MessageSquare className="w-12 h-12 text-[var(--muted)] mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">Need Help?</h3>
                <p className="text-sm text-[var(--muted)] mb-4">Contact the seller directly for support with this product.</p>
                <Link href="/messages" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
                  <MessageSquare className="w-4 h-4" /> Send Message
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="sticky top-24">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h1 className="font-display font-bold text-xl mb-1">{product.title}</h1>
              <p className="text-xs text-[var(--muted)] mb-4">by {product.seller.name}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}</div>
                <span className="text-sm text-[var(--muted)]">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="text-3xl font-bold mb-6">${product.price}</div>
              <button className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity mb-2">Purchase Now</button>
              <button className="w-full py-3 rounded-xl text-sm font-medium border border-[var(--border-color)] hover:border-primary/30 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> Add to Wishlist
              </button>
              <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-2 text-sm text-[var(--muted)]">
                <div className="flex justify-between"><span>Downloads</span><span className="font-medium text-[var(--fg)]">{product.downloads.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Version</span><span className="font-medium text-[var(--fg)]">{product.versions[0].version}</span></div>
                <div className="flex justify-between"><span>Last Updated</span><span className="font-medium text-[var(--fg)]">{product.versions[0].date}</span></div>
                <div className="flex justify-between"><span>Category</span><span className="font-medium text-[var(--fg)]">{product.category}</span></div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-success" /><span className="text-sm font-medium">Purchase Protection</span></div>
              <p className="text-xs text-[var(--muted)]">30-day money-back guarantee. Secure checkout with file protection.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
