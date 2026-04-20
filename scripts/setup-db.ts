/**
 * Full database setup — creates tables, seeds contacts, creates admin user.
 * Uses Supabase JS client with service role key.
 * Run with:  npx tsx scripts/setup-db.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Execute raw SQL via pg endpoint ──────────────────────────────────────────

async function sql(query: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ sql: query }),
  });

  if (res.ok) return { ok: true };

  // Try alternative endpoint
  const res2 = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query }),
  });

  if (res2.ok) return { ok: true };

  const body = await res2.text();
  return { ok: false, error: body.slice(0, 300) };
}

// ─── Dummy contacts ────────────────────────────────────────────────────────────

const CONTACTS = [
  { first_name:"James",    last_name:"Anderson", email:"james.anderson@example.com",     phone:"+1 (555) 201-4321", service:"Web Development",            status:"new",       notes:null,                                                                                    message:"Hi, I need a full-stack web application for my e-commerce startup. Looking for a modern stack with Next.js and a headless CMS. Budget is flexible for the right team." },
  { first_name:"Sophia",   last_name:"Martinez", email:"sophia.martinez@techcorp.io",    phone:"+1 (555) 302-8765", service:"UI/UX Design",                status:"seen",      notes:"Scheduled a discovery call for next Tuesday at 3pm.",                                  message:"We are redesigning our SaaS dashboard and need a senior UI/UX designer. The project involves user research, wireframing, and high-fidelity prototypes in Figma." },
  { first_name:"Liam",     last_name:"Thompson", email:"liam.t@brandstudio.co",          phone:"+44 7700 900123",   service:"Brand Identity",              status:"contacted", notes:"Sent proposal on April 15. Waiting for client approval.",                              message:"We are launching a new fintech product and need a complete brand identity — logo, color palette, typography, and brand guidelines. Timeline is 6 weeks." },
  { first_name:"Aisha",    last_name:"Patel",    email:"aisha.patel@growthco.com",       phone:"+1 (555) 487-6543", service:"SEO Optimization",            status:"new",       notes:null,                                                                                    message:"Our organic traffic has dropped 40% after a Google core update. We need a full SEO audit and a recovery strategy. We have a blog with 500+ articles." },
  { first_name:"Noah",     last_name:"Williams", email:"noah.williams@digitalagency.net",phone:"+1 (555) 563-2198", service:"Performance Marketing",       status:"closed",    notes:"Project completed. 3.2x ROAS achieved. Good candidate for retainer.",                 message:"Looking for a performance marketing partner to manage our Google Ads and Meta campaigns. Monthly ad spend is around $15,000. We need better ROAS." },
  { first_name:"Emma",     last_name:"Johnson",  email:"emma.j@startuplab.io",           phone:"+1 (555) 634-9012", service:"Web Design",                  status:"seen",      notes:"Reviewed portfolio. Good fit. Need to send pricing.",                                  message:"I need a landing page designed and built for my SaaS product launch. It should be conversion-optimized with animations and a clean modern aesthetic." },
  { first_name:"Oliver",   last_name:"Brown",    email:"oliver.brown@enterprise.com",    phone:"+1 (555) 712-3456", service:"Custom Software Development", status:"contacted", notes:"Had initial call. $80k budget. Preparing detailed technical proposal.",                message:"We need a custom CRM system built for our sales team of 50 people. It should integrate with Salesforce and our internal ERP. This is a large project." },
  { first_name:"Isabella", last_name:"Garcia",   email:"isabella.garcia@mediahouse.tv",  phone:"+34 612 345 678",   service:"Web Development",             status:"new",       notes:null,                                                                                    message:"We need a video streaming platform for internal corporate training. Must support SSO, analytics, and multi-language subtitles." },
  { first_name:"Ethan",    last_name:"Davis",    email:"ethan.davis@retailbrand.com",    phone:"+1 (555) 891-2345", service:"Performance Marketing",       status:"new",       notes:null,                                                                                    message:"Our Black Friday campaign is coming up in 6 months. Last year we spent $50k and got mediocre results. Need a better strategy." },
  { first_name:"Mia",      last_name:"Wilson",   email:"mia.wilson@healthtech.co",       phone:"+1 (555) 923-6789", service:"UI/UX Design",                status:"seen",      notes:"Interesting project. Need to check HIPAA compliance experience.",                      message:"We are building a patient portal for a healthcare provider. Needs to be HIPAA-compliant, accessible (WCAG 2.1 AA), and work well for elderly users." },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function ok(msg: string)   { console.log(`  ✅  ${msg}`); }
function skip(msg: string) { console.log(`  ⏭️   ${msg}`); }
function fail(msg: string) { console.log(`  ❌  ${msg}`); }

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Supabase Setup — Tables + Seed Data + Admin User");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // ── 1. Check / create tables ─────────────────────────────────────────────────
  console.log("📦  Step 1: Tables");

  const { error: tableCheck } = await supabase.from("contacts").select("id").limit(1);

  if (tableCheck) {
    console.log("  Tables missing — attempting to create via SQL...");

    const createSQL = `
      CREATE TABLE IF NOT EXISTS public.contacts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name TEXT NOT NULL, last_name TEXT NOT NULL,
        email TEXT NOT NULL, phone TEXT NOT NULL,
        service TEXT NOT NULL, message TEXT NOT NULL,
        status TEXT DEFAULT 'new' CHECK (status IN ('new','seen','contacted','closed')),
        notes TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        role TEXT DEFAULT 'partner' CHECK (role IN ('admin','partner')),
        created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "contacts_all" ON public.contacts;
      CREATE POLICY "contacts_all" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
      DROP POLICY IF EXISTS "profiles_all" ON public.profiles;
      CREATE POLICY "profiles_all" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
    `;

    const r = await sql(createSQL);
    if (!r.ok) {
      fail("Could not auto-create tables.");
      console.log("\n  ⚠️   Please run the SQL manually:\n");
      console.log("  👉  https://supabase.com/dashboard/project/ldtduwfewzbkzzzmtczy/sql/new");
      console.log("  📄  File: supabase-full-setup.sql\n");
      console.log("  Then run this script again.\n");
      process.exit(1);
    }
    ok("Tables created");
  } else {
    ok("Tables already exist");
  }

  // ── 2. Seed contacts ─────────────────────────────────────────────────────────
  console.log("\n🌱  Step 2: Seed Contacts");

  let inserted = 0, skipped = 0;

  for (const contact of CONTACTS) {
    const { data: existing } = await supabase
      .from("contacts").select("id").eq("email", contact.email).single();

    if (existing) { skip(`${contact.first_name} ${contact.last_name} (already exists)`); skipped++; continue; }

    const { error } = await supabase.from("contacts").insert(contact as any);
    if (error) { fail(`${contact.first_name} ${contact.last_name}: ${error.message}`); }
    else { ok(`${contact.first_name} ${contact.last_name} — ${contact.service} [${contact.status}]`); inserted++; }
  }

  console.log(`\n  📊  ${inserted} inserted, ${skipped} already existed\n`);

  // ── 3. Admin user ────────────────────────────────────────────────────────────
  const ADMIN_EMAIL    = "admin@portfolio.com";
  const ADMIN_PASSWORD = "Admin@123456";

  console.log("👤  Step 3: Admin User");

  // Check if already exists
  const { data: userList } = await supabase.auth.admin.listUsers();
  const existing = userList?.users?.find((u) => u.email === ADMIN_EMAIL);
  let adminId: string;

  if (existing) {
    adminId = existing.id;
    skip(`Auth user already exists (${ADMIN_EMAIL})`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (error || !data?.user) { fail(`Create auth user: ${error?.message}`); process.exit(1); }
    adminId = data.user.id;
    ok(`Auth user created: ${ADMIN_EMAIL}`);
  }

  // Upsert profile
  const { error: profileErr } = await supabase
    .from("profiles")
    .upsert({ id: adminId, email: ADMIN_EMAIL, role: "admin" } as any, { onConflict: "id" });

  if (profileErr) { fail(`Profile: ${profileErr.message}`); }
  else { ok("Admin profile ready (role: admin)"); }

  // ── Done ─────────────────────────────────────────────────────────────────────
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  ✅  All done!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("  🔐  Admin Login:");
  console.log(`      Email:    ${ADMIN_EMAIL}`);
  console.log(`      Password: ${ADMIN_PASSWORD}\n`);
  console.log("  🌐  Login:     http://localhost:3000/login");
  console.log("  📊  Dashboard: http://localhost:3000/dashboard\n");
}

main().catch((e) => { console.error("\n❌  Fatal:", e.message); process.exit(1); });
