"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, Clock, BadgeCheck, Tag, Filter, Plus, Briefcase } from "lucide-react";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  rating: number;
  reviewsCount: number;
  thumbnail: string | null;
  tags: string[];
  seller: {
    id: string;
    username: string;
    fullName: string | null;
    avatarUrl: string | null;
    level: string;
    isVerified: boolean;
  };
  category: { id: string; name: string };
}

const gigCategories = [
  "All", "Web Development", "Mobile Apps", "Game Development", "Discord Bots",
  "UI/UX Design", "Logo Design", "Video Editing", "AI & ML", "SEO",
  "Scripting", "Automation", "Content Writing", "Music & Audio",
];

const levelColors: Record<string, string> = {
  Beginner: "bg-gray-500/10 text-gray-400",
  Skilled: "bg-blue-500/10 text-blue-400",
  Professional: "bg-purple-500/10 text-purple-400",
  Elite: "bg-amber-500/10 text-amber-400",
  Legend: "bg-gradient-to-r from-primary/20 to-accent/20 text-primary",
};

export default function FreelancePage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await fetch("/api/gigs");
      if (res.ok) {
        const data = await res.json();
        setGigs(data.gigs);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filtered = gigs.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || g.category.name === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Freelance Gigs</h1>
          <p className="text-[var(--muted)] mt-2">Browse services offered by verified freelancers</p>
        </div>
        <Link href="/dashboard/new-gig" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity shrink-0">
          <Plus className="w-4 h-4" /> Post a Gig
        </Link>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gigs by title, description..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {gigCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat
                ? "gradient-bg text-white"
                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--border-color)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gigs Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] p-5 animate-pulse">
              <div className="h-32 rounded-xl bg-[var(--surface-alt)] mb-4" />
              <div className="h-4 rounded bg-[var(--surface-alt)] w-3/4 mb-2" />
              <div className="h-3 rounded bg-[var(--surface-alt)] w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((gig, i) => (
            <motion.div key={gig.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link href={`/services/${gig.id}`}>
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover group">
                  {/* Thumbnail */}
                  <div className="h-36 relative overflow-hidden">
                    <div className="w-full h-full gradient-bg opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Briefcase className="w-10 h-10 text-primary/40" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                        ${gig.price}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">{gig.title}</h3>
                    <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">{gig.description}</p>

                    {/* Tags */}
                    {gig.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {gig.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] font-medium">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-color)]">
                      {/* Seller */}
                      <div className="flex items-center gap-2">
                        {gig.seller.avatarUrl ? (
                          <img src={gig.seller.avatarUrl} alt="" className="w-5 h-5 rounded-md object-cover" />
                        ) : (
                          <div className="w-5 h-5 rounded-md gradient-bg flex items-center justify-center text-white text-[10px] font-bold">
                            {(gig.seller.fullName || gig.seller.username).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                          {gig.seller.fullName || gig.seller.username}
                          {gig.seller.isVerified && <BadgeCheck className="w-3 h-3 text-primary" />}
                        </span>
                      </div>
                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        {gig.rating > 0 && (
                          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-warning fill-warning" />{gig.rating.toFixed(1)}</span>
                        )}
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{gig.deliveryDays}d</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary/50" />
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">No gigs found</h3>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
            {search ? "Try adjusting your search or filters." : "Be the first to post a gig!"}
          </p>
          <Link href="/dashboard/new-gig" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Post Your First Gig
          </Link>
        </motion.div>
      )}
    </div>
  );
}
