"use client";

import { useEffect, useState } from "react";
import { Star, Crown, Users, FileText, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface UserRow {
  id: string;
  email: string;
  full_name: string;
  plan: string;
  created_at: string;
  doc_count?: number;
}
interface ReviewRow {
  id: string;
  rating: number;
  comment: string;
  user_name: string;
  user_role: string;
  approved: boolean;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  // جلب المراجعات (تم نقلها خارج useEffect لسهولة الوصول إليها)
  const fetchReviews = async () => {
    setReviewsLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
    setReviewsLoading(false);
  };

  // جلب المستخدمين مع عدد مستنداتهم
  const fetchUsers = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name, plan, created_at")
      .order("created_at", { ascending: false });

    if (!profiles) return;

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

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }

      await Promise.all([fetchUsers(), fetchReviews()]);
      setLoading(false);
    };

    load();
  }, []);

  const toggleApprove = async (reviewId: string, current: boolean) => {
    await supabase
      .from("reviews")
      .update({ approved: !current })
      .eq("id", reviewId);

    setReviews((prev) =>
      prev.map((r) => r.id === reviewId ? { ...r, approved: !current } : r)
    );
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
        <div className="text-white text-lg animate-pulse">Loading...</div>
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
                <span className="font-bold text-lg tracking-tight">DOCUVAT</span>
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

          {/* Reviews Section */}
          <div className="mt-12 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">User Reviews</h2>
                <p className="text-xs text-slate-400 mt-0.5">Approve reviews to show them on the homepage</p>
              </div>
              <div className="text-xs text-slate-400">
                {reviews.filter((r) => r.approved).length} approved / {reviews.length} total
              </div>
            </div>

            {reviewsLoading ? (
              <div className="text-center py-8 text-slate-500 text-sm">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">No reviews yet.</div>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className={`rounded-2xl border p-5 flex items-start justify-between gap-4 transition-all ${
                      r.approved ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
                          />
                        ))}
                      </div>
                      {r.comment && <p className="text-slate-300 text-sm mb-3">"{r.comment}"</p>}
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                          {r.user_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{r.user_name || "Anonymous"}</div>
                          <div className="text-xs text-slate-400">{r.user_role}</div>
                        </div>
                        <div className="text-xs text-slate-500 ml-2">
                          {new Date(r.created_at).toLocaleDateString("en-AE")}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleApprove(r.id, r.approved)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        r.approved
                          ? "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20"
                          : "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90"
                      }`}
                    >
                      {r.approved ? "Unapprove" : "Approve"}
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            <div className="overflow-x-auto">
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
          </div>
        </main>
      </div>
    </div>
  );
}