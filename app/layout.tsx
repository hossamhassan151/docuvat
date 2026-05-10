import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docuvat.com"),

  title: {
    default: "DocuVat | UAE VAT Invoice & Quotation System",
    template: "%s | DocuVat",
  },

  description:
    "Create VAT invoices, quotations, and LPOs in seconds. Fully compliant with UAE Federal Tax Authority (FTA) requirements.",

  keywords: [
    "UAE invoice generator",
    "Dubai quotation maker",
    "VAT invoice UAE",
    "LPO generator",
    "DocuVat",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

  openGraph: {
    title: "DocuVat | UAE Business Invoices & Quotations",
    description:
      "Generate VAT-compliant invoices, quotations, and LPOs instantly in UAE.",
    url: "https://www.docuvat.com",
    siteName: "DocuVat",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DocuVat SaaS Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DocuVat UAE Invoice System",
    description: "Professional invoices & quotations for UAE businesses.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "umyfjUxWImXA-orSKhqwxgjYctDSmYq_fNs6k6nDGSc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ✅ Structured Data (Schema.org) - المكان الصحيح */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DocuVat",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "UAE VAT invoice, quotation and LPO generator system.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "AED",
              },
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-black text-white">
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HNE73B20HF"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HNE73B20HF');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wne0jag5do");
          `}
        </Script>
      </body>
    </html>
  );
}