"use client";

import { cn } from "@/lib/utils";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        `
        inline-flex
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-blue-500/20
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-blue-500/25
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