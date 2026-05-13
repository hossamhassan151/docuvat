"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, HardHat, Briefcase,
  Store, Cpu, Building2, Palette, CheckCircle, Zap,
} from "lucide-react";

// --- Carousel Logic (نفس المنطق البرمجي تماماً مع تغيير النصوص) ---

const THEMES = [
  { id: "navy",  name: "Navy & Slate", primary: "#1B2A4A", accent: "#4A6FA5", light: "#EDF2FB" },
  { id: "red",   name: "Modern Red",   primary: "#2C3E50", accent: "#E74C3C", light: "#FEF2F2" },
  { id: "green", name: "UAE Green",    primary: "#006400", accent: "#C9A84C", light: "#F0F7F0" },
];

const SAMPLE_ITEMS = [
  { desc: "Consulting Services",   qty: 3, price: 5000 },
  { desc: "Brand Identity Design", qty: 1, price: 8500 },
  { desc: "Project Management",    qty: 2, price: 3000 },
];

function LiveInvoicePreview({ theme }: { theme: typeof THEMES[0] }) {
  const subtotal = SAMPLE_ITEMS.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;
  const fmt = (n: number) => n.toLocaleString("en-AE", { minimumFractionDigits: 2 }) + " AED";

  return (
    <div style={{ background: "white", fontFamily: "'Segoe UI', sans-serif", fontSize: 9, width: "100%", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})` }} />
      <div style={{ padding: "12px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: theme.primary }}>DOCUVAT LLC</div>
          <div style={{ color: "#888", marginTop: 2, lineHeight: 1.6 }}>Dubai, United Arab Emirates<br />+971 5 123 4567</div>
          <div style={{ marginTop: 4, fontSize: 8, color: theme.accent, fontWeight: 600 }}>TRN: 100234567890003</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: theme.primary }}>TAX INVOICE</div>
          <div style={{ fontSize: 7, color: theme.accent, letterSpacing: 2, marginTop: 2 }}>فاتورة ضريبية</div>
          <div style={{ marginTop: 6, fontSize: 9, fontWeight: 700, color: theme.accent }}>INV-2025-042</div>
          <div style={{ fontSize: 8, color: "#888" }}>Date: 3 May 2025</div>
        </div>
      </div>
      <div style={{ padding: "0 16px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { label: "Billed By — من", name: "DOCUVAT LLC",     addr: "Dubai, UAE" },
          { label: "Client Account — حساب العميل", name: "Al Noor Trading", addr: "Abu Dhabi, UAE" },
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
              {["Description", "Qty", "Unit Price", "Amount"].map((h, i) => (
                <th key={h} style={{ padding: "5px 8px", textAlign: i > 0 ? "right" : "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 7, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
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
          {[["Subtotal", fmt(subtotal)], ["VAT 5%", fmt(vat)]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 8, color: "#555", borderBottom: `0.5px solid ${theme.light}` }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", background: theme.primary, color: "white", borderRadius: 4, padding: "6px 10px", marginTop: 6, fontSize: 9, fontWeight: 800 }}>
            <span>Total AED</span><span style={{ color: theme.accent }}>{fmt(total)}</span>
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
          <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">app.docuvat.com/dashboard/clients</div>
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

interface Review { id: string; rating: number; comment: string; user_name: string; user_role: string; }

const STATIC_REVIEWS: Review[] = [
  { id: "s1", rating: 5, comment: "Finally a UAE management tool that actually works. Clean, fast, and VAT compliant.", user_name: "Ibrahim Moustafa", user_role: "Freelance Consultant, Dubai" },
  { id: "s2", rating: 5, comment: "Saved me hours every week. My clients love the professional portals and invoices.", user_name: "Sara Al Mansoori", user_role: "Marketing Agency, Abu Dhabi" },
  { id: "s3", rating: 5, comment: "Simple and professional dashboard. Exactly what small businesses in the UAE need.", user_name: "Mohammed Al-Zaabi", user_role: "Trading Company, Sharjah" },
];

const INDUSTRIES = [
  { label: "Construction", icon: HardHat },
  { label: "Consulting",   icon: Briefcase },
  { label: "Trading",      icon: Store },
  { label: "Technology",   icon: Cpu },
  { label: "Real Estate",  icon: Building2 },
  { label: "Creative",     icon: Palette },
];

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
          { value: "UAE",           label: "VAT Compliant" },
          { value: "Full",             label: "Management Tools" },
          { value: "Free",          label: "To Start" },
        ].map((s) => (
          <div key={s.label} className="text-center bg-white/3 border border-white/5 rounded-xl py-4 px-2 backdrop-blur-sm">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-1">{s.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Trusted by UAE Professionals</h2>
        <p className="text-slate-400 text-sm">Real feedback from businesses using DOCUVAT</p>
      </div>

      <div className="relative max-w-3xl mx-auto px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
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
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-md">
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
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-6">Trusted across industries</div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div key={ind.label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <Icon className="h-3.5 w-3.5 text-blue-400/70 group-hover:text-blue-400" />
                <span className="text-xs text-slate-400 group-hover:text-slate-200 font-medium">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FreeInvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
                <Zap className="h-4 w-4" /> Professional Business Management & VAT Invoicing
              </div>

              <h1 className="text-5xl font-bold leading-tight md:text-6xl mb-6">
                Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Business Management</span> & VAT Invoicing for UAE
              </h1>

              <p className="text-lg text-slate-300 leading-8 mb-8">
                Docuvat streamlines your client management and business workflow. Organize your customer database and generate FTA-compliant tax invoices in one integrated platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {["No Credit Card", "FTA Compliant", "Client Portals", "CRM Included"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />{badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/invoice" className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-lg shadow-cyan-500/20 transition hover:scale-105 hover:opacity-90">
                  Manage Your Business Free →
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
            <h2 className="text-3xl font-bold mb-3">Why UAE Businesses Choose DOCUVAT</h2>
            <p className="text-slate-400">Built specifically for the UAE market</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "FTA Compliant Invoices",         desc: "Beyond invoicing; keep your business and clients fully aligned with UAE Federal Tax Authority requirements." },
              { title: "Smart Financial Ledger",         desc: "Track every client transaction with automated VAT calculations for businesses in Abu Dhabi, Dubai, and Sharjah." },
              { title: "Unified Document Workflow",      desc: "Manage quotes, LPOs, and invoices. Export professional documents that reflect your complete brand identity." },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/30 transition-colors">
                <h3 className="text-xl font-semibold text-cyan-300 mb-3">{f.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <h2 className="text-3xl font-bold mb-6">Integrated Client Management & Invoicing for UAE Growth</h2>
            <div className="space-y-4 text-slate-300 leading-8">
              <p>As a professional in the UAE, staying compliant with tax regulations is crucial. <strong>DOCUVAT</strong> provides a seamless experience for managing a professional client-base and financial history. Our platform supports various business types, from service providers in Dubai Media City to trading companies in Abu Dhabi.</p>
              <p>By using our business dashboard, you avoid manual errors in VAT calculation and ensure that your company branding remains consistent and professional.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-4xl font-bold mb-10 text-center">Invoicing in the UAE: FAQs</h2>
          <div className="grid gap-6">
            {[
              { q: "Does DOCUVAT support UAE VAT laws?",               a: "Yes, our generator is designed to include all mandatory fields required by the FTA for valid tax invoices." },
              { q: "Is there a limit to how many business documents I can create?", a: "Our free plan allows 1 document per day. Upgrade to Pro for unlimited documents." },
              { q: "Can I customize the currency to AED?",            a: "Absolutely, the tool defaults to AED for UAE businesses but can be adjusted for international clients." },
              { q: "Do I need to sign up to use it?",                 a: "No signup needed to try — set up your client dashboard instantly. Sign up to save your company profile and access history." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
                <h3 className="text-lg font-semibold text-cyan-200 mb-3">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Business Documents?</h2>
            <p className="text-slate-400 mb-2">Join hundreds of UAE professionals using DOCUVAT.</p>
            <p className="text-slate-500 text-sm mb-8">No credit card required · Free plan available · Cancel anytime</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login" className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 font-bold transition hover:scale-105 inline-block shadow-lg shadow-cyan-500/20">
                Get Started Free →
              </Link>
              <Link href="/invoice" className="rounded-2xl border border-white/10 bg-white/5 px-10 py-4 font-semibold transition hover:bg-white/10 inline-block">
                Try Without Signup
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 bg-slate-950/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <div>© 2026 DOCUVAT. All rights reserved.</div>
            <Link href="/blog/uae-vat-law-changes-2026" className="text-cyan-400 hover:text-white transition-colors">VAT Law 2026</Link>
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