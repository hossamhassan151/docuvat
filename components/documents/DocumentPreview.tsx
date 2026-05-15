"use client";

import { BuilderDocument } from "@/types/document";

export default function DocumentPreview({
  document,
}: {
  document: BuilderDocument;
}) {
  const subtotal = document.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const vat = subtotal * (document.vatRate / 100);
  const total = subtotal + vat;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between border-b border-slate-100 pb-6">
        <div>
          <div className="text-2xl font-extrabold text-slate-950">
            DOCUVAT
          </div>
          <div className="mt-1 text-sm text-slate-500">
            Business Documents
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-extrabold uppercase text-slate-950">
            {document.type}
          </div>
          <div className="mt-1 text-sm text-slate-500">
            {document.documentNumber || "Draft"}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-slate-950">
          {document.title || "Untitled Document"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Client: {document.clientName || "No client selected"}
        </p>
      </div>

      {document.scope && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="text-sm font-bold text-slate-700">
            Scope / Description
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {document.scope}
          </p>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <div className="grid grid-cols-[1fr_90px_120px_120px] bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-400">
          <div>Description</div>
          <div>Qty</div>
          <div>Price</div>
          <div>Total</div>
        </div>

        {document.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_90px_120px_120px] border-t border-slate-100 px-4 py-3 text-sm text-slate-700"
          >
            <div>{item.description || "Item"}</div>
            <div>{item.quantity}</div>
            <div>{document.currency} {item.unitPrice}</div>
            <div>{document.currency} {item.quantity * item.unitPrice}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-sm space-y-2 text-sm">
          <Row label="Subtotal" value={`${document.currency} ${subtotal.toLocaleString()}`} />
          <Row label={`VAT ${document.vatRate}%`} value={`${document.currency} ${vat.toLocaleString()}`} />
          <div className="flex justify-between rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white">
            <span>Total</span>
            <span>{document.currency} {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {document.terms && (
        <div className="mt-8 border-t border-slate-100 pt-5">
          <div className="text-sm font-bold text-slate-700">Terms</div>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {document.terms}
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded-xl bg-slate-50 px-4 py-2 text-slate-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}