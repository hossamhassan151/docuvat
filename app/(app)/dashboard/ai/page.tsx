"use client";

import { Sparkles } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import AIWidget from "@/components/dashboard/AIWidget";

export default function AIAssistantPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        label="AI Assistant"
        title="Manage your workspace with AI"
        description="Create clients, proposals, quotations, invoices and follow-up messages using simple commands."
        icon={Sparkles}
      />

      <AIWidget />
    </div>
  );
}