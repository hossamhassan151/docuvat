import { BuilderDocument } from "@/types/document";

export interface Proposal {
  id: string;
  user_id: string;
  client_id: string;

  title: string;
  scope?: string;
  amount?: number;
  currency?: string;
  status?: "Draft" | "Sent" | "Approved" | "Rejected";

  document_number?: string;
  valid_until?: string;
  terms?: string;
  notes?: string;
  builder_data?: BuilderDocument;

  created_at: string;
}