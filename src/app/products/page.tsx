"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, Star, Download, Heart, ChevronDown, X } from "lucide-react";
import { productListings, categories } from "@/lib/mock-data";

const productCategories = ["All", "Templates", "Scripts", "Plugins", "Tools", "Assets"];
const sortOptions = ["Relevance", "Newest", "Price: Low to High", "Price: High to Low", "Most Downloaded", "Best Rating"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = productListings.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || p.category === selectedCategory)
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold">Digital Products</h1>
        <p className="text-[var(--muted)] mt-2">Premium scripts, templates, plugins, and digital assets.</p>
      </motion.div>

      {/* Search & Controls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)]">
            {sortOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {productCategories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--muted)] mb-6">{filtered.length} products found</p>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/products/${product.id}`}>
              <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
                <div className="h-40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40" />
                  <div className="absolute top-3 right-3"><span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium">{product.category}</span></div>
                  <button className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur text-white hover:text-danger transition-colors" onClick={(e) => e.preventDefault()}><Heart className="w-3.5 h-3.5" /></button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-xs text-[var(--muted)] mb-3">by {product.seller.name}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px] font-medium">{tag}</span>)}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}</div>
                    <span className="text-xs text-[var(--muted)]">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1 text-xs text-[var(--muted)]"><Download className="w-3 h-3" />{product.downloads.toLocaleString()}</div>
                    <span className="font-bold text-sm">${product.price}</span>
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
