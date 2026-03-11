"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, BadgeCheck, Award, Search } from "lucide-react";
import { topFreelancers } from "@/lib/mock-data";

const allFreelancers = [
  ...topFreelancers,
  {
    id: "f5", name: "Emma Davis", title: "AI & ML Engineer", avatar: "/avatars/4.jpg",
    level: "Elite", rating: 4.7, completedOrders: 156, skills: ["Python", "TensorFlow", "GPT", "Data Science"], verified: true,
  },
  {
    id: "f6", name: "Mike Torres", title: "Bot & Automation Expert", avatar: "/avatars/3.jpg",
    level: "Professional", rating: 4.8, completedOrders: 189, skills: ["Discord.js", "Python", "Node.js", "Puppeteer"], verified: true,
  },
  {
    id: "f7", name: "Nina Rodriguez", title: "Brand Designer", avatar: "/avatars/15.jpg",
    level: "Professional", rating: 4.7, completedOrders: 178, skills: ["Logo Design", "Branding", "Illustrator", "Figma"], verified: true,
  },
  {
    id: "f8", name: "Mark Thompson", title: "SEO Specialist", avatar: "/avatars/14.jpg",
    level: "Elite", rating: 4.8, completedOrders: 213, skills: ["SEO", "Analytics", "Content Strategy", "SEM"], verified: false,
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-gray-500/10 text-gray-400",
  Skilled: "bg-blue-500/10 text-blue-400",
  Professional: "bg-purple-500/10 text-purple-400",
  Elite: "bg-amber-500/10 text-amber-400",
  Legend: "bg-gradient-to-r from-primary/20 to-accent/20 text-primary",
};

export default function FreelancersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold">Find Freelancers</h1>
        <p className="text-[var(--muted)] mt-2">Connect with verified professionals for your projects.</p>
      </motion.div>

      <div className="relative max-w-lg mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input type="text" placeholder="Search by name, skill, or title..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {allFreelancers.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/profile/${f.id}`}>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center card-hover">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold mb-4">{f.name.charAt(0)}</div>
                <h3 className="font-semibold text-sm flex items-center justify-center gap-1">{f.name}{f.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{f.title}</p>
                <div className="mt-2"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${levelColors[f.level]}`}><Award className="w-3 h-3" />{f.level}</span></div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= Math.floor(f.rating) ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}</div>
                  <span className="text-xs text-[var(--muted)]">{f.rating}</span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">{f.completedOrders} orders completed</p>
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {f.skills.slice(0, 3).map(skill => <span key={skill} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px] font-medium">{skill}</span>)}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
