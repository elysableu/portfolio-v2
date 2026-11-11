import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type * as schema from "./schema";

/**
 * Driver-agnostic database handle. Production passes a Neon client,
 * tests pass an in-memory PGlite client; both satisfy this type.
 */
export type Database = PgDatabase<PgQueryResultHKT, typeof schema>;
