"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Receipt, FileText, ShoppingCart, LogOut, MessageCircle, Crown, Shield, Pencil, X, Check } from "lucide-react";

interface Profile {
  full_name: string;
  email: string;
  plan: string;
  is_admin: boolean;
}

interface Company {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  trn: string;
}

const emptyCompany: Company = {
  name: "", address: "", city: "", country: "United Arab Emirates",
  phone: "", email: "", website: "", trn: "",
};

const inputCls = "w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
const labelCls = "block text-xs font-medium text-slate-400 mb-1";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [loading, setLoading] = useState(true);

  const [company, setCompany] = useState<Company>(emptyCompany);
  const [editingCompany, setEditingCompany] = useState(false);
  const [companyDraft, setCompanyDraft] = useState<Company>(emptyCompany);
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        router.push("/login"); 
        return; 
      }

      setUserId(user.id);

      // جلب البروفايل، بيانات الشركة، وإحصائيات المستندات بالتوازي لتحسين السرعة
      const [profileRes, companyRes, statsRes] = await Promise.all([
        supabase.from("profiles").select("full_name, email, plan, is_admin").eq("id", user.id).single(),
        supabase.from("companies").select("*").eq("user_id", user.id).maybeSingle(), // maybeSingle أفضل لتجنب أخطاء الـ console إذا لم تكن موجودة
        supabase.from("documents").select("id", { count: "exact" }).eq("user_id", user.id)
      ]);

      if (profileRes.data) setProfile(profileRes.data);

      if (companyRes.data) {
        setCompanyId(companyRes.data.id);
        setCompany({
          name: companyRes.data.name || "",
          address: companyRes.data.address || "",
          city: companyRes.data.city || "",
          country: companyRes.data.country || "",
          phone: companyRes.data.phone || "",
          email: companyRes.data.email || "",
          website: companyRes.data.website || "",
          trn: companyRes.data.trn || "",
        });
      }

      setTotalDocs(statsRes.count || 0);

      // جلب عدد مستندات اليوم
      const today = new Date().toISOString().split("T")[0];
      const { count: todayCountVal } = await supabase
        .from("documents")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", `${today}T00:00:00`);

      setTodayCount(todayCountVal || 0);
      setLoading(false);
    };

    load();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  const startEdit = () => {
    setCompanyDraft({ ...company });
    setEditingCompany(true);
  };

  const cancelEdit = () => {
    setEditingCompany(false);
  };

  const saveCompany = async () => {
    if (!userId) return;
    setSavingCompany(true);

    const companyData = {
      user_id: userId,
      ...companyDraft
    };

    let error = null;
    if (companyId) {
      const res = await supabase.from("companies").update(companyData).eq("id", companyId);
      error = res.error;
    } else {
      const { data, error: err } = await supabase.from("companies").insert(companyData).select("id").single();
      if (data) setCompanyId(data.id);
      error = err;
    }

    if (!error) {
      setCompany({ ...companyDraft });
      setEditingCompany(false);
    }
    setSavingCompany(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse flex items-center gap-3">
           <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           Loading Dashboard...
        </div>
      </div>
    );
  }

  const isPro = profile?.plan === "pro";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
          <div className="mx-auto max-width-7xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">DOCUVAT</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isPro ? "bg-blue-500/20 border border-blue-400/30 text-blue-300" : "bg-white/10 border border-white/10 text-slate-400"
              }`}>
                {isPro && <Crown className="h-3.5 w-3.5 text-yellow-400" />}
                {isPro ? "Pro Plan" : "Free Plan"}
              </div>

              {profile?.is_admin && (
                <button
                  onClick={() => router.push("/admin")}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </button>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-1">
              Welcome, {profile?.full_name || profile?.email?.split("@")[0]} 👋
            </h1>
            <p className="text-slate-400">What would you like to create today?</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Today's Documents", value: todayCount },
              { label: "Total Documents", value: totalDocs },
              { label: "Daily Limit", value: isPro ? "∞" : `${todayCount}/1` },
              { label: "Current Plan", value: isPro ? "Pro" : "Free" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Builders */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "Tax Invoice", desc: "VAT compliant invoices", icon: Receipt, href: "/invoice", color: "from-blue-500/20 to-blue-600/20", iconColor: "text-blue-400" },
              { title: "Quotation", desc: "Professional price quotes", icon: FileText, href: "/quotation", color: "from-emerald-500/20 to-emerald-600/20", iconColor: "text-emerald-400" },
              { title: "Purchase Order", desc: "LPO for suppliers", icon: ShoppingCart, href: "/lpo", color: "from-purple-500/20 to-purple-600/20", iconColor: "text-purple-400" },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <Link key={b.title} href={b.href}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group h-full">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${b.color} flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${b.iconColor}`} />
                    </div>
                    <div className="font-semibold text-lg mb-1 group-hover:text-white transition-colors">{b.title}</div>
                    <div className="text-sm text-slate-400">{b.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Company Profile */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Company Profile</h2>
                <p className="text-xs text-slate-400 mt-0.5">Saved automatically in all your documents</p>
              </div>
              {!editingCompany ? (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-all"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10 transition-all"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={saveCompany}
                    disabled={savingCompany}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                    {savingCompany ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {!editingCompany ? (
              company.name ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
                  {[
                    { label: "Company Name", value: company.name },
                    { label: "TRN", value: company.trn },
                    { label: "Phone", value: company.phone },
                    { label: "Email", value: company.email },
                    { label: "Address", value: company.address },
                    { label: "City", value: company.city },
                    { label: "Country", value: company.country },
                    { label: "Website", value: company.website },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs text-slate-500 mb-1">{f.label}</div>
                      <div className="text-white font-medium truncate" title={f.value}>{f.value || "—"}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  No company profile yet.{" "}
                  <button onClick={startEdit} className="text-blue-400 hover:text-blue-300">
                    Add your company details
                  </button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Company Name *</label>
                  <input className={inputCls} value={companyDraft.name} onChange={(e) => setCompanyDraft({ ...companyDraft, name: e.target.value })} placeholder="Your company name" />
                </div>
                <div>
                  <label className={labelCls}>TRN</label>
                  <input className={inputCls} value={companyDraft.trn} onChange={(e) => setCompanyDraft({ ...companyDraft, trn: e.target.value })} placeholder="100234567890003" />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input className={inputCls} value={companyDraft.phone} onChange={(e) => setCompanyDraft({ ...companyDraft, phone: e.target.value })} placeholder="+971 4 123 4567" />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} value={companyDraft.email} onChange={(e) => setCompanyDraft({ ...companyDraft, email: e.target.value })} placeholder="info@company.ae" />
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <input className={inputCls} value={companyDraft.address} onChange={(e) => setCompanyDraft({ ...companyDraft, address: e.target.value })} placeholder="Street, building" />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input className={inputCls} value={companyDraft.city} onChange={(e) => setCompanyDraft({ ...companyDraft, city: e.target.value })} placeholder="Dubai" />
                </div>
                <div>
                  <label className={labelCls}>Country</label>
                  <input className={inputCls} value={companyDraft.country} onChange={(e) => setCompanyDraft({ ...companyDraft, country: e.target.value })} placeholder="United Arab Emirates" />
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <input className={inputCls} value={companyDraft.website} onChange={(e) => setCompanyDraft({ ...companyDraft, website: e.target.value })} placeholder="www.company.ae" />
                </div>
              </div>
            )}
          </div>

          {/* Upgrade banner — free only */}
          {!isPro && (
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  Upgrade to Pro
                </div>
                <div className="text-sm text-slate-400">Unlimited documents, all templates, save company profile and more.</div>
              </div>
              
              <a 
                href="https://wa.me/971501234567?text=I%20want%20to%20upgrade%20to%20DOCUVAT%20Pro%20-%2049%20AED/month"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Upgrade — 49 AED/month
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}