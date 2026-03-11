"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Award, BadgeCheck, MapPin, Calendar, Clock, CheckCircle2, Briefcase, Package, Heart, MessageSquare, Users, ExternalLink } from "lucide-react";

const profile = {
  name: "Alex Chen",
  username: "@alexchen",
  title: "Full-Stack Developer & Digital Creator",
  bio: "Passionate full-stack developer with 8+ years of experience building modern web applications. I specialize in React, Next.js, and Node.js. Available for freelance projects and selling premium digital products.",
  level: "Elite",
  xp: 8750,
  xpNext: 10000,
  verified: true,
  location: "San Francisco, CA",
  joined: "January 2025",
  responseTime: "1 hour",
  completionRate: 98,
  rating: 4.9,
  totalReviews: 342,
  completedOrders: 342,
  skills: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "AWS", "Docker"],
  badges: ["Top Seller", "Fast Responder", "100+ Orders", "Verified ID"],
  services: [
    { id: "s1", title: "Professional Website Development", price: 299, rating: 4.9, reviews: 342 },
    { id: "s2", title: "E-Commerce Platform Development", price: 599, rating: 4.8, reviews: 89 },
  ],
  products: [
    { id: "p1", title: "SaaS Dashboard UI Kit", price: 49, rating: 4.8, downloads: 1890 },
    { id: "p2", title: "Admin Panel React Template", price: 59, rating: 4.7, downloads: 3200 },
  ],
  reviews: [
    { user: "David R.", rating: 5, comment: "Incredible developer. Delivered a perfect website ahead of schedule.", date: "2 weeks ago" },
    { user: "Lisa C.", rating: 5, comment: "Professional, responsive, and extremely talented. Will hire again!", date: "1 month ago" },
    { user: "Marcus J.", rating: 4, comment: "Great work on the app. Minor revisions were handled promptly.", date: "2 months ago" },
  ],
};

const levelColors: Record<string, string> = {
  Beginner: "from-gray-500 to-gray-400",
  Skilled: "from-blue-500 to-blue-400",
  Professional: "from-purple-500 to-purple-400",
  Elite: "from-amber-500 to-amber-400",
  Legend: "from-primary to-accent",
};

export default function ProfilePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
            <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">A</div>
            <h1 className="text-xl font-display font-bold flex items-center justify-center gap-1">{profile.name} {profile.verified && <BadgeCheck className="w-5 h-5 text-primary" />}</h1>
            <p className="text-sm text-[var(--muted)]">{profile.username}</p>
            <p className="text-sm mt-2">{profile.title}</p>
            
            {/* Level */}
            <div className="mt-4 p-3 rounded-xl bg-[var(--surface-alt)]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1 font-medium"><Award className="w-3 h-3 text-amber-400" />{profile.level}</span>
                <span className="text-[var(--muted)]">{profile.xp.toLocaleString()} / {profile.xpNext.toLocaleString()} XP</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--border-color)]">
                <div className={`h-full rounded-full bg-gradient-to-r ${levelColors[profile.level]}`} style={{ width: `${(profile.xp / profile.xpNext) * 100}%` }} />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Message
              </button>
              <button className="px-3 py-2.5 rounded-xl border border-[var(--border-color)] hover:border-primary/30 transition-colors">
                <Heart className="w-4 h-4 text-[var(--muted)]" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] space-y-3 text-sm">
            <div className="flex items-center gap-2 text-[var(--muted)]"><MapPin className="w-4 h-4" />{profile.location}</div>
            <div className="flex items-center gap-2 text-[var(--muted)]"><Calendar className="w-4 h-4" />Member since {profile.joined}</div>
            <div className="flex items-center gap-2 text-[var(--muted)]"><Clock className="w-4 h-4" />Avg. response: {profile.responseTime}</div>
            <div className="flex items-center gap-2 text-[var(--muted)]"><CheckCircle2 className="w-4 h-4" />Completion rate: {profile.completionRate}%</div>
          </div>

          {/* Skills */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h3 className="font-semibold text-sm mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => <span key={skill} className="px-3 py-1 rounded-lg bg-[var(--surface-alt)] text-xs font-medium">{skill}</span>)}
            </div>
          </div>

          {/* Badges */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h3 className="font-semibold text-sm mb-3">Badges</h3>
            <div className="grid grid-cols-2 gap-2">
              {profile.badges.map(badge => (
                <div key={badge} className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 text-xs font-medium">
                  <Award className="w-3.5 h-3.5 text-primary" />{badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-3">About</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{profile.bio}</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-4 gap-4">
            {[
              { label: "Rating", value: `${profile.rating}★`, color: "text-warning" },
              { label: "Reviews", value: profile.totalReviews.toString(), color: "text-primary" },
              { label: "Orders", value: profile.completedOrders.toString(), color: "text-success" },
              { label: "Completion", value: `${profile.completionRate}%`, color: "text-accent" },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5" />Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.services.map(s => (
                <Link key={s.id} href={`/services/${s.id}`} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] card-hover block">
                  <div className="h-28 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning fill-warning" />{s.rating}</span>
                    <span>({s.reviews} reviews)</span>
                  </div>
                  <p className="mt-2 text-sm font-bold">From ${s.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Package className="w-5 h-5" />Products</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.products.map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] card-hover block">
                  <div className="h-28 rounded-xl bg-gradient-to-br from-accent/30 to-primary/30 mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning fill-warning" />{p.rating}</span>
                    <span>{p.downloads.toLocaleString()} downloads</span>
                  </div>
                  <p className="mt-2 text-sm font-bold">${p.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-display font-semibold text-lg mb-4">Reviews</h2>
            <div className="space-y-3">
              {profile.reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
