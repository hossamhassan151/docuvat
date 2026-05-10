import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator UAE | Create VAT Compliant Invoices | DOCUVAT",
  description: "Free online UAE VAT invoice generator. Create, customize and download professional PDF tax invoices for businesses in Abu Dhabi, Dubai, and across the UAE instantly with DOCUVAT.",
  keywords: ["Free Invoice Generator UAE", "VAT Invoice UAE", "Tax Invoice PDF", "Online Invoicing Dubai", "Abu Dhabi Business Tools"],
  alternates: { canonical: "https://www.docuvat.com/free-invoice-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}