import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createSessionClient } from "@/lib/supabase/session";

async function getAuthenticatedAdmin() {
  const sessionClient = await createSessionClient();
  const { data: { user } } = await sessionClient.auth.getUser();
  if (!user) return { user: null, supabase: null, error: "Unauthorized" };

  const supabase = createServerClient();
  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();

  if (!profile || profile.role !== "admin") {
    return { user: null, supabase: null, error: "Forbidden" };
  }

  return { user, supabase, error: null };
}

// Get all users (admin only)
export async function GET() {
  try {
    const { supabase, error } = await getAuthenticatedAdmin();
    if (error || !supabase) {
      return NextResponse.json({ error }, { status: error === "Unauthorized" ? 401 : 403 });
    }

    const { data: profiles, error: dbError } = await supabase
      .from("profiles").select("*").order("created_at", { ascending: false });

    if (dbError) {
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role = "partner" } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const { supabase, error } = await getAuthenticatedAdmin();
    if (error || !supabase) {
      return NextResponse.json(
        { error },
        { status: error === "Unauthorized" ? 401 : 403 }
      );
    }

    const { data: newUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({ id: newUser.user.id, email, role })
      .select()
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to create user profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: newProfile }, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
