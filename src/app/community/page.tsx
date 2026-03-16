"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Award, Calendar, ArrowRight, Sparkles } from "lucide-react";

const channels = [
  { icon: MessageCircle, title: "Discord Server", desc: "Join 8,000+ members in our official Discord. Get help, share ideas, and connect with creators.", action: "Join Discord", color: "from-indigo-500 to-purple-500" },
  { icon: Users, title: "Creator Forums", desc: "Discuss strategies, share experiences, and learn from fellow creators on our community forums.", action: "Visit Forums", color: "from-primary to-accent" },
  { icon: Calendar, title: "Monthly Meetups", desc: "Virtual meetups with platform updates, Q&A sessions, and guest speakers from the creator community.", action: "See Schedule", color: "from-emerald-500 to-teal-500" },
  { icon: Award, title: "Creator Challenges", desc: "Participate in monthly challenges, win prizes, and showcase your skills to the community.", action: "View Challenges", color: "from-amber-500 to-orange-500" },
];

const highlights = [
  { stat: "8,000+", label: "Discord Members" },
  { stat: "500+", label: "Forum Threads" },
  { stat: "24", label: "Monthly Events" },
  { stat: "50+", label: "Community Leaders" },
];

export default function CommunityPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Users className="w-3 h-3" /> Community
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Join the <span className="gradient-text">community</span></h1>
        <p className="mt-4 text-[var(--muted)]">Connect with thousands of creators, share knowledge, and grow together.</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {highlights.map(h => (
          <div key={h.label} className="text-center p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <p className="text-2xl font-bold gradient-text">{h.stat}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{h.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Channels */}
      <div className="grid md:grid-cols-2 gap-6">
        {channels.map((ch, i) => (
          <motion.div key={ch.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden card-hover">
              <div className={`h-24 bg-gradient-to-br ${ch.color} opacity-80`} />
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface-alt)] flex items-center justify-center -mt-12 mb-4 border-4 border-[var(--bg)]">
                  <ch.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{ch.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{ch.desc}</p>
                <button className="mt-4 flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                  {ch.action} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
