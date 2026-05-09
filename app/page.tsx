"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Receipt,
  ShoppingCart,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  HardHat,
  Briefcase,
  Store,
  Cpu,
  Building2,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function AuthButtons() {
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user);
    });
  }, []);

  if (loggedIn) {
    return (
      <Link href="/dashboard">
        <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-sm">
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-3">
      <Link href="/login">
        <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm">
          Login
        </Button>
      </Link>
      <Link href="/login">
        <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-sm">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

// ─── Minimal live invoice preview ────────────────────────────────────────────

const THEMES = [
  { id: "navy", name: "Navy & Slate", primary: "#1B2A4A", accent: "#4A6FA5", light: "#EDF2FB" },
  { id: "red", name: "Modern Red", primary: "#2C3E50", accent: "#E74C3C", light: "#FEF2F2" },
  { id: "green", name: "UAE Green", primary: "#006400", accent: "#C9A84C", light: "#F0F7F0" },
];

const SAMPLE_ITEMS = [
  { desc: "Consulting Services", qty: 3, price: 5000 },
  { desc: "Brand Identity Design", qty: 1, price: 8500 },
  { desc: "Project Management", qty: 2, price: 3000 },
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
          <div style={{ fontSize: 14, fontWeight: 900, color: theme.primary, lineHeight: 1 }}>TAX INVOICE</div>
          <div style={{ fontSize: 7, color: theme.accent, letterSpacing: 2, marginTop: 2 }}>فاتورة ضريبية</div>
          <div style={{ marginTop: 6, fontSize: 9, fontWeight: 700, color: theme.accent }}>INV-2025-042</div>
          <div style={{ fontSize: 8, color: "#888" }}>Date: 3 May 2025</div>
        </div>
      </div>
      <div style={{ padding: "0 16px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ label: "Billed By — من", name: "DOCUVAT LLC", addr: "Dubai, UAE" }, { label: "Billed To — إلى", name: "Al Noor Trading", addr: "Abu Dhabi, UAE" }].map((c) => (
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

  // تحديث تلقائي كل 3 ثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % THEMES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" /><div className="w-3 h-3 rounded-full bg-yellow-500/70" /><div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">app.docuvat.com/invoice</div>
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
          <button key={t.id} onClick={() => setActive(i)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all ${active === i ? "border-white/40 bg-white/15 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20"}`}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.primary, display: "inline-block", border: "1.5px solid rgba(255,255,255,0.3)" }} />{t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Social Proof Section (Modified with Autoplay & Sleek Icons) ───────────────────────────────

interface Review {
  id: string;
  rating: number;
  comment: string;
  user_name: string;
  user_role: string;
}

const STATIC_REVIEWS: Review[] = [
  { id: "s1", rating: 5, comment: "Finally a UAE invoice tool that actually works. Clean, fast, and VAT compliant.", user_name: "Ibrahim Moustafa", user_role: "Freelance Consultant, Dubai" },
  { id: "s2", rating: 5, comment: "Saved me hours every week. My clients love how professional the invoices look.", user_name: "Sara", user_role: "Marketing Agency, Abu Dhabi" },
  { id: "s3", rating: 5, comment: "Simple and professional. Exactly what small businesses in the UAE need.", user_name: "Mohammed Al-Zaabi", user_role: "Trading Company, Sharjah" },
];

const INDUSTRIES = [
  { label: "Construction", icon: HardHat },
  { label: "Consulting", icon: Briefcase },
  { label: "Trading", icon: Store },
  { label: "Technology", icon: Cpu },
  { label: "Real Estate", icon: Building2 },
  { label: "Creative", icon: Palette },
];

const AUTOPLAY_INTERVAL = 5000;

function SocialProof() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [totalDocs, setTotalDocs] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, rating, comment, user_name, user_role")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(12);

      if (data && data.length > 0) {
        setReviews([...data, ...STATIC_REVIEWS]);
      }

      const { count } = await supabase.from("documents").select("id", { count: "exact", head: true });
      if (count && count > 0) setTotalDocs(500 + count);
    };
    load();
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (isPaused || reviews.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused, reviews.length]);

  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
        {[
          { value: `${totalDocs}+`, label: "Documents Created" },
          { value: "UAE", label: "VAT Compliant" },
          { value: "3", label: "Document Types" },
          { value: "Free", label: "To Start" },
        ].map((s) => (
          <div key={s.label} className="text-center bg-white/3 border border-white/5 rounded-xl py-4 px-2 backdrop-blur-sm">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-1">{s.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">Trusted by UAE Professionals</h2>
        <p className="text-slate-400 text-sm">Real feedback from businesses using DOCUVAT</p>
      </div>

      <div 
        className="relative max-w-3xl mx-auto px-4 z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden min-h-[220px] md:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-center relative shadow-xl">
                <div className="absolute top-4 left-6 text-5xl text-white/5 font-serif">“</div>
                <div className="flex justify-center gap-1 mb-4 relative z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= reviews[currentIndex].rating ? "text-yellow-400 text-lg" : "text-slate-700 text-lg"}>★</span>
                  ))}
                </div>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6 italic">
                  "{reviews[currentIndex].comment}"
                </p>
                <div className="flex items-center justify-center gap-3 border-t border-white/5 pt-4 mt-2 max-w-sm mx-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-base font-bold text-white shadow-md">
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

// ─── Main Page ────────────────────────────────────────────────────────────────

const documents = [
  { title: "Invoice Builder", description: "Professional VAT invoices in seconds with elegant templates.", icon: Receipt, href: "/invoice" },
  { title: "Quotation Builder", description: "Polished quotations with automatic totals and VAT calculations.", icon: FileText, href: "/quotation" },
  { title: "LPO Builder", description: "Purchase orders for suppliers with a consistent brand identity.", icon: ShoppingCart, href: "/lpo" },
];

const features = [
  { icon: Shield, title: "Secure", text: "Your documents and business data are fully protected." },
  { icon: Zap, title: "Fast", text: "Generate polished documents in under a minute." },
  { icon: Sparkles, title: "Professional", text: "Designed to impress clients and close deals faster." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-xl">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">DOCUVAT</div>
                <div className="text-xs text-slate-400">Smart Business Documents</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">About</Link>
              <Link href="/pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</Link>
            </nav>
            <AuthButtons />
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6">
          <section className="py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 text-sm text-slate-200">
                <Zap className="h-4 w-4 text-emerald-400" /> UAE VAT Compliant
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Professional Documents <br />
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Built for UAE Business</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Create invoices, quotations, and purchase orders in seconds. VAT-ready, TRN-compliant, and beautifully designed.
              </p>
              <div className="flex justify-center gap-4 mb-16">
                <Link href="/invoice"><Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 px-8 py-6 text-lg rounded-xl shadow-lg">Try Free <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link href="/pricing"><Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">Pricing</Button></Link>
              </div>
              <InvoiceCarousel />
            </motion.div>
          </section>

          <section className="pb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 tracking-tight">Everything You Need</h2>
              <p className="text-slate-400">Three powerful builders, one platform.</p>
            </div>
            
            <SocialProof />

            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {documents.map((doc, index) => {
                const Icon = doc.icon;
                return (
                  <motion.div key={doc.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} whileHover={{ y: -8 }}>
                    <Card className="h-full border-white/10 bg-white/3 backdrop-blur-sm text-white rounded-3xl hover:border-blue-400/40 transition-all">
                      <CardContent className="p-8">
                        <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5"><Icon className="h-7 w-7 text-blue-400" /></div>
                        <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">{doc.description}</p>
                        <Link href={doc.href}><Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90">Open Builder</Button></Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="pb-24">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, index) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm">
                    <Icon className="h-7 w-7 text-emerald-400 mb-4" /><h4 className="text-lg font-semibold mb-2 tracking-tight">{f.title}</h4><p className="text-slate-400 text-sm leading-relaxed">{f.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-10 bg-slate-950/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div>© 2026 DOCUVAT. All rights reserved.<span className="text-red-500"></span></div>
            </div>
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