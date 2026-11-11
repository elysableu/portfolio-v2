import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import type { Database } from "./types";

let instance: Database | undefined;

/** Lazily creates the Neon HTTP client so builds without a DB URL fail clearly. */
export function getDb(): Database {
  if (instance) return instance;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local.");
  instance = drizzle({ client: neon(url), schema });
  return instance;
}
