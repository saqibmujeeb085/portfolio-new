"use client";

import { Search } from "lucide-react";

interface DashboardFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export function DashboardFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: DashboardFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <input
          type="text"
          placeholder="Search by name, email, or service..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-surface-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-foreground/25"
        />
      </div>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="h-11 min-w-[160px] rounded-lg border border-surface-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-foreground/25 [&>option]:bg-card [&>option]:text-foreground"
      >
        <option value="all">All Status</option>
        <option value="new">New</option>
        <option value="seen">Seen</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}
