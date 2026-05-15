"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Receipt } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import DocumentBuilder from "@/components/documents/DocumentBuilder";
import { addInvoice } from "@/lib/invoiceService";

export default function NewInvoicePage() {
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

    const invoice = await addInvoice({
      client_id: clientId,
      title: document.title,
      amount,
      currency: document.currency,
      status: "Draft",
      payment_status: "Unpaid",
      builder_data: document,
      terms: document.terms,
    });

    router.push(`/dashboard/clients/${invoice.client_id}`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        label="New Invoice"
        title="Create invoice"
        description="Build a professional invoice with totals and VAT."
        icon={Receipt}
      />

      <DocumentBuilder type="invoice" onSave={handleSave} />
    </div>
  );
}