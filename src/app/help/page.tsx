"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, ShoppingCart, CreditCard, Shield, User, Briefcase, Package, MessageSquare, Sparkles } from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    icon: User,
    articles: [
      { q: "How do I create an account?", a: "Click the 'Sign Up' button in the top right corner. You can register with your email, Google, or GitHub account. Fill in your details and you're ready to go!" },
      { q: "How do I become a seller?", a: "Navigate to 'Become a Seller' from the footer or dashboard. Complete the application form with your skills, portfolio, and professional information. Our team reviews applications within 24-48 hours." },
      { q: "How does the leveling system work?", a: "You earn XP through completing orders, receiving positive reviews, and platform activity. Levels progress from Beginner → Skilled → Professional → Elite → Legend, unlocking premium features at each tier." },
    ],
  },
  {
    title: "Buying",
    icon: ShoppingCart,
    articles: [
      { q: "How do I place an order?", a: "Browse services or products, select your desired package or item, and click 'Continue' or 'Purchase'. Follow the checkout process to complete your order." },
      { q: "What if I'm not satisfied with my order?", a: "You can request revisions based on your package tier. If issues persist, you can open a dispute and our resolution team will mediate. We offer full buyer protection." },
      { q: "How do refunds work?", a: "Refunds are available for orders that haven't been started, or through our dispute resolution process. Digital product purchases include a 30-day money-back guarantee." },
    ],
  },
  {
    title: "Selling",
    icon: Briefcase,
    articles: [
      { q: "How do I create a gig?", a: "Go to your Dashboard and click 'Post a Gig'. Fill in the title, category, description, pricing, and tags. Review and publish your gig to make it visible on the marketplace." },
      { q: "How do I list a digital product?", a: "From your Dashboard, click 'List Product'. Enter your product details, set the price, add a download URL, and publish. Your product will be available for purchase immediately." },
      { q: "When do I get paid?", a: "Earnings are available for withdrawal after a 14-day clearing period. You can withdraw via PayPal or bank transfer. Payouts are processed within 1-3 business days." },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    articles: [
      { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, PayPal, and cryptocurrency. All payments are processed securely through our payment partners." },
      { q: "What are the platform fees?", a: "Victus Vision charges a 10% service fee on each transaction. This covers payment processing, platform maintenance, dispute resolution, and customer support." },
      { q: "How do withdrawals work?", a: "Navigate to Dashboard → Earnings and click 'Withdraw'. Choose your preferred method (PayPal or bank transfer) and enter the amount. Minimum withdrawal is $10." },
    ],
  },
  {
    title: "Trust & Safety",
    icon: Shield,
    articles: [
      { q: "How does buyer protection work?", a: "All transactions are protected by our escrow system. Funds are held securely until the buyer confirms delivery. If there's an issue, our dispute resolution team steps in." },
      { q: "How do I report a user or content?", a: "Click the report button on any profile, listing, or conversation. Our moderation team reviews all reports within 24 hours and takes appropriate action." },
      { q: "Is my data secure?", a: "We use industry-standard encryption, secure payment processing, and comply with GDPR and CCPA regulations. Your data is never sold to third parties." },
    ],
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (category: string, index: number) => {
    setOpenItems(prev => ({ ...prev, [category]: prev[category] === index ? null : index }));
  };

  const filteredCategories = helpCategories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a => !search || a.q.toLowerCase().includes(search.toLowerCase()) || a.a.toLowerCase().includes(search.toLowerCase())),
  })).filter(cat => cat.articles.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <HelpCircle className="w-3 h-3" /> Help Center
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">How can we <span className="gradient-text">help?</span></h1>
        <p className="mt-4 text-[var(--muted)]">Find answers to common questions about Victus Vision.</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for help articles..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
      </motion.div>

      {/* Categories */}
      <div className="space-y-8">
        {filteredCategories.map((cat, ci) => (
          <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + ci * 0.05 }}>
            <div className="flex items-center gap-2 mb-4">
              <cat.icon className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-lg">{cat.title}</h2>
            </div>
            <div className="space-y-2">
              {cat.articles.map((article, i) => (
                <div key={i}>
                  <button onClick={() => toggleItem(cat.title, i)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/20 transition-all text-left">
                    <span className="font-medium text-sm pr-4">{article.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-[var(--muted)] transition-transform ${openItems[cat.title] === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openItems[cat.title] === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-4 py-3 text-sm text-[var(--muted)] leading-relaxed">{article.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 p-8 rounded-2xl gradient-bg text-center text-white">
        <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-80" />
        <h3 className="font-display font-bold text-xl mb-2">Still need help?</h3>
        <p className="text-white/80 text-sm mb-4">Our support team is ready to assist you.</p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-primary-dark rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">
          Contact Support
        </a>
      </motion.div>
    </div>
  );
}
