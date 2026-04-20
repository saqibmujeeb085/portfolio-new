import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SVC  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("URL:", URL);
console.log("SVC key prefix:", SVC?.slice(0, 30));

const supabase = createClient(URL, SVC, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Try listing all tables in public schema
async function run() {
  // 1. Try a simple query
  const { data, error } = await supabase
    .from("contacts")
    .select("id")
    .limit(1);

  console.log("\n--- contacts query ---");
  console.log("data:", data);
  console.log("error:", JSON.stringify(error, null, 2));

  // 2. Try information_schema
  const { data: tables, error: tErr } = await supabase
    .rpc("get_tables" as any);

  console.log("\n--- rpc get_tables ---");
  console.log("data:", tables);
  console.log("error:", JSON.stringify(tErr, null, 2));

  // 3. Raw fetch to check what endpoints exist
  const endpoints = [
    `${URL}/rest/v1/`,
    `${URL}/rest/v1/contacts`,
  ];

  for (const ep of endpoints) {
    const r = await fetch(ep, {
      headers: { apikey: SVC, Authorization: `Bearer ${SVC}` },
    });
    console.log(`\n--- GET ${ep} ---`);
    console.log("status:", r.status);
    const body = await r.text();
    console.log("body:", body.slice(0, 300));
  }
}

run().catch(console.error);
