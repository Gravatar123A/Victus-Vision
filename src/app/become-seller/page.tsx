"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, User, Mail, FileText, Link as LinkIcon, Briefcase, Code2, Palette, Smartphone, Brain, Video, PenTool } from "lucide-react";

const skillCategories = [
  { id: "web-dev", name: "Web Development", icon: Code2 },
  { id: "design", name: "Design & Creative", icon: Palette },
  { id: "mobile", name: "Mobile Development", icon: Smartphone },
  { id: "ai-ml", name: "AI & Machine Learning", icon: Brain },
  { id: "video", name: "Video & Animation", icon: Video },
  { id: "writing", name: "Writing & Content", icon: PenTool },
];

export default function BecomeSellerPage() {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s <= step ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] text-[var(--muted)]"}`}>
                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${s <= step ? "" : "text-[var(--muted)]"}`}>
                {s === 1 ? "Personal Info" : s === 2 ? "Skills & Portfolio" : "Review & Submit"}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-[var(--surface)]">
          <motion.div animate={{ width: `${(step / 3) * 100}%` }} className="h-full rounded-full gradient-bg" transition={{ duration: 0.5 }} />
        </div>
      </motion.div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div className="glass rounded-3xl p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          {step === 1 && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-display font-bold">Become a Seller</h1>
                <p className="text-sm text-[var(--muted)] mt-2">Start selling your services and products on Victus Vision.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Display Name</label>
                  <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" /><input type="text" placeholder="Your professional name" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" /></div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Professional Email</label>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" /><input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" /></div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Professional Title</label>
                  <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" /><input type="text" placeholder="e.g. Full-Stack Developer" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" /></div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Bio</label>
                  <textarea placeholder="Tell us about yourself and your experience..." rows={4} className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary resize-none" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-display font-bold">Skills & Portfolio</h1>
                <p className="text-sm text-[var(--muted)] mt-2">Select your areas of expertise and share your work.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-2 block">Select Your Skills</label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillCategories.map(cat => (
                      <button key={cat.id} onClick={() => toggleSkill(cat.id)} className={`flex items-center gap-2 p-3 rounded-xl text-sm text-left transition-all ${selectedSkills.includes(cat.id) ? "bg-primary/10 border-primary/30 border text-primary" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/20"}`}>
                        <cat.icon className="w-4 h-4" />{cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Portfolio URL</label>
                  <div className="relative"><LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" /><input type="url" placeholder="https://yourportfolio.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" /></div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Additional Notes</label>
                  <textarea placeholder="Anything else you want us to know..." rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary resize-none" />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-white" /></div>
              <h1 className="text-2xl font-display font-bold mb-2">Application Ready!</h1>
              <p className="text-sm text-[var(--muted)] mb-6">Review your information and submit your application. Our team will review it within 24-48 hours.</p>
              <div className="text-left p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] mb-6">
                <p className="text-xs text-[var(--muted)] mb-2">What happens next:</p>
                <ul className="space-y-2 text-sm">
                  {["Our team reviews your application", "You receive an email with the decision", "Set up your seller profile and start listing", "Begin earning on Victus Vision"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t border-[var(--border-color)]">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-xl text-sm font-medium border border-[var(--border-color)] hover:border-primary/30 transition-colors">
                Back
              </button>
            ) : <div />}
            <button onClick={() => step < 3 ? setStep(step + 1) : undefined} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity flex items-center gap-2">
              {step === 3 ? "Submit Application" : "Continue"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
