"use client";

import { cn } from "@/lib/utils";

type TableActionVariant = "default" | "danger";

interface TableActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: TableActionVariant;
}

export default function TableActionButton({
  children,
  variant = "default",
  className,
  ...props
}: TableActionButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:-translate-y-0.5",
        variant === "danger"
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
        className
      )}
    >
      {children}
    </button>
  );
}