import { createClient } from "@/lib/supabase";
import { Quotation } from "@/types/quotation";

const supabase = createClient();

export async function getQuotationsByClient(clientId: string) {
  const { data, error } = await supabase
    .from("quotations")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Quotation[];
}

export async function addQuotation(
  quotation: Omit<Quotation, "id" | "created_at" | "user_id">
) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("quotations")
    .insert({
      user_id: user.id,
      ...quotation,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Quotation;
}