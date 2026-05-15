"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  BadgeCheck,
  FileText,
} from "lucide-react";

import { Client } from "@/types/client";
import AppInput from "@/components/system/AppInput";
import PrimaryButton from "@/components/system/PrimaryButton";

interface ClientFormProps {
  initialData?: Client | null;
  onSubmit: (
    client: Omit<Client, "id" | "created_at" | "user_id">
  ) => void;
  loading?: boolean;
}

export default function ClientForm({
  initialData = null,
  onSubmit,
  loading = false,
}: ClientFormProps) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    company: initialData?.company || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    trn: initialData?.trn || "",
    status: (initialData?.status || "Lead") as "Lead" | "Active" | "Inactive",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) return;

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AppInput
        required
        label="Client Name"
        icon={User}
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ahmed Ali"
      />

      <AppInput
        label="Company"
        icon={Building2}
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="DOCUVAT LLC"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <AppInput
          label="Email"
          icon={Mail}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="mail@example.com"
        />

        <AppInput
          label="Phone"
          icon={Phone}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+971..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AppInput
          label="City"
          icon={MapPin}
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Dubai"
        />

        <AppInput
          label="TRN / VAT"
          icon={FileText}
          name="trn"
          value={formData.trn}
          onChange={handleChange}
          placeholder="1000xxxx"
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
            <option>Lead</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <PrimaryButton
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Client"
          : "Save Client"}
      </PrimaryButton>
    </form>
  );
}