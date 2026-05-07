import Link from 'next/link';

// 1. البيانات (الداتا)
const allPosts = [
  {
    title: "متطلبات الفاتورة الضريبية في الإمارات 2026",
    description: "دليل شامل للمحاسبين حول كيفية إصدار فاتورة ضريبية متوافقة مع الهيئة الاتحادية للضرائب.",
    slug: "fta-tax-invoice-requirements-uae",
    date: "7 مايو 2026"
  },
  {
    title: "كيفية إصدار أمر شراء (LPO) احترافي",
    description: "تعرف على أهمية الـ LPO في الدورة المحاسبية وكيف يحمي حقوق شركتك.",
    slug: "how-to-create-lpo-uae",
    date: "5 مايو 2026"
  }
];

// 2. المكون الأساسي (يجب أن يكون export default)
export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6" dir="rtl">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 border-b pb-4 text-right">
        مدونة DocuVat التعليمية
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {allPosts.map((post) => (
          <div key={post.slug} className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white text-right">
            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link 
              href={`/blog/${post.slug}`} 
              className="text-blue-600 font-bold hover:underline"
            >
              اقرأ المزيد ←
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}