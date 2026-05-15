"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilePlus2 } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import ProposalForm from "@/components/proposals/ProposalForm";

import { addProposal } from "@/lib/proposalService";
import { Proposal } from "@/types/proposal";

export default function NewProposalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("clientId");
  const [saving, setSaving] = useState(false);

  async function handleCreateProposal(
    proposal: Omit<Proposal, "id" | "created_at" | "user_id">
  ) {
    try {
      setSaving(true);

      const newProposal = await addProposal(proposal);

      router.push(`/dashboard/clients/${newProposal.client_id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create proposal");
    } finally {
      setSaving(false);
    }
  }

  if (!clientId) {
    return (
      <EmptyState
        icon={FilePlus2}
        title="Missing client"
        description="Please create a proposal from a client workspace."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        label="New Proposal"
        title="Create proposal"
        description="Prepare a professional proposal connected to this client."
        icon={FilePlus2}
      />

      <div className="max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <ProposalForm
          clientId={clientId}
          onSubmit={handleCreateProposal}
          loading={saving}
        />
      </div>
    </div>
  );
}