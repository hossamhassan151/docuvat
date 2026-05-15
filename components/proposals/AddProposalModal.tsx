"use client";

import { FilePlus2, Pencil } from "lucide-react";

import AppModal from "@/components/system/AppModal";
import ProposalForm from "@/components/proposals/ProposalForm";
import { Proposal } from "@/types/proposal";

interface AddProposalModalProps {
  open: boolean;
  onClose: () => void;
  clientId: string;
  initialData?: Proposal | null;
  onSubmit: (
    proposal: Omit<Proposal, "id" | "created_at" | "user_id">
  ) => void;
  loading?: boolean;
}

export default function AddProposalModal({
  open,
  onClose,
  clientId,
  initialData = null,
  onSubmit,
  loading = false,
}: AddProposalModalProps) {
  const isEditMode = !!initialData;
  const Icon = isEditMode ? Pencil : FilePlus2;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isEditMode ? "Edit proposal" : "Create proposal"}
      description={
        isEditMode
          ? "Update proposal scope, value and status."
          : "Create a proposal connected to this client workspace."
      }
      icon={<Icon className="h-5 w-5 text-white" />}
    >
      <ProposalForm
        clientId={clientId}
        initialData={initialData}
        onSubmit={onSubmit}
        loading={loading}
      />
    </AppModal>
  );
}