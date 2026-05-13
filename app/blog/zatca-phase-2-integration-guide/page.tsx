import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "دليل الربط مع المرحلة الثانية لزكاة والدخل 2026 | DOCUVAT",
  description: "تعرف على أهم متطلبات المرحلة الثانية (مرحلة الربط والتكامل) لهيئة الزكاة والضريبة والجمارك في السعودية وكيفية الاستعداد لها.",
};

export default function ZatcaSimplePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans tracking-tight" dir="rtl">
      
      {/* Navigation / Back Button */}
      <nav className="max-w-4xl mx-auto px-8 pt-12">
        <Link href="/sa" className="text-gray-500 hover:text-emerald-400 flex items-center gap-2 transition-all group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>العودة للرئيسية</span>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-24">
        
        {/* Header Section - مسافات واسعة */}
        <header className="mb-24">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-8 font-medium">
            تحديثات الأنظمة الضريبية 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-10 text-white tracking-tighter">
            دليلك الشامل للمرحلة الثانية من <br/>
            <span className="text-emerald-500">الفوترة الإلكترونية (ZATCA)</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl font-light">
            انتقلت المملكة الآن إلى "مرحلة الربط والتكامل". لم يعد إصدار الفواتير مجرد إجراء ورقي، بل أصبح اتصالاً تقنياً مباشراً يضمن شفافية وسرعة أعمالك.
          </p>
        </header>

        {/* Content Section - ترتيب وتنظيم دقيق */}
        <div className="space-y-24 mb-32">
          
          <section className="group">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 font-mono text-xl">01.</span>
                <h2 className="text-3xl font-bold text-white">الربط المباشر مع منصة "فاتورة"</h2>
              </div>
              <div className="pr-12 border-r-2 border-emerald-500/10 group-hover:border-emerald-500/40 transition-colors">
                <p className="text-xl text-gray-400 leading-relaxed">
                  تتطلب هذه المرحلة ربط نظامك المحاسبي مباشرة بأنظمة الهيئة عبر واجهة برمجة التطبيقات (API). هذا يعني أن كل فاتورة يتم التحقق منها في ثوانٍ معدودة، مما يقلل من احتمالية الأخطاء الضريبية.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 font-mono text-xl">02.</span>
                <h2 className="text-3xl font-bold text-white">التوقيع الرقمي والختم الإلكتروني</h2>
              </div>
              <div className="pr-12 border-r-2 border-emerald-500/10 group-hover:border-emerald-500/40 transition-colors">
                <p className="text-xl text-gray-400 leading-relaxed">
                  يجب أن تحتوي كل فاتورة إلكترونية على بصمة تشفير (Hash) لا يمكن تغييرها. هذا "الختم" يضمن للهيئة ولعملائك أن البيانات لم يتم تعديلها بعد صدورها، وهو صمام الأمان القانوني لمنشأتك.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 font-mono text-xl">03.</span>
                <h2 className="text-3xl font-bold text-white">متطلبات الأرشفة السحابية</h2>
              </div>
              <div className="pr-12 border-r-2 border-emerald-500/10 group-hover:border-emerald-500/40 transition-colors">
                <p className="text-xl text-gray-400 leading-relaxed">
                  الحفظ لم يعد مجرد تخزين ملفات؛ يجب أرشفة الفواتير بصيغة XML المتوافقة تقنياً لمدة 6 سنوات. نظام **Docuvat** يقوم بهذه المهمة تلقائياً، لضمان جاهزيتك لأي عملية فحص ميداني مفاجئ.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* The One Big CTA Button - تصميم الموقع */}
        <div className="relative py-20 px-8 rounded-[40px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 overflow-hidden text-center">
          {/* Subtle Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 blur-[120px] pointer-events-none" />
          
          <h3 className="text-3xl md:text-4xl font-bold mb-8 relative z-10">
            اجعل منشأتك متوافقة تقنياً في دقائق
          </h3>
          
          <div className="relative z-10 space-y-8">
            <Link 
              href="/sa" 
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-2xl py-6 px-16 rounded-3xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              ابدأ تجربتك المجانية في السعودية
              <CheckCircle2 className="h-6 w-6" />
            </Link>
            
            <div className="flex justify-center items-center gap-8 text-gray-500 text-sm font-medium uppercase tracking-widest">
              <span>بدون بطاقة ائتمان</span>
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
              <span>دعم فني متواصل</span>
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
              <span>ربط مباشر API</span>
            </div>
          </div>
        </div>

      </main>

      <footer className="max-w-4xl mx-auto px-8 pb-20 text-center text-gray-600 text-sm">
        جميع الحقوق محفوظة © {new Date().getFullYear()} Docuvat - حلول الفوترة الإلكترونية الذكية.
      </footer>
    </div>
  );
}