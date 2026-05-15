"use client";

import { BarChart3, Users, FileText, Receipt, DollarSign } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import MetricCard from "@/components/dashboard/MetricCard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        label="Analytics"
        title="Business analytics"
        description="Track clients, proposals, quotations, invoices and revenue."
        icon={BarChart3}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Clients"
          value="0"
          description="Total clients"
          icon={Users}
        />

        <MetricCard
          title="Proposals"
          value="0"
          description="Created proposals"
          icon={FileText}
        />

        <MetricCard
          title="Invoices"
          value="0"
          description="Created invoices"
          icon={Receipt}
        />

        <MetricCard
          title="Revenue"
          value="AED 0"
          description="Total value"
          icon={DollarSign}
        />
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h2 className="text-lg font-bold text-slate-950">
          Analytics engine coming next
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          After documents are fully connected, this page will calculate real totals and monthly performance.
        </p>
      </div>
    </div>
  );
}