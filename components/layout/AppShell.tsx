"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* الهيكل الرئيسي للنظام بعد تسجيل الدخول */}
      <div className="flex min-h-screen">

        {/* القائمة الجانبية الثابتة */}
        <Sidebar />

        {/* محتوى الصفحة */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* الشريط العلوي */}
          <Topbar />

          {/* هنا تظهر صفحات dashboard / clients / invoices */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}