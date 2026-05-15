export type DocumentType = "proposal" | "quotation" | "invoice";

export interface DocumentItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface BuilderDocument {
  type: DocumentType;
  title: string;
  clientName?: string;
  documentNumber?: string;
  issueDate?: string;
  dueDate?: string;
  validUntil?: string;
  scope?: string;
  terms?: string;
  notes?: string;
  currency: string;
  vatRate: number;
  items: DocumentItem[];
}