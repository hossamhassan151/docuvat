import AppShell from "@/components/layout/AppShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // أي صفحة داخل app/(app) هتظهر تلقائيًا داخل AppShell
    // يعني Sidebar + Topbar هيبقوا ثابتين لكل صفحات النظام
    <AppShell>
      {children}
    </AppShell>
  );
}