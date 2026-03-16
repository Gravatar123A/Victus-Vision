"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, DollarSign, MessageSquare,
  Settings, Star, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Building2, TrendingUp
} from "lucide-react";
import { earningsData, dashboardStats } from "@/lib/mock-data";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Post a Gig", icon: Briefcase, href: "/dashboard/new-gig" },
  { label: "List Product", icon: Package, href: "/dashboard/new-product" },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings", active: true },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const transactions = [
  { id: "TXN-001", type: "earning", description: "Website Development — John Smith", amount: 299, date: "Mar 10, 2026", status: "completed" },
  { id: "TXN-002", type: "earning", description: "Logo Design — Emily Brown", amount: 129, date: "Mar 9, 2026", status: "completed" },
  { id: "TXN-003", type: "withdrawal", description: "Withdrawal to PayPal", amount: -500, date: "Mar 8, 2026", status: "completed" },
  { id: "TXN-004", type: "earning", description: "Discord Bot — Tom Harris", amount: 149, date: "Mar 8, 2026", status: "completed" },
  { id: "TXN-005", type: "earning", description: "Dashboard Kit — Product Sale", amount: 49, date: "Mar 7, 2026", status: "completed" },
  { id: "TXN-006", type: "earning", description: "Mobile App — Anna White", amount: 499, date: "Mar 7, 2026", status: "pending" },
  { id: "TXN-007", type: "withdrawal", description: "Withdrawal to Bank Account", amount: -1000, date: "Mar 5, 2026", status: "completed" },
  { id: "TXN-008", type: "earning", description: "UI/UX Design — Sam Green", amount: 199, date: "Mar 6, 2026", status: "completed" },
];

export default function DashboardEarningsPage() {
  const [period, setPeriod] = useState("7 months");

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
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

        <div className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-2xl font-display font-bold">Earnings</h1>
            <p className="text-[var(--muted)] text-sm mt-1">Track your revenue and manage payouts.</p>
          </motion.div>

          {/* Earnings Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Earnings", value: `$${dashboardStats.totalEarnings.toLocaleString()}`, icon: DollarSign, change: "+12.5%", up: true, color: "text-success" },
              { label: "This Month", value: `$${dashboardStats.monthlyEarnings.toLocaleString()}`, icon: TrendingUp, change: "+8.3%", up: true, color: "text-primary" },
              { label: "Available Balance", value: "$2,840", icon: Wallet, change: "Ready to withdraw", up: true, color: "text-warning" },
              { label: "Pending", value: "$499", icon: CreditCard, change: "1 order clearing", up: true, color: "text-accent" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="flex items-center gap-0.5 text-xs font-medium text-success">
                    <ArrowUpRight className="w-3 h-3" />{stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Earnings Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold">Earnings Overview</h2>
                <span className="text-xs text-[var(--muted)]">Last {period}</span>
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

            {/* Withdraw */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h2 className="font-display font-semibold mb-4">Withdraw Funds</h2>
              <div className="text-center mb-6">
                <p className="text-xs text-[var(--muted)]">Available Balance</p>
                <p className="text-3xl font-bold gradient-text mt-1">$2,840</p>
              </div>
              <div className="space-y-2 mb-6">
                {[
                  { label: "PayPal", icon: Wallet, info: "alex@email.com" },
                  { label: "Bank Transfer", icon: Building2, info: "****4521" },
                ].map(method => (
                  <div key={method.label} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
                    <method.icon className="w-4 h-4 text-[var(--muted)]" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">{method.label}</p>
                      <p className="text-[10px] text-[var(--muted)]">{method.info}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity">
                Withdraw
              </button>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-color)]">
              <h2 className="font-display font-semibold">Transaction History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Transaction</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Description</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-[var(--muted)]">Date</th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-[var(--muted)]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(txn => (
                    <tr key={txn.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors">
                      <td className="py-3 px-6 font-mono text-xs text-primary">{txn.id}</td>
                      <td className="py-3 px-6 text-[var(--muted)]">
                        <div className="flex items-center gap-2">
                          {txn.type === "earning" ? <ArrowDownRight className="w-3.5 h-3.5 text-success" /> : <ArrowUpRight className="w-3.5 h-3.5 text-danger" />}
                          {txn.description}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-[var(--muted)]">{txn.date}</td>
                      <td className={`py-3 px-6 text-right font-medium ${txn.amount > 0 ? "text-success" : "text-danger"}`}>
                        {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount)}
                      </td>
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
