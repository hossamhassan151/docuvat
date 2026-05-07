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
  
  // --- إضافة الأيقونة هنا ---
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  // -----------------------

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
      lang="ar" // نصيحة: بما إن العنوان والوصف بالعربي، يفضل تخليها ar
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Google Analytics */}
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