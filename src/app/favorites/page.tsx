"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Star, Download, Clock, Trash2 } from "lucide-react";

const favorites = [
  { type: "service", id: "s1", title: "Professional Website Development", seller: "Alex Chen", price: 299, rating: 4.9, deliveryDays: 7 },
  { type: "product", id: "p1", title: "SaaS Dashboard UI Kit", seller: "DesignPro Studio", price: 49, rating: 4.8, downloads: 1890 },
  { type: "service", id: "s2", title: "Modern UI/UX Design for Apps", seller: "Sarah Kim", price: 199, rating: 5.0, deliveryDays: 5 },
  { type: "product", id: "p2", title: "Advanced Discord Bot Framework", seller: "BotMaster Inc", price: 29, rating: 4.9, downloads: 4320 },
];

export default function FavoritesPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold flex items-center gap-2"><Heart className="w-7 h-7 text-danger" /> My Favorites</h1>
        <p className="text-[var(--muted)] mt-2">{favorites.length} items saved</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {favorites.map((item, i) => (
          <motion.div key={`${item.type}-${item.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/${item.type === "service" ? "services" : "products"}/${item.id}`}>
              <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
                <div className="h-32 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.type === "service" ? "from-primary/50 to-accent/50" : "from-accent/40 to-primary/40"}`} />
                  <div className="absolute top-3 left-3"><span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium capitalize">{item.type}</span></div>
                  <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur text-danger" onClick={(e) => e.preventDefault()}><Heart className="w-3.5 h-3.5 fill-danger" /></button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-[var(--muted)] mb-2">by {item.seller}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= Math.floor(item.rating) ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}</div>
                    <span className="text-xs text-[var(--muted)]">{item.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      {"deliveryDays" in item ? <><Clock className="w-3 h-3" />{item.deliveryDays}d</> : <><Download className="w-3 h-3" />{(item as { downloads: number }).downloads?.toLocaleString()}</>}
                    </div>
                    <span className="font-bold text-sm">${item.price}</span>
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
