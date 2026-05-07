import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DOCUVAT — UAE VAT Invoice Builder",
  description: "Create professional UAE VAT invoices, quotations, and purchase orders in seconds. TRN-compliant, bilingual Arabic & English. Built for UAE businesses.",
  keywords: "UAE invoice, VAT invoice, tax invoice UAE, فاتورة ضريبية, TRN invoice, quotation UAE, LPO UAE, invoice builder Dubai",
  openGraph: {
    title: "DOCUVAT — UAE VAT Invoice Builder",
    description: "Create professional UAE VAT invoices in seconds. TRN-compliant, bilingual, beautifully designed.",
    url: "https://www.docuvat.com",
    siteName: "DOCUVAT",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCUVAT — UAE VAT Invoice Builder",
    description: "Create professional UAE VAT invoices in seconds.",
  },
  alternates: {
    canonical: "https://www.docuvat.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
