import { BuilderDocument } from "@/types/document";

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;

  title: string;
  amount?: number;
  currency?: string;
  status?: "Draft" | "Sent";
  payment_status?: "Unpaid" | "Paid" | "Partial" | "Overdue";

  document_number?: string;
  due_date?: string;
  terms?: string;
  builder_data?: BuilderDocument;

  created_at: string;
}