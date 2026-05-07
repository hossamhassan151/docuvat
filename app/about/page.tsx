"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Heart,
  Globe,
  ArrowRight,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- الإعدادات (تأكد من تعديلها) ---
const WHATSAPP_NUMBER = "971505348284"; // رقمك بدون أصفار أو علامة +
const WHATSAPP_DISPLAY = "+971 50 534 8284"; 
const SUPPORT_EMAIL = "support@docuvat.com";

function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-xl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
              <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white">DOCUVAT</div>
            <div className="text-xs text-slate-400">Smart Business Documents</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm text-white font-medium">About</Link>
          <Link href="/pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm">
              Login
            </Button>
          </Link>
          <Link href="/invoice">
            <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-sm">
              Try Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

const values = [
  {
    icon: Shield,
    title: "Built for UAE Law",
    text: "Every document is compliant with Federal Decree-Law No. (8) of 2017. TRN fields, 5% VAT calculations, and legal footers — all included automatically.",
  },
  {
    icon: Zap,
    title: "Speed First",
    text: "We built DOCUVAT because creating a professional invoice shouldn't take 20 minutes. It should take 20 seconds.",
  },
  {
    icon: Heart,
    title: "Made for Small Business",
    text: "Freelancers, consultants, traders, agencies — if you run a business in the UAE, DOCUVAT was built for you.",
  },
  {
    icon: Globe,
    title: "Arabic & English",
    text: "All documents are fully bilingual. Every label, footer, and field is in both Arabic and English — the way UAE business works.",
  },
];

const stats = [
  { value: "3", label: "Document types" },
  { value: "9", label: "Color schemes" },
  { value: "VAT", label: "Compliant" },
  { value: "49", label: "AED / month Pro" },
];

export default function AboutPage() {
  const whatsappMsg = encodeURIComponent("Hello! I have a question about DOCUVAT.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-20">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 text-sm text-slate-200">
              <Heart className="h-4 w-4 text-emerald-400" />
              Built in the UAE, for the UAE
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Why We Built
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                DOCUVAT
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed">
              Every business in the UAE needs professional documents — invoices,
              quotations, purchase orders. We built the fastest, cleanest way to
              create them. VAT-compliant, bilingual, and beautifully designed.
            </p>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} // أفضل من التوقيت الثابت عند السكرول
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* STORY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-24"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  We started DOCUVAT after seeing how much time UAE businesses
                  waste on creating documents. Copying templates in Word, fixing
                  VAT calculations manually, forgetting TRN numbers — it is a
                  daily frustration for thousands of freelancers and small businesses.
                </p>
                <p>
                  We built a simple tool: fill in your details once, pick a
                  design, and export a print-ready invoice in under a minute.
                  No accounting software. No complex setup. Just professional
                  documents, instantly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* VALUES */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA & CONTACT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-14"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Try It?</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Start free today — no credit card, no setup. Create your first
              professional document in under a minute.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/invoice">
                <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 px-8 py-5 text-base rounded-xl w-full sm:w-auto">
                  Try Free Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-5 text-base rounded-xl w-full"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </a>
            </div>

            {/* تم إصلاح هذا القسم هنا */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                📧 {SUPPORT_EMAIL}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                💬 WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </div>
          </motion.div>
        </main>

        <footer className="border-t border-white/10 py-8 mt-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© 2026 DOCUVAT. All rights reserved.</div>
            <div className="flex gap-6">
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