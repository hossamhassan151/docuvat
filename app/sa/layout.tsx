import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docuvat.com"),

  // SEO Titles for Saudi Market
  title: {
    default: "E-Invoicing & Client Management KSA | ZATCA Compliant Software | DOCUVAT",
    template: "%s | DOCUVAT Saudi Arabia",
  },

  // Description focused on ZATCA & KSA Requirements
  description:
    "The ultimate all-in-one platform for e-invoicing and client management in Saudi Arabia. Fully compliant with ZATCA Phase 1 & 2 requirements. Streamline your business workflow and tax compliance today.",

  // High-Volume Search Keywords in Saudi Arabia
  keywords: [
    "Saudi e-invoicing software",
    "ZATCA compliant billing",
    "VAT invoice generator KSA",
    "Business management Riyadh",
    "Saudi CRM for SMEs",
    "Electronic invoicing Saudi Arabia",
    "ZATCA Phase 2 integration",
    "Tax invoice template KSA",
    "Sales management Jeddah",
    "Docuvat Saudi e-invoicing",
  ],

  alternates: {
    canonical: "https://www.docuvat.com/sa",
  },

  // OpenGraph for Social Sharing (LinkedIn, Twitter, WhatsApp)
  openGraph: {
    title: "KSA E-Invoicing & Client Management Platform | DOCUVAT",
    description:
      "Empower your Saudi business with a professional dashboard to manage clients and issue ZATCA-compliant e-invoices instantly.",
    url: "https://www.docuvat.com/sa",
    siteName: "DOCUVAT KSA",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-sa-en.png", // تأكد من وجود الصورة في فولدر public
        width: 1200,
        height: 630,
        alt: "DOCUVAT Saudi Arabia - E-Invoicing Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Saudi Business Hub & E-Invoicing System",
    description:
      "Manage clients and generate professional ZATCA-compliant tax invoices in Saudi Arabia with DOCUVAT.",
    images: ["/og-sa-en.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SaudiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * ملاحظة مهمة جداً:
   * تم إزالة تاجات <html> و <body> من هنا لأنها موجودة في الـ Root Layout الأساسي.
   * وضعها هنا يسبب خطأ الـ Hydration (Mismatch).
   * يتم التحكم في الـ dir والـ lang من خلال الـ Root Layout أو الـ Page div.
   */
  return <>{children}</>;
}