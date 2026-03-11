"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Package, Tag, DollarSign, FileText, AlertCircle, Loader2, CheckCircle2, Link2 } from "lucide-react";
import Link from "next/link";

const productCategories = [
  "Plugins", "Scripts", "Templates", "Themes", "Tools & Utilities",
  "Apps", "Bots", "Assets", "Configs", "APIs", "Libraries", "Other",
];

export default function NewProductPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 8) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          categoryId: category,
          tags,
          fileUrl: fileUrl || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create product");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-8 text-center" style={{ boxShadow: "var(--shadow-lg)" }}>
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Product Listed! 🎉</h1>
          <p className="text-sm text-[var(--muted)]">&quot;{title}&quot; is now live on the marketplace.</p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/products" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">
              View Products
            </Link>
            <button onClick={() => { setSuccess(false); setStep(1); setTitle(""); setDescription(""); setCategory(""); setPrice(""); setFileUrl(""); setTags([]); }} className="px-5 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
              List Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--fg)] mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-2xl font-display font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Package className="w-5 h-5 text-white" /></div>
            List a New Product
          </h1>
          <p className="text-sm text-[var(--muted)] mt-2">Sell your digital products — plugins, scripts, templates, and more</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? "gradient-bg" : "bg-[var(--border-color)]"}`} />
          ))}
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </motion.div>
        )}

        <div className="glass rounded-3xl p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          {/* Step 1: Basics */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h2 className="font-display font-semibold text-lg">Product Information</h2>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Product Name *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Premium Discord Bot — Moderation & Music" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" maxLength={120} />
                <p className="text-[10px] text-[var(--muted)] mt-1">{title.length}/120 characters</p>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Category *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {productCategories.map((cat) => (
                    <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${category === cat ? "border-primary bg-primary/10 text-primary" : "border-[var(--border-color)] text-[var(--muted)] hover:border-primary/30"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Description *</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your product: features, requirements, what's included..." rows={5} className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors resize-none" maxLength={3000} />
                <p className="text-[10px] text-[var(--muted)] mt-1">{description.length}/3000 characters</p>
              </div>
              <button onClick={() => { if (title && category && description) setStep(2); else setError("Please fill in all required fields"); }} className="w-full py-3 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Next: Pricing & Files <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Pricing & Tags */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h2 className="font-display font-semibold text-lg">Pricing & Files</h2>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block flex items-center gap-1"><DollarSign className="w-3 h-3" /> Price (USD) *</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="9.99" min="0" step="0.01" className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                <p className="text-[10px] text-[var(--muted)] mt-1">Set to 0 for a free product</p>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block flex items-center gap-1"><Link2 className="w-3 h-3" /> File / Download URL</label>
                <input type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://github.com/your-repo or https://drive.google.com/..." className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                <p className="text-[10px] text-[var(--muted)] mt-1">Link to your product file (GitHub, Google Drive, etc.)</p>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block flex items-center gap-1"><Tag className="w-3 h-3" /> Tags (up to 8)</label>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="e.g. Discord, Python, Open Source" className="flex-1 px-4 py-2 rounded-xl text-sm bg-[var(--surface)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors" />
                  <button onClick={addTag} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Add</button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-danger">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">Back</button>
                <button onClick={() => { if (price !== "") setStep(3); else setError("Please set a price"); }} className="flex-1 py-3 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Next: Review <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h2 className="font-display font-semibold text-lg">Review & Publish</h2>
              <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div><p className="text-xs text-[var(--muted)]">Product Name</p><p className="text-sm font-medium">{title}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div><p className="text-xs text-[var(--muted)]">Category</p><p className="text-sm font-medium">{category}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div><p className="text-xs text-[var(--muted)]">Price</p><p className="text-sm font-medium">{parseFloat(price) === 0 ? "Free" : `$${parseFloat(price).toFixed(2)}`}</p></div>
                </div>
                {fileUrl && (
                  <div className="flex items-start gap-3">
                    <Link2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div><p className="text-xs text-[var(--muted)]">File URL</p><p className="text-sm font-medium truncate max-w-md">{fileUrl}</p></div>
                  </div>
                )}
                {tags.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">{tags.map((t) => <span key={t} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{t}</span>)}</div>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs text-[var(--muted)] mb-1">Description</p>
                  <p className="text-sm text-[var(--muted)] whitespace-pre-line">{description}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-primary/30 transition-colors">Back</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 rounded-xl text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Publish Product</>}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
