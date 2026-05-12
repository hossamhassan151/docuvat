"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)]" />

      <div className="relative z-10">
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
            <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
            <p className="text-slate-400 mb-10">Last updated: May 2026</p>

            <div className="space-y-10 text-slate-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using DOCUVAT ("the Service"), you agree to be bound by these Terms of Service. If you are using the Service on behalf of a business, that business accepts these terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
                <p>DOCUVAT provides web-based tools for generating VAT-compliant invoices, quotations, and purchase orders. We reserve the right to modify or discontinue features to improve user experience.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">3. User Accounts & Security</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Account information must be truthful and accurate.</li>
                  <li>You are solely responsible for all activity under your account and for maintaining password confidentiality.</li>
                  <li>You must notify us immediately of any unauthorized use of your account.</li>
                  <li>One entity is allowed only one "Free Plan" account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Subscription & Billing</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Pro plans are billed in advance on a recurring monthly basis.</li>
                  <li>All payments are processed securely through our payment partner, Paddle.</li>
                  <li>Prices are subject to change; however, existing subscribers will be notified at least 30 days in advance.</li>
                  <li>Refunds follow our Refund Policy and are evaluated on a case-by-case basis within 7 days of purchase.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Tax & Legal Compliance</h2>
                <p>While DOCUVAT facilitates the creation of tax-compliant documents, <strong className="text-white">you are responsible</strong> for the accuracy of TRN numbers, tax calculations, and ensuring your business complies with local tax laws in the UAE, KSA, or elsewhere.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Intellectual Property</h2>
                <p>The Service, including its logo, code, and design, is the exclusive property of DOCUVAT. You may not reverse engineer, decompile, or attempt to extract the source code of our platform.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
                <p>DOCUVAT is provided "as is" without warranties. We shall not be liable for any financial losses, data loss, or legal issues resulting from errors in user-generated documents or service interruptions.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Termination</h2>
                <p>We may suspend or terminate access to our Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or our business interests.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Contact Information</h2>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <a href="mailto:support@docuvat.com" className="text-blue-400 hover:text-blue-300">
                      support@docuvat.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <a 
                      href="https://wa.me/971505348284" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      WhatsApp Support
                    </a>
                  </div>
                </div>
              </section>

            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
              <Link href="/" className="hover:text-white transition-colors">Back to DOCUVAT</Link>
              {" · "}
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              {" · "}
              <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>

          </motion.div>
        </main>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© 2026 DOCUVAT. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/refund" className="hover:text-white transition-colors">Refund</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}