"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import DocumentBuilder from "@/components/documents/DocumentBuilder";
import { addQuotation } from "@/lib/quotationService";

export default function NewQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("clientId");

  async function handleSave(document: any) {
    if (!clientId) return;

    const amount = document.items.reduce(
      (sum: number, item: any) =>
        sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0
    );

    const quotation = await addQuotation({
      client_id: clientId,
      title: document.title,
      amount,
      currency: document.currency,
      status: "Draft",
      builder_data: document,
      terms: document.terms,
    });

    router.push(`/dashboard/clients/${quotation.client_id}`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        label="New Quotation"
        title="Create quotation"
        description="Build a professional quotation with pricing and VAT."
        icon={FileText}
      />

      <DocumentBuilder type="quotation" onSave={handleSave} />
    </div>
  );
}