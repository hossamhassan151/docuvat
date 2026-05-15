"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { Proposal } from "@/types/proposal";
import { getProposalsByClient } from "@/lib/proposalService";
import { useParams } from "next/navigation";
import { Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/system/StatusBadge";
import { Client } from "@/types/client";
import { getClientById } from "@/lib/clientService";
import AddClientModal from "@/components/clients/AddClientModal";
import { updateClient } from "@/lib/clientService";

export default function ClientDetailsPage() {
  const params = useParams();
  const clientId = params.id as string;
  const [client, setClient] = useState<Client | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  async function handleUpdateClient(updatedClient: any) {
  if (!client) return;

  try {
    setSaving(true);

    const data = await updateClient(client.id, updatedClient);

    setClient(data);
    setEditOpen(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update client");
  } finally {
    setSaving(false);
  }
}
  useEffect(() => {
    async function loadClient() {
      try {
        const data = await getClientById(clientId);
        setClient(data);
        const clientProposals = await getProposalsByClient(clientId);
setProposals(clientProposals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [clientId]);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
        Loading client...
      </div>
    );
  }

  if (!client) {
    return (
      <EmptyState
        icon={Users}
        title="Client not found"
        description="This client may have been deleted or you do not have access."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        label="Client Workspace"
        title={client.name}
        description="View client details, documents, activity and sales history."
        icon={Users}
      />

      <div className="space-y-6">
        {/* Workspace Header */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="relative overflow-hidden border-b border-slate-100 px-8 py-7">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
                  {client.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                      {client.name}
                    </h1>

                    <StatusBadge status={client.status || "Lead"} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span>{client.company || "No company"}</span>
                    <span>{client.email || "No email"}</span>
                    <span>{client.phone || "No phone"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
               <button
  type="button"
  onClick={() => setEditOpen(true)}
  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
>
  Edit Client
</button>
<Link
  href={`/dashboard/document-builder?type=proposal&clientId=${client.id}`}
  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
>
  New Proposal
</Link>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
            <WorkspaceCard title="Total Revenue" value="AED 0" />
            <WorkspaceCard title="Invoices" value="0" />
            <WorkspaceCard title="Quotations" value="0" />
            <WorkspaceCard title="Pending" value="0" />
          </div>
        </div>

        {/* Client Information */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-bold text-slate-950">
            Client Information
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Info label="Company" value={client.company || "—"} />
            <Info label="Email" value={client.email || "—"} />
            <Info label="Phone" value={client.phone || "—"} />
            <Info label="City" value={client.city || "—"} />
            <Info label="TRN / VAT" value={client.trn || "—"} />
            <Info label="Status" value={client.status || "Lead"} />
          </div>
        </div>
        {/* Workspace Grid */}
<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

  {/* Documents */}
  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">

<div className="flex flex-wrap gap-2">

  <Link
    href={`/dashboard/document-builder?type=proposal&clientId=${client.id}`}
    className="
    inline-flex
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-cyan-500
    px-4
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-blue-500/20
    transition-all
    hover:-translate-y-0.5
    "
  >
    New Proposal
  </Link>

  <Link
    href={`/dashboard/quotations/new?clientId=${client.id}`}
    className="
    inline-flex
    items-center
    justify-center
    rounded-2xl
    border
    border-slate-200
    bg-white
    px-4
    py-2.5
    text-sm
    font-semibold
    text-slate-700
    transition-all
    hover:border-blue-200
    hover:bg-blue-50
    hover:text-blue-700
    "
  >
    New Quotation
  </Link>

  <Link
    href={`/dashboard/invoices/new?clientId=${client.id}`}
    className="
    inline-flex
    items-center
    justify-center
    rounded-2xl
    border
    border-slate-200
    bg-white
    px-4
    py-2.5
    text-sm
    font-semibold
    text-slate-700
    transition-all
    hover:border-emerald-200
    hover:bg-emerald-50
    hover:text-emerald-700
    "
  >
    New Invoice
  </Link>

</div>

    {/* Tabs */}
    <div className="mt-6 flex flex-wrap gap-2">

      <WorkspaceTab
        label="Proposals"
        active
      />

      <WorkspaceTab
        label="Quotations"
      />

      <WorkspaceTab
        label="Invoices"
      />

    </div>

    {/* Empty State */}
    <div className="mt-8 space-y-3">
  {proposals.length === 0 ? (
    <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center">
      <div className="text-lg font-bold text-slate-900">
        No proposals yet
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Create the first proposal connected to this client.
      </p>
    </div>
  ) : (
   proposals.map((proposal) => (
  <Link
    key={proposal.id}
    href={`/dashboard/proposals/${proposal.id}`}
    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
  >
    <div>
      <div className="font-bold text-slate-950">
        {proposal.title}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {proposal.currency || "AED"} {Number(proposal.amount || 0).toLocaleString()}
      </div>
    </div>

    <StatusBadge status={proposal.status || "Draft"} />
  </Link>
))
  )}
</div>
  </div>

  {/* Activity Timeline */}
  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">

    <div>
      <h2 className="text-lg font-bold text-slate-950">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Latest updates and workflow activity.
      </p>
    </div>

    <div className="mt-8 space-y-6">

      <TimelineItem
        title="Client created"
        description="Client profile was added to DOCUVAT."
        time="Today"
      />

      <TimelineItem
        title="Workspace initialized"
        description="CRM workspace and document area prepared."
        time="Just now"
      />

    </div>
  </div>

        </div>
      </div>

      {client && (
        <AddClientModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          initialData={client}
          onSubmit={handleUpdateClient}
          loading={saving}
        />
      )}

    </div>
  );
}
function WorkspaceTab({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`
      rounded-2xl
      px-4
      py-2
      text-sm
      font-semibold
      transition-all
      ${
        active
          ? "bg-blue-50 text-blue-700"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }
      `}
    >
      {label}
    </button>
  );
}

function TimelineItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="relative pl-8">

      <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500" />

      <div className="absolute left-[5px] top-5 h-full w-px bg-slate-200" />

      <div className="text-sm font-bold text-slate-900">
        {title}
      </div>

      <div className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </div>

      <div className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        {time}
      </div>
      
    </div>
  );
}

function WorkspaceCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-5">
      <div className="text-sm font-medium text-slate-500">{title}</div>

      <div className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
        {value}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
        
      </div>

      <div className="mt-1 font-semibold text-slate-800">
        {value}
        
      </div>
      
    </div>
    
  );
}