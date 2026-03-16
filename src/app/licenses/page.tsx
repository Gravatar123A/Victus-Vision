import { FileText } from "lucide-react";

export default function LicensesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-primary">Legal</span>
      </div>
      <h1 className="text-3xl font-display font-bold mb-2">Licenses</h1>
      <p className="text-sm text-[var(--muted)] mb-8">Last updated: March 1, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Standard License</h2>
          <p>The Standard License grants you a non-exclusive, non-transferable right to use the purchased digital product for a single personal or commercial project. You may modify the product to suit your needs but may not redistribute, resell, or share it as a standalone product. This license covers most individual purchases on our platform.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Extended License</h2>
          <p>The Extended License includes all Standard License rights, plus the ability to use the product in unlimited projects and incorporate it into products offered for sale to end users. This license is required if the end product is sold or distributed. Available as an upgrade option on eligible products.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Custom Service License</h2>
          <p>Work created through custom service orders (freelance services) is subject to the agreement between buyer and seller. By default, full intellectual property rights transfer to the buyer upon successful payment completion. Sellers retain the right to showcase work in their portfolios unless otherwise agreed.</p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Open Source Credits</h2>
          <p>Victus Vision is built with the help of amazing open source projects. We gratefully acknowledge the following:</p>
          <div className="mt-3 space-y-2">
            {[
              { name: "Next.js", license: "MIT License", desc: "React framework for production" },
              { name: "React", license: "MIT License", desc: "JavaScript library for building user interfaces" },
              { name: "Framer Motion", license: "MIT License", desc: "Animation library for React" },
              { name: "Lucide Icons", license: "ISC License", desc: "Beautiful & consistent icon set" },
              { name: "Supabase", license: "Apache 2.0", desc: "Open source Firebase alternative" },
              { name: "TailwindCSS", license: "MIT License", desc: "Utility-first CSS framework" },
            ].map(dep => (
              <div key={dep.name} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)]">
                <div>
                  <p className="font-medium text-[var(--fg)] text-sm">{dep.name}</p>
                  <p className="text-xs">{dep.desc}</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">{dep.license}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <h2 className="text-lg font-display font-semibold text-[var(--fg)] mb-3">Questions?</h2>
          <p>For licensing questions or custom license arrangements, contact us at <a href="mailto:legal@victusvision.com" className="text-primary hover:underline">legal@victusvision.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
