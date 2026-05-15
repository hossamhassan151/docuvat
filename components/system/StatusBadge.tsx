import { cn } from "@/lib/utils";

type Status =
  | "Lead"
  | "Active"
  | "Inactive"
  | "Pending"
  | "Won"
  | "Lost"
  | "Paid"
  | "Unpaid"
  | "Draft"
  | "Sent"
  | "Approved";

interface StatusBadgeProps {
  status: Status | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Lead: "bg-blue-50 text-blue-700 ring-blue-100",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-100",
  Won: "bg-green-50 text-green-700 ring-green-100",
  Lost: "bg-red-50 text-red-700 ring-red-100",
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Unpaid: "bg-amber-50 text-amber-700 ring-amber-100",
  Draft: "bg-slate-100 text-slate-600 ring-slate-200",
  Sent: "bg-blue-50 text-blue-700 ring-blue-100",
  Approved: "bg-green-50 text-green-700 ring-green-100",
};

export default function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        `
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-bold
        ring-1
        ring-inset
        `,
        statusStyles[status] || statusStyles.Inactive,
        className
      )}
    >
      {status}
    </span>
  );
}