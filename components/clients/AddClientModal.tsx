"use client";

import { Pencil, UserPlus } from "lucide-react";
import { Client } from "@/types/client";
import ClientForm from "@/components/clients/ClientForm";
import AppModal from "@/components/system/AppModal";

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Client | null;
  onSubmit: (
    client: Omit<Client, "id" | "created_at" | "user_id">
  ) => void;
  loading?: boolean;
}

export default function AddClientModal({
  open,
  onClose,
  initialData = null,
  onSubmit,
  loading = false,
}: AddClientModalProps) {
  const isEditMode = !!initialData;
  const Icon = isEditMode ? Pencil : UserPlus;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isEditMode ? "Edit client" : "Add new client"}
      description={
        isEditMode
          ? "Update client details, status, tax number and contact information."
          : "Save client details, tax number, location and contact information."
      }
      icon={<Icon className="h-5 w-5 text-white" />}
    >
      <ClientForm
        initialData={initialData}
        onSubmit={onSubmit}
        loading={loading}
      />
    </AppModal>
  );
}