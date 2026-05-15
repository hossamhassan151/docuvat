"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import DocumentActions from "@/components/documents/DocumentActions";
import AppInput from "@/components/system/AppInput";
import PrimaryButton from "@/components/system/PrimaryButton";
import SecondaryButton from "@/components/system/SecondaryButton";
import DocumentPreview from "@/components/documents/DocumentPreview";
import SendDocumentModal from "@/components/documents/SendDocumentModal";
import { BuilderDocument, DocumentType } from "@/types/document";

export default function DocumentBuilder({
  type,
  initialTitle = "",
  onSave,
}: {
  type: DocumentType;
  initialTitle?: string;
  onSave?: (document: BuilderDocument) => void;
}) {
    
const previewRef = useRef<HTMLDivElement>(null);
const [emailOpen, setEmailOpen] = useState(false);

function handlePrint() {
  const printContent = previewRef.current?.innerHTML;

  if (!printContent) {
    alert("Nothing to print.");
    return;
  }

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow popups to print.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${document.title || "DOCUVAT Document"}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: white;
            padding: 24px;
          }

          * {
            box-sizing: border-box;
          }

          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
function handleDownload() {
  alert("PDF export will be connected in Phase 3.2.");
}
  const [document, setDocument] = useState<BuilderDocument>({
    type,
    title: initialTitle,
    clientName: "",
    documentNumber: "",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    validUntil: "",
    scope: "",
    terms: "",
    notes: "",
    currency: "AED",
    vatRate: type === "invoice" || type === "quotation" ? 5 : 0,
    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ],
  });

  function updateField(field: keyof BuilderDocument, value: any) {
    setDocument({
      ...document,
      [field]: value,
    });
  }

  function updateItem(id: string, field: string, value: any) {
    setDocument({
      ...document,
      items: document.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "unitPrice"
                  ? Number(value)
                  : value,
            }
          : item
      ),
    });
  }

  function addItem() {
    setDocument({
      ...document,
      items: [
        ...document.items,
        {
          id: crypto.randomUUID(),
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    });
  }

  function removeItem(id: string) {
    setDocument({
      ...document,
      items: document.items.filter((item) => item.id !== id),
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-950">
            Document Details
          </h2>

          <div className="mt-5 space-y-4">
            <AppInput
              label="Title"
              value={document.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Website redesign proposal"
            />

            <AppInput
              label="Client Name"
              value={document.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              placeholder="Ahmed Ali"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <AppInput
                label="Currency"
                value={document.currency}
                onChange={(e) => updateField("currency", e.target.value)}
              />

              <AppInput
                label="VAT Rate %"
                type="number"
                value={document.vatRate}
                onChange={(e) => updateField("vatRate", Number(e.target.value))}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Scope / Description
              </label>
              <textarea
                value={document.scope}
                onChange={(e) => updateField("scope", e.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">
              Items
            </h2>

            <SecondaryButton type="button" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </SecondaryButton>
          </div>

          <div className="mt-5 space-y-3">
            {document.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_80px_120px_40px]"
              >
                <input
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, "quantity", e.target.value)
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateItem(item.id, "unitPrice", e.target.value)
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-xl text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mx-auto h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Terms
          </label>
          <textarea
            value={document.terms}
            onChange={(e) => updateField("terms", e.target.value)}
            className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
          />

          <PrimaryButton
            type="button"
            className="mt-5 w-full"
            onClick={() => onSave?.(document)}
          >
            Save Document
          </PrimaryButton>
        </div>
      </div>

      <div className="sticky top-24 h-fit">
        <div className="sticky top-24 h-fit">

  <div className="sticky top-24 h-fit">
  <div className="mb-4 rounded-[2rem] border border-slate-200 bg-white p-4">
    <DocumentActions
      title={document.title || "DOCUVAT Document"}
      clientEmail=""
      clientPhone=""
      shareUrl=""
      onPrint={handlePrint}
      onDownload={handleDownload}
      onEmail={() => setEmailOpen(true)}
    />
  </div>

  <div ref={previewRef} className="print-area">
    <DocumentPreview document={document} />
  </div>

  <SendDocumentModal
    open={emailOpen}
    onClose={() => setEmailOpen(false)}
    title={document.title || "DOCUVAT Document"}
    defaultEmail=""
    shareUrl=""
  />
</div>
<SendDocumentModal
  open={emailOpen}
  onClose={() => setEmailOpen(false)}
  title={document.title || "DOCUVAT Document"}
  defaultEmail=""
  shareUrl=""
/>
</div>
      </div>
    </div>
  );
}