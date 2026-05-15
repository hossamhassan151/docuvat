"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export default function AppInput({
  label,
  icon: Icon,
  className,
  ...props
}: AppInputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        <input
          {...props}
          className={cn(
            "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 placeholder:text-slate-400",
            Icon && "pl-11",
            className
          )}
        />
      </div>
    </div>
  );
}