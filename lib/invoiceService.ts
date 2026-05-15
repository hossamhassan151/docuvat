import { createClient } from "@/lib/supabase";
import { Invoice } from "@/types/invoice";

const supabase = createClient();

export async function getInvoicesByClient(clientId: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Invoice[];
}

export async function addInvoice(
  invoice: Omit<Invoice, "id" | "created_at" | "user_id">
) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      user_id: user.id,
      ...invoice,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Invoice;
}