"use client";

import { Bell, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="h-[76px] border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between">
        {/* Left side: page context */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-950">
              Workspace
            </h2>

            <span className="rounded-full bg-gradient-to-r from-blue-50 to-emerald-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
              V2
            </span>
          </div>

          <p className="mt-0.5 text-sm text-slate-500">
            Manage clients, proposals, quotations and invoices.
          </p>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden w-[300px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 transition focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm md:flex">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              placeholder="Search clients, proposals..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* AI shortcut */}
          <button className="hidden items-center gap-2 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:scale-[1.02] hover:shadow-sm md:flex">
            <Sparkles className="h-4 w-4" />
            Ask AI
          </button>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
            <Bell className="h-4 w-4" />

            {/* small unread indicator */}
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {/* Main CTA */}
          <Button className="h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 font-semibold text-white shadow-md shadow-blue-500/20 transition hover:scale-[1.02] hover:opacity-95">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </div>
      </div>
    </header>
  );
}