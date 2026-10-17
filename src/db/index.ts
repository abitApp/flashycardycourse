import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Pooled connection, queried over HTTP: fits serverless runtimes.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({ client: sql, schema });
