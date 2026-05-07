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
  title: "DocuVat | أفضل برنامج فواتير ضريبية في الإمارات - UAE VAT Invoices",
  description: "منصة DocuVat لإنشاء الفواتير الضريبية، عروض الأسعار، وأوامر الشراء (LPO) في ثوانٍ. متوافق تماماً مع متطلبات الهيئة الاتحادية للضرائب في الإمارات.",
  // السطر اللي تحت ده هو اللي هيخلي جوجل يثبت ملكيتك فوراً
  verification: {
    google: "umyfjUxWImXA-orSKhqwxgjYctDSmYq_fNs6k6nDGSc",
  },
  keywords: ["فواتير ضريبية", "الإمارات", "برنامج حسابات", "VAT UAE", "Tax Invoice", "LPO", "Quotations"],
  openGraph: {
    title: "DocuVat | نظام الفواتير الذكي للشركات الإماراتية",
    description: "أنشئ مستندات عملك باحترافية وسرعة. فواتير، عروض أسعار، وأوامر شراء.",
    url: "https://www.docuvat.com",
    siteName: "DocuVat",
    locale: "ar_AE",
    type: "website",
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
      <body className="min-h-full flex flex-col">
  {children}

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-HNE73B20HF"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-HNE73B20HF');
    `}
  </Script>
</body>
    </html>
  );
}
