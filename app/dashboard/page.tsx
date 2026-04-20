import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";
import { createServerClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

// Force dynamic rendering — never cache this page
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Use session client to read the user's cookie-based session
  const sessionClient = await createSessionClient();

  const {
    data: { user },
    error: authError,
  } = await sessionClient.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Use service-role client for privileged data fetching
  const supabase = createServerClient();

  // Get user profile with role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  // Fetch initial contacts
  const { data: contacts, error: contactsError } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (contactsError) {
    console.error("Error fetching contacts:", contactsError);
  }

  return (
    <DashboardClient
      initialContacts={contacts || []}
      userRole={profile.role as "admin" | "partner"}
      userId={user.id}
    />
  );
}
