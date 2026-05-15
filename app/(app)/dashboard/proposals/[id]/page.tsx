"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/system/StatusBadge";
import PrimaryButton from "@/components/system/PrimaryButton";
import SecondaryButton from "@/components/system/SecondaryButton";

import { Proposal } from "@/types/proposal";
import {
  getProposalById,
  deleteProposal,
} from "@/lib/proposalService";

export default function ProposalDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const proposalId = params.id as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProposal() {
      try {
        const data = await getProposalById(proposalId);
        setProposal(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProposal();
  }, [proposalId]);

  async function handleDelete() {
    const confirmed = confirm("Delete this proposal?");
    if (!confirmed) return;

    try {
      await deleteProposal(proposalId);
      router.back();
    } catch (error) {
      console.error(error);
      alert("Failed to delete proposal");
    }
  }

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
        Loading proposal...
      </div>
    );
  }

  if (!proposal) {
    return (
      <EmptyState
        icon={FileText}
        title="Proposal not found"
        description="This proposal may have been deleted."
      />
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href={`/dashboard/clients/${proposal.client_id}`}
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to client
      </Link>

      <PageHeader
        label="Proposal Workspace"
        title={proposal.title}
        description="Review proposal scope, value, status and workflow actions."
        icon={FileText}
        action={
          <div className="flex gap-2">
            <SecondaryButton
              type="button"
              onClick={() =>
                router.push(`/dashboard/document-builder?type=proposal&id=${proposal.id}`)
              }
            >
              Open Builder
            </SecondaryButton>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">
              Proposal Scope
            </h2>

            <StatusBadge status={proposal.status || "Draft"} />
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            {proposal.scope || "No scope added yet."}
          </div>
        </div>

        <div className="space-y-4">
          <Info label="Amount" value={`${proposal.currency || "AED"} ${Number(proposal.amount || 0).toLocaleString()}`} />
          <Info label="Status" value={proposal.status || "Draft"} />
          <Info label="Created" value={new Date(proposal.created_at).toLocaleDateString()} />

          <PrimaryButton
            type="button"
            className="w-full"
            onClick={() =>
              router.push(`/dashboard/document-builder?type=proposal&id=${proposal.id}`)
            }
          >
            Continue in Builder
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="mt-2 font-bold text-slate-900">{value}</div>
    </div>
  );
}