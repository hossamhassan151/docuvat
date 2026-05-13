import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docuvat.com"),

  title: {
    default: "Client Management & VAT Invoicing UAE | Business Dashboard Dubai | DOCUVAT",
    template: "%s | DOCUVAT",
  },

  description:
    "The ultimate UAE business platform to manage clients and generate VAT-compliant tax invoices. Centralize your customer database, automate quotations, and issue professional LPOs with FTA-compliant 5% VAT calculation.",

  keywords: [
    "business management software UAE",
    "client database tool Dubai",
    "SME management platform Abu Dhabi",
    "automated business workflow UAE",
    "professional client portal UAE",
    "VAT invoice UAE",
    "tax invoice Dubai",
    "invoice maker Abu Dhabi",
    "UAE VAT compliant invoice",
    "quotation generator UAE",
    "LPO generator UAE",
  ],

  alternates: {
    canonical: "https://www.docuvat.com/ae",
  },

  openGraph: {
    title: "Manage Clients & Invoices in One Place | DOCUVAT UAE",
    description:
      "Streamline your UAE business operations. Manage client profiles and generate compliant VAT invoices on a professional dashboard.",
    url: "https://www.docuvat.com/ae",
    siteName: "DOCUVAT",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "https://www.docuvat.com/og.png",
        width: 1200,
        height: 630,
        alt: "UAE Business Management & Invoicing - DOCUVAT",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UAE Business Management & Invoicing Tool",
    description:
      "Manage clients, track business records, and issue VAT invoices instantly with DOCUVAT.",
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