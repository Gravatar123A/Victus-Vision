"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, SlidersHorizontal, Grid3X3, List, Star, Clock, Heart,
  ChevronDown, BadgeCheck, Award, X
} from "lucide-react";
import { serviceListings, categories } from "@/lib/mock-data";

const priceRanges = ["Any", "Under $50", "$50-$100", "$100-$250", "$250-$500", "$500+"];
const deliveryTimes = ["Any", "Up to 24h", "Up to 3 days", "Up to 7 days", "Up to 14 days"];
const sellerLevels = ["Any", "Beginner", "Skilled", "Professional", "Elite", "Legend"];
const sortOptions = ["Relevance", "Newest", "Price: Low to High", "Price: High to Low", "Best Rating"];

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={s <= rating ? "text-warning fill-warning" : "text-[var(--border-color)]"} style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "bg-gray-500/10 text-gray-400",
    Skilled: "bg-blue-500/10 text-blue-400",
    Professional: "bg-purple-500/10 text-purple-400",
    Elite: "bg-amber-500/10 text-amber-400",
    Legend: "bg-gradient-to-r from-primary/20 to-accent/20 text-primary",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${colors[level] || ""}`}>
      <Award className="w-3 h-3" />
      {level}
    </span>
  );
}

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");

  const filteredServices = serviceListings.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || s.category === selectedCategory)
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold">Browse Services</h1>
        <p className="text-[var(--muted)] mt-2">Find the perfect freelancer for your project.</p>
      </motion.div>

      {/* Search & Controls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none cursor-pointer">
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
          </div>
          <div className="hidden sm:flex gap-1 p-1 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-[var(--muted)]"}`}><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-[var(--muted)]"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </motion.div>

      {/* Filters Panel */}
      {filtersOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Filters</h3>
            <button onClick={() => setFiltersOpen(false)}><X className="w-4 h-4 text-[var(--muted)]" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-[var(--muted)] mb-1 block">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)]">
                <option>All</option>
                {categories.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] mb-1 block">Price Range</label>
              <select className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)]">
                {priceRanges.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] mb-1 block">Delivery Time</label>
              <select className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)]">
                {deliveryTimes.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] mb-1 block">Seller Level</label>
              <select className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)]">
                {sellerLevels.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {["All", ...categories.map(c => c.name)].map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-[var(--muted)] mb-6">{filteredServices.length} services found</p>

      {/* Service Cards Grid */}
      <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
        {filteredServices.map((service, i) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/services/${service.id}`}>
              <div className={`rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover ${viewMode === "list" ? "flex" : ""}`}>
                <div className={`${viewMode === "list" ? "w-48 shrink-0" : "h-40"} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium">{service.category}</span>
                    <button className="p-1.5 rounded-lg bg-black/40 backdrop-blur text-white hover:text-danger transition-colors" onClick={(e) => e.preventDefault()}>
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">{service.seller.name.charAt(0)}</div>
                    <div>
                      <p className="text-xs font-medium flex items-center gap-1">{service.seller.name}{service.seller.verified && <BadgeCheck className="w-3 h-3 text-primary" />}</p>
                      <LevelBadge level={service.seller.level} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{service.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={Math.floor(service.rating)} />
                    <span className="text-xs text-[var(--muted)]">{service.rating} ({service.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px] font-medium">{tag}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1 text-xs text-[var(--muted)]"><Clock className="w-3 h-3" />{service.deliveryDays}d delivery</div>
                    <div><span className="text-xs text-[var(--muted)]">From </span><span className="font-bold text-sm">${service.price}</span></div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
