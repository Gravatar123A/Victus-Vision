"use client";

import { motion } from "framer-motion";
import { Download, FileText, Image, Mail, Sparkles } from "lucide-react";

const assets = [
  { name: "Logo Pack", desc: "Full logo suite in SVG, PNG, and ICO formats", icon: Image, type: "ZIP — 2.4 MB" },
  { name: "Brand Guidelines", desc: "Colors, typography, and usage rules", icon: FileText, type: "PDF — 1.8 MB" },
  { name: "Media Kit", desc: "Company overview, key facts, and screenshots", icon: FileText, type: "PDF — 3.2 MB" },
  { name: "Product Screenshots", desc: "High-resolution screenshots of the platform", icon: Image, type: "ZIP — 8.5 MB" },
];

export default function PressPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Sparkles className="w-3 h-3" /> Press
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Press <span className="gradient-text">Kit</span></h1>
        <p className="mt-4 text-[var(--muted)]">Brand assets, media resources, and press contacts for Victus Vision.</p>
      </motion.div>

      {/* Company Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] mb-8">
        <h2 className="font-display font-semibold text-lg mb-4">About Victus Vision</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
          Victus Vision is a premium hybrid marketplace combining freelance services and digital products. Founded in 2025, we&apos;ve grown to serve over 12,000 creators and 45,000 users worldwide. Our platform enables talented freelancers to offer their services and digital creators to sell premium products — all in one seamless experience.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Founded", value: "2025" },
            { label: "Users", value: "45,000+" },
            { label: "Countries", value: "90+" },
            { label: "Products Sold", value: "145,000+" },
          ].map(stat => (
            <div key={stat.label} className="p-3 rounded-xl bg-[var(--surface-alt)] text-center">
              <p className="font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Brand Assets */}
      <h2 className="text-xl font-display font-bold mb-6">Brand Assets</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {assets.map((asset, i) => (
          <motion.div key={asset.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-between card-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><asset.icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-sm">{asset.name}</h3>
                  <p className="text-xs text-[var(--muted)]">{asset.desc}</p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">{asset.type}</p>
                </div>
              </div>
              <button className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Press Contact */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-2xl gradient-border bg-[var(--surface)]">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-lg">Press Contact</h2>
        </div>
        <p className="text-sm text-[var(--muted)] mb-2">For media inquiries, interviews, and press-related questions:</p>
        <a href="mailto:press@victusvision.com" className="text-primary font-medium text-sm hover:underline">press@victusvision.com</a>
      </motion.div>
    </div>
  );
}
