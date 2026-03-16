"use client";

import { motion } from "framer-motion";
import { Users, Globe, Shield, Heart, Zap, Award, Target, Sparkles } from "lucide-react";

const team = [
  { name: "Marcus Rivera", role: "Founder & CEO", bio: "Former lead engineer at Shopify. Passionate about empowering creators." },
  { name: "Aisha Patel", role: "CTO", bio: "Built scalable systems at Google. Now building the future of digital commerce." },
  { name: "Jake Thompson", role: "Head of Design", bio: "Award-winning designer. Previously at Figma and Stripe." },
  { name: "Elena Kim", role: "Head of Community", bio: "Community building expert. Growing our creator ecosystem worldwide." },
];

const values = [
  { icon: Heart, title: "Creator First", desc: "Every decision we make starts with our creators. Your success is our success." },
  { icon: Shield, title: "Trust & Safety", desc: "We maintain the highest standards of security and buyer/seller protection." },
  { icon: Globe, title: "Global Access", desc: "Talent has no borders. We connect creators and businesses worldwide." },
  { icon: Zap, title: "Innovation", desc: "We constantly push boundaries to build the best marketplace experience." },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Sparkles className="w-3 h-3" /> About Us
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Building the future of <span className="gradient-text">digital commerce</span></h1>
        <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
          Victus Vision is a premium marketplace where talented freelancers and innovative digital creators connect with businesses and individuals worldwide. We believe in empowering creators with the tools and platform they need to thrive.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Active Creators", value: "12,400+" },
          { label: "Products Sold", value: "145,000+" },
          { label: "Countries", value: "90+" },
          { label: "Satisfaction", value: "98%" },
        ].map(stat => (
          <div key={stat.label} className="text-center p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Values */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16">
        <h2 className="text-2xl font-display font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={v.title} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] card-hover">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-display font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center card-hover">
              <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold mb-4">{member.name.charAt(0)}</div>
              <h3 className="font-semibold text-sm">{member.name}</h3>
              <p className="text-xs text-primary font-medium mt-1">{member.role}</p>
              <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
