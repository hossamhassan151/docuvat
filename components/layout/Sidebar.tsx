"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  BarChart3,
  Sparkles,
  Settings,
  Layers3,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Clients", href: "/dashboard/clients", icon: Users },
  { title: "Proposals", href: "/dashboard/proposals", icon: Layers3 },
  { title: "Quotations", href: "/dashboard/quotations", icon: FileText },
  { title: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "AI Assistant", href: "/dashboard/ai", icon: Sparkles },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-[280px] border-r border-slate-200/80 bg-white/90 backdrop-blur-xl flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* DOCUVAT logo mark */}
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
              <path
                d="M9 9h3.5M9 12h3M9 15h3.5"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          <div>
            <div className="text-xl font-extrabold tracking-tight text-slate-950">
              DOCUVAT
            </div>
            <div className="text-xs font-medium text-slate-400">
              AI Client Workspace
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          // Overview لا يفضل active في كل الصفحات الفرعية
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium
                transition-colors duration-150
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }
              `}
            >
              <Icon
                className={`
                  h-5 w-5 transition-colors
                  ${active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}
                `}
              />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="p-4">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-blue-400/20 blur-2xl" />

          <div className="relative">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <p className="mt-3 text-sm font-bold text-slate-950">
              Unlock DOCUVAT Pro
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Unlimited clients, documents, analytics and future AI tools.
            </p>

            <Link
              href="/pricing"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}