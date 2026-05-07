import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator UAE | Create VAT Compliant Invoices | DOCUVAT",
  description:
    "Free online UAE VAT invoice generator. Create, customize and download professional PDF tax invoices for businesses in Abu Dhabi, Dubai, and across the UAE instantly with DOCUVAT.",
  keywords: ["Free Invoice Generator UAE", "VAT Invoice UAE", "Tax Invoice PDF", "Online Invoicing Dubai", "Abu Dhabi Business Tools"],
  alternates: {
    canonical: "https://www.docuvat.com/free-invoice-generator",
  },
};

export default function FreeInvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      
      {/* HERO SECTION - Optimized for SEO Title */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Official UAE VAT Compliant Generator
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Free Online <span className="text-cyan-400">VAT Invoice</span> Generator for UAE Businesses
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            DOCUVAT simplifies invoicing for UAE freelancers and SMEs. Generate professional tax invoices that meet FTA requirements with automatic VAT calculations and instant PDF export.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/invoice"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-lg shadow-cyan-500/20 transition hover:scale-105"
            >
              Start Invoicing Free
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              View All Features
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Keyword Rich Headers */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "FTA Compliant Invoices",
              desc: "Ensure your documents meet UAE Federal Tax Authority requirements automatically.",
            },
            {
              title: "Automatic VAT (5%) Calculation",
              desc: "Smart calculation for VAT-registered businesses in Abu Dhabi, Dubai, and Sharjah.",
            },
            {
              title: "Professional PDF Export",
              desc: "Generate clean, modern PDF invoices ready to send to your clients via email.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/30 transition-colors"
            >
              <h2 className="text-xl font-semibold text-cyan-300">{feature.title}</h2>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT SECTION - Semantic SEO Content */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">
            The Best Free Invoicing Tool for Startups in the UAE
          </h2>

          <div className="mt-6 space-y-4 text-slate-300 leading-8">
            <p>
              As a professional in the UAE, staying compliant with tax regulations is crucial. 
              <strong> DOCUVAT</strong> provides a seamless experience for creating tax-compliant 
              documents. Our platform supports various business types, from service providers in 
              Dubai Media City to trading companies in Abu Dhabi.
            </p>
            <p>
              By using our free generator, you avoid manual errors in VAT calculation and ensure that 
              your company branding remains consistent and professional.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Structured Data Friendly */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Invoicing in the UAE: FAQs
        </h2>

        <div className="grid gap-6">
          {[
            {
              q: "Does DOCUVAT support UAE VAT laws?",
              a: "Yes, our generator is designed to include all mandatory fields required by the FTA for valid tax invoices.",
            },
            {
              q: "Is there a limit to how many invoices I can create?",
              a: "Our free generator allows you to create and download invoices instantly without hidden costs.",
            },
            {
              q: "Can I customize the currency to AED?",
              a: "Absolutely, the tool is defaulted to AED for UAE businesses but can be adjusted for international clients.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
            >
              <h3 className="text-lg font-semibold text-cyan-200">{faq.q}</h3>
              <p className="mt-3 text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-12 shadow-2xl">
          <h2 className="text-3xl font-bold">Ready to Simplify Your Business Documents?</h2>
          <p className="mt-4 text-slate-400">Join hundreds of UAE professionals using DOCUVAT.</p>
          <div className="mt-8">
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 font-bold transition hover:scale-110 inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}