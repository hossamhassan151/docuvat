import { Metadata } from "next";
import Link from "next/link";
// تم حذف scale3d وإضافة Database بدلاً منها
import { ShieldCheck, Lock, EyeOff, Server, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DOCUVAT - Secure Invoicing",
  description: "Learn how DOCUVAT protects your business data, invoice history, and TRN information with industry-standard encryption and security protocols.",
  alternates: {
    canonical: "https://www.docuvat.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans tracking-tight" dir="ltr">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_40%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        {/* Header */}
<header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
  <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-3 group">
      {/* لوجو DOCUVAT الأصلي */}
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center transition-transform group-hover:scale-105">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
          <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight">DOCUVAT</span>
    </Link>
    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
      Back to Home
    </Link>
  </div>
</header>

        <main className="mx-auto max-w-4xl px-8 py-24">
          {/* Hero Section */}
          <header className="mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter">Privacy Policy</h1>
            <div className="flex items-center gap-4 text-gray-500 font-medium">
              <span>Version 2.0</span>
              <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
              <span>Last updated: May 13, 2026</span>
            </div>
          </header>

          {/* Quick Security Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
              <Lock className="text-emerald-500 mb-4 h-6 w-6" />
              <h3 className="font-bold mb-2">AES-256 Encryption</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Your data is encrypted at rest and in transit using military-grade protocols.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
              <EyeOff className="text-emerald-500 mb-4 h-6 w-6" />
              <h3 className="font-bold mb-2">Zero Data Selling</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We never sell your business information to third-party advertisers. Ever.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
              <Server className="text-emerald-500 mb-4 h-6 w-6" />
              <h3 className="font-bold mb-2">Supabase Secure</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Hosted on AWS infrastructure with dedicated Row Level Security (RLS).</p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-16 text-gray-300 text-lg leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
              <p>
                At DOCUVAT, we recognize the sensitivity of financial data. This policy outlines our commitment to protecting the information of businesses operating in the <strong>UAE</strong> and <strong>Saudi Arabia</strong>, ensuring compliance with local regulations like the KSA Personal Data Protection Law (PDPL).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Information Collection</h2>
              <p>We collect only the essential data required to generate compliant tax documents:</p>
              <ul className="list-disc pl-6 space-y-3 text-gray-400">
                <li>Account details (Name, Professional Email).</li>
                <li>Business Metadata (TRN, Commercial Registration, Address).</li>
                <li>Transactional Data (Invoice items, totals, and client names).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Data Security & Storage</h2>
              <p>
                Your data is stored using <strong>Supabase</strong> (PostgreSQL) with strictly enforced Row Level Security. This ensures that even within our database, your data is isolated and accessible only via your authenticated session.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Your Rights</h2>
              <p>
                As a user, you have the absolute right to export your data or request a permanent deletion of your account. We provide tools within the dashboard to manage your data transparency.
              </p>
            </section>

            <section className="pt-12 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">5. Contact Support</h2>
              <p className="mb-6">For privacy-related inquiries or data deletion requests, reach out to our security team:</p>
              <a href="mailto:support@docuvat.com" className="inline-block bg-white text-black font-bold py-4 px-8 rounded-2xl hover:bg-emerald-500 transition-colors">
                Email Security Team
              </a>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
            <div>© 2026 DOCUVAT. Built for the Middle East.</div>
            <div className="flex gap-8">
              <Link href="/sa" className="hover:text-white transition-colors">KSA Edition</Link>
              <Link href="/ae" className="hover:text-white transition-colors">UAE Edition</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}