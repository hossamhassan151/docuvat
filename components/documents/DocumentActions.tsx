"use client";

import { Download, Link2, Mail, MessageCircle, Printer } from "lucide-react";

interface DocumentActionsProps {
  title: string;
  clientPhone?: string;
  clientEmail?: string;
  shareUrl?: string;
  onPrint?: () => void;
  onDownload?: () => void;
  onEmail?: () => void;
}

export default function DocumentActions({
  title,
  clientPhone,
  shareUrl,
  onPrint,
  onDownload,
  onEmail,
}: DocumentActionsProps) {
  const whatsappText = encodeURIComponent(
    `Hello, please review this document: ${title}${shareUrl ? `\n${shareUrl}` : ""}`
  );

  const cleanPhone = clientPhone?.replace(/\D/g, "");

  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${whatsappText}`
    : `https://wa.me/?text=${whatsappText}`;

  async function copyShareLink() {
    if (!shareUrl) {
      alert("Share link is not ready yet.");
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    alert("Share link copied.");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Download className="mr-2 h-4 w-4" />
        PDF
      </button>

      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </button>

      <button
        type="button"
        onClick={onEmail}
        className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Mail className="mr-2 h-4 w-4" />
        Email
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={copyShareLink}
        className="inline-flex items-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
      >
        <Link2 className="mr-2 h-4 w-4" />
        Copy Link
      </button>
    </div>
  );
}