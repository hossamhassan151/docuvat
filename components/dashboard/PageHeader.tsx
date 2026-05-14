"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export default function PageHeader({
  label,
  title,
  description,
  icon: Icon,
  action,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        {/* Label badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
          <Icon className="h-4 w-4" />
          {label}
        </div>

        {/* Page title */}
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">
          {title}
        </h1>

        {/* Page description */}
        <p className="mt-2 max-w-2xl text-slate-500">
          {description}
        </p>
      </div>

      {/* Optional action button */}
      {action && <div>{action}</div>}
    </motion.div>
  );
}