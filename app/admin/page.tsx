"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Crown, Users, FileText, Shield } from "lucide-react";

interface UserRow {
  id: string;
  email: string;
  full_name: string;
  plan: string;
  created_at: string;
  doc_count?: number;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      // تأكد إن اليوزر ادمين
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }

      await fetchUsers();
      setLoading(false);
    };

    load();
  }, []);

  const fetchUsers = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name, plan, created_at")
      .order("created_at", { ascending: false });

    if (!profiles) return;

    // جيب عدد الفواتير لكل يوزر
    const withCounts = await Promise.all(
      profiles.map(async (p) => {
        const { count } = await supabase
          .from("documents")
          .select("id", { count: "exact" })
          .eq("user_id", p.id);

        return { ...p, doc_count: count || 0 };
      })
    );

    setUsers(withCounts);
  };

  const togglePlan = async (userId: string, currentPlan: string) => {
    setUpdating(userId);
    const newPlan = currentPlan === "free" ? "pro" : "free";

    await supabase
      .from("profiles")
      .update({ plan: newPlan })
      .eq("id", userId);

    setUsers((prev) =>
      prev.map((u) => u.id === userId ? { ...u, plan: newPlan } : u)
    );

    setUpdating(null);
  };

  const filtered = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const proUsers = users.filter((u) => u.plan === "pro").length;
  const freeUsers = users.filter((u) => u.plan === "free").length;
  const totalDocs = users.reduce((s, u) => s + (u.doc_count || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_30%)]" />

      <div className="relative z-10">

        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg">DOCUVAT</span>
                <span className="ml-2 text-xs bg-red-500/20 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full">Admin</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-400" },
              { label: "Pro Users", value: proUsers, icon: Crown, color: "text-yellow-400" },
              { label: "Free Users", value: freeUsers, icon: Shield, color: "text-slate-400" },
              { label: "Total Documents", value: totalDocs, icon: FileText, color: "text-emerald-400" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <Icon className={`h-5 w-5 ${s.color} mb-3`} />
                  <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Users Table */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Docs</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{u.full_name || "—"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{u.email}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(u.created_at).toLocaleDateString("en-AE")}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{u.doc_count}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.plan === "pro"
                          ? "bg-blue-500/20 border border-blue-400/30 text-blue-300"
                          : "bg-slate-500/20 border border-slate-400/20 text-slate-400"
                      }`}>
                        {u.plan === "pro" ? "Pro" : "Free"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePlan(u.id, u.plan)}
                        disabled={updating === u.id}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 ${
                          u.plan === "free"
                            ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90"
                            : "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20"
                        }`}
                      >
                        {updating === u.id ? "..." : u.plan === "free" ? "Upgrade to Pro" : "Downgrade to Free"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}