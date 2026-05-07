import Link from "next/link";
import { Metadata } from "next";

// السيو الصحيح لاستهداف كلمات البحث في الإمارات
export const metadata: Metadata = {
  title: "LPO Generator UAE | Create Local Purchase Orders Online | DOCUVAT",
  description:
    "Generate professional Local Purchase Orders (LPO) for your UAE business. Stay compliant with procurement standards in Dubai and Abu Dhabi. PDF export included.",
  keywords: ["LPO Generator UAE", "Local Purchase Order Dubai", "LPO Template Abu Dhabi", "Procurement tools UAE"],
};

export default function LpoGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1 text-sm font-medium text-blue-300">
            Professional Procurement Tools
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Streamline Your Purchasing with our <span className="text-blue-400">LPO Generator</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create professional Local Purchase Orders (LPO) that suppliers in the UAE trust. 
            Perfect for startups and SMEs in Abu Dhabi and Dubai looking for structured procurement.
          </p>

          <div className="mt-10">
            <Link
              href="/invoice"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold shadow-lg shadow-blue-500/20 transition hover:scale-105 inline-block"
            >
              Generate LPO Now
            </Link>
          </div>
        </div>
      </section>

      {/* LPO BENEFITS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-blue-300">Supplier Ready</h2>
            <p className="mt-3 text-slate-300 text-sm">Standard formats accepted by all major suppliers in the United Arab Emirates.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-blue-300">Terms & Conditions</h2>
            <p className="mt-3 text-slate-300 text-sm">Add custom delivery and payment terms to your purchase orders easily.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-blue-300">Branded PDFs</h2>
            <p className="mt-3 text-slate-300 text-sm">Export high-quality PDFs with your company logo and professional layout.</p>
          </div>
        </div>
      </section>

      {/* WHY LPO MATTERS - SEO CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6">Why Use an LPO in the UAE?</h2>
          <div className="space-y-4 text-slate-300 leading-8">
            <p>
              A <strong>Local Purchase Order (LPO)</strong> is a legally binding document created by a buyer and sent to a seller. 
              In the UAE business environment, having a clear LPO ensures that both parties agree on prices, delivery dates, and payment terms.
            </p>
            <p>
              Using DOCUVAT's LPO generator helps you maintain a professional image with your suppliers and keeps your accounting records organized for VAT audit purposes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}