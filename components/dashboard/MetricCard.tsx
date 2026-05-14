"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;

  // ألوان البراند للكارت
  gradient?: string;

  // شارة صغيرة فوق (Live / This Month...)
  badge?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  gradient = "from-blue-600 to-emerald-500",
  badge = "This month",
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
      rounded-[2rem]
      border
      border-slate-200
      bg-white
      p-5
      shadow-[0_18px_45px_rgba(15,23,42,0.05)]
      "
    >
      {/* أعلى الكارت */}
      <div className="flex items-center justify-between">

        {/* الأيقونة */}
        <div
          className={`
          rounded-2xl
          bg-gradient-to-br
          ${gradient}
          p-3
          shadow-md
          shadow-blue-500/20
          `}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        {/* Badge */}
        <span
          className="
          rounded-full
          bg-slate-50
          px-2.5
          py-1
          text-xs
          font-semibold
          text-slate-400
          "
        >
          {badge}
        </span>
      </div>

      {/* المحتوى */}
      <div className="mt-5">

        <p className="text-sm font-semibold text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-3xl font-extrabold text-slate-950">
          {value}
        </p>

        {description && (
          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>
        )}

      </div>
    </motion.div>
  );
}