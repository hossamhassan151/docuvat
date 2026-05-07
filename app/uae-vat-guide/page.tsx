import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UAE VAT Guide 2026 | Federal Tax Authority Rules | DOCUVAT",
  description: "The ultimate guide to VAT in the UAE. Learn about 5% tax rates, registration thresholds, and FTA compliance for small businesses in Dubai and Abu Dhabi.",
  keywords: ["UAE VAT Guide", "FTA Compliance", "Tax Invoice Requirements UAE", "VAT Registration Threshold"],
  alternates: {
    canonical: 'https://www.docuvat.com/uae-vat-guide',
  },
};

export default function VatGuidePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header Section */}
      <header className="bg-slate-950 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-extrabold md:text-6xl mb-6">
            Comprehensive <span className="text-blue-400">UAE VAT Guide</span> for 2026
          </h1>
          <p className="text-lg text-slate-400 italic">
            Everything an Entrepreneur in Abu Dhabi & Dubai needs to know about Federal Tax Authority (FTA) compliance.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <article className="mx-auto max-w-4xl px-6 py-16 leading-relaxed">
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">1. What is VAT in the UAE?</h2>
          <p className="text-lg text-slate-600 mb-6">
            Value Added Tax (VAT) was introduced in the UAE on January 1, 2018. It is an indirect tax on the consumption or use of goods and services. As of 2026, the standard rate remains at <strong>5%</strong>, applied at each step of the supply chain.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <p className="font-semibold text-blue-900">Pro Tip for Accountants:</p>
            <p className="text-blue-800 text-sm">Always ensure your Input Tax (VAT paid on purchases) is clearly documented to offset it against your Output Tax (VAT collected on sales).</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">2. Registration Thresholds</h2>
          <p className="text-lg text-slate-600 mb-4">Businesses must monitor their taxable supplies to determine if they need to register:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>Mandatory Registration:</strong> If taxable supplies and imports exceed <strong>AED 375,000</strong> in the last 12 months.</li>
            <li><strong>Voluntary Registration:</strong> If taxable supplies and imports exceed <strong>AED 187,500</strong>.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">3. Valid Tax Invoice Requirements</h2>
          <p className="text-lg text-slate-600 mb-4">To be FTA-compliant, every Tax Invoice generated via <Link href="/free-invoice-generator" className="text-blue-600 underline">DocuVat</Link> includes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              "The words 'Tax Invoice' clearly displayed",
              "Seller's Name, Address, and TRN",
              "Buyer's Name and Address",
              "A unique Invoice Number",
              "Date of Issuance",
              "Description of Goods/Services",
              "VAT Amount and Total in AED"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-slate-700">
                <span className="text-green-500 text-xl">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-slate-900 text-white p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">Automate Your Tax Compliance</h2>
          <p className="mb-8 opacity-80">
            Don't risk penalties with the FTA. Use DocuVat to generate LPOs, Quotations, and Tax Invoices that are 100% compliant with UAE laws.
          </p>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-bold transition inline-block">
            Start Free Trial
          </Link>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-slate-800">4. Filing VAT Returns</h2>
          <p className="text-lg text-slate-600">
            Registered businesses must file a VAT return with the FTA at the end of each tax period (usually quarterly). You must report your output and input tax accurately via the <strong>Emaratax portal</strong>.
          </p>
        </section>

      </article>

      <footer className="bg-slate-50 py-10 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 DOCUVAT UAE. This guide is for informational purposes only. Consult a certified tax advisor for official filings.
        </p>
      </footer>
    </div>
  );
}