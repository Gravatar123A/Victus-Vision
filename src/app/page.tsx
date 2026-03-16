"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Star, Clock, Shield, Zap, Code2, Palette, Smartphone,
  Brain, Bot, Video, PenTool, TrendingUp, ChevronDown, ChevronRight,
  Sparkles, Users, Package, Award, CheckCircle2, Globe, Lock, Heart,
  BadgeCheck, Download
} from "lucide-react";
import {
  trendingServices, featuredProducts, topFreelancers,
  testimonials, faqItems, platformStats, categories,
} from "@/lib/mock-data";

/* ===== ICON MAP ===== */
const iconMap: Record<string, React.ElementType> = {
  Code2, Palette, Smartphone, Brain, Bot, Video, PenTool, TrendingUp,
};

/* ===== SECTION WRAPPER ===== */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ badge, title, subtitle }: { badge?: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Sparkles className="w-3 h-3" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-[var(--muted)] text-base md:text-lg">{subtitle}</p>
    </div>
  );
}

/* ===== COUNTER ===== */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ===== STAR RATING ===== */
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={s <= rating ? "text-warning fill-warning" : "text-[var(--border-color)]"}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

/* ===== LEVEL BADGE ===== */
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

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              <Zap className="w-3.5 h-3.5" />
              The Future of Digital Commerce
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]"
          >
            Where talent meets{" "}
            <span className="gradient-text">opportunity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto"
          >
            Hire world-class freelancers, discover premium digital products,
            and build something extraordinary — all on one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/freelance"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Products
              <Package className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-[var(--muted)]"
          >
            {[
              { icon: Users, label: "12,400+ Freelancers" },
              { icon: Package, label: "8,700+ Products" },
              { icon: Star, label: "4.9 Average Rating" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mt-16 relative"
        >
          <div className="glass rounded-3xl p-1 mx-auto max-w-5xl" style={{ boxShadow: "var(--shadow-lg)" }}>
            <div className="rounded-[20px] overflow-hidden bg-[var(--surface)] p-6">
              {/* Mock Dashboard */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Revenue", value: "$12.4k", color: "text-success" },
                  { label: "Orders", value: "89", color: "text-primary" },
                  { label: "Rating", value: "4.9★", color: "text-warning" },
                  { label: "Response", value: "1.2h", color: "text-accent" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-[var(--surface-alt)] p-4 border border-[var(--border-color)]">
                    <p className="text-xs text-[var(--muted)]">{stat.label}</p>
                    <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-2xl bg-[var(--surface-alt)] p-4 border border-[var(--border-color)] h-40">
                  <p className="text-xs text-[var(--muted)] mb-3">Earnings Overview</p>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="flex-1 rounded-lg gradient-bg opacity-80"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-[var(--surface-alt)] p-4 border border-[var(--border-color)] h-40">
                  <p className="text-xs text-[var(--muted)] mb-3">Recent Orders</p>
                  <div className="space-y-2">
                    {["Website Dev", "Logo Design", "Bot Dev"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg gradient-bg opacity-60" />
                        <div className="flex-1">
                          <div className="text-xs truncate">{item}</div>
                          <div className="w-16 h-1 rounded-full bg-[var(--border-color)] mt-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${70 + i * 10}%` }}
                              transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
                              className="h-full rounded-full gradient-bg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect beneath */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full gradient-bg opacity-20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

/* ===== CATEGORIES ===== */
function CategoriesSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Categories"
          title="Explore by category"
          subtitle="Find the perfect service or product across our diverse marketplace."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/freelance?category=${cat.id}`}
                  className="group block p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-all card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{cat.name}</h3>
                  <p className="text-xs text-[var(--muted)] mt-1">{cat.count.toLocaleString()} services</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ===== FEATURES ===== */
function FeaturesSection() {
  const features = [
    { icon: Shield, title: "Secure Payments", desc: "Protected transactions with escrow and buyer/seller guarantees." },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized platform for instant search and seamless browsing." },
    { icon: Globe, title: "Global Marketplace", desc: "Connect with talent and products from around the world." },
    { icon: Lock, title: "File Protection", desc: "Secure delivery with DRM and download protection for digital goods." },
    { icon: Award, title: "Verified Sellers", desc: "Trusted sellers verified through our rigorous review process." },
    { icon: Heart, title: "Community Driven", desc: "Built by creators, for creators. Your feedback shapes our platform." },
  ];

  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Features"
          title="Built for creators & businesses"
          subtitle="Everything you need to buy, sell, and grow in one powerful platform."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== HOW IT WORKS ===== */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Create Your Account", desc: "Sign up in seconds — browse as a buyer or apply to sell your services and products.", icon: Users },
    { num: "02", title: "Find or List", desc: "Discover top freelancers and products, or create your own listings to start earning.", icon: Sparkles },
    { num: "03", title: "Collaborate & Grow", desc: "Complete orders, earn XP, level up, and build your reputation on the platform.", icon: TrendingUp },
  ];

  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="How It Works"
          title="Start in minutes"
          subtitle="Getting started on Victus Vision is quick and simple."
        />
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="relative mx-auto w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 z-10">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-mono text-primary mb-2 block">Step {step.num}</span>
              <h3 className="font-display font-semibold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== TRENDING SERVICES ===== */
function TrendingServicesSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Popular services</h2>
            <p className="mt-2 text-[var(--muted)]">Top-rated services from our best sellers.</p>
          </div>
          <Link href="/freelance" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-5 min-w-max">
            {trendingServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/freelance/${service.id}`} className="block w-72">
                  <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
                    {/* Image */}
                    <div className="h-40 gradient-bg opacity-80 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium">{service.category}</span>
                        <button className="p-1.5 rounded-lg bg-black/40 backdrop-blur text-white hover:text-danger transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">
                          {service.seller.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium flex items-center gap-1">
                            {service.seller.name}
                            {service.seller.verified && <BadgeCheck className="w-3 h-3 text-primary" />}
                          </p>
                          <LevelBadge level={service.seller.level} />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{service.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={Math.floor(service.rating)} size={12} />
                        <span className="text-xs text-[var(--muted)]">{service.rating} ({service.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                          <Clock className="w-3 h-3" />
                          {service.deliveryDays}d delivery
                        </div>
                        <div>
                          <span className="text-xs text-[var(--muted)]">From </span>
                          <span className="font-bold text-sm">${service.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ===== FEATURED PRODUCTS ===== */
function FeaturedProductsSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
              <Package className="w-3 h-3" />
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Digital products</h2>
            <p className="mt-2 text-[var(--muted)]">Premium scripts, templates, and tools.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/products/${product.id}`}>
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
                  <div className="h-36 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-xs font-medium">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-xs text-[var(--muted)] mb-3">by {product.seller.name}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={Math.floor(product.rating)} size={12} />
                      <span className="text-xs text-[var(--muted)]">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                        <Download className="w-3 h-3" />
                        {product.downloads.toLocaleString()}
                      </div>
                      <span className="font-bold text-sm">${product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== TOP FREELANCERS ===== */
function TopFreelancersSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Top Talent"
          title="Meet our top freelancers"
          subtitle="Verified professionals with proven track records."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topFreelancers.map((freelancer, i) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/profile/${freelancer.id}`}>
                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center card-hover">
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold mb-4">
                    {freelancer.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-sm flex items-center justify-center gap-1">
                    {freelancer.name}
                    {freelancer.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">{freelancer.title}</p>
                  <div className="mt-2">
                    <LevelBadge level={freelancer.level} />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <StarRating rating={Math.floor(freelancer.rating)} size={12} />
                    <span className="text-xs text-[var(--muted)]">{freelancer.rating}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">{freelancer.completedOrders} orders completed</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px] font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== TESTIMONIALS ===== */
function TestimonialsSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Loved by thousands"
          subtitle="See what our community says about Victus Vision."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl glass border border-[var(--border-color)] card-hover"
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== TRUST SECTION ===== */
function TrustSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-border rounded-3xl bg-[var(--surface)] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success mb-4">
                <Shield className="w-3 h-3" />
                Trust & Security
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Your safety is our priority</h2>
              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                Every transaction on Victus Vision is protected by our comprehensive security system.
                From escrow payments to verified sellers, we&apos;ve built trust into every layer.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Lock, title: "Escrow Payments", desc: "Funds held securely until delivery" },
                { icon: Shield, title: "Buyer Protection", desc: "Full refund guarantee on disputes" },
                { icon: BadgeCheck, title: "Verified Sellers", desc: "Identity-verified professionals" },
                { icon: CheckCircle2, title: "Quality Assurance", desc: "Content moderation & review" },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
                  <item.icon className="w-6 h-6 text-success mb-2" />
                  <h4 className="font-semibold text-xs">{item.title}</h4>
                  <p className="text-[10px] text-[var(--muted)] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ===== STATS ===== */
function StatsSection() {
  return (
    <Section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]"
            >
              <p className="text-3xl md:text-4xl font-display font-bold gradient-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== FAQ ===== */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about Victus Vision."
        />
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/20 transition-all text-left"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-[var(--muted)] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 py-4 text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ===== HOME PAGE ===== */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturesSection />
      <HowItWorks />
      <TrendingServicesSection />
      <FeaturedProductsSection />
      <TopFreelancersSection />
      <TestimonialsSection />
      <TrustSection />
      <StatsSection />
      <FAQSection />
    </>
  );
}
