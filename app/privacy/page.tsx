"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_30%)]" />

      <div className="relative z-10">

        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <span className="font-bold text-lg">DOCUVAT</span>
            </Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              Back to Home
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
            <p className="text-slate-400 mb-10">Last updated: May 2025</p>

            <div className="space-y-10 text-slate-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                <p>
                  DOCUVAT ("we", "our", or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, and safeguard your
                  information when you use our platform at docuvat.com.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Email address and name when you register</li>
                  <li>Company information you enter (name, address, TRN, phone, email)</li>
                  <li>Documents you create (invoices, quotations, purchase orders)</li>
                  <li>Usage data such as number of documents created</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>To provide and operate the DOCUVAT platform</li>
                  <li>To save your company profile for faster document creation</li>
                  <li>To manage your subscription plan (Free or Pro)</li>
                  <li>To communicate with you about your account via WhatsApp or email</li>
                  <li>To improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Data Storage & Security</h2>
                <p>
                  Your data is stored securely using Supabase, which is hosted on
                  AWS infrastructure. All data is encrypted in transit using HTTPS
                  and at rest. We apply Row Level Security (RLS) to ensure each
                  user can only access their own data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
                <p>
                  We do not sell, trade, or share your personal data with third parties.
                  Your business documents and company information are private and
                  accessible only to you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Cookies</h2>
                <p>
                  We use essential cookies only for authentication purposes (keeping
                  you logged in). We do not use tracking or advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Access your personal data at any time</li>
                  <li>Request deletion of your account and all associated data</li>
                  <li>Update your information through your account settings</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us via WhatsApp or email.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Children's Privacy</h2>
                <p>
                  DOCUVAT is intended for business use only. We do not knowingly
                  collect data from individuals under the age of 18.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify
                  you of any significant changes via email or through the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact
                  us via WhatsApp or at{" "}
                  <a href="mailto:support@docuvat.com" className="text-blue-400 hover:text-blue-300">
                    support@docuvat.com
                  </a>
                </p>
              </section>

            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
              <Link href="/" className="hover:text-white transition-colors">← Back to DOCUVAT</Link>
            </div>

          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
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