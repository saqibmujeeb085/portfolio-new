/**
 * Seed script — run with:
 *   npx tsx scripts/seed.ts
 *
 * This inserts dummy contacts into Supabase.
 * Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * are set in .env.local before running.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌  Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Dummy contacts ────────────────────────────────────────────────────────────
const contacts = [
  {
    first_name: "James",
    last_name: "Anderson",
    email: "james.anderson@example.com",
    phone: "+1 (555) 201-4321",
    service: "Web Development",
    message:
      "Hi, I need a full-stack web application for my e-commerce startup. Looking for a modern stack with Next.js and a headless CMS. Budget is flexible for the right team.",
    status: "new",
    notes: null,
  },
  {
    first_name: "Sophia",
    last_name: "Martinez",
    email: "sophia.martinez@techcorp.io",
    phone: "+1 (555) 302-8765",
    service: "UI/UX Design",
    message:
      "We are redesigning our SaaS dashboard and need a senior UI/UX designer. The project involves user research, wireframing, and high-fidelity prototypes in Figma.",
    status: "seen",
    notes: "Scheduled a discovery call for next Tuesday at 3pm.",
  },
  {
    first_name: "Liam",
    last_name: "Thompson",
    email: "liam.t@brandstudio.co",
    phone: "+44 7700 900123",
    service: "Brand Identity",
    message:
      "We are launching a new fintech product and need a complete brand identity — logo, color palette, typography, and brand guidelines. Timeline is 6 weeks.",
    status: "contacted",
    notes:
      "Sent proposal on April 15. Waiting for client approval. Follow up if no response by April 22.",
  },
  {
    first_name: "Aisha",
    last_name: "Patel",
    email: "aisha.patel@growthco.com",
    phone: "+1 (555) 487-6543",
    service: "SEO Optimization",
    message:
      "Our organic traffic has dropped 40% after a Google core update. We need a full SEO audit and a recovery strategy. We have a blog with 500+ articles.",
    status: "new",
    notes: null,
  },
  {
    first_name: "Noah",
    last_name: "Williams",
    email: "noah.williams@digitalagency.net",
    phone: "+1 (555) 563-2198",
    service: "Performance Marketing",
    message:
      "Looking for a performance marketing partner to manage our Google Ads and Meta campaigns. Monthly ad spend is around $15,000. We need better ROAS.",
    status: "closed",
    notes:
      "Project completed. Client was very happy with results. 3.2x ROAS achieved. Good candidate for retainer.",
  },
  {
    first_name: "Emma",
    last_name: "Johnson",
    email: "emma.j@startuplab.io",
    phone: "+1 (555) 634-9012",
    service: "Web Design",
    message:
      "I need a landing page designed and built for my SaaS product launch. It should be conversion-optimized with animations and a clean modern aesthetic.",
    status: "seen",
    notes: "Reviewed portfolio. Good fit. Need to send pricing.",
  },
  {
    first_name: "Oliver",
    last_name: "Brown",
    email: "oliver.brown@enterprise.com",
    phone: "+1 (555) 712-3456",
    service: "Custom Software Development",
    message:
      "We need a custom CRM system built for our sales team of 50 people. It should integrate with Salesforce and our internal ERP. This is a large project.",
    status: "contacted",
    notes:
      "Had initial call. They have a $80k budget. Preparing detailed technical proposal.",
  },
  {
    first_name: "Isabella",
    last_name: "Garcia",
    email: "isabella.garcia@mediahouse.tv",
    phone: "+34 612 345 678",
    service: "Web Development",
    message:
      "We need a video streaming platform similar to Vimeo but for internal corporate training. Must support SSO, analytics, and multi-language subtitles.",
    status: "new",
    notes: null,
  },
  {
    first_name: "Ethan",
    last_name: "Davis",
    email: "ethan.davis@retailbrand.com",
    phone: "+1 (555) 891-2345",
    service: "Performance Marketing",
    message:
      "Our Black Friday campaign is coming up in 6 months. We want to start planning now. Last year we spent $50k and got mediocre results. Need a better strategy.",
    status: "new",
    notes: null,
  },
  {
    first_name: "Mia",
    last_name: "Wilson",
    email: "mia.wilson@healthtech.co",
    phone: "+1 (555) 923-6789",
    service: "UI/UX Design",
    message:
      "We are building a patient portal for a healthcare provider. Needs to be HIPAA-compliant, accessible (WCAG 2.1 AA), and work well for elderly users.",
    status: "seen",
    notes: "Interesting project. Need to check HIPAA compliance experience.",
  },
];

async function seed() {
  console.log("🌱  Seeding contacts...\n");

  // Insert contacts one by one to get individual feedback
  let successCount = 0;
  let failCount = 0;

  for (const contact of contacts) {
    const { error } = await supabase.from("contacts").insert(contact as any);

    if (error) {
      console.error(`❌  Failed to insert ${contact.first_name} ${contact.last_name}:`, error.message);
      failCount++;
    } else {
      console.log(`✅  Inserted: ${contact.first_name} ${contact.last_name} — ${contact.service} (${contact.status})`);
      successCount++;
    }
  }

  console.log(`\n📊  Done — ${successCount} inserted, ${failCount} failed.`);

  if (failCount > 0) {
    console.log("\n⚠️   Some inserts failed. Make sure the contacts table exists.");
    console.log("     Run the SQL in supabase-migration.sql first.\n");
  }
}

seed().catch(console.error);
