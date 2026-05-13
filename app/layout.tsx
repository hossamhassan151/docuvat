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
    default:
      "DOCUVAT — Smart Invoicing & Client Management for UAE & Saudi Businesses",
    template: "%s | DOCUVAT",
  },

  description:
    "Create professional invoices, quotations, and manage clients online with DOCUVAT. Built for UAE & Saudi businesses with VAT-ready documents and modern templates.",

  keywords: [
    "invoice generator UAE",
    "Saudi invoice software",
    "quotation generator UAE",
    "quotation generator Saudi Arabia",
    "VAT invoice UAE",
    "Saudi VAT invoice",
    "invoice maker Dubai",
    "invoice software Saudi Arabia",
    "client management software",
    "business documents UAE",
    "business invoicing GCC",
    "DOCUVAT",
  ],
  // inside layout.tsx metadata
alternates: {
  canonical: 'https://www.docuvat.com',
  languages: {
    'en-SA': 'https://www.docuvat.com/sa',
    'en-AE': 'https://www.docuvat.com/ae',
  },
},

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    title:
      "DOCUVAT — Smart Invoicing & Client Management for GCC Businesses",

    description:
      "Professional invoicing, quotations, and client management platform for UAE & Saudi businesses.",

    url: "https://www.docuvat.com",

    siteName: "DOCUVAT",

    type: "website",

    locale: "en_US",

    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DOCUVAT Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "DOCUVAT — Smart Invoicing & Client Management",

    description:
      "Professional invoices, quotations, and client workspace for GCC businesses.",

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
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "SoftwareApplication",

              name: "DOCUVAT",

              applicationCategory: "BusinessApplication",

              operatingSystem: "Web",

              description:
                "Smart invoicing, quotations, and client management platform for UAE & Saudi businesses.",

              url: "https://www.docuvat.com",

              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>

     <body className="min-h-full flex flex-col bg-black">

        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HNE73B20HF"
          strategy="afterInteractive"
        />

        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-HNE73B20HF');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){
                  (c[a].q=c[a].q||[]).push(arguments)
                };

                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;

                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);

            })(window, document, "clarity", "script", "wne0jag5do");
          `}
        </Script>
      </body>
    </html>
  );
}