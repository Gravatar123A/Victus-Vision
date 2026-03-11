"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, DollarSign, MessageSquare,
  Settings, Star, TrendingUp, Clock, Users, Eye, ChevronRight, Plus, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { dashboardStats, recentOrders, earningsData } from "@/lib/mock-data";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Post a Gig", icon: Briefcase, href: "/dashboard/new-gig" },
  { label: "List Product", icon: Package, href: "/dashboard/new-product" },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const statusColors: Record<string, string> = {
  in_progress: "bg-blue-500/10 text-blue-400",
  delivered: "bg-amber-500/10 text-amber-400",
  completed: "bg-success/10 text-success",
  revision: "bg-purple-500/10 text-purple-400",
  cancelled: "bg-danger/10 text-danger",
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold">Dashboard</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Welcome back, Alex! Here&apos;s how your business is doing.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/new-product" className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">
                <Plus className="w-4 h-4" /> New Product
              </Link>
              <Link href="/dashboard/new-gig" className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" /> Post a Gig
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Earnings", value: `$${dashboardStats.totalEarnings.toLocaleString()}`, icon: DollarSign, change: "+12.5%", up: true, color: "text-success" },
              { label: "Active Orders", value: dashboardStats.pendingOrders.toString(), icon: ShoppingCart, change: "+3", up: true, color: "text-primary" },
              { label: "Avg Rating", value: "4.9", icon: Star, change: "+0.1", up: true, color: "text-warning" },
              { label: "Response Time", value: dashboardStats.responseTime, icon: Clock, change: "-15min", up: true, color: "text-accent" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="flex items-center gap-0.5 text-xs font-medium text-success">
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts & Orders */}
          <div className="grid lg:grid-cols-5 gap-6 mb-8">
            {/* Earnings Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold">Earnings Overview</h2>
                <span className="text-xs text-[var(--muted)]">Last 7 months</span>
              </div>
              <div className="flex items-end gap-3 h-48">
                {earningsData.map((d, i) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-[var(--muted)]">${(d.amount / 1000).toFixed(1)}k</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.amount / 3600) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                      className="w-full rounded-lg gradient-bg opacity-80 min-h-[4px]"
                    />
                    <span className="text-[10px] text-[var(--muted)]">{d.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h2 className="font-display font-semibold mb-4">Performance</h2>
              <div className="space-y-4">
                {[
                  { label: "Completion Rate", value: `${dashboardStats.completionRate}%`, bar: dashboardStats.completionRate },
                  { label: "Active Services", value: dashboardStats.activeServices.toString(), bar: (dashboardStats.activeServices / 10) * 100 },
                  { label: "Active Products", value: dashboardStats.activeProducts.toString(), bar: (dashboardStats.activeProducts / 10) * 100 },
                  { label: "Total Orders", value: dashboardStats.totalOrders.toString(), bar: 89 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--muted)]">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--surface-alt)]">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.bar}%` }} transition={{ delay: 0.4, duration: 0.8 }} className="h-full rounded-full gradient-bg" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-[var(--border-color)]">
              <h2 className="font-display font-semibold">Recent Orders</h2>
              <Link href="/dashboard/orders" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
            </div>
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
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors">
                      <td className="py-3 px-6 font-mono text-xs text-primary">{order.id}</td>
                      <td className="py-3 px-6">{order.buyer}</td>
                      <td className="py-3 px-6 text-[var(--muted)]">{order.service}</td>
                      <td className="py-3 px-6 font-medium">${order.amount}</td>
                      <td className="py-3 px-6"><span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${statusColors[order.status]}`}>{order.status.replace("_", " ")}</span></td>
                      <td className="py-3 px-6 text-[var(--muted)]">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
