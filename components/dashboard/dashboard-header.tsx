"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";

interface DashboardHeaderProps {
  userRole: "admin" | "partner";
}

export function DashboardHeader({ userRole }: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="border-b border-surface-border bg-card">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider">
              {userRole}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                pathname === "/dashboard"
                  ? "bg-secondary text-foreground"
                  : "text-foreground/60 hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              Contacts
            </Link>
            {userRole === "admin" && (
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  pathname === "/dashboard/users"
                    ? "bg-secondary text-foreground"
                    : "text-foreground/60 hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
            )}
          </nav>
        </div>

        <button
          onClick={handleSignOut}
          className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-secondary"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
