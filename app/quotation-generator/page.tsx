import { Metadata } from "next";
import Link from "next/link";

// 1. إعدادات الـ SEO الخاصة بعروض الأسعار
export const metadata: Metadata = {
  title: "Professional Quotation Maker UAE | Free Quote Generator | DOCUVAT",
  description: "Create and send professional business quotations in minutes. Customized for UAE startups and freelancers with AED support and PDF export. Convert leads into clients.",
  keywords: ["Quotation Maker UAE", "Free Quote Generator Dubai", "Price Offer Template", "Business Proposal UAE"],
};

export default function QuotationGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      
      {/* القسم الرئيسي (Hero Section) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Smart Sales Tools for UAE
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Convert Leads with a <span className="text-cyan-400">Professional Quotation</span> Maker
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            First impressions matter. DOCUVAT helps UAE freelancers and companies create beautiful, 
            professional quotations in seconds. Turn your price offers into confirmed orders with ease.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/invoice"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-lg shadow-cyan-500/20 transition hover:scale-105 inline-block"
            >
              Create Quotation Now
            </Link>
            <Link
              href="/lpo-generator"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              Need an LPO instead?
            </Link>
          </div>
        </div>
      </section>

      {/* مميزات الـ Quotation */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-white/5">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-cyan-400 font-bold mb-2">01.</div>
            <h2 className="text-xl font-semibold text-white">Win More Deals</h2>
            <p className="mt-3 text-slate-400 text-sm">Stand out with modern, professional templates that make your business look trustworthy from day one.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-cyan-400 font-bold mb-2">02.</div>
            <h2 className="text-xl font-semibold text-white">Flexible Pricing</h2>
            <p className="mt-3 text-slate-400 text-sm">Add discounts, VAT, and custom line items easily to suit your client's specific requirements.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/30 transition">
            <div className="text-cyan-400 font-bold mb-2">03.</div>
            <h2 className="text-xl font-semibold text-white">One-Click PDF</h2>
            <p className="mt-3 text-slate-400 text-sm">Download your quote as a clean PDF and send it to your client via WhatsApp or Email instantly.</p>
          </div>
        </div>
      </section>

      {/* محتوى تعليمي للسيو (Quotation vs Invoice) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-cyan-300">Why Quotations are Essential for UAE Businesses</h2>
          <div className="space-y-4 text-slate-300 leading-8 text-lg">
            <p>
              In Dubai and Abu Dhabi's fast-paced business world, a <strong>Quotation</strong> (or Price Offer) is the 
              starting point of any professional transaction. It outlines the scope of work and the costs before the 
              actual invoice is issued.
            </p>
            <p>
              Using <strong>DOCUVAT</strong> allows you to maintain a record of all sent proposals. Once a client 
              approves your quote, you can easily convert it into a Tax Invoice within our platform, saving 
              you and your accounting team valuable time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-12 shadow-2xl">
          <h2 className="text-3xl font-bold">Ready to send your next proposal?</h2>
          <p className="mt-4 text-slate-400 italic">"The simplest tool for freelancers in the UAE to get paid."</p>
          <div className="mt-8">
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 font-bold transition hover:scale-110 inline-block"
            >
              Create Free Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}