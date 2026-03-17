"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, DollarSign, MessageSquare,
  Settings, Star, User, Mail, Lock, Bell, Globe, Eye, EyeOff, Camera, Shield, Trash2
} from "lucide-react";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Post a Service", icon: Briefcase, href: "/dashboard/new-gig" },
  { label: "List Product", icon: Package, href: "/dashboard/new-product" },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", active: true },
];

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "account", label: "Account", icon: Shield },
];

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

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
            <h1 className="text-2xl font-display font-bold">Settings</h1>
            <p className="text-[var(--muted)] text-sm mt-1">Manage your account preferences.</p>
          </motion.div>

          {/* Settings Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
            {settingsTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "gradient-bg text-white" : "bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30"}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Avatar */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-sm mb-4">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold">A</div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Chen</p>
                    <p className="text-xs text-[var(--muted)]">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-sm mb-4">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Full Name</label>
                    <input type="text" defaultValue="Alex Chen" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Username</label>
                    <input type="text" defaultValue="alexchen" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Email</label>
                    <input type="email" defaultValue="alex@email.com" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Location</label>
                    <input type="text" defaultValue="San Francisco, CA" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Professional Title</label>
                    <input type="text" defaultValue="Full-Stack Developer & Digital Creator" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Bio</label>
                    <textarea defaultValue="Passionate full-stack developer with 8+ years of experience building modern web applications." rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors resize-none" />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity">Save Changes</button>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
              <h3 className="font-semibold text-sm mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "New order received", desc: "Get notified when a buyer places an order", enabled: true },
                  { label: "Order updates", desc: "Status changes on your active orders", enabled: true },
                  { label: "New messages", desc: "When someone sends you a message", enabled: true },
                  { label: "New reviews", desc: "When a buyer leaves a review", enabled: true },
                  { label: "Product sales", desc: "When someone purchases your digital product", enabled: true },
                  { label: "Marketing emails", desc: "Tips, promotions, and platform updates", enabled: false },
                  { label: "Weekly summary", desc: "Weekly earnings and performance report", enabled: true },
                ].map(pref => (
                  <div key={pref.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)]">
                    <div>
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-xs text-[var(--muted)]">{pref.desc}</p>
                    </div>
                    <button className={`w-10 h-6 rounded-full transition-colors relative ${pref.enabled ? "bg-primary" : "bg-[var(--border-color)]"}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${pref.enabled ? "left-[18px]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-sm mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity">Update Password</button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-sm mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-[var(--muted)] mb-4">Add an extra layer of security to your account.</p>
                <button className="px-6 py-2.5 rounded-xl text-sm font-medium border border-[var(--border-color)] hover:border-primary/30 transition-colors">Enable 2FA</button>
              </div>
            </motion.div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
                <h3 className="font-semibold text-sm mb-4">Connected Accounts</h3>
                <div className="space-y-3">
                  {[
                    { name: "Google", connected: true, email: "alex@gmail.com" },
                    { name: "GitHub", connected: true, email: "@alexchen" },
                    { name: "Discord", connected: false, email: "" },
                  ].map(acc => (
                    <div key={acc.name} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)]">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-[var(--muted)]" />
                        <div>
                          <p className="text-sm font-medium">{acc.name}</p>
                          {acc.connected && <p className="text-xs text-[var(--muted)]">{acc.email}</p>}
                        </div>
                      </div>
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${acc.connected ? "bg-success/10 text-success" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                        {acc.connected ? "Connected" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-danger/5 border border-danger/20">
                <h3 className="font-semibold text-sm text-danger mb-2 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</h3>
                <p className="text-sm text-[var(--muted)] mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-danger border border-danger/20 hover:bg-danger/10 transition-colors">Delete Account</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
