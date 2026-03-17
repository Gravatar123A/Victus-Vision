"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Shield, ArrowLeft, Heart, Tag, Clock, FileText, MessageSquare, History, ChevronRight, Package, Calendar, BadgeCheck } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  thumbnail: string | null;
  fileUrl: string | null;
  tags: string[];
  createdAt: string;
  seller: {
    id: string;
    username: string;
    fullName: string | null;
    avatarUrl: string | null;
    level: string;
    isVerified: boolean;
    bio: string | null;
    joinedAt: string;
  };
  category: { id: string; name: string };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data.product);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-[var(--surface-alt)] rounded-lg" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-[var(--surface-alt)] rounded-3xl" />
              <div className="h-40 bg-[var(--surface-alt)] rounded-3xl" />
            </div>
            <div className="h-[500px] bg-[var(--surface-alt)] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products" className="text-primary hover:underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "changelog", label: "Changelog", icon: History },
    { id: "support", label: "Support", icon: MessageSquare },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl overflow-hidden aspect-video relative group border border-[var(--border-color)] bg-[var(--surface)]">
              {product.thumbnail ? (
                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full gradient-bg opacity-10 flex items-center justify-center">
                  <Package className="w-20 h-20 text-primary opacity-20" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex gap-1 border-b border-[var(--border-color)] mb-6 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-[var(--muted)] hover:text-[var(--fg)]"}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)]">
                <div className="text-lg text-[var(--muted)] leading-relaxed whitespace-pre-line">{product.description}</div>
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--border-color)]">
                  {product.tags.map(tag => <span key={tag} className="px-4 py-2 rounded-xl bg-[var(--surface-alt)] text-sm font-medium">{tag}</span>)}
                </div>
              </div>
            )}

            {activeTab === "changelog" && (
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold font-mono">v1.0.0</span>
                    <span className="text-xs text-[var(--muted)]">{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)]">Initial release of {product.title}</p>
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div className="p-10 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Need Support?</h3>
                <p className="text-[var(--muted)] mb-6 max-w-sm mx-auto text-sm leading-relaxed">If you have any questions or issues with this product, feel free to message the seller directly.</p>
                <Link href={`/messages?userId=${product.seller.id}`} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold gradient-bg text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                  <MessageSquare className="w-4 h-4" /> Message Seller
                </Link>
              </div>
            )}
          </motion.div>

          {/* Seller Profile Quick View */}
          <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)]">
            <div className="flex items-center gap-6">
              {product.seller.avatarUrl ? (
                <img src={product.seller.avatarUrl} alt="" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/10" />
              ) : (
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold">
                  {product.seller.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{product.seller.fullName || product.seller.username}</h3>
                  {product.seller.isVerified && <BadgeCheck className="w-5 h-5 text-primary" />}
                  <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{product.seller.level}</span>
                </div>
                <p className="text-sm text-[var(--muted)] line-clamp-2 max-w-lg italic">"{product.seller.bio || 'Product creator at Victus Vision'}"</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted)] font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Joined {new Date(product.seller.joinedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-warning fill-warning" /> 4.8 Rating</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="sticky top-24">
            <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)] shadow-2xl shadow-black/20">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase">{product.category.name}</span>
                <button className="p-2.5 rounded-2xl bg-[var(--surface-alt)] hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-2xl font-bold mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-8 text-[var(--muted)]">
                <div className="flex gap-0.5 transition-all">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? "text-warning fill-warning" : "text-zinc-600"}`} />)}
                </div>
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              </div>

              <div className="text-5xl font-bold mb-8 transition-all tracking-tight bg-gradient-to-r from-[var(--fg)] to-[var(--muted)] bg-clip-text text-transparent">
                ${product.price}
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 rounded-2xl text-sm font-bold text-white gradient-bg hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                  Download Now
                </button>
                <Link 
                  href={`/messages?userId=${product.seller.id}`}
                  className="w-full py-4 rounded-2xl text-sm font-bold border-2 border-[var(--border-color)] hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Contact Seller
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--border-color)] space-y-4 text-sm text-[var(--muted)] font-medium">
                <div className="flex justify-between"><span>Downloads</span><span className="text-[var(--fg)]">{product.downloads.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Last Updated</span><span className="text-[var(--fg)]">{new Date(product.createdAt).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span>File Format</span><span className="text-[var(--fg)]">ZIP, PDF</span></div>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-3xl bg-green-400/5 border border-green-400/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Secure Assets</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">All digital products are scanned for malware and verified by our security team before being listed.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
