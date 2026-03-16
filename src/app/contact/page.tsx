"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Clock, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Message Sent!</h1>
          <p className="text-sm text-[var(--muted)]">We&apos;ve received your message and will get back to you within 24 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <MessageSquare className="w-3 h-3" /> Contact
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Get in <span className="gradient-text">touch</span></h1>
        <p className="mt-4 text-[var(--muted)]">Have a question, concern, or just want to say hello? We&apos;d love to hear from you.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          {[
            { icon: Mail, title: "Email", info: "support@victusvision.com", desc: "For general inquiries" },
            { icon: MessageSquare, title: "Live Chat", info: "Available 24/7", desc: "Instant support for urgent issues" },
            { icon: Clock, title: "Response Time", info: "< 24 hours", desc: "For email inquiries" },
            { icon: MapPin, title: "Location", info: "San Francisco, CA", desc: "United States" },
          ].map(item => (
            <div key={item.title} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-primary">{item.info}</p>
                  <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2">
          <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-6">Send us a message</h2>
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">First Name</label>
                  <input type="text" placeholder="John" required className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Last Name</label>
                  <input type="text" placeholder="Doe" required className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Email</label>
                <input type="email" placeholder="you@example.com" required className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Subject</label>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Partnership</option>
                  <option>Bug Report</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Message</label>
                <textarea placeholder="Tell us how we can help..." rows={5} required className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
