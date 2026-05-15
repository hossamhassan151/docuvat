"use client";

import { useState } from "react";
import { FileText, DollarSign, BadgeCheck } from "lucide-react";

import AppInput from "@/components/system/AppInput";
import PrimaryButton from "@/components/system/PrimaryButton";
import { Proposal } from "@/types/proposal";

interface ProposalFormProps {
  clientId: string;
  initialData?: Proposal | null;
  onSubmit: (
    proposal: Omit<Proposal, "id" | "created_at" | "user_id">
  ) => void;
  loading?: boolean;
}

export default function ProposalForm({
  clientId,
  initialData = null,
  onSubmit,
  loading = false,
}: ProposalFormProps) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    client_id: clientId,
    title: initialData?.title || "",
    scope: initialData?.scope || "",
    amount: String(initialData?.amount || ""),
    currency: initialData?.currency || "AED",
    status: (initialData?.status || "Draft") as
      | "Draft"
      | "Sent"
      | "Approved"
      | "Rejected",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim()) return;

    onSubmit({
      client_id: clientId,
      title: formData.title,
      scope: formData.scope,
      amount: Number(formData.amount || 0),
      currency: formData.currency,
      status: formData.status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AppInput
        required
        label="Proposal Title"
        icon={FileText}
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Website redesign proposal"
      />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Scope of Work
        </label>

        <textarea
          name="scope"
          value={formData.scope}
          onChange={handleChange}
          placeholder="Describe deliverables, timeline, terms and project scope..."
          className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AppInput
          label="Amount"
          icon={DollarSign}
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="3000"
        />

        <AppInput
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          placeholder="AED"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Status
        </label>

        <div className="relative">
          <BadgeCheck className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option>Draft</option>
            <option>Sent</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <PrimaryButton type="submit" disabled={loading} className="w-full">
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Proposal"
          : "Save Proposal"}
      </PrimaryButton>
    </form>
  );
}