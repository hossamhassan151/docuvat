"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Zap,
  ArrowRight,
  LayoutDashboard,
  FileText,
  Users,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const FREE_FEATURES = [
  { text: "1 business document per day", included: true },
  { text: "Invoices, Quotations & LPOs", included: true },
  { text: "Basic client management", included: true },
  { text: "Export / Print PDF", included: true },
  { text: "1 template only", included: true },
  { text: "Save client details", included: false },
  { text: "Upload company logo", included: false },
  { text: "All templates & themes", included: false },
  { text: "Unlimited documents", included: false },
  { text: "Business dashboard", included: false },
];

const PRO_FEATURES = [
  { text: "Unlimited invoices, quotations & LPOs", included: true },
  { text: "Full client management system", included: true },
  { text: "Save companies & customer history", included: true },
  { text: "Professional dashboard workspace", included: true },
  { text: "All templates & color themes", included: true },
  { text: "Upload company logo & branding", included: true },
  { text: "UAE VAT & Saudi ZATCA ready", included: true },
  { text: "PDF export & print support", included: true },
  { text: "Priority updates & new features", included: true },
  { text: "Designed for freelancers & SMEs", included: true },
];

function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-xl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M6 4v16"
                stroke="white"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <path
                d="M9 9h3.5M9 12h3M9 15h3.5"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              DOCUVAT
            </div>
            <div className="text-xs text-slate-400">
              Business Documents & Client Workspace
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            About
          </Link>

          <Link
            href="/pricing"
            className="text-sm text-white font-medium"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm"
            >
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-20">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 text-sm text-slate-200">
              <Zap className="h-4 w-4 text-emerald-400" />
              Smart pricing for modern businesses
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Pricing for UAE & Saudi
              <br />
              Business Management Software
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-8">
              DOCUVAT helps freelancers and SMEs manage invoices,
              quotations, LPOs, and client records in one professional workspace.
            </p>

            <div className="mt-6 text-sm text-slate-500 max-w-2xl mx-auto">
              Built for UAE & Saudi freelancers, agencies, consultants,
              trading companies, and SMEs.
            </div>
          </motion.div>

          {/* FEATURES STRIP */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
            {[
              {
                icon: FileText,
                title: "Business Documents",
                desc: "Invoices, Quotations & LPOs",
              },
              {
                icon: Users,
                title: "Client Management",
                desc: "Save customers & history",
              },
              {
                icon: LayoutDashboard,
                title: "Workspace Dashboard",
                desc: "Manage everything in one place",
              },
              {
                icon: ShieldCheck,
                title: "VAT & ZATCA Ready",
                desc: "Built for UAE & Saudi compliance",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <Icon className="h-6 w-6 text-emerald-400 mb-4" />

                  <div className="font-semibold text-white mb-1">
                    {item.title}
                  </div>

                  <div className="text-sm text-slate-400">
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICING */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* FREE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="mb-6">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Free
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold">0</span>
                  <span className="text-xl text-slate-400 mb-2">
                    USD / month
                  </span>
                </div>

                <p className="text-slate-400 mt-3 text-sm">
                  Perfect for trying DOCUVAT before upgrading.
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

                    <span
                      className={`text-sm ${
                        f.included
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/invoice">
                <Button
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-xl py-6"
                >
                  Start Free
                </Button>
              </Link>
            </motion.div>

            {/* PRO */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-emerald-500/5 backdrop-blur-xl p-8 relative overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-5 right-5">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-2">
                  Pro
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold">10</span>

                  <span className="text-xl text-slate-400 mb-2">
                    USD / month
                  </span>
                </div>

                <p className="text-slate-400 mt-3 text-sm leading-6">
                  Complete business document and client management system
                  for freelancers and SMEs.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {PRO_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />

                    <span className="text-sm text-slate-200">
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Paddle Button */}
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 rounded-xl py-6 text-base font-semibold"
              >
                Upgrade to Pro
              </Button>

              <p className="text-center text-xs text-slate-500 mt-4 leading-6">
                Secure payments powered by Paddle.
                <br />
                Local currency displayed automatically based on your country.
              </p>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mt-24"
          >
            <h2 className="text-3xl font-bold text-center mb-10">
              Common Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What is DOCUVAT?",
                  a: "DOCUVAT is a business document and client management platform for UAE and Saudi businesses. Create invoices, quotations, and LPOs in one workspace.",
                },
                {
                  q: "Does DOCUVAT support VAT and ZATCA?",
                  a: "Yes. DOCUVAT supports UAE VAT requirements and Saudi electronic invoicing workflows.",
                },
                {
                  q: "Can I manage clients and companies?",
                  a: "Yes. The Pro plan includes a complete client management workspace with saved customer records and document history.",
                },
                {
                  q: "Will Paddle show local currency?",
                  a: "Yes. Paddle automatically displays prices in your local currency depending on your country.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="font-semibold text-white mb-2">
                    {item.q}
                  </div>

                  <div className="text-sm text-slate-400 leading-7">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FINAL CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-24"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to grow your business?
            </h2>

            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Manage invoices, quotations, LPOs, and clients
              from one modern business workspace.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/invoice">
                <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 px-8 py-6 text-base rounded-xl">
                  Try Free Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl"
              >
                Upgrade to Pro
              </Button>
            </div>
          </motion.div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-8 mt-14">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© 2026 DOCUVAT. All rights reserved.</div>

            <div className="flex gap-6">
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>

              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>

              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}