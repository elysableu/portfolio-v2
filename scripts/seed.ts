import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import { siteContent } from "../src/db/content";
import * as schema from "../src/db/schema";
import { seedContent } from "../src/db/seed";
import { requestRevalidation } from "../src/lib/publish";

config({ path: [".env.local", ".env"], quiet: true });

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");

  // The WebSocket pool supports transactions, which the seed relies on.
  const pool = new Pool({ connectionString: url });
  try {
    await seedContent(drizzle({ client: pool, schema }), siteContent);
    console.log("Seeded content.");
  } finally {
    await pool.end();
  }

  // Tell the running site to drop its cache so changes show immediately.
  const { message } = await requestRevalidation({
    siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
    secret: process.env.REVALIDATE_SECRET,
  });
  console.log(message);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
