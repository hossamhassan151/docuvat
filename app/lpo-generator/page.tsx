export const metadata: Metadata = {
  title: "LPO Generator UAE | Local Purchase Order Creator | DOCUVAT",
  description: "Generate professional Local Purchase Orders (LPO) for your UAE business. Stay organized with our easy-to-use procurement tools.",
};

export default function LpoGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-5xl font-bold leading-tight md:text-6xl mb-6">
          Standard <span className="text-blue-400">LPO Generator</span> for UAE Procurement
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mb-10">
          Streamline your purchasing process. Create professional Local Purchase Orders that your suppliers in Dubai and Abu Dhabi will trust.
        </p>
        <Link href="/invoice" className="rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-700 transition">
          Generate LPO Now
        </Link>
      </section>
    </div>
  );
}