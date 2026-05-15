"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterTabs from "@/components/dashboard/FilterTabs";
import EmptyState from "@/components/dashboard/EmptyState";

export default function QuotationsPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        label="Quotations"
        title="Professional quotations"
        description="Create and manage quotation documents."
        icon={FileText}
        action={
          <Link
            href="/dashboard/quotations/new"
            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="mr-2 h-4 w-4"/>
            New Quotation
          </Link>
        }
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4">

        <div className="flex flex-col gap-3 md:flex-row md:justify-between">

          <div className="md:w-[380px]">
            <SearchBar
              placeholder="Search quotation..."
            />
          </div>

          <FilterTabs
            tabs={["All","Draft","Sent","Approved"]}
            active="All"
          />

        </div>

      </div>

      <EmptyState
        icon={FileText}
        title="No quotations yet"
        description="Create your first quotation."
      />

    </div>
  );
}