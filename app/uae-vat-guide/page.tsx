import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "UAE VAT Guide 2026 | DOCUVAT",
  description: "Complete guide to UAE VAT for small businesses.",
};

export default function VatGuidePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-10">
      <h1 className="text-4xl font-bold">Understanding UAE VAT</h1>
      <p className="mt-4">The 5% VAT rate in the UAE applies to...</p>
      {/* باقي محتوى الصفحة هنا */}
    </div>
  );
}