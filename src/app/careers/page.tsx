"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Heart, Zap, Users } from "lucide-react";

const openings = [
  { title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Build beautiful, performant interfaces for our marketplace using React and Next.js." },
  { title: "Backend Engineer", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Design and build scalable APIs and services powering our growing platform." },
  { title: "Senior Product Designer", dept: "Design", location: "Remote", type: "Full-time", desc: "Shape the future of how creators and businesses connect on our platform." },
  { title: "Community Manager", dept: "Community", location: "Remote", type: "Full-time", desc: "Grow and nurture our global community of creators and buyers." },
  { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Build and maintain our cloud infrastructure on AWS and Vercel." },
  { title: "Content Marketing Lead", dept: "Marketing", location: "Remote", type: "Full-time", desc: "Create compelling content that drives growth and engagement." },
];

const perks = [
  { icon: Zap, title: "Remote First", desc: "Work from anywhere in the world" },
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health coverage" },
  { icon: Users, title: "Team Retreats", desc: "Annual team meetups globally" },
  { icon: Sparkles, title: "Learning Budget", desc: "$2,000/year for courses & conferences" },
];

export default function CareersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Briefcase className="w-3 h-3" /> Careers
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Join our <span className="gradient-text">mission</span></h1>
        <p className="mt-4 text-lg text-[var(--muted)]">Help us build the future of digital commerce. We&apos;re looking for passionate people to join our team.</p>
      </motion.div>

      {/* Perks */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {perks.map(perk => (
          <div key={perk.title} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
            <perk.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">{perk.title}</h3>
            <p className="text-xs text-[var(--muted)] mt-1">{perk.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Openings */}
      <h2 className="text-2xl font-display font-bold mb-6">Open Positions</h2>
      <div className="space-y-4">
        {openings.map((job, i) => (
          <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-hover">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{job.desc}</p>
                <div className="flex gap-3 mt-2 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.dept}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                </div>
              </div>
              <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
                Apply <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
