import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Browse Freelancers", href: "/freelance" },
    { label: "Digital Products", href: "/products" },
    { label: "Find Freelancers", href: "/freelancers" },
    { label: "Become a Seller", href: "/become-seller" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Trust & Safety", href: "/trust" },
    { label: "Contact Us", href: "/contact" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Licenses", href: "/licenses" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="py-12">
          <div className="gradient-bg rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                Ready to get started?
              </h3>
              <p className="text-white/80 mt-2 text-sm md:text-base">
                Join thousands of creators and businesses on Victus Vision.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/signup"
                className="px-6 py-3 bg-white text-primary-dark rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Get Started Free
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-[var(--border-color)]">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="text-sm text-[var(--muted)]">
              © 2026 Victus Vision. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {["Twitter", "Discord", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
