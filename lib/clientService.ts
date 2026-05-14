import { createClient } from "@/lib/supabase";
import { Client } from "@/types/client";

const supabase = createClient();

// جلب عملاء المستخدم الحالي فقط
export async function getClients() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Client[];
}

// إضافة عميل جديد
export async function addClient(
  client: Omit<Client, "id" | "created_at" | "user_id">
) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      user_id: user.id,
      ...client,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Client;
}

// تعديل بيانات عميل
export async function updateClient(
  clientId: string,
  client: Partial<Omit<Client, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", clientId)
    .select()
    .single();

  if (error) throw error;

  return data as Client;
}

// حذف عميل
export async function deleteClient(clientId: string) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId);

  if (error) throw error;

  return true;
}