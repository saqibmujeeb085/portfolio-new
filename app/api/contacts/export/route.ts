import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/supabase/session";

export async function POST(request: NextRequest) {
  try {
    // Verify session
    const sessionClient = await createSessionClient();
    const { data: { user } } = await sessionClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contacts } = await request.json();

    // Create CSV content
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Service",
      "Message",
      "Status",
      "Notes",
      "Created At",
      "Updated At",
    ];

    const csvRows = [
      headers.join(","),
      ...contacts.map((contact: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        service: string;
        message: string;
        status: string;
        notes: string | null;
        created_at: string;
        updated_at: string;
      }) =>
        [
          contact.id,
          `"${contact.first_name}"`,
          `"${contact.last_name}"`,
          contact.email,
          contact.phone,
          `"${contact.service}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          contact.status,
          `"${(contact.notes || "").replace(/"/g, '""')}"`,
          contact.created_at,
          contact.updated_at,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="contacts-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export contacts" },
      { status: 500 }
    );
  }
}
