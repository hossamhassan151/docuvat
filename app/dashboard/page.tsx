"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Script from "next/script"; // أضفت هذا لربطه بجوجل أناليتكس لو احتجت
import {
  Receipt, FileText, ShoppingCart, LogOut, MessageCircle,
  Crown, Shield, Pencil, X, Check, Upload, Eye
} from "lucide-react";

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
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  trn: string;
  logo_url: string;
}

interface Document {
  id: string;
  doc_type: string;
  doc_number: string;
  doc_date: string;
  total: number;
  created_at: string;
}

const emptyCompany: Company = {
  name: "", address: "", city: "", country: "United Arab Emirates",
  phone: "", email: "", website: "", trn: "", logo_url: "",
};

const inputCls = "w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
const labelCls = "block text-xs font-medium text-slate-400 mb-1";

const DOC_TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  invoice:   { label: "Tax Invoice",    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",          icon: "🧾" },
  quotation: { label: "Quotation",      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: "📋" },
  lpo:       { label: "Purchase Order", color: "text-purple-400 bg-purple-500/10 border-purple-500/20",    icon: "📦" },
};

function generateDocNumber(prefix: string, counter: number, style: string): string {
  const num = String(counter).padStart(4, "0");
  const year = new Date().getFullYear();
  return style === "yearly" ? `${prefix}-${year}-${num}` : `${prefix}-${num}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const logoInputRef = useRef<HTMLInputElement>(null);

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
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);

  const [numberingStyle, setNumberingStyle] = useState<"simple" | "yearly">("simple");
  const [savingStyle, setSavingStyle] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [profileRes, companyRes, statsRes] = await Promise.all([
        supabase.from("profiles")
          .select("full_name, email, plan, is_admin, numbering_style, invoice_counter, quotation_counter, lpo_counter")
          .eq("id", user.id).single(),
        supabase.from("companies").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("documents").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        if (profileRes.data.numbering_style) {
          setNumberingStyle(profileRes.data.numbering_style as "simple" | "yearly");
        }
      }

      if (companyRes.data) {
        setCompanyId(companyRes.data.id);
        const c = {
          name: companyRes.data.name || "",
          address: companyRes.data.address || "",
          city: companyRes.data.city || "",
          country: companyRes.data.country || "",
          phone: companyRes.data.phone || "",
          email: companyRes.data.email || "",
          website: companyRes.data.website || "",
          trn: companyRes.data.trn || "",
          logo_url: companyRes.data.logo_url || "",
        };
        setCompany(c);
        if (c.logo_url) setLogoPreview(c.logo_url);
      }

      setTotalDocs(statsRes.count || 0);

      const today = new Date().toISOString().split("T")[0];
      const { count: todayCountVal } = await supabase
        .from("documents").select("id", { count: "exact", head: true })
        .eq("user_id", user.id).gte("created_at", `${today}T00:00:00`);
      setTodayCount(todayCountVal || 0);

      const { data: docs } = await supabase
        .from("documents").select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);
      setDocuments(docs || []);
      setDocsLoading(false);
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

  const cancelEdit = () => setEditingCompany(false);

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
      if (companyId) {
        await supabase.from("companies").update({ logo_url: logoUrl }).eq("id", companyId);
      } else {
        const { data: newComp } = await supabase.from("companies")
          .insert({ user_id: userId, logo_url: logoUrl }).select("id").single();
        if (newComp) setCompanyId(newComp.id);
      }
      setCompany((prev) => ({ ...prev, logo_url: logoUrl }));
      setLogoPreview(logoUrl);
    }
    setUploadingLogo(false);
  };

  const openDocument = (doc: Document) => {
    router.push(`/${doc.doc_type}?docId=${doc.id}`);
  };

  const saveNumberingStyle = async () => {
    if (!userId) return;
    setSavingStyle(true);
    await supabase.from("profiles").update({ numbering_style: numberingStyle }).eq("id", userId);
    setSavingStyle(false);
  };

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

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isPro ? "bg-blue-500/20 border border-blue-400/30 text-blue-300" : "bg-white/10 border border-white/10 text-slate-400"
              }`}>
                {isPro && <Crown className="h-3.5 w-3.5 text-yellow-400" />}
                {isPro ? "Pro Plan" : "Free Plan"}
              </div>

              {profile?.is_admin && (
                <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                  <Shield className="h-4 w-4" />Admin
                </button>
              )}

              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-1">
              Welcome, {profile?.full_name || profile?.email?.split("@")[0]} 👋
            </h1>
            <p className="text-slate-400">What would you like to create today?</p>
          </div>

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

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-10">
            <h2 className="text-lg font-bold">Recent Documents</h2>
            <p className="text-xs text-slate-400 mt-0.5 mb-6">Your last 20 documents</p>

            {docsLoading ? (
              <div className="text-center py-8 text-slate-500 text-sm animate-pulse">Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No documents yet.{" "}
                <Link href="/invoice" className="text-blue-400 hover:text-blue-300">Create your first invoice</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => {
                  const typeInfo = DOC_TYPE_LABELS[doc.doc_type] || DOC_TYPE_LABELS.invoice;
                  return (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{typeInfo.icon}</span>
                        <div>
                          <div className="font-medium text-sm text-white">{doc.doc_number}</div>
                          <div className="text-xs text-slate-400">{doc.doc_date}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-semibold text-white hidden sm:block">
                          {(doc.total || 0).toLocaleString("en-AE", { minimumFractionDigits: 2 })} AED
                        </div>
                        <button
                          onClick={() => openDocument(doc)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-all"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Open
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Company Profile</h2>
                <p className="text-xs text-slate-400 mt-0.5">Saved automatically in all your documents</p>
              </div>
              {!editingCompany ? (
                <button onClick={startEdit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-all">
                  <Pencil className="h-4 w-4" />Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={cancelEdit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:bg-white/10 transition-all">
                    <X className="h-4 w-4" />Cancel
                  </button>
                  <button onClick={saveCompany} disabled={savingCompany} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50">
                    <Check className="h-4 w-4" />
                    {savingCompany ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className={labelCls}>Company Logo</label>
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-28 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden"
                  onClick={() => logoInputRef.current?.click()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="logo" className="max-h-14 max-w-full object-contain p-1" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                      <div className="text-xs text-slate-500">Upload</div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-all disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingLogo ? "Uploading..." : logoPreview ? "Change Logo" : "Upload Logo"}
                  </button>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </div>
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
                  <button onClick={startEdit} className="text-blue-400 hover:text-blue-300">Add your company details</button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Company Name *</label><input className={inputCls} value={companyDraft.name} onChange={(e) => setCompanyDraft({ ...companyDraft, name: e.target.value })} placeholder="Your company name" /></div>
                <div><label className={labelCls}>TRN</label><input className={inputCls} value={companyDraft.trn} onChange={(e) => setCompanyDraft({ ...companyDraft, trn: e.target.value })} placeholder="100234567890003" /></div>
                <div><label className={labelCls}>Phone</label><input className={inputCls} value={companyDraft.phone} onChange={(e) => setCompanyDraft({ ...companyDraft, phone: e.target.value })} placeholder="+971 4 123 4567" /></div>
                <div><label className={labelCls}>Email</label><input className={inputCls} value={companyDraft.email} onChange={(e) => setCompanyDraft({ ...companyDraft, email: e.target.value })} placeholder="info@company.ae" /></div>
                <div><label className={labelCls}>Address</label><input className={inputCls} value={companyDraft.address} onChange={(e) => setCompanyDraft({ ...companyDraft, address: e.target.value })} placeholder="Street, building" /></div>
                <div><label className={labelCls}>City</label><input className={inputCls} value={companyDraft.city} onChange={(e) => setCompanyDraft({ ...companyDraft, city: e.target.value })} placeholder="Dubai" /></div>
                <div><label className={labelCls}>Country</label><input className={inputCls} value={companyDraft.country} onChange={(e) => setCompanyDraft({ ...companyDraft, country: e.target.value })} placeholder="United Arab Emirates" /></div>
                <div><label className={labelCls}>Website</label><input className={inputCls} value={companyDraft.website} onChange={(e) => setCompanyDraft({ ...companyDraft, website: e.target.value })} placeholder="www.company.ae" /></div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-10">
            <div className="mb-4">
              <h2 className="text-lg font-bold">Invoice Numbering</h2>
              <p className="text-xs text-slate-400 mt-0.5">Choose how your document numbers are generated automatically</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setNumberingStyle("simple")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  numberingStyle === "simple"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="font-semibold text-sm mb-2">Simple</div>
                <div className="space-y-1">
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("INV", invCounter, "simple")}</div>
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("QT", qtCounter, "simple")}</div>
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("PO", poCounter, "simple")}</div>
                </div>
              </button>

              <button
                onClick={() => setNumberingStyle("yearly")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  numberingStyle === "yearly"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className="font-semibold text-sm mb-2">With Year</div>
                <div className="space-y-1">
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("INV", invCounter, "yearly")}</div>
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("QT", qtCounter, "yearly")}</div>
                  <div className="text-xs opacity-70 font-mono">{generateDocNumber("PO", poCounter, "yearly")}</div>
                </div>
              </button>
            </div>

            <button
              onClick={saveNumberingStyle}
              disabled={savingStyle}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              {savingStyle ? "Saving..." : "Save Numbering Style"}
            </button>
          </div>

          {!isPro && (
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" /> Upgrade to Pro
                </div>
                <div className="text-sm text-slate-400">Unlimited documents, all templates, save company profile and more.</div>
              </div>
              
              <a
                href="https://wa.me/971501234567?text=I%20want%20to%20upgrade%20to%20DOCUVAT%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Upgrade — 49 AED/month
              </a>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}