export interface Client {
  id: string;
  user_id: string;

  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  trn?: string;

  status?: "Lead" | "Active" | "Inactive";

  created_at: string;
}