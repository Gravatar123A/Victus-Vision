"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, BadgeCheck, Award, MapPin } from "lucide-react";
import { topFreelancers } from "@/lib/mock-data";

const allFreelancers = [
  ...topFreelancers,
  { id: "f5", name: "Mike Torres", title: "Discord Bot Developer", avatar: "", level: "Professional", rating: 4.8, completedOrders: 189, skills: ["Discord.js", "Python", "Node.js", "MongoDB"], verified: true },
  { id: "f6", name: "Emma Davis", title: "AI & Content Specialist", avatar: "", level: "Elite", rating: 4.7, completedOrders: 156, skills: ["GPT", "Content Strategy", "Automation", "Python"], verified: false },
  { id: "f7", name: "Nina Rodriguez", title: "Brand & Logo Designer", avatar: "", level: "Professional", rating: 4.7, completedOrders: 178, skills: ["Logo Design", "Branding", "Adobe", "Identity"], verified: true },
  { id: "f8", name: "Chris Lee", title: "Blockchain Developer", avatar: "", level: "Elite", rating: 4.9, completedOrders: 98, skills: ["Solidity", "Web3", "DeFi", "React"], verified: true },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-gray-500/10 text-gray-400",
  Skilled: "bg-blue-500/10 text-blue-400",
  Professional: "bg-purple-500/10 text-purple-400",
  Elite: "bg-amber-500/10 text-amber-400",
  Legend: "bg-gradient-to-r from-primary/20 to-accent/20 text-primary",
};

const skillFilters = ["All", "Web Development", "Design", "Mobile", "AI & ML", "Bots", "Video", "Blockchain"];

export default function FreelancersPage() {
  const [search, setSearch] = useState("");
  const [activeSkill, setActiveSkill] = useState("All");

  const filtered = allFreelancers.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.title.toLowerCase().includes(search.toLowerCase()) || f.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold">Find Freelancers</h1>
        <p className="text-[var(--muted)] mt-2">Discover verified professionals with proven track records.</p>
      </motion.div>

      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, skill, or specialty..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {skillFilters.map(s => (
          <button key={s} onClick={() => setActiveSkill(s)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeSkill === s ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
            {s}
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--muted)] mb-6">{filtered.length} freelancers found</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((freelancer, i) => (
          <motion.div key={freelancer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${levelColors[freelancer.level]}`}>
                    <Award className="w-3 h-3" />{freelancer.level}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= Math.floor(freelancer.rating) ? "text-warning fill-warning" : "text-[var(--border-color)]"}`} />)}
                  </div>
                  <span className="text-xs text-[var(--muted)]">{freelancer.rating}</span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">{freelancer.completedOrders} orders completed</p>
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {freelancer.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px] font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
