"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle, Scale, UserCheck, Sparkles } from "lucide-react";

const protections = [
  { icon: Lock, title: "Escrow Payment System", desc: "All payments are held securely in escrow until the buyer confirms delivery. This ensures sellers get paid for their work and buyers receive what they ordered." },
  { icon: Eye, title: "Identity Verification", desc: "Sellers undergo identity verification to build trust. Verified badges are displayed on profiles, so buyers can confidently choose who to work with." },
  { icon: Scale, title: "Fair Dispute Resolution", desc: "Our dedicated resolution team mediates all disputes impartially. Both parties can submit evidence, and our team ensures fair outcomes within 48 hours." },
  { icon: UserCheck, title: "Seller Screening", desc: "All seller applications are reviewed by our team. We verify portfolios, check for quality standards, and ensure compliance with our community guidelines." },
  { icon: AlertTriangle, title: "Content Moderation", desc: "We actively monitor listings and user interactions to prevent fraud, spam, and inappropriate content. Report violations and we'll investigate within 24 hours." },
  { icon: CheckCircle2, title: "Buyer Protection", desc: "Not satisfied with an order? Our buyer protection program covers you. Get revisions, refunds, or dispute resolution backed by our guarantee." },
];

export default function TrustPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Shield className="w-3 h-3" /> Trust & Safety
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Your safety is our <span className="gradient-text">priority</span></h1>
        <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">We&apos;re committed to creating a safe, fair, and trustworthy marketplace for both buyers and sellers.</p>
      </motion.div>

      <div className="space-y-6">
        {protections.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex gap-5">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{p.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 p-8 rounded-2xl gradient-bg text-white text-center">
        <Shield className="w-8 h-8 mx-auto mb-3 opacity-80" />
        <h3 className="font-display font-bold text-xl mb-2">Report a Concern</h3>
        <p className="text-white/80 text-sm mb-4">If you encounter suspicious activity or violations, let us know. All reports are reviewed within 24 hours.</p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-primary-dark rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">Report an Issue</a>
      </motion.div>
    </div>
  );
}
