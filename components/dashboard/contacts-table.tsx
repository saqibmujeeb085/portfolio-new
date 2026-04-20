"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { ContactModal } from "./contact-modal";

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

interface ContactsTableProps {
  contacts: Contact[];
  userRole: "admin" | "partner";
  onContactUpdate: (contact: Contact) => void;
}

export function ContactsTable({
  contacts,
  userRole,
  onContactUpdate,
}: ContactsTableProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "seen":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "contacted":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "closed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-secondary text-foreground/60 border-surface-border";
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="rounded-lg border border-surface-border bg-card p-12 text-center">
        <p className="text-foreground/60">No contacts found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-surface-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-surface-border bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="transition hover:bg-secondary/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </span>
                      {contact.status === "new" && (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-sm">{contact.service}</td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {format(new Date(contact.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(contact.status)}`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-secondary"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          userRole={userRole}
          onClose={() => setSelectedContact(null)}
          onUpdate={onContactUpdate}
        />
      )}
    </>
  );
}
