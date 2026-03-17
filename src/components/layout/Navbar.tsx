"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import { useAuth } from "@/lib/auth-context";
import {
  Search, Menu, X, Sun, Moon, Bell, MessageSquare, User, ChevronDown, 
  ShoppingBag, Briefcase, LayoutDashboard, Shield, LogIn, UserPlus,
  Heart, Settings, LogOut, Loader2
} from "lucide-react";

const navLinks = [
  { label: "Services", href: "/freelance", icon: Briefcase },
  { label: "Products", href: "/products", icon: ShoppingBag },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isLoggedIn = !!user;
  const displayName = profile?.fullName || profile?.username || user?.email?.split("@")[0] || "User";
  const displayInitial = displayName.charAt(0).toUpperCase();
  const username = profile?.username || user?.id?.slice(0, 8) || "user";

  const handleSignOut = async () => {
    setProfileOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
        style={{
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
                Victus<span className="gradient-text">Vision</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Search services, products, freelancers..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-[var(--muted)]"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
              >
                <Search className="w-5 h-5 text-[var(--muted)]" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-[var(--muted)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--muted)]" />
                )}
              </button>

              {loading ? (
                <div className="p-2">
                  <Loader2 className="w-5 h-5 text-[var(--muted)] animate-spin" />
                </div>
              ) : isLoggedIn ? (
                <>
                  {/* Messages */}
                  <Link
                    href="/messages"
                    className="p-2 rounded-xl hover:bg-[var(--surface)] transition-colors relative"
                  >
                    <MessageSquare className="w-5 h-5 text-[var(--muted)]" />
                  </Link>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                      className="p-2 rounded-xl hover:bg-[var(--surface)] transition-colors relative"
                    >
                      <Bell className="w-5 h-5 text-[var(--muted)]" />
                    </button>
                    <AnimatePresence>
                      {notifOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-12 w-80 glass rounded-2xl overflow-hidden"
                          style={{ boxShadow: "var(--shadow-lg)" }}
                        >
                          <div className="p-4 border-b border-[var(--border-color)]">
                            <h3 className="font-semibold text-sm">Notifications</h3>
                          </div>
                          <div className="p-6 text-center text-sm text-[var(--muted)]">
                            No new notifications
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                      className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--surface)] transition-colors"
                    >
                      {profile?.avatarUrl ? (
                        <img src={profile.avatarUrl} alt="" className="w-7 h-7 rounded-lg object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">
                          {displayInitial}
                        </div>
                      )}
                      <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)] hidden sm:block" />
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-12 w-56 glass rounded-2xl overflow-hidden"
                          style={{ boxShadow: "var(--shadow-lg)" }}
                        >
                          <div className="p-4 border-b border-[var(--border-color)]">
                            <p className="font-semibold text-sm truncate">{displayName}</p>
                            <p className="text-xs text-[var(--muted)] truncate">@{username}</p>
                          </div>
                          <div className="p-2">
                            {[
                              { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
                              { label: "My Profile", icon: User, href: `/profile/${username}` },
                              { label: "Favorites", icon: Heart, href: "/favorites" },
                              { label: "Settings", icon: Settings, href: "/dashboard/settings" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-[var(--surface)] transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-[var(--muted)]" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="p-2 border-t border-[var(--border-color)]">
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-[var(--surface)] transition-colors w-full text-danger"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white gradient-bg hover:opacity-90 transition-opacity"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[var(--border-color)] overflow-hidden"
            >
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-strong"
              style={{ background: "var(--bg)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pt-20 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors"
                  >
                    <link.icon className="w-5 h-5 text-[var(--muted)]" />
                    {link.label}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors">
                      <LayoutDashboard className="w-5 h-5 text-[var(--muted)]" />
                      Dashboard
                    </Link>
                    <Link href="/messages" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors">
                      <MessageSquare className="w-5 h-5 text-[var(--muted)]" />
                      Messages
                    </Link>
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors w-full text-danger">
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--surface)] transition-colors">
                      <LogIn className="w-5 h-5 text-[var(--muted)]" />
                      Sign In
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium gradient-bg text-white rounded-xl text-center justify-center">
                      <UserPlus className="w-5 h-5" />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
