"use client";

import { useState, type FormEvent } from "react";
import { UserPlus, Trash2, Mail, Shield, Calendar } from "lucide-react";
import { format } from "date-fns";

type User = {
  id: string;
  email: string;
  role: "admin" | "partner";
  created_at: string;
  updated_at: string;
};

interface UsersClientProps {
  initialUsers: User[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "partner">(
    "partner"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      setUsers([data.user, ...users]);
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("partner");
      setIsAddingUser(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }

      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  return (
    <div>
      {/* Add User Button */}
      <div className="mb-6">
        {!isAddingUser ? (
          <button
            onClick={() => setIsAddingUser(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            <UserPlus className="h-4 w-4" />
            Add New User
          </button>
        ) : (
          <div className="rounded-lg border border-surface-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Add New User</h3>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-surface-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/25"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-11 w-full rounded-lg border border-surface-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/25"
                  placeholder="Minimum 8 characters"
                />
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  value={newUserRole}
                  onChange={(e) =>
                    setNewUserRole(e.target.value as "admin" | "partner")
                  }
                  className="h-11 w-full rounded-lg border border-surface-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-foreground/25 [&>option]:bg-card [&>option]:text-foreground"
                >
                  <option value="partner">Partner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Creating..." : "Create User"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingUser(false);
                    setError(null);
                    setNewUserEmail("");
                    setNewUserPassword("");
                    setNewUserRole("partner");
                  }}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-lg border border-surface-border bg-card">
        <table className="w-full">
          <thead className="border-b border-surface-border bg-secondary/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Created
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-sm text-foreground/60">No users found</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-secondary/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                        <Mail className="h-4 w-4 text-foreground/60" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-foreground/60">
                          ID: {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield
                        className={`h-4 w-4 ${
                          user.role === "admin"
                            ? "text-blue-500"
                            : "text-foreground/40"
                        }`}
                      />
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                          user.role === "admin"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-secondary text-foreground/80"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(user.created_at), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
