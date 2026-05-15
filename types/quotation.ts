import { BuilderDocument } from "@/types/document";

export interface Quotation {
  id: string;
  user_id: string;
  client_id: string;

  title: string;
  amount?: number;
  currency?: string;
  status?: "Draft" | "Sent" | "Accepted" | "Expired";

  document_number?: string;
  valid_until?: string;
  terms?: string;
  builder_data?: BuilderDocument;

  created_at: string;
}