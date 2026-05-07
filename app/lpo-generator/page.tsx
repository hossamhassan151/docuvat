import { Metadata } from "next";
import Link from "next/link";

// 1. إعدادات الـ SEO (Metadata) - ضرورية جداً لجوجل
export const metadata: Metadata = {
  title: "LPO Generator UAE | Create Local Purchase Orders Online | DOCUVAT",
  description: "Generate professional Local Purchase Orders (LPO) for your UAE business. Stay compliant with procurement standards in Dubai and Abu Dhabi. PDF export included.",
  keywords: ["LPO Generator UAE", "Local Purchase Order Dubai", "LPO Template Abu Dhabi", "Procurement tools UAE"],
};

export default function LpoGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      
      {/* القسم الرئيسي (Hero Section) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1 text-sm font-medium text-blue-300">
            Professional Procurement Tools for UAE
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Professional <span className="text-blue-400">LPO Generator</span> for Abu Dhabi & Dubai Businesses
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create standard Local Purchase Orders (LPO) that your suppliers will trust. 
            Designed specifically for SMEs and startups in the United Arab Emirates to streamline their purchasing process.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/invoice"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold shadow-lg shadow-blue-500/20 transition hover:scale-105 inline-block"
            >
              Create LPO Now
            </Link>
            <Link
              href="/free-invoice-generator"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              Try Invoice Generator
            </Link>
          </div>
        </div>
      </section>

      {/* مميزات الـ LPO في DocuVat */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-white/5">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-blue-400/30 transition">
            <div className="text-blue-400 font-bold mb-2">01.</div>
            <h2 className="text-xl font-semibold text-white">Supplier Compliant</h2>
            <p className="mt-3 text-slate-400 text-sm">Our formats follow the procurement standards accepted across all UAE industrial zones.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-blue-400/30 transition">
            <div className="text-blue-400 font-bold mb-2">02.</div>
            <h2 className="text-xl font-semibold text-white">VAT Integrated</h2>
            <p className="mt-3 text-slate-400 text-sm">Automatically handle VAT calculations (5%) for your purchase orders to ensure accounting accuracy.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-blue-400/30 transition">
            <div className="text-blue-400 font-bold mb-2">03.</div>
            <h2 className="text-xl font-semibold text-white">Instant PDF</h2>
            <p className="mt-3 text-slate-400 text-sm">Generate and download professional PDFs with your company branding in one click.</p>
          </div>
        </div>
      </section>

      {/* محتوى تعليمي للسيو (Why LPO Matters) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">Why does your UAE business need an LPO?</h2>
          <div className="space-y-4 text-slate-300 leading-8 text-lg">
            <p>
              In the competitive UAE market, a <strong>Local Purchase Order (LPO)</strong> acts as a legal safeguard. 
              Whether you are ordering office supplies in Dubai or construction materials in Abu Dhabi, 
              an LPO confirms the agreed prices, delivery schedules, and payment terms.
            </p>
            <p>
              Using <strong>DOCUVAT</strong> ensures that your LPOs are numbered correctly, branded professionally, 
              and archived for your year-end financial audits and VAT filings with the Federal Tax Authority (FTA).
            </p>
          </div>
        </div>
      </section>

      {/* تذييل الصفحة (Footer CTA) */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-900/40 to-slate-900/40 p-12 shadow-2xl">
          <h2 className="text-3xl font-bold">Start Managing Purchases Professionally</h2>
          <p className="mt-4 text-slate-400 italic">"The smartest way for accountants to manage company orders."</p>
          <div className="mt-8">
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-4 font-bold transition hover:scale-110 inline-block shadow-lg shadow-blue-500/30"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}