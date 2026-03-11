"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, Package, MessageSquare, AlertTriangle, FileDown, Star, RotateCcw } from "lucide-react";

const order = {
  id: "ORD-001",
  service: "Professional Website Development",
  seller: "Alex Chen",
  buyer: "John Smith",
  package: "Standard",
  amount: 599,
  status: "in_progress",
  createdAt: "Mar 7, 2026",
  deliveryDate: "Mar 17, 2026",
  milestones: [
    { title: "Requirements & Planning", status: "completed", date: "Mar 7, 2026" },
    { title: "Design Mockups", status: "completed", date: "Mar 9, 2026" },
    { title: "Frontend Development", status: "in_progress", date: "Mar 12, 2026" },
    { title: "Backend Integration", status: "pending", date: "Mar 14, 2026" },
    { title: "Testing & Delivery", status: "pending", date: "Mar 17, 2026" },
  ],
  timeline: [
    { event: "Order placed", date: "Mar 7, 10:00 AM", type: "order" },
    { event: "Requirements document shared", date: "Mar 7, 2:30 PM", type: "file" },
    { event: "Design mockups delivered", date: "Mar 9, 11:00 AM", type: "delivery" },
    { event: "Mockups approved by buyer", date: "Mar 9, 4:00 PM", type: "approval" },
    { event: "Frontend development started", date: "Mar 10, 9:00 AM", type: "update" },
  ],
};

const statusIcons: Record<string, React.ElementType> = {
  completed: CheckCircle2,
  in_progress: Clock,
  pending: Clock,
};

const statusColors: Record<string, string> = {
  completed: "text-success bg-success/10",
  in_progress: "text-primary bg-primary/10",
  pending: "text-[var(--muted)] bg-[var(--surface-alt)]",
};

export default function OrderDetailPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-primary">{order.id}</span>
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">In Progress</span>
            </div>
            <h1 className="text-xl font-display font-bold mb-2">{order.service}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
              <span>Package: <strong className="text-[var(--fg)]">{order.package}</strong></span>
              <span>Amount: <strong className="text-[var(--fg)]">${order.amount}</strong></span>
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-4">Milestones</h2>
            <div className="space-y-3">
              {order.milestones.map((ms, i) => {
                const Icon = statusIcons[ms.status];
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--surface-alt)]">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${statusColors[ms.status]}`}><Icon className="w-4 h-4" /></div>
                    <div className="flex-1"><p className="text-sm font-medium">{ms.title}</p><p className="text-xs text-[var(--muted)]">{ms.date}</p></div>
                    <span className={`text-xs font-medium capitalize ${ms.status === "completed" ? "text-success" : ms.status === "in_progress" ? "text-primary" : "text-[var(--muted)]"}`}>{ms.status.replace("_", " ")}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
            <h2 className="font-display font-semibold text-lg mb-4">Order Timeline</h2>
            <div className="space-y-4 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-[var(--border-color)]" />
              {order.timeline.map((event, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10 border-2 border-[var(--surface)]">
                    <div className="w-2 h-2 rounded-full gradient-bg" />
                  </div>
                  <div><p className="text-sm font-medium">{event.event}</p><p className="text-xs text-[var(--muted)]">{event.date}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="sticky top-24 space-y-4">
            {/* Actions */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] space-y-3">
              <h3 className="font-semibold text-sm mb-2">Actions</h3>
              <button className="w-full py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><FileDown className="w-4 h-4" />Deliver Work</button>
              <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-[var(--border-color)] hover:border-primary/30 transition-colors flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" />Message Buyer</button>
              <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-[var(--border-color)] hover:border-primary/30 transition-colors flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" />Request Revision</button>
              <button className="w-full py-2.5 rounded-xl text-sm font-medium text-danger border border-danger/20 hover:bg-danger/5 transition-colors flex items-center justify-center gap-2"><AlertTriangle className="w-4 h-4" />Open Dispute</button>
            </div>

            {/* Order Details */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h3 className="font-semibold text-sm mb-3">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted)]">Ordered</span><span>{order.createdAt}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">Due Date</span><span>{order.deliveryDate}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">Seller</span><span className="text-primary">{order.seller}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">Buyer</span><span>{order.buyer}</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
