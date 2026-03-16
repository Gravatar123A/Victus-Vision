import { Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-2">
        <Scale className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-primary">Legal</span>
      </div>
      <h1 className="text-3xl font-display font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-[var(--muted)] mb-8">Last updated: March 1, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using Victus Vision (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including buyers, sellers, and visitors.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">2. Account Registration</h2>
          <p>You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration and to keep your account information updated.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">3. Marketplace Rules</h2>
          <p>Sellers must accurately describe their services and products. Buyers must provide clear requirements for custom orders. All users must communicate respectfully. Prohibited activities include fraud, spam, intellectual property violations, and any illegal activities. Violations may result in account suspension or termination.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">4. Payments & Fees</h2>
          <p>Victus Vision charges a 10% service fee on all transactions. Payments are processed through secure third-party payment processors. Sellers receive their earnings after a 14-day clearing period. Refunds are handled through our dispute resolution process.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">5. Intellectual Property</h2>
          <p>Sellers retain ownership of their original work until payment is completed. Upon successful completion and payment, intellectual property rights transfer to the buyer as specified in the order agreement. Sellers must not infringe on third-party intellectual property rights.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">6. Dispute Resolution</h2>
          <p>Disputes between buyers and sellers are mediated by our resolution team. Both parties may submit evidence and arguments. Decisions are made within 48 hours and are binding. Appeals may be submitted within 7 days of the initial decision.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">7. Limitation of Liability</h2>
          <p>Victus Vision provides the platform &quot;as is&quot; and does not guarantee uninterrupted service. We are not liable for any indirect, incidental, or consequential damages. Our total liability is limited to the fees paid by you in the 12 months preceding the claim.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">8. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Significant changes will be communicated via email or platform notification. Continued use of the platform after changes constitutes acceptance of the modified terms.</p>
        </section>
      </div>
    </div>
  );
}
