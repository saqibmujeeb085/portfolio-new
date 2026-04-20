"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { ContactsTable } from "./contacts-table";
import { DashboardHeader } from "./dashboard-header";
import { DashboardFilters } from "./dashboard-filters";
import { ExportButton } from "./export-button";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "seen" | "contacted" | "closed";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type UserRole = "admin" | "partner";

interface DashboardClientProps {
  initialContacts: Contact[];
  userRole: UserRole;
  userId: string;
}

export function DashboardClient({
  initialContacts,
  userRole,
}: DashboardClientProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("contacts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setContacts((prev) => [payload.new as Contact, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setContacts((prev) =>
              prev.map((contact) =>
                contact.id === payload.new.id
                  ? (payload.new as Contact)
                  : contact
              )
            );
          } else if (payload.eventType === "DELETE") {
            setContacts((prev) =>
              prev.filter((contact) => contact.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Status filter
      if (statusFilter !== "all" && contact.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          contact.first_name.toLowerCase().includes(query) ||
          contact.last_name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.service.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [contacts, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Contact Management
            </h1>
            <p className="mt-1 text-sm text-foreground/60">
              Manage and track all contact form submissions
            </p>
          </div>

          <ExportButton contacts={filteredContacts} />
        </div>

        <DashboardFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <ContactsTable
          contacts={filteredContacts}
          userRole={userRole}
          onContactUpdate={(updatedContact) => {
            setContacts((prev) =>
              prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
            );
          }}
        />
      </main>
    </div>
  );
}
