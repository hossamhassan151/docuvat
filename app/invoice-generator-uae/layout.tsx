import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docuvat.com"),

  title: {
    default: "Invoice Generator UAE | Free VAT Invoice Maker Dubai & Abu Dhabi | DOCUVAT",
    template: "%s | DOCUVAT",
  },

  description:
    "Free UAE invoice generator to create VAT-compliant tax invoices instantly. Generate professional PDF invoices, quotations, and LPOs for businesses in Dubai, Abu Dhabi, and across the UAE with automatic 5% VAT calculation.",

  keywords: [
    "invoice generator UAE",
    "free invoice generator UAE",
    "VAT invoice UAE",
    "tax invoice Dubai",
    "invoice maker Abu Dhabi",
    "online invoice generator UAE",
    "PDF invoice generator UAE",
    "UAE VAT compliant invoice",
    "business invoice UAE",
    "quotation generator UAE",
    "LPO generator UAE",
  ],

  alternates: {
    canonical: "https://www.docuvat.com/invoice-generator-uae",
  },

  openGraph: {
    title: "Free Invoice Generator UAE | DOCUVAT",
    description:
      "Create VAT-compliant invoices in seconds for UAE businesses. Free invoice generator for Dubai, Abu Dhabi & all Emirates.",
    url: "https://www.docuvat.com/invoice-generator-uae",
    siteName: "DOCUVAT",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "https://www.docuvat.com/og.png",
        width: 1200,
        height: 630,
        alt: "UAE Invoice Generator DOCUVAT",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Invoice Generator UAE | Free VAT Tool",
    description:
      "Generate professional VAT invoices instantly in UAE with DOCUVAT.",
    images: ["https://www.docuvat.com/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}