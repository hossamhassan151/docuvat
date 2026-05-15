import { cn } from "@/lib/utils";

interface AppTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export default function AppTable({
  headers,
  children,
  className,
}: AppTableProps) {
  return (
    <div
      className={cn(
        `
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        shadow-[0_18px_45px_rgba(15,23,42,0.05)]
        `,
        className
      )}
    >
      {/* Table Header */}
      <div
        className="
        grid
        auto-cols-fr
        grid-flow-col
        gap-4
        border-b
        border-slate-100
        bg-slate-50
        px-6
        py-4
        text-xs
        font-bold
        uppercase
        tracking-wider
        text-slate-400
        "
      >
        {headers.map((header) => (
          <div key={header}>
            {header}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-100">
        {children}
      </div>
    </div>
  );
}