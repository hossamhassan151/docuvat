"use client";

import { Settings, Building2, Palette, CreditCard, Globe2 } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        label="Settings"
        title="Workspace settings"
        description="Manage company profile, branding, billing, language and document preferences."
        icon={Settings}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SettingCard
          icon={Building2}
          title="Company Profile"
          description="Business name, logo, address, TRN and default currency."
        />

        <SettingCard
          icon={Palette}
          title="Branding"
          description="Templates, colors and document visual style."
        />

        <SettingCard
          icon={CreditCard}
          title="Billing"
          description="Free / Pro subscription and Paddle billing."
        />

        <SettingCard
          icon={Globe2}
          title="Language"
          description="English and Arabic interface with RTL support later."
        />
      </div>
    </div>
  );
}

function SettingCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-950">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}