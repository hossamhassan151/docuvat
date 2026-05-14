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

interface ClientFormProps {
  onSubmit: (
    client: Omit<
      Client,
      "id" | "created_at" | "user_id"
    >
  ) => void;

  loading?: boolean;
}

export default function ClientForm({
  onSubmit,
  loading = false,
}: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    trn: "",
    status: "Lead" as
      | "Lead"
      | "Active"
      | "Inactive",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onSubmit(formData);
  }

  const inputStyle =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Client Name */}
      <div className="relative">
        <User className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Client Name
        </label>

        <input
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ahmed Ali"
          className={inputStyle}
        />
      </div>

      {/* Company */}
      <div className="relative">
        <Building2 className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Company
        </label>

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="DOCUVAT LLC"
          className={inputStyle}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mail@example.com"
            className={inputStyle}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone
          </label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+971..."
            className={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            City
          </label>

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Dubai"
            className={inputStyle}
          />
        </div>

        {/* TRN */}
        <div className="relative">
          <FileText className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            TRN / VAT
          </label>

          <input
            name="trn"
            value={formData.trn}
            onChange={handleChange}
            placeholder="1000xxxx"
            className={inputStyle}
          />
        </div>

      </div>

      {/* Status */}
      <div className="relative">
        <BadgeCheck className="absolute left-4 top-[42px] h-4 w-4 text-slate-400"/>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputStyle}
        >
          <option>Lead</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
      >
        {loading
          ? "Saving..."
          : "Save Client"}
      </button>
    </form>
  );
}