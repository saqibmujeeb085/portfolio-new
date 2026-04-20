"use client";

import { useState } from "react";
import { X, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

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

interface ContactModalProps {
  contact: Contact;
  userRole?: "admin" | "partner"; // Reserved for future role-based restrictions
  onClose: () => void;
  onUpdate: (contact: Contact) => void;
}

export function ContactModal({
  contact,
  onClose,
  onUpdate,
}: ContactModalProps) {
  const [status, setStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const updatedContact = await response.json();
      onUpdate(updatedContact);
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-surface-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border p-6">
          <div>
            <h3 className="text-xl font-semibold">
              {contact.first_name} {contact.last_name}
            </h3>
            <p className="mt-1 text-sm text-foreground/60">
              Submitted {format(new Date(contact.created_at), "PPP")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* Contact Info */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 text-sm font-medium text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                  Phone
                </p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 text-sm font-medium text-blue-600 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/60">
              Service Requested
            </p>
            <div className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium">
              {contact.service}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/60">
              Message
            </p>
            <div className="rounded-lg border border-surface-border bg-secondary/50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {contact.message}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label
              htmlFor="status"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/60"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "new" | "seen" | "contacted" | "closed"
                )
              }
              className="h-11 w-full rounded-lg border border-surface-border bg-card px-4 text-sm outline-none transition focus:border-foreground/25"
            >
              <option value="new">New</option>
              <option value="seen">Seen</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/60"
            >
              Internal Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this contact..."
              className="w-full rounded-lg border border-surface-border bg-card px-4 py-3 text-sm outline-none transition focus:border-foreground/25"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-surface-border p-6">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-lg bg-foreground px-6 py-2 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
