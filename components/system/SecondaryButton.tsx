"use client";

import { cn } from "@/lib/utils";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function SecondaryButton({
  children,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        `
        inline-flex
        items-center
        justify-center
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-5
        py-3
        text-sm
        font-semibold
        text-slate-700
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:bg-blue-50/50
        hover:text-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        `,
        className
      )}
    >
      {children}
    </button>
  );
}