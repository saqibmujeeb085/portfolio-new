/**
 * Creates tables using Supabase Management API with Personal Access Token.
 * Run with: npx tsx scripts/create-tables-pat.ts <YOUR_PAT>
 *
 * Get your PAT from: https://supabase.com/dashboard/account/tokens
 */
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SVC = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const PAT = process.argv[2]; // Pass as CLI argument

const REF = URL.replace("https://", "").split(".")[0];

if (!PAT) {
  console.log("\n❌  No Personal Access Token provided.\n");
  console.log("  Get yours from: https://supabase.com/dashboard/account/tokens");
  console.log("  Then run: npx tsx scripts/create-tables-pat.ts YOUR_PAT_HERE\n");
  process.exit(1);
}

const TABLES_SQL = `
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

async function runSQL(sql: string) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PAT}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}

async function main() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Creating Tables via Management API");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("  Creating tables...");
  const r = await runSQL(TABLES_SQL);

  if (r.ok) {
    console.log("  ✅  Tables created!\n");
    console.log("  Now run: npx tsx scripts/setup-db.ts\n");
  } else {
    console.log(`  ❌  Failed (${r.status}): ${r.body.slice(0, 300)}\n`);
  }
}

main().catch(console.error);
