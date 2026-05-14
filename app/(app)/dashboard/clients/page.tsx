"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, Plus, Mail, Phone, MapPin, Building2, BadgeCheck } from "lucide-react";

import AddClientModal from "@/components/clients/AddClientModal";
import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterTabs from "@/components/dashboard/FilterTabs";
import EmptyState from "@/components/dashboard/EmptyState";

import { Client } from "@/types/client";
import { addClient, getClients } from "@/lib/clientService";

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

  async function handleCreateClient(
    client: Omit<Client, "id" | "created_at" | "user_id">
  ) {
    try {
      setSaving(true);
      const newClient = await addClient(client);
      setClients([newClient, ...clients]);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save client");
    } finally {
      setSaving(false);
    }
  }

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
  <button
    type="button"
    onClick={() => setOpenModal(true)}
    className="
    group
    inline-flex
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-emerald-500
    px-5
    py-3
    text-sm
    font-bold
    text-white
    shadow-lg
    shadow-blue-500/20
    transition-all
    hover:-translate-y-0.5
    hover:shadow-xl
    hover:shadow-blue-500/30
    "
  >
    <span
      className="
      mr-2
      flex
      h-6
      w-6
      items-center
      justify-center
      rounded-xl
      bg-white/20
      backdrop-blur-sm
      transition
      group-hover:scale-110
      "
    >
      <Plus className="h-3.5 w-3.5 text-white" />
    </span>

    Add Client
  </button>
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
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-[1.5fr_1.4fr_1fr_1fr_1fr_120px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            <div>Client</div>
            <div>Contact</div>
            <div>Location</div>
            <div>TRN / VAT</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="grid grid-cols-[1.5fr_1.4fr_1fr_1fr_1fr_120px] gap-4 px-6 py-5 transition hover:bg-slate-50/70"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-base font-bold text-white shadow-md shadow-blue-500/20">
                    {client.name.charAt(0)}
                  </div>

                  <div>
                    <div className="font-bold text-slate-950">
                      {client.name}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <Building2 className="h-3.5 w-3.5" />
                      {client.company || "No company"}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm text-slate-600">
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {client.email}
                    </div>
                  )}

                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {client.phone}
                    </div>
                  )}

                  {!client.email && !client.phone && (
                    <span className="text-slate-400">No contact</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {client.city || "—"}
                </div>

                <div className="text-sm font-medium text-slate-600">
                  {client.trn || "—"}
                </div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      client.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : client.status === "Inactive"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                    {client.status || "Lead"}
                  </span>
                </div>

                <div className="text-right">
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddClientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateClient}
        loading={saving}
      />
    </div>
  );
}