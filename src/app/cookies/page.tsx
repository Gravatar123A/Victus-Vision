import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-2">
        <Cookie className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-primary">Legal</span>
      </div>
      <h1 className="text-3xl font-display font-bold mb-2">Cookie Policy</h1>
      <p className="text-sm text-[var(--muted)] mb-8">Last updated: March 1, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">What Are Cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences, keeping you signed in, and understanding how you use our platform.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Essential Cookies</h2>
          <p>These cookies are necessary for the platform to function properly. They include authentication cookies that keep you signed in, security cookies that protect against fraud, and session cookies that maintain your browsing state. These cannot be disabled.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Functional Cookies</h2>
          <p>These cookies remember your preferences such as language, theme (dark/light mode), and notification settings. They enhance your experience but are not strictly necessary for the platform to operate.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Analytics Cookies</h2>
          <p>We use analytics cookies to understand how visitors interact with our platform. This helps us improve our services, identify popular features, and fix issues. All analytics data is anonymized and aggregated. We use privacy-respecting analytics tools that comply with GDPR.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Managing Cookies</h2>
          <p>You can manage cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may prevent the platform from functioning properly. You can also update your preferences through the cookie banner displayed on your first visit.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Third-Party Cookies</h2>
          <p>Some third-party services integrated into our platform may set their own cookies. These include payment processors (Stripe) and authentication providers (Google, GitHub). These services have their own cookie policies, which we encourage you to review.</p>
        </section>
      </div>
    </div>
  );
}
