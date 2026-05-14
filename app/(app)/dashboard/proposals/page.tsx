"use client";

import Link from "next/link";
import { Layers3, Plus } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterTabs from "@/components/dashboard/FilterTabs";
import EmptyState from "@/components/dashboard/EmptyState";
import AIWidget from "@/components/dashboard/AIWidget";

export default function ProposalsPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        label="Proposals"
        title="Create winning proposals"
        description="Build polished proposals and convert them later into quotations."
        icon={Layers3}
        action={
          <Link
            href="#"
            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="mr-2 h-4 w-4"/>
            New Proposal
          </Link>
        }
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between">

          <div className="md:w-[380px]">
            <SearchBar
              placeholder="Search proposal..."
            />
          </div>

          <FilterTabs
            tabs={["All","Draft","Sent","Approved"]}
            active="All"
          />

        </div>
      </div>

      <AIWidget/>

      <EmptyState
        icon={Layers3}
        title="No proposals yet"
        description="Create your first proposal."
      />

    </div>
  );
}