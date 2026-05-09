"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, MessageCircle, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FREE_FEATURES = [
  { text: "1 document per day", included: true },
  { text: "1 template only", included: true },
  { text: "Invoice, Quotation, LPO", included: true },
  { text: "Export / Print PDF", included: true },
  { text: "Upload company logo", included: false },
  { text: "All 3 templates", included: false },
  { text: "All 9 color schemes", included: false },
  { text: "Save company profile", included: false },
  { text: "Unlimited documents", included: false },
  { text: "Priority WhatsApp support", included: false },
];

const PRO_FEATURES = [
  { text: "Unlimited documents", included: true },
  { text: "All 3 templates", included: true },
  { text: "All 9 color schemes", included: true },
  { text: "Invoice, Quotation, LPO", included: true },
  { text: "Export / Print PDF", included: true },
  { text: "Upload company logo", included: true },
  { text: "Save company profile", included: true },
  { text: "UAE VAT & TRN compliant", included: true },
  { text: "Priority WhatsApp support", included: true },
  { text: "New templates as released", included: true },
];

const WHATSAPP_NUMBER = "971505348284"; // ← غير ده برقمك

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
          <Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">About</Link>
          <Link href="/pricing" className="text-sm text-white font-medium">Pricing</Link>
        </nav>

        <div className="flex gap-3">
          <Link href="/dashboard">
  <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm">
    Dashboard
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

export default function PricingPage() {
  const whatsappMsg = encodeURIComponent(
    "Hello! I'd like to subscribe to DOCUVAT Pro — 49 AED/month. Please activate my account."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-20">

          {/* ── HERO TEXT ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 text-sm text-slate-200">
              <Zap className="h-4 w-4 text-emerald-400" />
              Simple, transparent pricing
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-slate-400 max-w-xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees.
            </p>
          </motion.div>

          {/* ── PLANS ── */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* FREE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="mb-6">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Free</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold">0</span>
                  <span className="text-xl text-slate-400 mb-2">AED / month</span>
                </div>
                <p className="text-slate-400 mt-3 text-sm">
                  Perfect for trying out DOCUVAT. No card needed.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {FREE_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    {f.included ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${f.included ? "text-slate-200" : "text-slate-500"}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/invoice">
                <Button
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-xl py-5"
                >
                  Start for Free
                </Button>
              </Link>
            </motion.div>

            {/* PRO */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-emerald-500/5 backdrop-blur-xl p-8 relative overflow-hidden"
            >
              {/* Most popular badge */}
              <div className="absolute top-5 right-5">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-2">Pro</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold">49</span>
                  <span className="text-xl text-slate-400 mb-2">AED / month</span>
                </div>
                <p className="text-slate-400 mt-3 text-sm">
                  For businesses that need unlimited, professional documents.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {PRO_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-200">{f.text}</span>
                  </div>
                ))}
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 rounded-xl py-5 text-base font-semibold">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Subscribe via WhatsApp
                </Button>
              </a>

              <p className="text-center text-xs text-slate-500 mt-3">
                Send a message and we'll activate your account within minutes.
              </p>
            </motion.div>

          </div>

          {/* ── FAQ ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-20"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How do I pay?",
                  a: "Click 'Subscribe via WhatsApp', send us a message, and we'll send you the payment link. Activation within minutes.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. Just message us on WhatsApp and we'll cancel your subscription immediately.",
                },
                {
                  q: "Is this UAE VAT compliant?",
                  a: "Yes. All documents include TRN fields, 5% VAT calculations, and the required legal footer per Federal Decree-Law No. (8) of 2017.",
                },
                {
                  q: "What happens when I hit my free limit?",
                  a: "You'll be prompted to upgrade. Your data is never deleted.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="font-semibold text-white mb-2">{item.q}</div>
                  <div className="text-sm text-slate-400">{item.a}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-slate-400 mb-8">Join businesses across the UAE using DOCUVAT every day.</p>
            <div className="flex justify-center gap-4">
              <Link href="/invoice">
                <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 px-8 py-5 text-base rounded-xl">
                  Try Free Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-5 text-base rounded-xl">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Subscribe Pro
                </Button>
              </a>
            </div>
          </motion.div>

        </main>

        {/* ── FOOTER ── */}
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