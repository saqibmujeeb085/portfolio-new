"use client";

import { Download } from "lucide-react";

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

interface ExportButtonProps {
  contacts: Contact[];
}

export function ExportButton({ contacts }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const response = await fetch("/api/contacts/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contacts }),
      });

      if (!response.ok) {
        throw new Error("Failed to export contacts");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export contacts. Please try again.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
}
