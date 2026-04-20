/**
 * Creates tables directly using Supabase's internal pg endpoint.
 * Run with: npx tsx scripts/create-tables.ts
 */
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SVC = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Extract project ref
const REF = URL.replace("https://", "").split(".")[0];

async function tryEndpoint(endpoint: string, body: object) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SVC,
      Authorization: `Bearer ${SVC}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, ok: res.ok, body: text };
}

const SQL = `
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new','seen','contacted','closed')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'partner' CHECK (role IN ('admin','partner')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "contacts_all" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "profiles_all" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;

async function main() {
  console.log("Trying different SQL endpoints...\n");

  const endpoints = [
    { url: `${URL}/pg/query`,                          body: { query: SQL } },
    { url: `${URL}/rest/v1/rpc/query`,                 body: { query: SQL } },
    { url: `https://api.supabase.com/v1/projects/${REF}/database/query`, body: { query: SQL } },
    { url: `${URL}/pg`,                                body: { query: SQL } },
  ];

  for (const ep of endpoints) {
    console.log(`Trying: ${ep.url}`);
    const r = await tryEndpoint(ep.url, ep.body);
    console.log(`  Status: ${r.status} | Body: ${r.body.slice(0, 150)}\n`);
    if (r.ok) {
      console.log("✅ SUCCESS with:", ep.url);
      break;
    }
  }
}

main().catch(console.error);
