import { createClient } from "@/lib/supabase";
import { Proposal } from "@/types/proposal";

const supabase = createClient();

export async function getProposalsByClient(clientId: string) {
  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Proposal[];
}

export async function addProposal(
  proposal: Omit<Proposal, "id" | "created_at" | "user_id">
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("proposals")
    .insert({
      user_id: user.id,
      ...proposal,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Proposal;
}

export async function updateProposal(
  proposalId: string,
  proposal: Partial<Omit<Proposal, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .from("proposals")
    .update(proposal)
    .eq("id", proposalId)
    .select()
    .single();

  if (error) throw error;

  return data as Proposal;
}

export async function deleteProposal(proposalId: string) {
  const { error } = await supabase
    .from("proposals")
    .delete()
    .eq("id", proposalId);

  if (error) throw error;

  return true;
}
export async function getProposalById(proposalId: string) {
  const { data, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .single();

  if (error) throw error;

  return data as Proposal;
}
export async function saveProposalBuilderData(
  proposalId: string,
  builderData: any
) {
  const { data, error } = await supabase
    .from("proposals")
    .update({
      builder_data: builderData,
      title: builderData.title,
      scope: builderData.scope,
      amount: builderData.items?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
        0
      ),
      currency: builderData.currency,
      terms: builderData.terms,
    })
    .eq("id", proposalId)
    .select()
    .single();

  if (error) throw error;

  return data as Proposal;
}