"use client";

import Link from "next/link";
import { Receipt, Plus } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterTabs from "@/components/dashboard/FilterTabs";
import EmptyState from "@/components/dashboard/EmptyState";

export default function InvoicesPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        label="Invoices"
        title="Track invoices and payments"
        description="Create and track invoices easily."
        icon={Receipt}
        action={
          <Link
            href="/invoice"
            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="mr-2 h-4 w-4"/>
            New Invoice
          </Link>
        }
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4">

        <div className="flex flex-col gap-3 md:flex-row md:justify-between">

          <div className="md:w-[380px]">
            <SearchBar
              placeholder="Search invoice..."
            />
          </div>

          <FilterTabs
            tabs={["All","Paid","Unpaid","Overdue"]}
            active="All"
          />

        </div>

      </div>

      <EmptyState
        icon={Receipt}
        title="No invoices yet"
        description="Create your first invoice."
      />

    </div>
  );
}