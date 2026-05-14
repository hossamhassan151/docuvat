"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-10 text-center">
      {/* Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-md shadow-blue-500/20">
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Text */}
      <h3 className="mt-5 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {/* Optional button */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}