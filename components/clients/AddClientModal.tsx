"use client";

import { X, UserPlus } from "lucide-react";
import { Client } from "@/types/client";
import ClientForm from "@/components/clients/ClientForm";

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    client: Omit<Client, "id" | "created_at" | "user_id">
  ) => void;
  loading?: boolean;
}

export default function AddClientModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}: AddClientModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_110px_rgba(15,23,42,0.28)]">
        {/* Brand glow */}
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative border-b border-slate-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-md shadow-blue-500/20">
                <UserPlus className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Add new client
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Save client details, tax number, location and contact information.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative max-h-[75vh] overflow-y-auto p-6">
          <ClientForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}