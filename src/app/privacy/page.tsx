import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-primary">Legal</span>
      </div>
      <h1 className="text-3xl font-display font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-[var(--muted)] mb-8">Last updated: March 1, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email, username, profile information, and payment details. We also collect usage data including pages visited, features used, and interaction patterns to improve our services. Device information such as browser type, operating system, and IP address is collected automatically.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">2. How We Use Your Information</h2>
          <p>Your information is used to provide and improve our services, process transactions, communicate with you about orders and updates, personalize your experience, prevent fraud, and comply with legal obligations. We may also use aggregated, anonymized data for analytics and research purposes.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">3. Information Sharing</h2>
          <p>We do not sell your personal data to third parties. We share information with: payment processors to complete transactions, service providers who assist our operations (under strict data protection agreements), and law enforcement when required by law. Seller profiles and reviews are publicly visible as part of the marketplace functionality.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">4. Data Security</h2>
          <p>We implement industry-standard security measures including SSL/TLS encryption, secure server infrastructure, regular security audits, and access controls. While we strive to protect your data, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You can request a copy of your data, opt out of marketing communications, and delete your account at any time through Settings. For GDPR/CCPA requests, contact us at privacy@victusvision.com.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">6. Data Retention</h2>
          <p>We retain your data for as long as your account is active or as needed to provide services. Transaction records may be retained for legal and accounting purposes. After account deletion, personal data is removed within 30 days, except where retention is required by law.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">7. Contact Us</h2>
          <p>For privacy-related questions or requests, contact our Data Protection Officer at privacy@victusvision.com. We will respond to all legitimate requests within 30 days.</p>
        </section>
      </div>
    </div>
  );
}
