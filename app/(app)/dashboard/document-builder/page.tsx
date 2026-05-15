"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import DocumentBuilder from "@/components/documents/DocumentBuilder";

import { DocumentType } from "@/types/document";
import { Proposal } from "@/types/proposal";

import {
  addProposal,
  getProposalById,
  saveProposalBuilderData,
} from "@/lib/proposalService";

import { addQuotation } from "@/lib/quotationService";
import { addInvoice } from "@/lib/invoiceService";

export default function DocumentBuilderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = (searchParams.get("type") || "proposal") as DocumentType;
  const id = searchParams.get("id");
  const clientId = searchParams.get("clientId");

  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    async function load() {
      if (type === "proposal" && id) {
        const data = await getProposalById(id);
        setProposal(data);
      }
    }

    load();
  }, [type, id]);

  async function handleSave(document: any) {
    try {
      const amount = document.items.reduce(
        (sum: number, item: any) =>
          sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
        0
      );

      // Edit existing proposal
      if (type === "proposal" && id) {
        await saveProposalBuilderData(id, document);
        router.push(`/dashboard/proposals/${id}`);
        return;
      }

      if (!clientId) {
        alert("Please open the builder from a client workspace first.");
        return;
      }

      // New proposal
      if (type === "proposal") {
        const proposal = await addProposal({
          client_id: clientId,
          title: document.title || "Untitled Proposal",
          scope: document.scope,
          amount,
          currency: document.currency,
          status: "Draft",
          builder_data: document,
          terms: document.terms,
        });

        router.push(`/dashboard/proposals/${proposal.id}`);
        return;
      }

      // New quotation
      if (type === "quotation") {
        const quotation = await addQuotation({
          client_id: clientId,
          title: document.title || "Untitled Quotation",
          amount,
          currency: document.currency,
          status: "Draft",
          builder_data: document,
          terms: document.terms,
        });

        router.push(`/dashboard/clients/${quotation.client_id}`);
        return;
      }

      // New invoice
      if (type === "invoice") {
        const invoice = await addInvoice({
          client_id: clientId,
          title: document.title || "Untitled Invoice",
          amount,
          currency: document.currency,
          status: "Draft",
          payment_status: "Unpaid",
          builder_data: document,
          terms: document.terms,
        });

        router.push(`/dashboard/clients/${invoice.client_id}`);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save document.");
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        label="Document Builder"
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} Builder`}
        description="Create professional business documents with live preview."
        icon={FileText}
      />

      <DocumentBuilder
        type={type}
        initialTitle={proposal?.title || ""}
        onSave={handleSave}
      />
    </div>
  );
}