"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import {
  Receipt, FileText, ShoppingCart, LogOut, MessageCircle,
  Crown, Shield, Pencil, X, Check, Upload, Eye, 
  Users, BarChart3, Send, Plus, ChevronDown,
  TrendingUp, Mail, Phone, MapPin, Search
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Profile {
  full_name: string;
  email: string;
  plan: string;
  is_admin: boolean;
  numbering_style: string;
  invoice_counter: number;
  quotation_counter: number;
  lpo_counter: number;
}

interface Company {
  name: string; address: string; city: string; country: string;
  phone: string; email: string; website: string; trn: string; logo_url: string;
}

interface Document {
  id: string;
  doc_type: string;
  doc_number: string;
  doc_date: string;
  total: number;
  created_at: string;
  client_name?: string;
  client_id?: string;   // ✅ أضف السطر ده
  currency?: string;
}

interface Client {
  id: string; name: string; email: string;
  phone: string; address: string; city: string; trn: string;
  created_at: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const emptyCompany: Company = {
  name: "", address: "", city: "", country: "United Arab Emirates",
  phone: "", email: "", website: "", trn: "", logo_url: "",
};

const emptyClient: Omit<Client, "id" | "created_at"> = {
  name: "", email: "", phone: "", address: "", city: "", trn: "",
};

const inputCls = "w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
const labelCls = "block text-xs font-medium text-slate-400 mb-1";

const DOC_TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  invoice:   { label: "Tax Invoice",    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",          icon: "🧾" },
  quotation: { label: "Quotation",      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: "📋" },
  lpo:       { label: "Purchase Order", color: "text-purple-400 bg-purple-500/10 border-purple-500/20",    icon: "📦" },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function generateDocNumber(prefix: string, counter: number, style: string): string {
  const num = String(counter).padStart(4, "0");
  const year = new Date().getFullYear();
  return style === "yearly" ? `${prefix}-${year}-${num}` : `${prefix}-${num}`;
}

// ─── Tab Type ──────────────────────────────────────────────────────────────────
type Tab = "overview" | "documents" | "clients" | "reports";
export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const logoInputRef = useRef<HTMLInputElement>(null);

  // ─── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  // Company
  const [company, setCompany] = useState<Company>(emptyCompany);
  const [editingCompany, setEditingCompany] = useState(false);
  const [companyDraft, setCompanyDraft] = useState<Company>(emptyCompany);
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Documents
  const [documents, setDocuments] = useState<Document[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "invoice" | "quotation" | "lpo">("all");
  const [filterDate, setFilterDate] = useState<"all" | "today" | "month" | "last_month">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Clients
  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [showAddClient, setShowAddClient] = useState(false);
  const [clientDraft, setClientDraft] = useState(emptyClient);
  const [savingClient, setSavingClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState("");
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [emailTarget, setEmailTarget] = useState<{ docId: string; email: string } | null>(null);

  // Numbering
  const [numberingStyle, setNumberingStyle] = useState<"simple" | "yearly">("simple");
  const [savingStyle, setSavingStyle] = useState(false);

  // ─── Load Data ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [profileRes, companyRes, statsRes, docsRes, clientsRes] = await Promise.all([
        supabase.from("profiles").select("full_name,email,plan,is_admin,numbering_style,invoice_counter,quotation_counter,lpo_counter").eq("id", user.id).single(),
        supabase.from("companies").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("documents").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("documents").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(200),
        supabase.from("clients").select("*").eq("user_id", user.id).order("name"),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        setNumberingStyle((profileRes.data.numbering_style as "simple" | "yearly") ?? "simple");
      }

      if (companyRes.data) {
        setCompanyId(companyRes.data.id);
        const c: Company = {
          name: companyRes.data.name || "", address: companyRes.data.address || "",
          city: companyRes.data.city || "", country: companyRes.data.country || "",
          phone: companyRes.data.phone || "", email: companyRes.data.email || "",
          website: companyRes.data.website || "", trn: companyRes.data.trn || "",
          logo_url: companyRes.data.logo_url || "",
        };
        setCompany(c);
        if (c.logo_url) setLogoPreview(c.logo_url);
      }

      setTotalDocs(statsRes.count || 0);
      setDocuments(docsRes.data || []);
      setDocsLoading(false);
      setClients(clientsRes.data || []);
      setClientsLoading(false);

      const today = new Date().toISOString().split("T")[0];
      const { count: todayCountVal } = await supabase.from("documents")
        .select("id", { count: "exact", head: true }).eq("user_id", user.id)
        .gte("created_at", `${today}T00:00:00`);
      setTodayCount(todayCountVal || 0);
      setLoading(false);
    };
    load();
  }, []);

  // ─── Filtered Docs ──────────────────────────────────────────────────────────
  const filteredDocs = documents.filter((doc) => {
    if (filterType !== "all" && doc.doc_type !== filterType) return false;
    if (filterDate !== "all") {
      const docDate = new Date(doc.created_at);
      const now = new Date();
      if (filterDate === "today") {
        if (!doc.created_at.startsWith(new Date().toISOString().split("T")[0])) return false;
      } else if (filterDate === "month") {
        if (docDate.getMonth() !== now.getMonth() || docDate.getFullYear() !== now.getFullYear()) return false;
      } else if (filterDate === "last_month") {
        const lm = new Date(now.getFullYear(), now.getMonth() - 1);
        if (docDate.getMonth() !== lm.getMonth() || docDate.getFullYear() !== lm.getFullYear()) return false;
      }
    }
    if (searchQuery) return doc.doc_number.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const filteredTotal = filteredDocs.reduce((s, d) => s + (d.total || 0), 0);

  // ─── Reports Data ────────────────────────────────────────────────────────────
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const month = d.getMonth();
    const year = d.getFullYear();
    const total = documents
      .filter((doc) => {
        const dd = new Date(doc.created_at);
        return dd.getMonth() === month && dd.getFullYear() === year && doc.doc_type === "invoice";
      })
      .reduce((s, doc) => s + (doc.total || 0), 0);
    return { month: MONTHS[month], year, total };
  });

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.total), 1);

  const totalRevenue = documents.filter((d) => d.doc_type === "invoice").reduce((s, d) => s + (d.total || 0), 0);
  const totalInvoices = documents.filter((d) => d.doc_type === "invoice").length;
  const totalQuotations = documents.filter((d) => d.doc_type === "quotation").length;
  const totalLPOs = documents.filter((d) => d.doc_type === "lpo").length;

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const saveCompany = async () => {
    if (!userId) return;
    setSavingCompany(true);
    const companyData = { user_id: userId, ...companyDraft, logo_url: company.logo_url };
    if (companyId) {
      await supabase.from("companies").update(companyData).eq("id", companyId);
    } else {
      const { data } = await supabase.from("companies").insert(companyData).select("id").single();
      if (data) setCompanyId(data.id);
    }
    setCompany({ ...companyDraft, logo_url: company.logo_url });
    setEditingCompany(false);
    setSavingCompany(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploadingLogo(true);
    const ext = file.name.split(".").pop();
    const path = `${userId}/logo.${ext}`;
    const { error } = await supabase.storage.from("logos").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("logos").getPublicUrl(path);
      const logoUrl = `${data.publicUrl}?t=${Date.now()}`;
      if (companyId) await supabase.from("companies").update({ logo_url: logoUrl }).eq("id", companyId);
      setCompany((prev) => ({ ...prev, logo_url: logoUrl }));
      setLogoPreview(logoUrl);
    }
    setUploadingLogo(false);
  };

  const saveClient = async () => {
    if (!userId || !clientDraft.name) return;
    setSavingClient(true);
    const { data } = await supabase.from("clients").insert({ user_id: userId, ...clientDraft }).select().single();
    if (data) setClients((prev) => [data, ...prev]);
    setClientDraft(emptyClient);
    setShowAddClient(false);
    setSavingClient(false);
  };

  const deleteClient = async (id: string) => {
  await supabase.from("clients").delete().eq("id", id);
  setClients((prev) => prev.filter((c) => c.id !== id));
  if (selectedClient?.id === id) setSelectedClient(null);
  setDeletingClientId(null);
};
const updateClient = async () => {
  if (!editingClientId || !clientDraft.name) return;
  setSavingClient(true);
  await supabase.from("clients").update(clientDraft).eq("id", editingClientId);
  setClients((prev) => prev.map((c) => c.id === editingClientId ? { ...c, ...clientDraft } : c));
  if (selectedClient?.id === editingClientId) setSelectedClient((prev) => prev ? { ...prev, ...clientDraft } : prev);
  setEditingClientId(null);
  setShowAddClient(false);
  setSavingClient(false);
};

  const sendEmail = async (doc: Document, toEmail: string) => {
    if (!toEmail) return;
    setSendingEmail(doc.id);
    try {
      await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toEmail,
          docNumber: doc.doc_number,
          docType: doc.doc_type,
          total: doc.total,
          currency: doc.currency || "AED",
          companyName: company.name || "DOCUVAT",
        }),
      });
      alert(`✅ Email sent to ${toEmail}`);
    } catch {
      alert("❌ Failed to send email");
    }
    setSendingEmail(null);
    setEmailTarget(null);
  };

  const shareWhatsApp = (doc: Document) => {
    const msg = encodeURIComponent(
      `Hi, please find your ${doc.doc_type === "invoice" ? "Tax Invoice" : doc.doc_type === "quotation" ? "Quotation" : "Purchase Order"} ${doc.doc_number} from ${company.name || "DOCUVAT"}.\nTotal: ${(doc.total || 0).toLocaleString("en-AE", { minimumFractionDigits: 2 })} ${doc.currency || "AED"}\n\nGenerated via DOCUVAT: https://www.docuvat.com`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const saveNumberingStyle = async () => {
    if (!userId) return;
    setSavingStyle(true);
    await supabase.from("profiles").update({ numbering_style: numberingStyle }).eq("id", userId);
    setSavingStyle(false);
  };

  const openDocument = (doc: Document) => {
    router.push(`/${doc.doc_type}?docId=${doc.id}`);
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email?.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const clientDocs = selectedClient
    ? documents.filter((d) => d.client_name === selectedClient.name)
    : [];

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse flex items-center gap-3">
          <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const isPro = profile?.plan === "pro";
  const invCounter = (profile?.invoice_counter || 0) + 1;
  const qtCounter  = (profile?.quotation_counter || 0) + 1;
  const poCounter  = (profile?.lpo_counter || 0) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)]" />

      <div className="relative z-10">

        {/* ── Header ── */}
        <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
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

            {/* Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              {([
                { id: "overview",  label: "Overview",  icon: BarChart3 },
                { id: "documents", label: "Documents",  icon: FileText },
                { id: "clients",   label: "Clients",    icon: Users },
                { id: "reports",   label: "Reports",    icon: TrendingUp },
              ] as { id: Tab; label: string; icon: React.ElementType }[]).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"
                    }`}>
                    <Icon className="h-4 w-4" />{tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isPro ? "bg-blue-500/20 border border-blue-400/30 text-blue-300" : "bg-white/10 border border-white/10 text-slate-400"
              }`}>
                {isPro && <Crown className="h-3.5 w-3.5 text-yellow-400" />}
                {isPro ? "Pro" : "Free"}
              </div>
              {profile?.is_admin && (
                <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                  <Shield className="h-4 w-4" />
                </button>
              )}
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">

          {/* ══ OVERVIEW TAB ══════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Welcome, {profile?.full_name || profile?.email?.split("@")[0]} 👋</h1>
                <p className="text-slate-400">Here's your business overview</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Revenue", value: `${totalRevenue.toLocaleString("en-AE", { minimumFractionDigits: 0 })} AED`, sub: "From invoices" },
                  { label: "Total Documents", value: totalDocs, sub: "All time" },
                  { label: "Today's Docs", value: todayCount, sub: isPro ? "Unlimited" : `${todayCount}/1 daily` },
                  { label: "Clients", value: clients.length, sub: "Saved" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {[
                  { title: "Tax Invoice",    desc: "VAT compliant invoices", icon: Receipt,      href: "/invoice",    color: "from-blue-500/20 to-blue-600/20",     iconColor: "text-blue-400" },
                  { title: "Quotation",      desc: "Professional quotes",    icon: FileText,     href: "/quotation",  color: "from-emerald-500/20 to-emerald-600/20", iconColor: "text-emerald-400" },
                  { title: "Purchase Order", desc: "LPO for suppliers",      icon: ShoppingCart, href: "/lpo",        color: "from-purple-500/20 to-purple-600/20",  iconColor: "text-purple-400" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <Link key={b.title} href={b.href}>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group h-full">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${b.color} flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${b.iconColor}`} />
                        </div>
                        <div className="font-semibold text-lg mb-1">{b.title}</div>
                        <div className="text-sm text-slate-400">{b.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Doc Type Breakdown */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Invoices",        value: totalInvoices,   color: "bg-blue-500" },
                  { label: "Quotations",      value: totalQuotations, color: "bg-emerald-500" },
                  { label: "Purchase Orders", value: totalLPOs,       color: "bg-purple-500" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg ${s.color}/20 flex items-center justify-center`}>
                      <div className={`h-3 w-3 rounded-full ${s.color}`} />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Profile */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">Company Profile</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Saved in all your documents</p>
                  </div>
                  {!editingCompany ? (
                    <button onClick={() => { setCompanyDraft({ ...company }); setEditingCompany(true); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-all">
                      <Pencil className="h-4 w-4" />Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditingCompany(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10">
                        <X className="h-4 w-4" />Cancel
                      </button>
                      <button onClick={saveCompany} disabled={savingCompany} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                        <Check className="h-4 w-4" />{savingCompany ? "Saving..." : "Save"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Logo */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-28 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden"
                    onClick={() => logoInputRef.current?.click()}>
                    {logoPreview
                      ? <img src={logoPreview} alt="logo" className="max-h-14 max-w-full object-contain p-1" />
                      : <div className="text-center"><Upload className="h-5 w-5 text-slate-400 mx-auto mb-1" /><div className="text-xs text-slate-500">Upload</div></div>}
                  </div>
                  <button onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-all disabled:opacity-50">
                    <Upload className="h-4 w-4" />{uploadingLogo ? "Uploading..." : logoPreview ? "Change Logo" : "Upload Logo"}
                  </button>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </div>

                {!editingCompany ? (
                  company.name ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
                      {[
                        { label: "Company Name", value: company.name },
                        { label: "TRN",          value: company.trn },
                        { label: "Phone",        value: company.phone },
                        { label: "Email",        value: company.email },
                        { label: "Address",      value: company.address },
                        { label: "City",         value: company.city },
                        { label: "Country",      value: company.country },
                        { label: "Website",      value: company.website },
                      ].map((f) => (
                        <div key={f.label}>
                          <div className="text-xs text-slate-500 mb-1">{f.label}</div>
                          <div className="text-white font-medium truncate">{f.value || "—"}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-sm">
                      No company profile yet.{" "}
                      <button onClick={() => { setCompanyDraft({ ...company }); setEditingCompany(true); }} className="text-blue-400 hover:text-blue-300">Add details</button>
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[
    { label: "Company Name *", key: "name", placeholder: "Your company name" },
    { label: "TRN", key: "trn", placeholder: "100234567890003" },
    { label: "Phone", key: "phone", placeholder: "+971 4 123 4567" },
    { label: "Email", key: "email", placeholder: "info@company.ae" },
    { label: "Address", key: "address", placeholder: "Street, building" },
    { label: "City", key: "city", placeholder: "Dubai" },
    { label: "Country", key: "country", placeholder: "United Arab Emirates" },
    { label: "Website", key: "website", placeholder: "www.company.ae" },
  ].map((f) => (
    <div key={f.key}>
      <label className={labelCls}>{f.label}</label>

      <input
        className={inputCls}
        value={companyDraft[f.key as keyof typeof companyDraft] || ""}
        placeholder={f.placeholder}
        onChange={(e) =>
          setCompanyDraft({
            ...companyDraft,
            [f.key]: e.target.value,
          })
        }
      />
    </div>
  ))}
</div>
                )}
              </div>
            </div>
          )}

          {/* ══ DOCUMENTS TAB ═════════════════════════════════════════════════ */}
          {activeTab === "documents" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Documents</h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {filteredDocs.length} documents · Total: {filteredTotal.toLocaleString("en-AE", { minimumFractionDigits: 2 })} AED
                  </p>
                </div>
                <Link href="/invoice">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition-all">
                    <Plus className="h-4 w-4" /> New Document
                  </button>
                </Link>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex-1 min-w-[180px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by number..." value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
                </div>
                <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                  {[
                    { id: "all", label: "All" },
                    { id: "invoice", label: "🧾 Invoice" },
                    { id: "quotation", label: "📋 Quote" },
                    { id: "lpo", label: "📦 LPO" },
                  ].map((f) => (
                    <button key={f.id} onClick={() => { setFilterType(f.id as typeof filterType); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterType === f.id ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                  {[
                    { id: "all", label: "All Time" },
                    { id: "today", label: "Today" },
                    { id: "month", label: "This Month" },
                    { id: "last_month", label: "Last Month" },
                  ].map((f) => (
                    <button key={f.id} onClick={() => { setFilterDate(f.id as typeof filterDate); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterDate === f.id ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Modal */}
              {emailTarget && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                    <h3 className="text-lg font-bold mb-4">Send via Email</h3>
                    <label className={labelCls}>Recipient Email</label>
                    <input className={inputCls} type="email" placeholder="client@example.com"
                      value={emailTarget.email}
                      onChange={(e) => setEmailTarget({ ...emailTarget, email: e.target.value })} />
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setEmailTarget(null)} className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10">Cancel</button>
                      <button
                        disabled={!!sendingEmail || !emailTarget.email}
                        onClick={() => {
                          const doc = documents.find((d) => d.id === emailTarget.docId);
                          if (doc) sendEmail(doc, emailTarget.email);
                        }}
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                        {sendingEmail ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">Number</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2 text-right">Amount</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {docsLoading ? (
                  <div className="text-center py-12 text-slate-500 text-sm animate-pulse">Loading...</div>
                ) : paginatedDocs.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    {searchQuery || filterType !== "all" || filterDate !== "all"
                      ? "No documents match your filters."
                      : <><Link href="/invoice" className="text-blue-400 hover:text-blue-300">Create your first document</Link></>}
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {paginatedDocs.map((doc, idx) => {
                      const typeInfo = DOC_TYPE_LABELS[doc.doc_type] || DOC_TYPE_LABELS.invoice;
                      return (
                        <div key={doc.id} className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 hover:bg-white/[0.04] transition-all group">
                          <div className="col-span-1 text-xs text-slate-600">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</div>
                          <div className="col-span-3 font-mono text-sm text-white font-medium">{doc.doc_number}</div>
                          <div className="col-span-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeInfo.color}`}>
                              {typeInfo.icon} {typeInfo.label}
                            </span>
                          </div>
                          <div className="col-span-2 text-xs text-slate-400">
                            {new Date(doc.created_at).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                          <div className="col-span-2 text-right">
                            <div className="text-sm font-semibold text-white">{(doc.total || 0).toLocaleString("en-AE", { minimumFractionDigits: 2 })}</div>
                            <div className="text-xs text-slate-500">{doc.currency || "AED"}</div>
                          </div>
                          <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => openDocument(doc)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all" title="Open">
                              <Eye className="h-3.5 w-3.5 text-slate-300" />
                            </button>
                            <button onClick={() => setEmailTarget({ docId: doc.id, email: "" })} className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/30 transition-all" title="Send Email">
                              <Mail className="h-3.5 w-3.5 text-blue-400" />
                            </button>
                            <button onClick={() => shareWhatsApp(doc)} className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/30 transition-all" title="WhatsApp">
                              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
                    <div className="text-xs text-slate-500">Page {currentPage} of {totalPages}</div>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:bg-white/10 disabled:opacity-30">← Prev</button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (page > totalPages) return null;
                        return (
                          <button key={page} onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${currentPage === page ? "bg-blue-500 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10"}`}>
                            {page}
                          </button>
                        );
                      })}
                      <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:bg-white/10 disabled:opacity-30">Next →</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ CLIENTS TAB ═══════════════════════════════════════════════════ */}

    {activeTab === "clients" && (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Clients</h2>
        <p className="text-sm text-slate-400 mt-0.5">{clients.length} clients</p>
      </div>
      <button onClick={() => { setClientDraft(emptyClient); setShowAddClient(true); }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition-all">
        <Plus className="h-4 w-4" /> Add Client
      </button>
    </div>

    {/* Add / Edit Client Modal */}
    {showAddClient && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold">
              {editingClientId ? "Edit Client" : "Add New Client"}
            </h3>
            <button onClick={() => { setShowAddClient(false); setEditingClientId(null); }}
              className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Name *",  key: "name",    placeholder: "Al Noor Trading" },
              { label: "Email",   key: "email",   placeholder: "info@client.ae" },
              { label: "Phone",   key: "phone",   placeholder: "+971 4 123 4567" },
              { label: "TRN",     key: "trn",     placeholder: "100234567890003" },
              { label: "Address", key: "address", placeholder: "Street, building" },
              { label: "City",    key: "city",    placeholder: "Dubai" },
            ].map((f) => (
              <div key={f.key}>
                <label className={labelCls}>{f.label}</label>
                <input className={inputCls} placeholder={f.placeholder}
                  value={(clientDraft as Record<string, string>)[f.key]}
                  onChange={(e) => setClientDraft({ ...clientDraft, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={() => { setShowAddClient(false); setEditingClientId(null); }}
              className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10">
              Cancel
            </button>
            <button onClick={editingClientId ? updateClient : saveClient}
              disabled={savingClient || !clientDraft.name}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              {savingClient ? "Saving..." : editingClientId ? "Update Client" : "Save Client"}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {deletingClientId && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold mb-2">Delete Client?</h3>
          <p className="text-slate-400 text-sm mb-6">This will delete the client but not their documents.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeletingClientId(null)}
              className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10">
              Cancel
            </button>
            <button onClick={() => deleteClient(deletingClientId)}
              className="flex-1 py-2.5 rounded-lg bg-red-500 text-sm font-semibold hover:bg-red-600 transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="grid md:grid-cols-3 gap-6">

      {/* Client List */}
      <div className="md:col-span-1 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search clients..." value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)} />
        </div>

        {clientsLoading ? (
          <div className="text-center py-8 text-slate-500 text-sm animate-pulse">Loading...</div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            {clientSearch ? "No clients found." : (
              <button onClick={() => setShowAddClient(true)} className="text-blue-400 hover:text-blue-300">
                Add your first client
              </button>
            )}
          </div>
        ) : filteredClients.map((client) => {
          const clientDocCount = documents.filter((d) => d.client_id === client.id).length;
          const clientTotal = documents.filter((d) => d.client_id === client.id).reduce((s, d) => s + (d.total || 0), 0);
          return (
            <div key={client.id}
              onClick={() => setSelectedClient(selectedClient?.id === client.id ? null : client)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedClient?.id === client.id
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{client.name}</div>
                  {client.email && <div className="text-xs text-slate-400 mt-0.5 truncate">{client.email}</div>}
                  {client.city && <div className="text-xs text-slate-500">{client.city}</div>}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-blue-400">{clientDocCount} docs</span>
                    {clientTotal > 0 && (
                      <span className="text-xs text-emerald-400">
                        {clientTotal.toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setClientDraft({
                        name: client.name, email: client.email || "",
                        phone: client.phone || "", address: client.address || "",
                        city: client.city || "", trn: client.trn || "",
                      });
                      setEditingClientId(client.id);
                      setShowAddClient(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletingClientId(client.id); }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Detail & Report */}
      <div className="md:col-span-2">
        {selectedClient ? (() => {
          const clientDocuments = documents.filter((d) => d.client_id === selectedClient.id);
          const clientRevenue = clientDocuments.filter((d) => d.doc_type === "invoice").reduce((s, d) => s + (d.total || 0), 0);
          const clientInvoices = clientDocuments.filter((d) => d.doc_type === "invoice").length;
          const clientQuotes = clientDocuments.filter((d) => d.doc_type === "quotation").length;
          const clientLPOs = clientDocuments.filter((d) => d.doc_type === "lpo").length;
          const lastDoc = clientDocuments[0];

          // Monthly revenue for this client (last 6 months)
          const clientMonthly = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            const month = d.getMonth();
            const year = d.getFullYear();
            const total = clientDocuments
              .filter((doc) => {
                const dd = new Date(doc.created_at);
                return dd.getMonth() === month && dd.getFullYear() === year && doc.doc_type === "invoice";
              })
              .reduce((s, doc) => s + (doc.total || 0), 0);
            return { month: MONTHS[month], total };
          });
          const maxClientRevenue = Math.max(...clientMonthly.map((m) => m.total), 1);

          return (
            <div className="space-y-5">

              {/* Client Header */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-400">
                      {selectedClient.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />{selectedClient.email}
                        </span>
                      )}
                      {selectedClient.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />{selectedClient.phone}
                        </span>
                      )}
                      {selectedClient.city && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />{selectedClient.city}
                        </span>
                      )}
                      {selectedClient.trn && (
                        <span className="text-blue-400 text-xs font-mono">TRN: {selectedClient.trn}</span>
                      )}
                    </div>
                  </div>

                  {/* New Invoice Button */}
                  <div className="flex gap-2">
                    <Link href={`/invoice?clientId=${selectedClient.id}`}>
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-semibold hover:opacity-90 transition-all whitespace-nowrap">
    <Receipt className="h-3.5 w-3.5" /> New Invoice
  </button>
</Link>
                    <Link href={`/quotation?clientId=${selectedClient.id}`}>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold hover:bg-white/20 transition-all whitespace-nowrap">
                        <FileText className="h-3.5 w-3.5" /> Quote
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Client Stats */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Revenue",   value: `${clientRevenue.toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED`, color: "text-emerald-400" },
                    { label: "Invoices",  value: clientInvoices,  color: "text-blue-400" },
                    { label: "Quotes",    value: clientQuotes,    color: "text-yellow-400" },
                    { label: "LPOs",      value: clientLPOs,      color: "text-purple-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Chart */}
              {clientRevenue > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h4 className="font-semibold text-sm mb-4">Revenue (Last 6 Months)</h4>
                  <div className="flex items-end gap-3 h-28">
                    {clientMonthly.map((m, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="text-xs text-slate-500">
                          {m.total > 0 ? `${(m.total / 1000).toFixed(1)}k` : ""}
                        </div>
                        <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-emerald-500 min-h-[3px] transition-all duration-500"
                          style={{ height: `${Math.max((m.total / maxClientRevenue) * 90, 3)}px` }} />
                        <div className="text-xs text-slate-500">{m.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Documents ({clientDocuments.length})</h4>
                  {lastDoc && (
                    <span className="text-xs text-slate-500">
                      Last: {new Date(lastDoc.created_at).toLocaleDateString("en-AE", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>

                {clientDocuments.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    No documents yet.{" "}
                    <Link href={`/invoice?clientId=${selectedClient.id}`} className="text-blue-400 hover:text-blue-300">
                      Create first invoice
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {clientDocuments.slice(0, 10).map((doc) => {
                      const typeInfo = DOC_TYPE_LABELS[doc.doc_type];
                      return (
                        <div key={doc.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeInfo.color}`}>
                              {typeInfo.icon}
                            </span>
                            <div>
                              <div className="font-mono text-xs text-white font-medium">{doc.doc_number}</div>
                              <div className="text-xs text-slate-500">
                                {new Date(doc.created_at).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm font-semibold text-white">
                                {(doc.total || 0).toLocaleString("en-AE", { minimumFractionDigits: 2 })}
                              </div>
                              <div className="text-xs text-slate-500">{doc.currency || "AED"}</div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => openDocument(doc)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15">
                                <Eye className="h-3.5 w-3.5 text-slate-300" />
                              </button>
                              <button onClick={() => setEmailTarget({ docId: doc.id, email: selectedClient.email || "" })}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/30">
                                <Mail className="h-3.5 w-3.5 text-blue-400" />
                              </button>
                              <button onClick={() => shareWhatsApp(doc)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/30">
                                <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          );
        })() : (
          <div className="rounded-2xl border border-white/10 bg-white/5 h-full min-h-[300px] flex items-center justify-center p-10">
            <div className="text-center text-slate-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Select a client to view their profile and reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

          {/* ══ REPORTS TAB ═══════════════════════════════════════════════════ */}
          {activeTab === "reports" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Reports</h2>
                <p className="text-sm text-slate-400 mt-0.5">Business insights and revenue analytics</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Revenue",    value: `${totalRevenue.toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED`, color: "text-emerald-400" },
                  { label: "Total Invoices",   value: totalInvoices,   color: "text-blue-400" },
                  { label: "Total Quotations", value: totalQuotations, color: "text-yellow-400" },
                  { label: "Purchase Orders",  value: totalLPOs,       color: "text-purple-400" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className={`text-2xl font-extrabold mb-1 ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Revenue Chart */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8">
                <h3 className="text-lg font-bold mb-6">Monthly Revenue (Last 6 Months)</h3>
                <div className="flex items-end gap-4 h-48">
                  {monthlyRevenue.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs text-slate-400 font-medium">
                        {m.total > 0 ? `${(m.total / 1000).toFixed(1)}k` : "0"}
                      </div>
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-emerald-500 transition-all duration-500 min-h-[4px]"
                        style={{ height: `${Math.max((m.total / maxRevenue) * 160, 4)}px` }} />
                      <div className="text-xs text-slate-500">{m.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-bold mb-5">Document Breakdown</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Tax Invoices",    value: totalInvoices,   total: documents.length, color: "bg-blue-500" },
                      { label: "Quotations",      value: totalQuotations, total: documents.length, color: "bg-emerald-500" },
                      { label: "Purchase Orders", value: totalLPOs,       total: documents.length, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-300">{item.label}</span>
                          <span className="text-white font-semibold">{item.value}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full transition-all duration-700`}
                            style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-bold mb-5">This Month</h3>
                  <div className="space-y-4">
                    {(() => {
                      const now = new Date();
                      const thisMonth = documents.filter((d) => {
                        const dd = new Date(d.created_at);
                        return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
                      });
                      const monthRevenue = thisMonth.filter((d) => d.doc_type === "invoice").reduce((s, d) => s + (d.total || 0), 0);
                      return [
                        { label: "Documents Created", value: thisMonth.length },
                        { label: "Invoices",          value: thisMonth.filter((d) => d.doc_type === "invoice").length },
                        { label: "Revenue",           value: `${monthRevenue.toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED` },
                        { label: "Avg Invoice Value", value: thisMonth.filter((d) => d.doc_type === "invoice").length > 0
                          ? `${(monthRevenue / thisMonth.filter((d) => d.doc_type === "invoice").length).toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED`
                          : "—" },
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-slate-400">{s.label}</span>
                          <span className="text-sm font-semibold text-white">{s.value}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Upgrade Banner ── */}
          {!isPro && (
            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" /> Upgrade to Pro
                </div>
                <div className="text-sm text-slate-400">Unlimited documents, all templates, clients management and more.</div>
              </div>
              <a href="https://wa.me/971505348284?text=I%20want%20to%20upgrade%20to%20DOCUVAT%20Pro"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-all">
                <Crown className="h-4 w-4" /> Upgrade — 39 AED/month
              </a>
            </div>
          )}

          {/* ── Numbering Style ── */}
          {activeTab === "overview" && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Invoice Numbering</h2>
                <p className="text-xs text-slate-400 mt-0.5">Choose how document numbers are generated</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {(["simple", "yearly"] as const).map((style) => (
                  <button key={style} onClick={() => setNumberingStyle(style)}
                    className={`p-4 rounded-xl border text-left transition-all ${numberingStyle === style ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"}`}>
                    <div className="font-semibold text-sm mb-2">{style === "simple" ? "Simple" : "With Year"}</div>
                    <div className="space-y-1">
                      {[["INV", invCounter], ["QT", qtCounter], ["PO", poCounter]].map(([p, c]) => (
                        <div key={p} className="text-xs opacity-70 font-mono">{generateDocNumber(String(p), Number(c), style)}</div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={saveNumberingStyle} disabled={savingStyle}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                <Check className="h-4 w-4" />{savingStyle ? "Saving..." : "Save Style"}
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}