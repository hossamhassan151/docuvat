"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type DocType = "invoice" | "quotation" | "lpo";
type TemplateId = 1 | 2 | 3;

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface InvoiceData {
  docType: DocType;
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyCountry: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyTRN: string;
  logoBase64: string | null;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientTRN: string;
  docNumber: string;
  docDate: string;
  dueDate: string;
  currency: string;
  enableVat: boolean;
  vatRate: number;
  notes: string;
  bankName: string;
  iban: string;
  swift: string;
  items: InvoiceItem[];
  template: TemplateId;
  colorScheme: string;
}

interface ColorScheme {
  name: string;
  primary: string;
  accent: string;
  light: string;
  headerText: string;
}

const COLOR_SCHEMES: Record<TemplateId, Record<string, ColorScheme>> = {
  1: {
    navy:     { name: "Navy",     primary: "#1B2A4A", accent: "#4A6FA5", light: "#EDF2FB", headerText: "#93b4e8" },
    charcoal: { name: "Charcoal", primary: "#2D2D2D", accent: "#6B7280", light: "#F3F4F6", headerText: "#D1D5DB" },
    forest:   { name: "Forest",   primary: "#1C3B2E", accent: "#4A7C59", light: "#EDFAF1", headerText: "#86EFAC" },
  },
  2: {
    red:    { name: "Red",    primary: "#2C3E50", accent: "#E74C3C", light: "#FEF2F2", headerText: "#FECACA" },
    indigo: { name: "Indigo", primary: "#1E1B4B", accent: "#6366F1", light: "#EEF2FF", headerText: "#C7D2FE" },
    teal:   { name: "Teal",   primary: "#134E4A", accent: "#0D9488", light: "#F0FDFA", headerText: "#99F6E4" },
  },
  3: {
    green: { name: "UAE Green",  primary: "#006400", accent: "#C9A84C", light: "#F0F7F0", headerText: "#C9A84C" },
    blue:  { name: "Royal Blue", primary: "#003580", accent: "#C9A84C", light: "#EFF6FF", headerText: "#C9A84C" },
    black: { name: "Prestige",   primary: "#1A1A1A", accent: "#C9A84C", light: "#F8F8F5", headerText: "#C9A84C" },
  },
};

interface DocConfig {
  label: string; labelAr: string;
  numberLabel: string; numberPrefix: string;
  dueDateLabel: string;
  fromLabel: string; fromLabelAr: string;
  toLabel: string; toLabelAr: string;
  footerNote: string;
  showBank: boolean; showTRN: boolean; vatOptional: boolean;
}

const DOC_CONFIG: Record<DocType, DocConfig> = {
  invoice: {
    label: "TAX INVOICE", labelAr: "فاتورة ضريبية",
    numberLabel: "Invoice No.", numberPrefix: "INV",
    dueDateLabel: "Due Date",
    fromLabel: "Billed By", fromLabelAr: "من",
    toLabel: "Billed To", toLabelAr: "إلى",
    footerNote: "This is an official UAE VAT Tax Invoice pursuant to Federal Decree-Law No. (8) of 2017 — فاتورة ضريبية رسمية",
    showBank: true, showTRN: true, vatOptional: false,
  },
  quotation: {
    label: "QUOTATION", labelAr: "عرض سعر",
    numberLabel: "Quote No.", numberPrefix: "QT",
    dueDateLabel: "Valid Until",
    fromLabel: "Prepared By", fromLabelAr: "معد من",
    toLabel: "Prepared For", toLabelAr: "مقدم إلى",
    footerNote: "This is a quotation only and not a tax invoice. Prices are subject to change after the validity date.",
    showBank: false, showTRN: false, vatOptional: true,
  },
  lpo: {
    label: "PURCHASE ORDER", labelAr: "أمر شراء",
    numberLabel: "PO Number", numberPrefix: "PO",
    dueDateLabel: "Delivery Date",
    fromLabel: "Issued By", fromLabelAr: "صادر من",
    toLabel: "Vendor", toLabelAr: "المورد",
    footerNote: "This Purchase Order is subject to agreed terms and conditions between both parties.",
    showBank: false, showTRN: true, vatOptional: false,
  },
};

function generateId() { return Math.random().toString(36).slice(2, 9); }

function formatCurrency(n: number, currency = "AED") {
  return n.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${currency}`;
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(day)} ${months[parseInt(m) - 1]} ${y}`;
}

function numberToWords(n: number): string {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  if (n === 0) return "Zero";
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numberToWords(n % 100) : "");
  if (n < 1_000_000) return numberToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numberToWords(n % 1000) : "");
  return numberToWords(Math.floor(n / 1_000_000)) + " Million" + (n % 1_000_000 ? " " + numberToWords(n % 1_000_000) : "");
}

function generateDocNumber(prefix: string, counter: number, style: "simple" | "yearly"): string {
  const num = String(counter).padStart(4, "0");
  const year = new Date().getFullYear();
  return style === "yearly" ? `${prefix}-${year}-${num}` : `${prefix}-${num}`;
}

const defaultData: InvoiceData = {
  docType: "invoice",
  companyName: "", companyAddress: "", companyCity: "", companyCountry: "United Arab Emirates",
  companyPhone: "", companyEmail: "", companyWebsite: "", companyTRN: "", logoBase64: null,
  clientName: "", clientAddress: "", clientCity: "", clientTRN: "",
  docNumber: "INV-0001", docDate: new Date().toISOString().split("T")[0], dueDate: "",
  currency: "AED", enableVat: true, vatRate: 5,
  notes: "Payment is due within 30 days of invoice date.\nPlease include invoice number in your payment reference.",
  bankName: "", iban: "", swift: "",
  items: [{ id: generateId(), description: "", qty: 1, unitPrice: 0 }],
  template: 1, colorScheme: "navy",
};

function useCalc(data: InvoiceData) {
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const vat = data.enableVat ? subtotal * (data.vatRate / 100) : 0;
  const total = subtotal + vat;
  return { subtotal, vat, total, words: numberToWords(Math.floor(total)) };
}

function TotalsBlock({ data, subtotal, vat, total, words, primaryBg, accentText, lightBg, borderColor }: {
  data: InvoiceData; subtotal: number; vat: number; total: number; words: string;
  primaryBg: string; accentText: string; lightBg: string; borderColor: string;
}) {
  return (
    <div style={{ padding: "8px 48px 0", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ minWidth: 290 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555", borderBottom: `0.5px solid ${borderColor}` }}>
          <span>Subtotal</span><span>{formatCurrency(subtotal, data.currency)}</span>
        </div>
        {data.enableVat && (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555", borderBottom: `0.5px solid ${borderColor}` }}>
            <span>VAT {data.vatRate}%</span><span>{formatCurrency(vat, data.currency)}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", background: primaryBg, color: "white", borderRadius: 8, padding: "13px 18px", marginTop: 10, fontSize: 16, fontWeight: 800 }}>
          <span>Total {data.currency}</span>
          <span style={{ color: accentText }}>{formatCurrency(total, data.currency)}</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 11, fontStyle: "italic", color: "#777", background: lightBg, padding: "8px 14px", borderRadius: 6 }}>
          In Words: {words} {data.currency === "AED" ? "Dirhams" : data.currency} Only
        </div>
      </div>
    </div>
  );
}

function BankBlock({ data, borderColor, labelColor }: { data: InvoiceData; borderColor: string; labelColor: string }) {
  if (!data.bankName && !data.iban) return null;
  return (
    <div style={{ margin: "12px 48px", padding: "14px 18px", border: `0.5px solid ${borderColor}`, borderRadius: 8, fontSize: 12 }}>
      <div style={{ fontWeight: 700, color: labelColor, marginBottom: 6, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" as const }}>Bank Details / التفاصيل البنكية</div>
      {data.bankName && <div style={{ color: "#555" }}>Bank: <strong>{data.bankName}</strong></div>}
      {data.iban && <div style={{ color: "#555" }}>IBAN: <strong>{data.iban}</strong></div>}
      {data.swift && <div style={{ color: "#555" }}>SWIFT: <strong>{data.swift}</strong></div>}
    </div>
  );
}

function NotesBlock({ data, borderColor }: { data: InvoiceData; borderColor: string }) {
  if (!data.notes) return null;
  return (
    <div style={{ margin: "4px 48px 12px", fontSize: 11, color: "#777", whiteSpace: "pre-line" as const, padding: "10px 14px", border: `0.5px solid ${borderColor}`, borderRadius: 6 }}>
      <strong style={{ color: "#555" }}>Notes / ملاحظات:</strong><br />{data.notes}
    </div>
  );
}

function SignatureBlock({ accentColor }: { accentColor: string }) {
  return (
    <div style={{ margin: "8px 48px 24px", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa" }}>
      <div style={{ textAlign: "center" as const }}>
        <div style={{ borderTop: `0.5px solid ${accentColor}`, width: 140, marginBottom: 6 }} />
        Authorized Signature / توقيع مفوض
      </div>
      <div style={{ textAlign: "center" as const }}>
        <div style={{ borderTop: `0.5px solid ${accentColor}`, width: 140, marginBottom: 6 }} />
        Company Stamp / ختم الشركة
      </div>
    </div>
  );
}

interface CardData { t: string; name: string; addr: string; extra?: string; trn: string; }

function Watermark() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${(i % 5) * 22}%`, left: `${Math.floor(i / 5) * 30}%`, transform: "rotate(-35deg)", fontSize: 22, fontWeight: 800, color: "rgba(0,0,0,0.07)", fontFamily: "sans-serif", whiteSpace: "nowrap", userSelect: "none" }}>
          DOCUVAT.COM
        </div>
      ))}
    </div>
  );
}

function Template1({ data, isGuest }: { data: InvoiceData; isGuest: boolean }) {
  const calc = useCalc(data);
  const cfg = DOC_CONFIG[data.docType];
  const cs = COLOR_SCHEMES[1][data.colorScheme] ?? COLOR_SCHEMES[1].navy;
  const { primary: P, accent: A, light: L, headerText: HT } = cs;
  const cards: CardData[] = [
    { t: `${cfg.fromLabel} — ${cfg.fromLabelAr}`, name: data.companyName, addr: data.companyAddress + (data.companyCity ? `, ${data.companyCity}` : ""), extra: data.companyCountry, trn: cfg.showTRN ? data.companyTRN : "" },
    { t: `${cfg.toLabel} — ${cfg.toLabelAr}`, name: data.clientName, addr: data.clientAddress, extra: data.clientCity, trn: cfg.showTRN ? data.clientTRN : "" },
  ];
  return (
    <div style={{ background: "white", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 13, minHeight: "297mm", width: "210mm", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${P}, ${A})` }} />
      <div style={{ padding: "32px 48px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          {data.logoBase64 && <img src={data.logoBase64} alt="logo" style={{ maxHeight: 52, maxWidth: 160, objectFit: "contain", display: "block", marginBottom: 12 }} />}
          <div style={{ fontSize: 20, fontWeight: 800, color: P }}>{data.companyName || "Company Name"}</div>
          <div style={{ fontSize: 11, color: "#7a8fa6", marginTop: 3, lineHeight: 1.7 }}>
            {data.companyAddress}{data.companyCity ? `, ${data.companyCity}` : ""}
            {(data.companyPhone || data.companyEmail) && <><br />{data.companyPhone}{data.companyEmail ? ` · ${data.companyEmail}` : ""}</>}
            {data.companyWebsite && <><br />{data.companyWebsite}</>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: P, lineHeight: 1 }}>{cfg.label}</div>
          <div style={{ fontSize: 10, color: A, letterSpacing: 3, marginTop: 4 }}>{cfg.labelAr}</div>
          <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: A }}>{data.docNumber}</div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>Date: {formatDate(data.docDate)}</div>
          {data.dueDate && <div style={{ fontSize: 11, color: "#888" }}>{cfg.dueDateLabel}: {formatDate(data.dueDate)}</div>}
        </div>
      </div>
      <div style={{ padding: "0 48px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {cards.map((c) => (
          <div key={c.t} style={{ background: L, borderRadius: 10, padding: "16px 20px", borderLeft: `3px solid ${A}` }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: A, fontWeight: 700, marginBottom: 8 }}>{c.t}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: P }}>{c.name || "—"}</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, marginTop: 4 }}>{c.addr}{c.extra ? <><br />{c.extra}</> : ""}</div>
            {c.trn && <div style={{ marginTop: 8, fontSize: 10, color: A, fontWeight: 600 }}>TRN: <span style={{ fontFamily: "monospace" }}>{c.trn}</span></div>}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 48px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: P }}>
              {["#", "Description / البيان", "Qty", "Unit Price", `Amount (${data.currency})`].map((h, i) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: i > 1 ? "right" : "left", fontSize: 9, letterSpacing: 1.5, fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 1 ? L : "white", borderBottom: `0.5px solid #dde4f0` }}>
                <td style={{ padding: "11px 14px", color: "#bbb", fontSize: 11 }}>{i + 1}</td>
                <td style={{ padding: "11px 14px", color: P }}>{item.description || "—"}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", color: "#555" }}>{item.qty}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", color: "#555" }}>{formatCurrency(item.unitPrice, data.currency)}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 700, color: A }}>{formatCurrency(item.qty * item.unitPrice, data.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TotalsBlock data={data} {...calc} primaryBg={P} accentText={HT} lightBg={L} borderColor="#dde4f0" />
      {cfg.showBank && <BankBlock data={data} borderColor={L} labelColor={P} />}
      <NotesBlock data={data} borderColor="#e5e7eb" />
      <SignatureBlock accentColor={A} />
      <div style={{ marginTop: "auto", background: P, color: HT, padding: "12px 48px", fontSize: 10 }}>{cfg.footerNote}</div>
      {isGuest && <Watermark />}
    </div>
  );
}

function Template2({ data, isGuest }: { data: InvoiceData; isGuest: boolean }) {
  const calc = useCalc(data);
  const cfg = DOC_CONFIG[data.docType];
  const cs = COLOR_SCHEMES[2][data.colorScheme] ?? COLOR_SCHEMES[2].red;
  const { primary: P, accent: A } = cs;
  const cards: CardData[] = [
    { t: `${cfg.fromLabel} — ${cfg.fromLabelAr}`, name: data.companyName, addr: data.companyAddress + (data.companyCity ? `, ${data.companyCity}` : ""), extra: data.companyCountry, trn: cfg.showTRN ? data.companyTRN : "" },
    { t: `${cfg.toLabel} — ${cfg.toLabelAr}`, name: data.clientName, addr: data.clientAddress, extra: data.clientCity, trn: cfg.showTRN ? data.clientTRN : "" },
  ];
  return (
    <div style={{ background: "white", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 13, minHeight: "297mm", width: "210mm", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "36px 48px 24px", borderBottom: `3px solid ${P}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          {data.logoBase64 && <img src={data.logoBase64} alt="logo" style={{ maxHeight: 48, maxWidth: 160, objectFit: "contain", display: "block", marginBottom: 10 }} />}
          <div style={{ fontSize: 22, fontWeight: 800, color: P }}>{data.companyName || "Company Name"}</div>
          <div style={{ fontSize: 11, color: "#95a5a6", marginTop: 2 }}>{data.companyAddress}{data.companyCity ? `, ${data.companyCity}` : ""}</div>
          <div style={{ fontSize: 11, color: "#95a5a6", marginTop: 2 }}>{data.companyPhone}{data.companyEmail ? ` · ${data.companyEmail}` : ""}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: A }}>{cfg.label}</div>
          <div style={{ fontSize: 11, color: "#bbb", marginTop: -2 }}>{cfg.labelAr}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: P, marginTop: 8 }}>{data.docNumber}</div>
          <div style={{ fontSize: 11, color: "#95a5a6" }}>Date: {formatDate(data.docDate)}</div>
          {data.dueDate && <div style={{ fontSize: 11, color: "#95a5a6" }}>{cfg.dueDateLabel}: {formatDate(data.dueDate)}</div>}
        </div>
      </div>
      <div style={{ padding: "20px 48px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {cards.map((c) => (
          <div key={c.t} style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px 20px", borderLeft: `4px solid ${A}` }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: A, fontWeight: 700, marginBottom: 8 }}>{c.t}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: P }}>{c.name || "—"}</div>
            <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7, marginTop: 4 }}>{c.addr}{c.extra ? <><br />{c.extra}</> : ""}</div>
            {c.trn && <div style={{ marginTop: 10, fontSize: 10, color: A, fontWeight: 600 }}>TRN: <span style={{ fontFamily: "monospace" }}>{c.trn}</span></div>}
          </div>
        ))}
      </div>
      <div style={{ padding: "20px 48px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${P}` }}>
              {["#", "Description / البيان", "Qty", "Unit Price", `Amount (${data.currency})`].map((h, i) => (
                <th key={h} style={{ padding: "10px 12px", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#95a5a6", fontWeight: 600, textAlign: i > 1 ? "right" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: "0.5px solid #ecf0f1" }}>
                <td style={{ padding: "12px", color: "#ccc", fontSize: 11 }}>{i + 1}</td>
                <td style={{ padding: "12px", color: P }}>{item.description || "—"}</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#555" }}>{item.qty}</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#555" }}>{formatCurrency(item.unitPrice, data.currency)}</td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 600, color: P }}>{formatCurrency(item.qty * item.unitPrice, data.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TotalsBlock data={data} {...calc} primaryBg={A} accentText="white" lightBg="#f8f9fa" borderColor="#ecf0f1" />
      {cfg.showBank && <BankBlock data={data} borderColor="#ecf0f1" labelColor={P} />}
      <NotesBlock data={data} borderColor="#ecf0f1" />
      <SignatureBlock accentColor={A} />
      <div style={{ marginTop: "auto", borderTop: "0.5px solid #ecf0f1", padding: "12px 48px", fontSize: 10, color: "#bbb" }}>{cfg.footerNote}</div>
      {isGuest && <Watermark />}
    </div>
  );
}

function Template3({ data, isGuest }: { data: InvoiceData; isGuest: boolean }) {
  const calc = useCalc(data);
  const cfg = DOC_CONFIG[data.docType];
  const cs = COLOR_SCHEMES[3][data.colorScheme] ?? COLOR_SCHEMES[3].green;
  const { primary: P, accent: G, light: L } = cs;
  const cards: CardData[] = [
    { t: `${cfg.fromLabel} — ${cfg.fromLabelAr}`, name: data.companyName, addr: `${data.companyAddress}\n${data.companyCity}${data.companyCountry ? `, ${data.companyCountry}` : ""}`, trn: cfg.showTRN ? data.companyTRN : "" },
    { t: `${cfg.toLabel} — ${cfg.toLabelAr}`, name: data.clientName, addr: `${data.clientAddress}\n${data.clientCity}`, trn: cfg.showTRN ? data.clientTRN : "" },
  ];
  return (
    <div style={{ background: "white", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 13, minHeight: "297mm", width: "210mm", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 8, background: `linear-gradient(90deg, ${P}, ${G}, ${P})` }} />
      <div style={{ padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {data.logoBase64 && <img src={data.logoBase64} alt="logo" style={{ maxHeight: 48, maxWidth: 150, objectFit: "contain", display: "block", marginBottom: 10 }} />}
          <div style={{ fontSize: 20, fontWeight: 800, color: P }}>{data.companyName || "Company Name"}</div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{data.companyAddress}{data.companyCity ? `, ${data.companyCity}` : ""}</div>
          <div style={{ fontSize: 11, color: "#888" }}>{data.companyPhone}{data.companyEmail ? ` | ${data.companyEmail}` : ""}</div>
          {data.companyWebsite && <div style={{ fontSize: 11, color: "#888" }}>{data.companyWebsite}</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: P }}>{cfg.label}</div>
          <div style={{ fontSize: 10, color: G, letterSpacing: 2, marginTop: -2 }}>{cfg.labelAr}</div>
          <div style={{ fontSize: 13, color: "#555", marginTop: 8 }}>{data.docNumber}</div>
          <div style={{ fontSize: 11, color: "#888" }}>Date: {formatDate(data.docDate)}</div>
          {data.dueDate && <div style={{ fontSize: 11, color: "#888" }}>{cfg.dueDateLabel}: {formatDate(data.dueDate)}</div>}
        </div>
      </div>
      <div style={{ padding: "0 48px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {cards.map((c) => (
          <div key={c.t} style={{ padding: "16px 18px", border: `0.5px solid ${G}55`, borderRadius: 10 }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, color: P, fontWeight: 700, marginBottom: 8 }}>{c.t}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: P }}>{c.name || "—"}</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginTop: 4, whiteSpace: "pre-line" }}>{c.addr}</div>
            {c.trn && <div style={{ marginTop: 8, fontSize: 10, color: P, fontWeight: 600 }}>TRN: <span style={{ fontFamily: "monospace" }}>{c.trn}</span></div>}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 48px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: P }}>
              {["#", "Description / البيان", "Qty", "Unit Price", `Amount (${data.currency})`].map((h, i) => (
                <th key={h} style={{ padding: "10px 14px", color: G, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, fontWeight: 500, textAlign: i > 1 ? "right" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: `0.5px solid ${L}`, background: i % 2 === 1 ? L : "white" }}>
                <td style={{ padding: "11px 14px", color: "#ccc", fontSize: 11 }}>{i + 1}</td>
                <td style={{ padding: "11px 14px", color: P }}>{item.description || "—"}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", color: "#555" }}>{item.qty}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", color: "#555" }}>{formatCurrency(item.unitPrice, data.currency)}</td>
                <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 700, color: P }}>{formatCurrency(item.qty * item.unitPrice, data.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TotalsBlock data={data} {...calc} primaryBg={P} accentText={G} lightBg={L} borderColor={L} />
      {cfg.showBank && <BankBlock data={data} borderColor={`${G}44`} labelColor={P} />}
      <NotesBlock data={data} borderColor={`${G}44`} />
      <SignatureBlock accentColor={P} />
      <div style={{ marginTop: "auto", borderTop: `2px solid ${P}`, padding: "12px 48px", fontSize: 10, color: "#aaa" }}>{cfg.footerNote}</div>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${G}, ${P}, ${G})` }} />
      {isGuest && <Watermark />}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400";
const labelCls = "block text-xs font-medium text-gray-500 mb-1";

function Field({ label, value, onChange, placeholder = "", type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input type={type} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">{title}</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

const TEMPLATES = [
  { id: 1 as TemplateId, name: "Navy & Slate" },
  { id: 2 as TemplateId, name: "Modern" },
  { id: 3 as TemplateId, name: "UAE Green" },
];

const DOC_TYPES: { id: DocType; label: string; icon: string }[] = [
  { id: "invoice",   label: "Tax Invoice",   icon: "🧾" },
  { id: "quotation", label: "Quotation",      icon: "📋" },
  { id: "lpo",       label: "Purchase Order", icon: "📦" },
];

export default function InvoiceBuilder({ initialType }: { initialType: "invoice" | "quotation" | "lpo" }) {
  const router = useRouter();
  const supabase = createClient();
  const [isGuest, setIsGuest] = useState(true);
  const [data, setData] = useState<InvoiceData>({ ...defaultData, docType: initialType });
  const printRef = useRef<HTMLDivElement>(null);
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [numberingStyle, setNumberingStyle] = useState<"simple" | "yearly">("simple");
  const [showReviewPopup, setShowReviewPopup] = useState(false);
const [rating, setRating] = useState(0);
const [reviewComment, setReviewComment] = useState("");
const [reviewName, setReviewName] = useState("");
const [reviewRole, setReviewRole] = useState("");
const [submittingReview, setSubmittingReview] = useState(false);

  // ─── دالة مساعدة لجلب الـ counter field حسب نوع الوثيقة ───────────────────
  const getCounterField = (docType: DocType) =>
    docType === "invoice" ? "invoice_counter" :
    docType === "quotation" ? "quotation_counter" : "lpo_counter";

  const getPrefix = (docType: DocType) =>
    docType === "invoice" ? "INV" : docType === "quotation" ? "QT" : "PO";

  // ─── تحميل البيانات عند الدخول ────────────────────────────────────────────
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsGuest(true);
        return;
      }
      setIsGuest(false);

      // جلب بيانات الشركة
      const { data: company } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (company) {
        setData((prev) => ({
          ...prev,
          companyName: company.name || "",
          companyAddress: company.address || "",
          companyCity: company.city || "",
          companyCountry: company.country || "",
          companyPhone: company.phone || "",
          companyEmail: company.email || "",
          companyWebsite: company.website || "",
          companyTRN: company.trn || "",
          logoBase64: company.logo_url || prev.logoBase64,
        }));
      }

      // جلب البروفايل والـ counter
      const counterField = getCounterField(initialType);
      const { data: profile } = await supabase
        .from("profiles")
        .select(`plan, numbering_style, ${counterField}`)
        .eq("id", user.id)
        .single();

      if (profile) {
        const style = (profile.numbering_style as "simple" | "yearly") ?? "simple";
        setPlan(profile.plan);
        setNumberingStyle(style);

        // ✅ عرض الرقم التالي تلقائياً بناءً على الـ counter الحالي
const currentCounter = ((profile as Record<string, unknown>)[counterField] as number) ?? 0;
        const prefix = getPrefix(initialType);
        setData((prev) => ({
          ...prev,
          docNumber: generateDocNumber(prefix, currentCounter + 1, style),
        }));
      }
    };

    loadProfile();
  }, []);

  const set = useCallback(<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setDocType = (dt: DocType) => {
    const cfg = DOC_CONFIG[dt];
    const notesMap: Record<DocType, string> = {
      invoice:   "Payment is due within 30 days of invoice date.\nPlease include invoice number in your payment reference.",
      quotation: "This quotation is valid for 30 days from the date above.\nPrices are subject to change after expiry.",
      lpo:       "Please deliver to the address above.\nAll deliveries must be accompanied by this Purchase Order.",
    };
    setData((prev) => ({
      ...prev,
      docType: dt,
      docNumber: `${cfg.numberPrefix}-0001`,
      dueDate: "",
      enableVat: dt !== "quotation",
      notes: notesMap[dt],
    }));
  };

  const setTemplate = (t: TemplateId) => {
    const firstScheme = Object.keys(COLOR_SCHEMES[t])[0];
    setData((prev) => ({ ...prev, template: t, colorScheme: firstScheme }));
  };

  const setItem = useCallback((id: string, field: keyof InvoiceItem, value: string | number) => {
    setData((prev) => ({ ...prev, items: prev.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  }, []);

  const addItem = () => setData((prev) => ({ ...prev, items: [...prev.items, { id: generateId(), description: "", qty: 1, unitPrice: 0 }] }));
  const removeItem = (id: string) => setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("logoBase64", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handlePrint = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // ─── فحص الحد اليومي للـ free plan ───────────────────────────────────────
    if (user && plan === "free") {
      const today = new Date().toISOString().split("T")[0];
      const { count } = await supabase
        .from("documents")
        .select("id", { count: "exact" })
        .eq("user_id", user.id)
        .gte("created_at", today);

      if (count && count >= 1) {
        alert("You have reached your daily limit. Upgrade to Pro for unlimited documents.");
        return;
      }
    }

    if (user) {
      // ─── حفظ الوثيقة ───────────────────────────────────────────────────────
      await supabase.from("documents").insert({
        user_id: user.id,
        doc_type: data.docType,
        doc_number: data.docNumber,
        doc_date: data.docDate,
        total: data.items.reduce((s, i) => s + i.qty * i.unitPrice, 0),
      });

      // ─── تحديث الـ counter بشكل صحيح ──────────────────────────────────────
      const counterField = getCounterField(data.docType);
      const prefix = getPrefix(data.docType);

      // جيب الـ counter الحالي
      const { data: currentProfile } = await supabase
        .from("profiles")
        .select(counterField)
        .eq("id", user.id)
        .single();

      const { data: profileData } = await supabase
  .from("profiles")
  .select(counterField)
  .eq("id", user.id)
  .single();

const currentCounter = (profileData as Record<string, number> | null)?.[counterField] ?? 0;
      const nextCounter = currentCounter + 1;

      // حفظ الـ counter الجديد
      await supabase
        .from("profiles")
        .update({ [counterField]: nextCounter })
        .eq("id", user.id);

      // ✅ جهز رقم الوثيقة التالية (للمرة القادمة)
      setData((prev) => ({
        ...prev,
        docNumber: generateDocNumber(prefix, nextCounter + 1, numberingStyle),
      }));
    }

    // ─── الطباعة ───────────────────────────────────────────────────────────────
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;

    const watermarkHtml = !user ? `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;">
        ${Array.from({ length: 20 }).map((_, i) => `
          <div style="position:absolute;top:${(i % 5) * 22}%;left:${Math.floor(i / 5) * 30}%;transform:rotate(-35deg);font-size:22px;font-weight:800;color:rgba(0,0,0,0.07);font-family:sans-serif;white-space:nowrap;user-select:none;">DOCUVAT.COM</div>
        `).join("")}
      </div>` : "";

    win.document.write(`<!DOCTYPE html><html><head><title>${data.docNumber}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{margin:0;size:A4}</style></head><body>${content}${watermarkHtml}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);

// شوف لو اليوزر عمل review قبل كده
const { data: profileData } = await supabase
  .from("profiles")
  .select("last_review_at")
  .eq("id", user?.id)
  .single();

const lastReview = profileData?.last_review_at;
const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

const shouldAskReview = !lastReview || new Date(lastReview) < twoWeeksAgo;

if (shouldAskReview) {
  setShowReviewPopup(true);
} else {
  router.push("/dashboard");
}    
  };
  

  const TemplateComponent = data.template === 1 ? Template1 : data.template === 2 ? Template2 : Template3;
  const cfg = DOC_CONFIG[data.docType];
  const schemes = COLOR_SCHEMES[data.template];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-[320px] min-w-[320px] bg-white border-r border-gray-100 flex flex-col overflow-hidden shadow-sm">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="text-base font-bold text-gray-900">Document Builder</div>
          <div className="text-xs text-gray-400 mt-0.5">UAE Professional Documents · الإمارات</div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">

          <Section title="Document Type">
            <div className="grid grid-cols-3 gap-2">
              {DOC_TYPES.map((dt) => (
                <button key={dt.id} onClick={() => setDocType(dt.id)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-xs font-medium transition-all ${
                    data.docType === dt.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}>
                  <span className="text-lg">{dt.icon}</span>
                  <span className="text-[10px] text-center leading-tight">{dt.label}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Design">
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                    data.template === t.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}>
                  {t.name}
                </button>
              ))}
            </div>
            <div>
              <label className={labelCls}>Color Scheme</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {Object.entries(schemes).map(([key, cs]) => (
                  <button key={key} onClick={() => set("colorScheme", key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                      data.colorScheme === key ? "border-gray-500 bg-gray-100 font-semibold text-gray-800" : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: cs.primary, display: "inline-block" }} />
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: cs.accent, display: "inline-block" }} />
                    {cs.name}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Company Info">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-300 transition-colors"
              onClick={() => document.getElementById("logoUpload")?.click()}>
              <input id="logoUpload" type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              {data.logoBase64
                ? <img src={data.logoBase64} alt="logo" className="max-h-10 max-w-full object-contain mx-auto" />
                : <div className="text-xs text-gray-400">📎 Upload Logo</div>}
            </div>
            <Field label="Company Name *" value={data.companyName} onChange={(v) => set("companyName", v)} placeholder="Your company name" />
            <Field label="Address" value={data.companyAddress} onChange={(v) => set("companyAddress", v)} placeholder="Street, building" />
            <div className="grid grid-cols-2 gap-2">
              <Field label="City" value={data.companyCity} onChange={(v) => set("companyCity", v)} placeholder="Dubai" />
              <Field label="Country" value={data.companyCountry} onChange={(v) => set("companyCountry", v)} placeholder="UAE" />
            </div>
            {cfg.showTRN && <Field label="TRN *" value={data.companyTRN} onChange={(v) => set("companyTRN", v)} placeholder="100234567890003" />}
            <Field label="Phone" value={data.companyPhone} onChange={(v) => set("companyPhone", v)} placeholder="+971 4 123 4567" />
            <Field label="Email" value={data.companyEmail} onChange={(v) => set("companyEmail", v)} placeholder="info@company.ae" />
            <Field label="Website" value={data.companyWebsite} onChange={(v) => set("companyWebsite", v)} placeholder="www.company.ae" />
          </Section>

          <Section title={data.docType === "lpo" ? "Vendor Info" : "Client Info"}>
            <Field label={`${cfg.toLabel} Name *`} value={data.clientName} onChange={(v) => set("clientName", v)} placeholder="Name" />
            <Field label="Address" value={data.clientAddress} onChange={(v) => set("clientAddress", v)} placeholder="Address" />
            <Field label="City" value={data.clientCity} onChange={(v) => set("clientCity", v)} placeholder="Abu Dhabi" />
            {cfg.showTRN && <Field label="TRN" value={data.clientTRN} onChange={(v) => set("clientTRN", v)} placeholder="TRN (if applicable)" />}
          </Section>

          <Section title="Document Details">
            {/* ✅ رقم الوثيقة read-only  */}
            <div>
              <label className={labelCls}>{cfg.numberLabel}</label>
              <div className="w-full px-3 py-2 text-sm border border-gray-100 rounded-lg bg-gray-50 text-gray-600 font-mono tracking-wide select-none cursor-not-allowed">
                {data.docNumber}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">🔒 </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Date" value={data.docDate} onChange={(v) => set("docDate", v)} type="date" />
              <Field label={cfg.dueDateLabel} value={data.dueDate} onChange={(v) => set("dueDate", v)} type="date" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Currency</label>
                <select className={inputCls} value={data.currency} onChange={(e) => set("currency", e.target.value)}>
                  {["AED", "USD", "EUR", "GBP", "SAR"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                {cfg.vatOptional ? (
                  <>
                    <label className={labelCls}>VAT</label>
                    <button onClick={() => set("enableVat", !data.enableVat)}
                      className={`w-full py-2 rounded-lg border text-xs font-semibold transition-all ${
                        data.enableVat ? "bg-green-50 border-green-400 text-green-700" : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}>
                      {data.enableVat ? `✓ VAT ${data.vatRate}%` : "VAT Off"}
                    </button>
                  </>
                ) : (
                  <>
                    <label className={labelCls}>VAT Rate (%)</label>
                    <input type="number" className={inputCls} value={data.vatRate} min={0} max={100} step={0.5}
                      onChange={(e) => set("vatRate", parseFloat(e.target.value) || 0)} />
                  </>
                )}
              </div>
            </div>
            {cfg.vatOptional && data.enableVat && (
              <Field label="VAT Rate (%)" value={String(data.vatRate)} onChange={(v) => set("vatRate", parseFloat(v) || 0)} placeholder="5" />
            )}
          </Section>

          <Section title="Line Items">
            <div className="space-y-2">
              {data.items.map((item) => (
                <div key={item.id} className="p-3 border border-gray-100 rounded-lg space-y-2 bg-gray-50">
                  <input className={inputCls} placeholder="Description / البيان" value={item.description}
                    onChange={(e) => setItem(item.id, "description", e.target.value)} />
                  <div className="grid grid-cols-3 gap-2 items-end">
                    <div>
                      <label className={labelCls}>Qty</label>
                      <input type="number" min={0} className={inputCls} value={item.qty}
                        onChange={(e) => setItem(item.id, "qty", parseFloat(e.target.value) || 0)} />
                    </div>
                    <div>
                      <label className={labelCls}>Unit Price</label>
                      <input type="number" min={0} className={inputCls} value={item.unitPrice}
                        onChange={(e) => setItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)} />
                    </div>
                    <div>
                      <label className={labelCls}>Total</label>
                      <div className="text-sm font-semibold text-gray-700 py-2">{formatCurrency(item.qty * item.unitPrice, data.currency)}</div>
                    </div>
                  </div>
                  {data.items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="text-[10px] text-red-400 hover:text-red-600 transition-colors">✕ Remove</button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addItem} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
              + Add Line Item
            </button>
          </Section>

          {cfg.showBank && (
            <Section title="Bank Details (Optional)">
              <Field label="Bank Name" value={data.bankName} onChange={(v) => set("bankName", v)} placeholder="Emirates NBD" />
              <Field label="IBAN" value={data.iban} onChange={(v) => set("iban", v)} placeholder="AE07 0331 2345 6789 0123 456" />
              <Field label="SWIFT / BIC" value={data.swift} onChange={(v) => set("swift", v)} placeholder="EBILAEAD" />
            </Section>
          )}

          <Section title="Notes">
            <div>
              <label className={labelCls}>Notes / Terms</label>
              <textarea className={`${inputCls} resize-none`} rows={3} value={data.notes}
                onChange={(e) => set("notes", e.target.value)} placeholder="Terms, notes, etc." />
            </div>
          </Section>

        </div>
{/* Review Popup */}
{showReviewPopup && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">

      <div className="text-center mb-6">
        <div className="text-3xl mb-3">🌟</div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">How was your experience?</h3>
        <p className="text-gray-500 text-sm">Your feedback helps us improve DOCUVAT</p>
      </div>

      {/* Stars */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-3xl transition-transform hover:scale-110"
          >
            {star <= rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      {/* Name & Role */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Your Name</label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ahmed Al-Rashid"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Role / Business</label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Consultant, Dubai"
            value={reviewRole}
            onChange={(e) => setReviewRole(e.target.value)}
          />
        </div>
      </div>

      {/* Comment */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-1">Comment (optional)</label>
        <textarea
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="What did you like about DOCUVAT?"
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          disabled={rating === 0 || submittingReview}
          onClick={async () => {
            if (rating === 0) return;
            setSubmittingReview(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase.from("reviews").insert({
              user_id: user.id,
              rating,
              comment: reviewComment,
              user_name: reviewName,
              user_role: reviewRole,
            });

            await supabase.from("profiles")
              .update({ last_review_at: new Date().toISOString() })
              .eq("id", user.id);

            setSubmittingReview(false);
            setShowReviewPopup(false);
            router.push("/dashboard");
          }}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl disabled:opacity-40 transition-all"
        >
          {submittingReview ? "Submitting..." : "Submit Review"}
        </button>

        <button
          onClick={() => {
            setShowReviewPopup(false);
            router.push("/dashboard");
          }}
          className="w-full py-2.5 text-gray-400 text-sm hover:text-gray-600 transition-colors"
        >
          Skip for now
        </button>
      </div>

    </div>
  </div>
)}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={async () => {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) return;
              const { data: existing } = await supabase
                .from("companies").select("id").eq("user_id", user.id).single();
              const companyData = {
                user_id: user.id,
                name: data.companyName,
                address: data.companyAddress,
                city: data.companyCity,
                country: data.companyCountry,
                phone: data.companyPhone,
                email: data.companyEmail,
                website: data.companyWebsite,
                trn: data.companyTRN,
              };
              if (existing) {
                await supabase.from("companies").update(companyData).eq("id", existing.id);
              } else {
                await supabase.from("companies").insert(companyData);
              }
              alert("Company profile saved!");
            }}
            className="w-full py-2.5 mb-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            💾 Save Company Profile
          </button>

          <button
            onClick={handlePrint}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all"
          >
            🖨 Export / Print PDF
          </button>
        </div>
      </aside>

      {/* PREVIEW */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">Live Preview — {cfg.label}</div>
            <div className="flex gap-2">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    data.template === t.id ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 text-gray-500 hover:border-gray-400"
                  }`}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          <div ref={printRef} className="shadow-xl rounded-lg overflow-hidden">
            <TemplateComponent data={data} isGuest={isGuest} />
          </div>
        </div>
      </main>

    </div>
  );
}