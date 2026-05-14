"use client";

import { BarChart3 } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        label="Analytics"
        title="Business insights"
        description="Track business performance."
        icon={BarChart3}
      />

      <EmptyState
        icon={BarChart3}
        title="No analytics yet"
        description="Start creating documents to generate analytics."
      />

    </div>
  );
}