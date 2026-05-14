"use client";

interface FilterTabsProps {
  tabs: string[];
  active?: string;
  onChange?: (tab: string) => void;
}

export default function FilterTabs({
  tabs,
  active,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = active === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            className={`
              rounded-2xl
              border
              px-4
              py-2
              text-sm
              font-semibold
              transition-all
              duration-150

              ${
                isActive
                  ? "border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}