"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Clock, BadgeCheck, ArrowLeft, Heart, 
  MessageSquare, Shield, Share2, Info, 
  ChevronRight, Calendar, User
} from "lucide-react";

interface Service {
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
    bio: string | null;
    joinedAt: string;
  };
  category: { id: string; name: string };
}

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/gigs/${id}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data.service);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
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

  if (error || !service) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <Link href="/freelance" className="text-primary hover:underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
        <Link href="/freelance" className="hover:text-[var(--fg)] transition-colors">Marketplace</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/freelance?category=${service.category.name}`} className="hover:text-[var(--fg)] transition-colors">{service.category.name}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[var(--fg)] font-medium truncate">{service.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Gallery Placeholder */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border-color)] relative group">
              {service.thumbnail ? (
                <img src={service.thumbnail} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full gradient-bg opacity-10 flex items-center justify-center">
                  <Briefcase className="w-20 h-20 text-primary opacity-20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          <div className="space-y-6">
            <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Description
              </h2>
              <div className="text-[var(--muted)] leading-relaxed whitespace-pre-line text-lg">
                {service.description}
              </div>
              
              <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                <h3 className="text-sm font-semibold mb-4 text-[var(--fg)] uppercase tracking-wider">Service Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-xl bg-[var(--surface-alt)] text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Seller Info */}
            <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)]">
              <div className="flex items-center gap-6">
                {service.seller.avatarUrl ? (
                  <img src={service.seller.avatarUrl} alt="" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/10" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20">
                    {service.seller.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{service.seller.fullName || service.seller.username}</h3>
                    {service.seller.isVerified && <BadgeCheck className="w-5 h-5 text-primary" />}
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                      service.seller.level === 'Legend' ? 'gradient-bg text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {service.seller.level}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] line-clamp-2 italic">"{service.seller.bio || 'Professional freelancer at Victus Vision'}"</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5" /> Joined {new Date(service.seller.joinedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5 font-medium"><Star className="w-3.5 h-3.5 text-warning fill-warning" /> 4.9 Average Rating</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="sticky top-24">
            <div className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border-color)] shadow-2xl shadow-black/20">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase">{service.category.name}</span>
                <button className="p-2 rounded-xl bg-[var(--surface-alt)] hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-2xl font-bold mb-4 leading-tight">{service.title}</h1>
              
              <div className="flex items-center gap-2 mb-6 text-[var(--muted)]">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.floor(service.rating) ? 'text-warning fill-warning' : 'text-zinc-600'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{service.rating.toFixed(1)} ({service.reviewsCount} reviews)</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-alt)]/50 border border-[var(--border-color)]">
                  <span className="text-[var(--muted)] flex items-center gap-2 font-medium"><Clock className="w-4 h-4" /> Delivery</span>
                  <span className="font-bold text-[var(--fg)]">{service.deliveryDays} Days</span>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[var(--fg)] to-[var(--muted)] bg-clip-text text-transparent">
                  ${service.price}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 rounded-2xl text-white font-bold gradient-bg hover:opacity-90 transition-all shadow-lg shadow-primary/20 scale-100 active:scale-[0.98]">
                  Order Now
                </button>
                <Link 
                  href={`/messages?userId=${service.seller.id}`}
                  className="w-full py-4 rounded-2xl border-2 border-[var(--border-color)] text-[var(--fg)] font-bold hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Contact Seller
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--border-color)] space-y-4">
                <div className="flex items-center gap-3 text-sm text-green-400 font-medium">
                  <Shield className="w-5 h-5" />
                  Victus Secure Payment
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <Share2 className="w-5 h-5" />
                  Share this service
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Add these to avoid icons error in thought
const Briefcase = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
