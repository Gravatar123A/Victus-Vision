"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, DollarSign, MessageSquare,
  Settings, Star, Clock, Search, ChevronRight, Eye, Filter
} from "lucide-react";
import { recentOrders } from "@/lib/mock-data";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Post a Gig", icon: Briefcase, href: "/dashboard/new-gig" },
  { label: "List Product", icon: Package, href: "/dashboard/new-product" },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders", active: true },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const allOrders = [
  ...recentOrders,
  { id: "ORD-006", buyer: "Lisa Chen", service: "SEO Optimization", amount: 249, status: "completed", date: "2026-03-05" },
  { id: "ORD-007", buyer: "David Park", service: "Brand Identity", amount: 129, status: "completed", date: "2026-03-04" },
  { id: "ORD-008", buyer: "Maya Singh", service: "Video Editing", amount: 179, status: "completed", date: "2026-03-03" },
  { id: "ORD-009", buyer: "Jake Turner", service: "AI Content", amount: 99, status: "cancelled", date: "2026-03-02" },
  { id: "ORD-010", buyer: "Rachel Kim", service: "Mobile App", amount: 499, status: "completed", date: "2026-03-01" },
];

const statusColors: Record<string, string> = {
  in_progress: "bg-blue-500/10 text-blue-400",
  delivered: "bg-amber-500/10 text-amber-400",
  completed: "bg-success/10 text-success",
  revision: "bg-purple-500/10 text-purple-400",
  cancelled: "bg-danger/10 text-danger",
};

const statusFilters = ["All", "In Progress", "Delivered", "Completed", "Revision", "Cancelled"];

export default function DashboardOrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allOrders.filter(o => {
    const matchFilter = activeFilter === "All" || o.status === activeFilter.toLowerCase().replace(" ", "_");
    const matchSearch = !searchQuery || o.buyer.toLowerCase().includes(searchQuery.toLowerCase()) || o.service.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sidebarItems.map(item => (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? "bg-primary/10 text-primary" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-2xl font-display font-bold">Orders</h1>
            <p className="text-[var(--muted)] text-sm mt-1">Manage and track all your orders.</p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Orders", value: allOrders.length.toString(), color: "text-primary" },
              { label: "In Progress", value: allOrders.filter(o => o.status === "in_progress").length.toString(), color: "text-blue-400" },
              { label: "Completed", value: allOrders.filter(o => o.status === "completed").length.toString(), color: "text-success" },
              { label: "Revenue", value: `$${allOrders.filter(o => o.status === "completed").reduce((a, b) => a + b.amount, 0).toLocaleString()}`, color: "text-warning" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters & Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
            </div>
          </motion.div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {statusFilters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeFilter === f ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Order ID</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Buyer</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Service</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Amount</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Status</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Date</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(order => (
                    <tr key={order.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors">
                      <td className="py-3 px-6 font-mono text-xs text-primary">{order.id}</td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center text-white text-[10px] font-bold">{order.buyer.charAt(0)}</div>
                          {order.buyer}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-[var(--muted)]">{order.service}</td>
                      <td className="py-3 px-6 font-medium">${order.amount}</td>
                      <td className="py-3 px-6"><span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${statusColors[order.status]}`}>{order.status.replace("_", " ")}</span></td>
                      <td className="py-3 px-6 text-[var(--muted)]">{order.date}</td>
                      <td className="py-3 px-6">
                        <Link href={`/orders/${order.id}`} className="p-1.5 rounded-lg hover:bg-[var(--surface-alt)] transition-colors inline-flex">
                          <Eye className="w-3.5 h-3.5 text-[var(--muted)]" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-[var(--muted)]">No orders match your filters.</div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
