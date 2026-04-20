import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";
import { createServerClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UsersClient } from "@/components/dashboard/users-client";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const sessionClient = await createSessionClient();

  const {
    data: { user },
    error: authError,
  } = await sessionClient.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const supabase = createServerClient();

  // Get user profile with role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  // Fetch all users
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (usersError) {
    console.error("Error fetching users:", usersError);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={profile.role as "admin" | "partner"} />

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Manage user accounts and permissions
          </p>
        </div>

        <UsersClient initialUsers={users || []} />
      </main>
    </div>
  );
}
