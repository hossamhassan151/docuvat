"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
    >
      {/* Brand glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="font-bold text-slate-950">
              DOCUVAT AI
            </h2>

            <p className="text-sm text-slate-500">
              Your business assistant
            </p>
          </div>
        </div>

        {/* Conversation preview */}
        <div className="mt-6 space-y-4">
          <div className="ml-auto max-w-[85%] rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Create a proposal for Ahmed for website design worth $3000
          </div>

          <div className="max-w-[85%] rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-3 text-sm text-white shadow-md shadow-blue-500/20">
            Proposal created successfully ✓
            <div className="mt-2 text-xs text-white/80">
              Scope • Timeline • Pricing • Terms added
            </div>
          </div>
        </div>

        {/* Prompt bar */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-sm text-slate-400">
            Ask DOCUVAT AI...
          </span>

          <Sparkles className="h-5 w-5 text-blue-600" />
        </div>
      </div>
    </motion.div>
  );
}