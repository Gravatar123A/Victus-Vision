"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Shield, Heart, BadgeCheck, Award, ArrowLeft, Check, MessageSquare, ChevronRight } from "lucide-react";

const serviceDetail = {
  id: "s1",
  title: "Professional Website Development",
  description: "I will build you a stunning, high-performance website using modern technologies. From simple landing pages to complex web applications, I deliver pixel-perfect results with clean, maintainable code.\n\nMy development process includes:\n• Requirements analysis and planning\n• Responsive UI/UX design implementation\n• Frontend development with React/Next.js\n• Backend integration with APIs\n• Performance optimization\n• Testing and deployment",
  seller: {
    name: "Alex Chen",
    avatar: "/avatars/1.jpg",
    level: "Elite",
    verified: true,
    responseTime: "1 hour",
    completionRate: 98,
    memberSince: "Jan 2025",
    totalOrders: 342,
    rating: 4.9,
    reviews: 342,
  },
  packages: [
    { name: "Basic", price: 299, deliveryDays: 7, revisions: 2, features: ["Single page website", "Responsive design", "Basic SEO", "Contact form", "1 revision round"] },
    { name: "Standard", price: 599, deliveryDays: 10, revisions: 5, features: ["Up to 5 pages", "Responsive design", "Advanced SEO", "CMS integration", "3 revision rounds", "Social media integration"] },
    { name: "Premium", price: 999, deliveryDays: 14, revisions: -1, features: ["Unlimited pages", "Custom design", "Full SEO suite", "CMS + Admin panel", "Unlimited revisions", "E-commerce ready", "Analytics setup", "3 months support"] },
  ],
  category: "Web Development",
  tags: ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js"],
  reviews: [
    { id: "r1", user: "David R.", rating: 5, comment: "Alex delivered an incredible website. Fast, responsive, and exactly what I envisioned. Communication was excellent throughout!", date: "2 weeks ago" },
    { id: "r2", user: "Lisa C.", rating: 5, comment: "Professional work from start to finish. The code quality is top-notch and the design exceeded my expectations.", date: "1 month ago" },
    { id: "r3", user: "Marcus J.", rating: 4, comment: "Great developer, very responsive and skilled. Minor tweaks were needed but handled them promptly.", date: "2 months ago" },
  ],
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => <Star key={s} className={s <= rating ? "text-warning fill-warning" : "text-[var(--border-color)]"} style={{ width: size, height: size }} />)}
    </div>
  );
}

export default function ServiceDetailPage() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const pkg = serviceDetail.packages[selectedPackage];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium mb-3">{serviceDetail.category}</span>
            <h1 className="text-2xl md:text-3xl font-display font-bold">{serviceDetail.title}</h1>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-sm font-bold">A</div>
                <span className="text-sm font-medium flex items-center gap-1">{serviceDetail.seller.name}<BadgeCheck className="w-3.5 h-3.5 text-primary" /></span>
              </div>
              <div className="flex items-center gap-1"><StarRating rating={Math.floor(serviceDetail.seller.rating)} /><span className="text-sm text-[var(--muted)]">{serviceDetail.seller.rating} ({serviceDetail.seller.reviews})</span></div>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50" />
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">Service Preview</div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-4">About This Service</h2>
            <div className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">{serviceDetail.description}</div>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
              {serviceDetail.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-lg bg-[var(--surface-alt)] text-xs font-medium">{tag}</span>)}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-4">Reviews ({serviceDetail.seller.reviews})</h2>
            <div className="space-y-4">
              {serviceDetail.reviews.map(review => (
                <div key={review.id} className="p-4 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{review.user.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium">{review.user}</p>
                        <p className="text-xs text-[var(--muted)]">{review.date}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={12} />
                  </div>
                  <p className="text-sm text-[var(--muted)]">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Package Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="sticky top-24">
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
              {/* Package Tabs */}
              <div className="flex border-b border-[var(--border-color)]">
                {serviceDetail.packages.map((p, i) => (
                  <button key={p.name} onClick={() => setSelectedPackage(i)} className={`flex-1 py-3 text-xs font-medium transition-colors ${selectedPackage === i ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]"><Clock className="w-4 h-4" />{pkg.deliveryDays}-day delivery</div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]"><Shield className="w-4 h-4" />{pkg.revisions === -1 ? "Unlimited" : pkg.revisions} revisions</div>
                </div>
                <div className="space-y-2 mb-6">
                  {pkg.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity">
                  Continue (${pkg.price})
                </button>
                <button className="w-full py-3 rounded-xl text-sm font-medium mt-2 border border-[var(--border-color)] hover:border-primary/30 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Contact Seller
                </button>
              </div>
            </div>

            {/* Seller Card */}
            <div className="mt-4 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-lg font-bold">A</div>
                <div>
                  <p className="font-semibold text-sm flex items-center gap-1">{serviceDetail.seller.name}<BadgeCheck className="w-3.5 h-3.5 text-primary" /></p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400"><Award className="w-3 h-3" />{serviceDetail.seller.level}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 rounded-xl bg-[var(--surface-alt)]">
                  <p className="text-xs text-[var(--muted)]">Response</p>
                  <p className="font-semibold text-sm">{serviceDetail.seller.responseTime}</p>
                </div>
                <div className="p-2 rounded-xl bg-[var(--surface-alt)]">
                  <p className="text-xs text-[var(--muted)]">Completion</p>
                  <p className="font-semibold text-sm">{serviceDetail.seller.completionRate}%</p>
                </div>
              </div>
              <Link href="/profile/alexchen" className="mt-4 flex items-center justify-center gap-1 text-xs text-primary font-medium hover:underline">
                View Full Profile <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
