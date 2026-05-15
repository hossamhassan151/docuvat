"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, Plus, Mail, Phone, MapPin, Building2 } from "lucide-react";
import TableActionButton from "@/components/system/TableActionButton";
import AddClientModal from "@/components/clients/AddClientModal";
import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterTabs from "@/components/dashboard/FilterTabs";
import EmptyState from "@/components/dashboard/EmptyState";
import PrimaryButton from "@/components/system/PrimaryButton";
import AppTable from "@/components/system/AppTable";
import Link from "next/link";
import StatusBadge from "@/components/system/StatusBadge";
import { Client } from "@/types/client";
import {
  addClient,
  getClients,
  updateClient,
  deleteClient,
} from "@/lib/clientService";

export default function ClientsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadClients() {
      setLoading(true);
      const data = await getClients();
      setClients(data);
      setLoading(false);
    }

    loadClients();
  }, []);

async function handleSaveClient(
  client: Omit<Client, "id" | "created_at" | "user_id">
) {
  try {
    setSaving(true);

    // وضع التعديل
    if (selectedClient) {
      const updatedClient =
        await updateClient(
          selectedClient.id,
          client
        );

      setClients(
        clients.map((item) =>
          item.id === updatedClient.id
            ? updatedClient
            : item
        )
      );
    }

    // وضع الإضافة
    else {
      const newClient =
        await addClient(client);

      setClients([
        newClient,
        ...clients,
      ]);
    }

    setOpenModal(false);

    // تصفير العميل المحدد
    setSelectedClient(null);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save client"
    );

  } finally {

    setSaving(false);

  }
}

async function handleDeleteClient(
  clientId: string
) {

  const confirmed =
    confirm(
      "Delete this client?"
    );

  if (!confirmed) return;

  try {

    await deleteClient(clientId);

    setClients(
      clients.filter(
        (client) =>
          client.id !== clientId
      )
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to delete client"
    );

  }
}
// العميل الحالي أثناء التعديل
const [selectedClient, setSelectedClient] =
  useState<Client | null>(null);
  
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name?.toLowerCase().includes(search.toLowerCase()) ||
        client.company?.toLowerCase().includes(search.toLowerCase()) ||
        client.email?.toLowerCase().includes(search.toLowerCase()) ||
        client.phone?.toLowerCase().includes(search.toLowerCase()) ||
        client.city?.toLowerCase().includes(search.toLowerCase()) ||
        client.trn?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || client.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [clients, search, activeFilter]);

  return (
    <div className="space-y-8">
      <PageHeader
        label="Clients"
        title="Client CRM"
        description="Manage customer details, tax numbers, contact information and sales activity from one workspace."
        icon={Users}
     action={
  <PrimaryButton
    type="button"
    onClick={() => {
      setSelectedClient(null);
      setOpenModal(true);
    }}
  >
    <Plus className="mr-2 h-4 w-4" />
    Add Client
  </PrimaryButton>
}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="md:w-[420px]">
            <SearchBar
              placeholder="Search name, company, email, phone, city or TRN..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <FilterTabs
            tabs={["All", "Lead", "Active", "Inactive"]}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </div>

{loading ? (
  <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500">
    Loading clients...
  </div>
) : filteredClients.length === 0 ? (
  <EmptyState
    icon={Users}
    title="No clients found"
    description="Create your first client or adjust your search and filters."
  />
) : (
  <AppTable
    headers={[
      "Client",
      "Contact",
      "Location",
      "TRN / VAT",
      "Status",
      "Action",
    ]}
  >
    {filteredClients.map((client) => (
      <div
        key={client.id}
        className="grid grid-cols-[1.5fr_1.4fr_1fr_1fr_1fr_140px] gap-4 px-6 py-5 transition hover:bg-slate-50/70"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-bold text-white shadow-md shadow-blue-500/20">
            {client.name.charAt(0)}
          </div>

          <div>
            <div className="font-bold text-slate-950">
              {client.name}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              {client.company || "No company"}
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-slate-600">
          {client.email && <div>{client.email}</div>}

          {client.phone && (
            <div className="text-slate-500">
              {client.phone}
            </div>
          )}

          {!client.email && !client.phone && (
            <div className="text-slate-400">
              No contact
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-slate-600">
          {client.city || "—"}
        </div>

        <div className="flex items-center text-sm font-medium text-slate-600">
          {client.trn || "—"}
        </div>

        <div className="flex items-center">
          <StatusBadge status={client.status || "Lead"} />
        </div>

        <div className="flex items-center justify-end gap-2">
<Link
  href={`/dashboard/clients/${client.id}`}
>
  <TableActionButton>
    View
  </TableActionButton>
</Link>

<TableActionButton
  type="button"
  onClick={() => {
    setSelectedClient(client);
    setOpenModal(true);
  }}
>
  Edit
</TableActionButton>

  <TableActionButton
    type="button"
    variant="danger"
    onClick={() => handleDeleteClient(client.id)}
  >
    Delete
  </TableActionButton>
</div>
      </div>
    ))}
  </AppTable>
)}

<AddClientModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  initialData={selectedClient}
  onSubmit={handleSaveClient}
  loading={saving}
/>
    </div>
  );
}