"use client";

import { Settings } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        label="Settings"
        title="Workspace settings"
        description="Manage your company profile, branding, billing and workspace preferences."
        icon={Settings}
      />

      <EmptyState
        icon={Settings}
        title="Settings coming next"
        description="Company profile, branding, billing and account preferences will be connected here."
      />
    </div>
  );
}