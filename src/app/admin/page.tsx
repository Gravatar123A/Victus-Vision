"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Shield, Package, Briefcase, AlertTriangle,
  BarChart3, TrendingUp, DollarSign, UserCheck, UserX, Eye,
  ChevronRight, Search, MoreVertical, Check, X, ArrowUpRight
} from "lucide-react";
import { adminStats, adminUsers } from "@/lib/mock-data";

const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Users", icon: Users, id: "users" },
  { label: "Seller Approvals", icon: UserCheck, id: "sellers" },
  { label: "Products", icon: Package, id: "products" },
  { label: "Services", icon: Briefcase, id: "services" },
  { label: "Disputes", icon: AlertTriangle, id: "disputes" },
  { label: "Analytics", icon: BarChart3, id: "analytics" },
];

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-danger/10 text-danger",
  pending: "bg-warning/10 text-warning",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold">Admin Panel</h2>
            </div>
            <div className="space-y-1">
              {adminNav.map(item => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === item.id ? "bg-primary/10 text-primary" : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-display font-bold mb-1">Admin Dashboard</h1>
                <p className="text-[var(--muted)] text-sm">Platform overview and management.</p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users, change: `+${adminStats.newUsersToday} today`, color: "text-primary" },
                  { label: "Total Revenue", value: `$${(adminStats.totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign, change: "+18.5% this month", color: "text-success" },
                  { label: "Active Orders", value: adminStats.activeOrders.toLocaleString(), icon: TrendingUp, change: "+5.2% this week", color: "text-accent" },
                  { label: "Pending Disputes", value: adminStats.pendingDisputes.toString(), icon: AlertTriangle, change: "Requires attention", color: "text-warning" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><stat.icon className={`w-4 h-4 ${stat.color}`} /></div>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
                    <p className="text-[10px] text-success mt-2 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{stat.change}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Pending Sellers", count: adminStats.pendingSellers, icon: UserCheck, color: "text-warning", tab: "sellers" },
                  { label: "Reported Content", count: adminStats.reportedContent, icon: AlertTriangle, color: "text-danger", tab: "disputes" },
                  { label: "Monthly Revenue", count: `$${(adminStats.monthlyRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: "text-success", tab: "analytics" },
                ].map(action => (
                  <button key={action.label} onClick={() => setActiveTab(action.tab)} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-left hover:border-primary/30 transition-all card-hover">
                    <action.icon className={`w-6 h-6 ${action.color} mb-3`} />
                    <p className="text-2xl font-bold">{action.count}</p>
                    <p className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">{action.label} <ChevronRight className="w-3 h-3" /></p>
                  </button>
                ))}
              </div>

              {/* Revenue Chart */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-display font-semibold mb-4">Platform Revenue</h3>
                <div className="flex items-end gap-3 h-48">
                  {[45, 65, 55, 78, 70, 85, 92, 68, 88, 75, 95, 82].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                      className="flex-1 rounded-lg gradient-bg opacity-80 min-h-[4px]"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[var(--muted)]">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          )}

          {/* Users View */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-display font-bold">User Management</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">User</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Role</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Level</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Status</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Joined</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map(user => (
                      <tr key={user.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0)}</div>
                            <div><p className="font-medium text-sm">{user.name}</p><p className="text-xs text-[var(--muted)]">{user.email}</p></div>
                          </div>
                        </td>
                        <td className="py-3 px-6 capitalize text-[var(--muted)]">{user.role}</td>
                        <td className="py-3 px-6"><span className="text-xs font-medium">{user.level}</span></td>
                        <td className="py-3 px-6"><span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${statusColors[user.status]}`}>{user.status}</span></td>
                        <td className="py-3 px-6 text-[var(--muted)]">{user.joined}</td>
                        <td className="py-3 px-6">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-[var(--surface-alt)] transition-colors"><Eye className="w-3.5 h-3.5 text-[var(--muted)]" /></button>
                            <button className="p-1.5 rounded-lg hover:bg-[var(--surface-alt)] transition-colors"><MoreVertical className="w-3.5 h-3.5 text-[var(--muted)]" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Seller Approvals */}
          {activeTab === "sellers" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-display font-bold">Seller Approvals</h1>
              <div className="space-y-3">
                {[
                  { name: "Ryan Cooper", email: "ryan@email.com", skills: ["React", "Node.js"], portfolio: "3 projects", applied: "2 days ago" },
                  { name: "Amy Zhang", email: "amy@email.com", skills: ["Figma", "UI/UX"], portfolio: "5 projects", applied: "3 days ago" },
                  { name: "Carlos Diaz", email: "carlos@email.com", skills: ["Python", "ML"], portfolio: "2 projects", applied: "5 days ago" },
                ].map(seller => (
                  <div key={seller.email} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold">{seller.name.charAt(0)}</div>
                      <div>
                        <p className="font-medium text-sm">{seller.name}</p>
                        <p className="text-xs text-[var(--muted)]">{seller.email} · Applied {seller.applied}</p>
                        <div className="flex gap-1 mt-1">{seller.skills.map(s => <span key={s} className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] text-[10px]">{s}</span>)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-xl bg-success/10 text-success hover:bg-success/20 transition-colors"><Check className="w-4 h-4" /></button>
                      <button className="p-2 rounded-xl bg-danger/10 text-danger hover:bg-danger/20 transition-colors"><X className="w-4 h-4" /></button>
                      <button className="p-2 rounded-xl bg-[var(--surface-alt)] hover:bg-[var(--border-color)] transition-colors"><Eye className="w-4 h-4 text-[var(--muted)]" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs show placeholder */}
          {!["dashboard", "users", "sellers"].includes(activeTab) && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {adminNav.find(n => n.id === activeTab) && (() => { const Icon = adminNav.find(n => n.id === activeTab)!.icon; return <Icon className="w-7 h-7 text-primary" />; })()}
                </div>
                <h2 className="font-display font-semibold text-lg">{adminNav.find(n => n.id === activeTab)?.label}</h2>
                <p className="text-sm text-[var(--muted)] mt-2">This section will display {activeTab} management tools.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
