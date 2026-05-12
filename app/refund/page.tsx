"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function RefundPage() {
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
            <h1 className="text-4xl font-extrabold mb-2">Refund Policy</h1>
            <p className="text-slate-400 mb-10">Last updated: May 2026</p>

            <div className="space-y-10 text-slate-300 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Our Commitment</h2>
                <p>At DOCUVAT, we strive for full customer satisfaction. If our automated VAT invoicing tools don't meet your expectations, we are committed to resolving your concerns.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Refund Eligibility</h2>
                <p>You may request a full refund within <strong className="text-white">7 days</strong> of your initial subscription if:</p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>This is your first time subscribing to a Pro plan.</li>
                  <li>You have generated fewer than 3 documents (Invoices/LPOs).</li>
                  <li>The request is made within the first 7 days of the transaction.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Non-Refundable Cases</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Requests made after the 7-day money-back window.</li>
                  <li>Automatic renewals (please cancel before the renewal date).</li>
                  <li>Accounts terminated due to violations of our Terms of Service.</li>
                  <li>Add-on services or custom integration fees.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">4. How to Request a Refund</h2>
                <p>Reach out to our support team with your registered email:</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                    <span className="text-xl">📧</span>
                    <div>
                      <div className="text-sm font-semibold text-white">Email</div>
                      <a href="mailto:support@docuvat.com" className="text-blue-400 hover:text-blue-300 text-sm">
                        support@docuvat.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="text-sm font-semibold text-white">WhatsApp Support</div>
                      <a 
                        href="https://wa.me/971505348284" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 text-sm"
                      >
                        Chat with us directly
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Processing Time</h2>
                <p>Once approved, refunds are credited back to your original payment method within <strong className="text-white">5 to 10 business days</strong>, depending on your bank's processing time.</p>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
              <Link href="/" className="hover:text-white transition-colors">Back to DOCUVAT</Link>
              {" · "}
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              {" · "}
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </motion.div>
        </main>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>© 2026 DOCUVAT. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/refund" className="hover:text-white transition-colors">Refund</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}