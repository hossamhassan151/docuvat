"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileText,
  Receipt,
  TrendingUp,
  Sparkles,
  Plus,
  ArrowRight,
  Layers3,
} from "lucide-react";

// بيانات الكروت العلوية
// لاحقًا هنبدل الأرقام الثابتة ببيانات حقيقية من Supabase
const stats = [
  {
    title: "Clients",
    value: "0",
    description: "Total saved clients",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Proposals",
    value: "0",
    description: "Active proposals",
    icon: Layers3,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Invoices",
    value: "0",
    description: "Created invoices",
    icon: Receipt,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Revenue",
    value: "$0",
    description: "Total invoice value",
    icon: TrendingUp,
    gradient: "from-slate-800 to-slate-950",
  },
];

// الإجراءات السريعة داخل الداشبورد
const quickActions = [
  {
    title: "Add New Client",
    description: "Create a client profile",
    href: "/dashboard/clients",
  },
  {
    title: "Create Proposal",
    description: "Prepare a professional proposal",
    href: "/dashboard/proposals",
  },
  {
    title: "Create Quotation",
    description: "Send a pricing document",
    href: "/dashboard/quotations",
  },
  {
    title: "Create Invoice",
    description: "Generate a payment document",
    href: "/dashboard/invoices",
  },
];

// Animation بسيط للكروت
const cardAnimation = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
      >
        {/* Brand glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles className="h-4 w-4" />
              DOCUVAT AI Client Workspace
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950">
              Good morning 👋
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Manage your clients, proposals, quotations and invoices from one
              premium workspace. AI and automations will be added step by step.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/clients"
              className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Link>

            <Link
              href="/dashboard/proposals"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Create Proposal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-2xl bg-gradient-to-br ${item.gradient} p-3 shadow-md shadow-slate-900/10`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-400">
                  This month
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <p className="mt-1 text-3xl font-extrabold text-slate-950">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        {/* AI Assistant Card */}
       <motion.div
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35, delay: 0.15 }}
  className="
  relative
  overflow-hidden
  rounded-[2rem]
  border
  border-slate-200
  bg-white
  p-6
  shadow-[0_18px_45px_rgba(15,23,42,0.05)]
"
>

{/* Glow خفيف بالبراند */}
<div className="
absolute
-right-10
-top-10
h-40
w-40
rounded-full
bg-blue-500/10
blur-3xl
"/>

<div className="
absolute
-bottom-0
-left-10
h-40
w-40
rounded-full
bg-emerald-500/10
blur-3xl
"/>

<div className="relative">

  {/* Header */}
  <div className="flex items-center gap-3">

    <div className="
      h-11
      w-11
      rounded-2xl
      bg-gradient-to-br
      from-blue-600
      to-emerald-500
      flex
      items-center
      justify-center
      shadow-md
    ">
      <Sparkles className="h-5 w-5 text-white"/>
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


  {/* Fake conversation */}
  <div className="mt-6 space-y-4">

    {/* User */}
    <div className="
    ml-auto
    max-w-[85%]
    rounded-2xl
    bg-slate-100
    px-4
    py-3
    text-sm
    text-slate-700
    ">
      Create a proposal for Ahmed for website design worth $3000
    </div>

    {/* AI */}
    <div className="
    max-w-[85%]
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-emerald-500
    px-4
    py-3
    text-sm
    text-white
    shadow-md
    ">
      Proposal created successfully ✓

      <div className="mt-2 text-white/80 text-xs">
        Scope • Timeline • Pricing • Terms added
      </div>
    </div>

  </div>


  {/* Prompt Bar */}
  <div className="
  mt-5
  rounded-2xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  flex
  items-center
  justify-between
  ">

    <span className="text-sm text-slate-400">
      Ask DOCUVAT AI...
    </span>

    <Sparkles className="
    h-5
    w-5
    text-blue-600
    "/>

  </div>

</div>
</motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
        >
          <h2 className="text-lg font-bold text-slate-950">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start your workflow faster.
          </p>

          <div className="mt-5 space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 p-2">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {action.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest client and document actions will appear here.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-10 text-center">
          <p className="font-semibold text-slate-700">
            No activity yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Create your first client or proposal to see activity here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}