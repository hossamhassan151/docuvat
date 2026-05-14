"use client";

import { Mail, Phone, Building2 } from "lucide-react";

import { Client } from "@/types/client";

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({
  client,
}: ClientCardProps) {
  return (
    <div
      className="
      rounded-[2rem]
      border
      border-slate-200
      bg-white
      p-6
      shadow-[0_18px_45px_rgba(15,23,42,0.05)]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          {/* أول حرف من اسم العميل */}
          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-emerald-500
            text-lg
            font-bold
            text-white
            "
          >
            {client.name.charAt(0)}
          </div>

          <div>

            <h3 className="font-bold text-slate-950">
              {client.name}
            </h3>

            {client.company && (
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Building2 className="h-4 w-4"/>
                {client.company}
              </div>
            )}

          </div>

        </div>

        {/* Status */}
        <span
          className="
          rounded-full
          bg-emerald-50
          px-3
          py-1
          text-xs
          font-bold
          text-emerald-700
          "
        >
          {client.status}
        </span>

      </div>

      {/* Details */}

      <div className="mt-6 space-y-3">

        {client.email && (

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail className="h-4 w-4 text-slate-400"/>
            {client.email}
          </div>

        )}

        {client.phone && (

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4 text-slate-400"/>
            {client.phone}
          </div>

        )}

      </div>

    </div>
  );
}