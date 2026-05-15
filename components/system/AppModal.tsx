"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function AppModal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  className,
}: AppModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_110px_rgba(15,23,42,0.28)]",
          className
        )}
      >
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative border-b border-slate-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20">
                  {icon}
                </div>
              )}

              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  {title}
                </h2>

                {description && (
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                )}
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
          {children}
        </div>
      </div>
    </div>
  );
}