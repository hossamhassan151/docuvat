"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, HardHat, Briefcase,
  Store, Cpu, Building2, Palette, CheckCircle, Zap,
} from "lucide-react";

// --- Theme Config (Saudi Identity) ---
const THEMES = [
  { id: "navy",  name: "Navy Classic", primary: "#1B2A4A", accent: "#4A6FA5", light: "#EDF2FB" },
  { id: "red",   name: "Modern Red",   primary: "#2C3E50", accent: "#E74C3C", light: "#FEF2F2" },
  { id: "green", name: "Saudi Green",  primary: "#006C35", accent: "#D4AF37", light: "#F0F9F4" },
];

const SAMPLE_ITEMS = [
  { desc: "Technical Consulting",   qty: 3, price: 5000 },
  { desc: "Brand Identity Design", qty: 1, price: 8500 },
  { desc: "Project Management",    qty: 2, price: 3000 },
];

interface Review { id: string; rating: number; comment: string; user_name: string; user_role: string; }

const INDUSTRIES = [
  { label: "Construction", icon: HardHat },
  { label: "Consulting",   icon: Briefcase },
  { label: "Retail",       icon: Store },
  { label: "Technology",   icon: Cpu },
  { label: "Real Estate",  icon: Building2 },
  { label: "Creative",     icon: Palette },
];

const STATIC_REVIEWS: Review[] = [
  { id: "s1", rating: 5, comment: "Best e-invoicing tool for KSA. Fully compliant with ZATCA requirements.", user_name: "Ahmed Al-Shehri", user_role: "Business Consultant, Riyadh" },
  { id: "s2", rating: 5, comment: "Saved me hours of work managing clients and issuing technical quotations.", user_name: "Noura Al-Qahtani", user_role: "Marketing Agency, Jeddah" },
  { id: "s3", rating: 5, comment: "Professional dashboard and simple interface. Exactly what SMEs need in Saudi Arabia.", user_name: "Abdulaziz Al-Fahad", user_role: "Trading Co, Dammam" },
];

function LiveInvoicePreview({ theme }: { theme: typeof THEMES[0] }) {
  const subtotal = SAMPLE_ITEMS.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = subtotal * 0.15; // KSA 15% VAT
  const total = subtotal + vat;
  const fmt = (n: number) => n.toLocaleString("en-SA", { minimumFractionDigits: 2 }) + " SAR";

  return (
    <div style={{ background: "white", fontFamily: "'Segoe UI', sans-serif", fontSize: 9, width: "100%", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})` }} />
      <div style={{ padding: "12px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.primary }}>DOCUVAT SAUDI</div>
          <div style={{ color: "#888", marginTop: 2, lineHeight: 1.6 }}>Riyadh, Saudi Arabia<br />+966 50 123 4567</div>
          <div style={{ marginTop: 4, fontSize: 8, color: theme.accent, fontWeight: 600 }}>VAT No: 310234567890003</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: theme.primary }}>TAX INVOICE</div>
          <div style={{ fontSize: 7, color: theme.accent, letterSpacing: 2, marginTop: 2 }}>فاتورة ضريبية</div>
          <div style={{ marginTop: 6, fontSize: 9, fontWeight: 700, color: theme.accent }}>INV-SA-2025-098</div>
          <div style={{ fontSize: 8, color: "#888" }}>Date: 15 June 2025</div>
        </div>
      </div>
      <div style={{ padding: "0 16px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { label: "Billed By", name: "DOCUVAT SAUDI", addr: "Riyadh, KSA" },
          { label: "Client Account", name: "Al-Noor Trading Est.", addr: "Jeddah, KSA" },
        ].map((c) => (
          <div key={c.label} style={{ background: theme.light, borderRadius: 6, padding: "8px 10px", borderLeft: `2px solid ${theme.accent}` }}>
            <div style={{ fontSize: 6, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontWeight: 700, color: theme.primary }}>{c.name}</div>
            <div style={{ color: "#666", fontSize: 8 }}>{c.addr}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 8 }}>
          <thead>
            <tr style={{ background: theme.primary }}>
              {["Description", "Qty", "Price", "Amount"].map((h, i) => (
                <th key={h} style={{ padding: "5px 8px", textAlign: i > 0 ? "right" : "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 7 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ITEMS.map((item, i) => (
              <tr key={i} style={{ background: i % 2 === 1 ? theme.light : "white", borderBottom: `0.5px solid ${theme.light}` }}>
                <td style={{ padding: "5px 8px", color: theme.primary }}>{item.desc}</td>
                <td style={{ padding: "5px 8px", textAlign: "right", color: "#555" }}>{item.qty}</td>
                <td style={{ padding: "5px 8px", textAlign: "right", color: "#555" }}>{fmt(item.price)}</td>
                <td style={{ padding: "5px 8px", textAlign: "right", fontWeight: 700, color: theme.accent }}>{fmt(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "8px 16px 12px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ minWidth: 160 }}>
          {[["Subtotal", fmt(subtotal)], ["VAT 15%", fmt(vat)]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 8, color: "#555", borderBottom: `0.5px solid ${theme.light}` }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", background: theme.primary, color: "white", borderRadius: 4, padding: "6px 10px", marginTop: 6, fontSize: 9, fontWeight: 800 }}>
            <span>Total SAR</span><span style={{ color: theme.accent }}>{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % THEMES.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">app.docuvat.com/sa/dashboard</div>
        </div>
        <div className="bg-slate-100 p-4">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <LiveInvoicePreview theme={THEMES[active]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        {THEMES.map((t, i) => (
          <button key={t.id} onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all ${active === i ? "border-white/40 bg-white/15 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:text-white"}`}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.primary, display: "inline-block", border: "1.5px solid rgba(255,255,255,0.3)" }} />
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function SocialProof() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [totalDocs, setTotalDocs] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("reviews").select("id,rating,comment,user_name,user_role").eq("approved", true).order("created_at", { ascending: false }).limit(12);
      if (data && data.length > 0) setReviews([...data, ...STATIC_REVIEWS]);
      const { count } = await supabase.from("documents").select("id", { count: "exact", head: true });
      if (count && count > 0) setTotalDocs(500 + count);
    };
    load();
  }, []);

  const next = useCallback(() => setCurrentIndex((p) => (p + 1) % reviews.length), [reviews.length]);
  const prev = useCallback(() => setCurrentIndex((p) => (p - 1 + reviews.length) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (isPaused || reviews.length <= 1) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, isPaused, reviews.length]);

  return (
    <section className="py-16 border-t border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
        {[
          { value: `${totalDocs}+`, label: "Records Managed" },
          { value: "ZATCA",         label: "Fully Compliant" },
          { value: "Unified",       label: "Management Hub" },
          { value: "Free",          label: "Trial Period" },
        ].map((s) => (
          <div key={s.label} className="text-center bg-white/3 border border-white/5 rounded-xl py-4 px-2 backdrop-blur-sm">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">{s.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Trusted by KSA Professionals</h2>
        <p className="text-slate-400 text-sm">Real feedback from Saudi-based businesses</p>
      </div>

      <div className="relative max-w-3xl mx-auto px-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="overflow-hidden min-h-[220px] md:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full flex justify-center">
              <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-center shadow-xl relative">
                <div className="absolute top-4 left-6 text-5xl text-white/5 font-serif">"</div>
                <div className="flex justify-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={star <= reviews[currentIndex].rating ? "text-yellow-400 text-lg" : "text-slate-700 text-lg"}>★</span>
                  ))}
                </div>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6 italic">"{reviews[currentIndex].comment}"</p>
                <div className="flex items-center justify-center gap-3 border-t border-white/5 pt-4 max-w-sm mx-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-md">
                    {reviews[currentIndex].user_name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm">{reviews[currentIndex].user_name}</div>
                    <div className="text-xs text-slate-400">{reviews[currentIndex].user_role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={prev} className="p-1.5 rounded-full border border-white/5 bg-white/3 hover:bg-white/10 text-slate-400 hover:text-white transition-all"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} className={`h-1 rounded-full transition-all duration-300 ${currentIndex === i ? "w-5 bg-emerald-500" : "w-1 bg-white/10"}`} />
            ))}
          </div>
          <button onClick={next} className="p-1.5 rounded-full border border-white/5 bg-white/3 hover:bg-white/10 text-slate-400 hover:text-white transition-all"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-6">Solutions for every sector</div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div key={ind.label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <Icon className="h-3.5 w-3.5 text-emerald-400/70 group-hover:text-emerald-400" />
                <span className="text-xs text-slate-400 group-hover:text-slate-200 font-medium">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function SaudiInvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_30%)]" />

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                <Zap className="h-4 w-4" /> Fully ZATCA Phase 1 & 2 Compliant
              </div>

              <h1 className="text-5xl font-bold leading-tight md:text-6xl mb-6 text-left">
                Integrated <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Business Hub</span> & E-Invoicing for KSA
              </h1>

              <p className="text-lg text-slate-300 leading-8 mb-8 text-left">
                Docuvat centralizes your client database and business workflow. Generate ZATCA-compliant tax invoices and manage your customer lifecycle in one powerful dashboard.
              </p>

              <div className="flex flex-wrap gap-3 mb-10 justify-start">
                {["No Credit Card", "ZATCA Ready", "Client Portals", "CRM Features"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />{badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/invoice" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-4 font-semibold shadow-lg shadow-emerald-500/20 transition hover:scale-105 hover:opacity-90">
                  Manage Business Free →
                </Link>
                <Link href="/pricing" className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10">
                  View Pricing
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <InvoiceCarousel />
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6">
          <SocialProof />
        </div>

        {/* ── FEATURES ── */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Saudi Enterprises Choose DOCUVAT</h2>
            <p className="text-slate-400">Built for the Kingdom's regulatory ecosystem</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "ZATCA Certified E-Invoicing", desc: "Ensure your business stays compliant with latest Phase 2 integration standards and QR requirements." },
              { title: "Financial Ledger Sync", desc: "Track every client transaction with automated 15% VAT calculation tailored for Saudi Arabia's fiscal laws." },
              { title: "Unified Document Cycle", desc: "Manage quotations, LPOs, and tax invoices in a professional workflow that enhances your brand equity." },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-emerald-400/30 transition-colors">
                <h3 className="text-xl font-semibold text-emerald-300 mb-3">{f.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <h2 className="text-3xl font-bold mb-6">Scalable Client Management & E-Invoicing for KSA</h2>
            <div className="space-y-4 text-slate-300 leading-8">
              <p>For businesses in Saudi Arabia, tax compliance is non-negotiable. <strong>DOCUVAT</strong> offers a robust environment for managing your customer database and financial history seamlessly. Our platform serves everything from startups in Riyadh to established enterprises in Jeddah and Dammam.</p>
              <p>By leveraging our unified dashboard, you eliminate manual tax errors and maintain a high standard of professional appearance across all outgoing client communications.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-4xl font-bold mb-10 text-center">Saudi E-Invoicing: FAQ</h2>
          <div className="grid gap-6">
            {[
              { q: "Is DOCUVAT fully compatible with ZATCA regulations?", a: "Yes, our system is built to adhere to both Phase 1 and Phase 2 technical requirements of the Saudi tax authority." },
              { q: "Is there a document generation limit?", a: "The free tier is ideal for small operations. Upgrading to Pro unlocks unlimited documents for high-volume businesses." },
              { q: "Can I customize VAT rates for GCC exports?", a: "Yes, while 15% is the standard KSA rate, you can adjust settings for zero-rated or exempt transactions." },
              { q: "Do I need to sign up to start?", a: "You can preview the interface immediately, but a full account is required to securely store client data and financial history." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
                <h3 className="text-lg font-semibold text-emerald-200 mb-3">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Empower Your Business Documents Today</h2>
            <p className="text-slate-400 mb-8">Join the elite group of Saudi professionals using DOCUVAT.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 px-10 py-4 font-bold transition hover:scale-105 inline-block shadow-lg shadow-emerald-500/20">
                Get Started Free →
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 bg-slate-950/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <div>© 2026 DOCUVAT SAUDI. All rights reserved.</div>
            <div className="flex gap-6 border border-white/5 bg-white/3 rounded-full px-5 py-2">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}